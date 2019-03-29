import React, { Component } from 'react'
import * as THREE from 'three'
import GeneralStats from './GeneralStats';

import Service from '../services/generalservice'
var OrbitControls = require('three-orbit-controls')(THREE)



class ThreeScene extends Component{

  constructor(){
    super()
    this.service = new Service()
    this.ziplist = undefined
    this.state = {
      current : null
    }
  }

  getZips = () => {
    this.service.getZipStats()
    .then(response=>{
        console.log(response)
        this.ziplist = response
    })
  }

  componentDidMount(){
    this.getZips()
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight
    console.log(width,height)
    //ADD SCENE
    this.scene = new THREE.Scene()
    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    )

    this.light = new THREE.DirectionalLight( 0xdddddd, 0.8 )
    this.light.position.set( -10, 10, 10 )

    this.targetObject = new THREE.Object3D();
    this.targetObject.position.set(0,0,0)
    this.light.target = this.targetObject

    this.camera.position.y = 10
    this.camera.position.z = 16
    this.camera.lookAt(this.scene.position);
    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    this.renderer.setClearColor( 0xffffff,0);
    this.renderer.setSize(width, height)
    this.mount.appendChild(this.renderer.domElement)



    // CONTROLS
    this.controls = new OrbitControls(this.camera,this.renderer.domElement);



    //ADD CUBE
    const geometry = new THREE.BoxGeometry(3, 3, 3)
    this.material = new THREE.MeshPhongMaterial({color:'#4286f4' ,transparent:true})
    this.material.opacity = 0.4
    this.material2 = new THREE.MeshPhongMaterial({color:'#f26d73' ,transparent:true})
    this.material2.opacity = 0.3
    this.cube = new THREE.Mesh(geometry, this.material)
    this.cube2 = new THREE.Mesh(geometry, this.material)
    this.cube.receiveShadow = true
    this.cube2.receiveShadow = true
    this.cube.name = "28023"
    this.cube2.name = "28044"
    this.cube2.position.x = -5

    this.group = new THREE.Group();
    this.group.add(this.cube);
    this.group.add(this.cube2);

    this.scene.add(this.group,this.light,this.targetObject)

    this.raycaster = new THREE.Raycaster(); // create once
    this.mouse = new THREE.Vector2(); // create once  
    this.INTERSECTED = undefined


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
        event.preventDefault();
      
        // update the mouse variable

        this.mouse.x = ( event.clientX / this.renderer.domElement.clientWidth ) * 2 - 1;
        this.mouse.y = - ( event.clientY / this.renderer.domElement.clientHeight ) * 2 + 1;
        this.update()
      }

    animate = () => {
        this.cube.rotation.y += 0.02
        this.cube2.rotation.y -= 0.03
        this.group.rotation.y -= 0.01
        this.renderScene()
        this.frameId = window.requestAnimationFrame(this.animate)
    }

    update = () => {


        console.log("entro")
        this.raycaster.setFromCamera( this.mouse, this.camera );
        console.log(this.scene.children)
        console.log(this.group)
        this.intersects = this.raycaster.intersectObjects( this.group.children )
        console.log(this.intersects)
        if(this.intersects.length>0){
          console.log(this.intersects[0].object.name)
        }
        // find intersections
      
        // create a Ray with origin at the mouse position
        //   and direction into the scene (camera direction)
        // this.vector = new THREE.Vector3(this.mouse.x, this.mouse.y, 1);
        // console.log(this.vector)
        // this.vector.unproject(this.camera);
        // console.log("holi")
        // this.ray = new THREE.Raycaster(this.camera.position, this.vector.sub(this.camera.position).normalize());
      
        // // create an array containing all objects in the scene with which the ray intersects
        // this.intersects = this.ray.intersectObjects(this.scene.children);
        // if(this.intersects.length>0){
        //     console.log(this.intersects[0].object)
        // }
        
      
      // INTERSECTED = the object in the scene currently closest to the camera 
      // 		and intersected by the Ray projected from the mouse position 	
    
      // if there is one (or more) intersections
      if (this.intersects.length > 0) {
        // if the closest object intersected is not the currently stored intersection object
        if (this.intersects[0].object !== this.INTERSECTED) {
          // restore previous intersection object (if it exists) to its original color
          if (this.INTERSECTED) {
            console.log(this.INTERSECTED.position.y)
            this.INTERSECTED.position.y -= 0.4
            this.INTERSECTED.material = this.material
          }
            
          // store reference to closest object as current intersection object
          this.INTERSECTED = this.intersects[0].object;
          // store color of closest object (for later restoration)
          this.INTERSECTED.currentpositiony = this.INTERSECTED.position.y
          // set a new color for closest object
          this.INTERSECTED.material = this.material2
          this.INTERSECTED.position.y += 0.4
          this.setState({current : this.INTERSECTED})
        }
      } else // there are no intersections
      {
        // restore previous intersection object (if it exists) to its original color
        if (this.INTERSECTED) {
          this.INTERSECTED.material = this.material
          console.log(this.INTERSECTED.position.y)
          this.INTERSECTED.position.y = 0
        }
          
        // remove previous intersection object reference
        //     by setting current intersection object to "nothing"
        this.INTERSECTED = null
        
      }
      if(this.state.current!==this.INTERSECTED) this.setState({current : this.INTERSECTED})
        // this.controls.update();
        // // this.stats.update();
      }


    renderScene = () => {
        this.renderer.render(this.scene, this.camera)
    }

    render(){
        let elementtoprint = undefined
        if(this.ziplist&&this.state.current){
          elementtoprint = this.ziplist.filter(e=>e.Zone==this.state.current.name)[0]
        }
        return(
        <div>
          <GeneralStats element={elementtoprint}/>
          <div
              style={{ margin: '0 auto' ,width: '100vw', height: '100vh' }}
              ref={(mount) => { this.mount = mount }}
              onMouseMove={this.onDocumentMouseMove}
          />
        </div>
        )
    }
}
export default ThreeScene