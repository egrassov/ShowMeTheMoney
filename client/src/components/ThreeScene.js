import React, { Component } from 'react'
import * as THREE from 'three'
var OrbitControls = require('three-orbit-controls')(THREE)
var Stats = require('three-stats')(THREE)

class ThreeScene extends Component{
  componentDidMount(){
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight
    //ADD SCENE
    this.scene = new THREE.Scene()
    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    )
    this.camera.position.z = 18
    this.camera.position.y = 4
    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    this.renderer.setClearColor( 0xffffff,0);
    this.renderer.setSize(width, height)
    this.mount.appendChild(this.renderer.domElement)



    // CONTROLS
    this.controls = new OrbitControls(this.camera,this.renderer.domElement);



    //ADD CUBE
    const geometry = new THREE.BoxGeometry(3, 3, 3)
    const geometry3 = new THREE.BoxGeometry(14, 14, 14)
    const material = new THREE.MeshNormalMaterial({transparent:true})
    material.opacity = 0.1
    this.cube2 = new THREE.Mesh(geometry, material)
    this.cube = new THREE.Mesh(geometry, material)
    this.cube3 = new THREE.Mesh(geometry3, material)
    this.cube.scale.x = 3
    this.cube.scale.y = 3
    this.cube.scale.z = 3
    this.scene.add(this.cube2,this.cube,this.cube3)

    this.projector = {
        x: 0,
        y: 0
      }
    this.mouse = {
        x: 0,
        y: 0
      }
    this.INTERSECTED = undefined

    this.projector = new THREE.Projector();
    this.ray = undefined
    this.vector = undefined
    this.intersects = undefined

    this.start()
    }
    componentWillUnmount(){
        this.stop()
        this.mount.removeChild(this.renderer.domElement)
    }
    start = () => {
        if (!this.frameId) {
        this.frameId = requestAnimationFrame(this.animate)
        }
    }
    stop = () => {
        cancelAnimationFrame(this.frameId)
    }

    onDocumentMouseMove = (event) => {
        // the following line would stop any other event handler from firing
        // (such as the mouse's TrackballControls)
        // event.preventDefault();
      
        // update the mouse variable
        console.log(this.mouse)
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      }

    animate = () => {
        this.cube.rotation.y += 0.01
        this.cube3.rotation.y -= 0.01
        this.cube2.rotation.y -= 0.01
        this.renderScene()
        this.frameId = window.requestAnimationFrame(this.animate)
    }

    update = () => {
        // find intersections
      
        // create a Ray with origin at the mouse position
        //   and direction into the scene (camera direction)
        this.vector = new THREE.Vector3(this.mouse.x, this.mouse.y, 1);
        this.vector.unproject(this.camera);
        this.ray = new THREE.Raycaster(this.camera.position, this.vector.sub(this.camera.position).normalize());
      
        // create an array containing all objects in the scene with which the ray intersects
        this.intersects = this.ray.intersectObjects(this.scene.children);
      
        // INTERSECTED = the object in the scene currently closest to the camera 
        //		and intersected by the Ray projected from the mouse position 	
      
        // if there is one (or more) intersections
        if (this.intersects.length > 0) {
          // if the closest object intersected is not the currently stored intersection object
          if (this.intersects[0].object != this.INTERSECTED) {
            // restore previous intersection object (if it exists) to its original color
            if (this.INTERSECTED)
              this.INTERSECTED.material.color.setHex(this.INTERSECTED.currentHex);
            // store reference to closest object as current intersection object
            this.INTERSECTED = this.intersects[0].object;
            // store color of closest object (for later restoration)
            this.INTERSECTED.currentHex = this.INTERSECTED.material.color.getHex();
            // set a new color for closest object
            this.INTERSECTED.material.color.setHex(0xffff00);
          }
        } else // there are no intersections
        {
          // restore previous intersection object (if it exists) to its original color
          if (this.INTERSECTED)
            this.INTERSECTED.material.color.setHex(this.INTERSECTED.currentHex);
          // remove previous intersection object reference
          //     by setting current intersection object to "nothing"
          this.INTERSECTED = null;
        }
      
        this.controls.update();
        this.stats.update();
      }


    renderScene = () => {
    this.renderer.render(this.scene, this.camera)
    }
    render(){
        return(
        <div
            style={{ margin: '0 auto' ,paddingTop: '200px' ,width: '50%', height: '50%' }}
            ref={(mount) => { this.mount = mount }}
            onMouseMove={this.onDocumentMouseMove}
        />
        )
    }
}
export default ThreeScene