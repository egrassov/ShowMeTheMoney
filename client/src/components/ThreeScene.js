import React, { Component } from 'react'

import GeneralStats from './GeneralStats';

import Service from '../services/generalservice'







class ThreeScene extends Component{

  constructor(){
    super()
    this.service = new Service()
    this.ziplist = undefined
    this.objLoader = new window.THREE.OBJLoader()
    this.textureLoader = new window.THREE.TextureLoader()
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
    this.scene = new window.THREE.Scene()
    //ADD CAMERA
    this.camera = new window.THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    )

    this.light = new window.THREE.DirectionalLight( 0xdddddd, 0.8 )
    this.light.position.set( -10, 10, -10 )

    this.targetObject = new window.THREE.Object3D();
    this.targetObject.position.set(0,0,0)
    this.light.target = this.targetObject

    this.camera.position.y = 2.5
    this.camera.position.z = 1.2
    this.camera.lookAt(this.scene.position);
    //ADD RENDERER
    this.renderer = new window.THREE.WebGLRenderer({ antialias: true, alpha: true })
    this.renderer.setClearColor( 0xffffff,0);
    this.renderer.setSize(width, height)
    this.mount.appendChild(this.renderer.domElement)



    // CONTROLS
    this.controls = new window.THREE.OrbitControls(this.camera,this.renderer.domElement);

    // LOADERS

    this.citymodel = undefined
    this.vidriotest = {}
    this.citymap = this.textureLoader.load('/models/citytext.jpg')
    this.citymaterial = new window.THREE.MeshPhongMaterial({map: this.citymap, alphaMap: this.citymap})
      console.log(this.objLoader)
      console.log(this.citymap)

    this.group = new window.THREE.Group();
  

    this.objLoader.load('/models/citybase.obj',( city )=> {
      city.traverse( ( node )=> {
          if ( node.isMesh ) {
              console.log(node)
              this.citymodel = node
              this.citymodel.material = this.citymaterial
              this.group.add(this.citymodel);
          } } )
      },
      function ( progress ) {
          console.log( ( progress.loaded / progress.total * 100 ) + '% loaded' );
      },
      function ( error ) {
          console.log( 'An error happened loading the city model' );
      }
      );

      this.material = new window.THREE.MeshPhongMaterial({color:'#ffffff' ,transparent:true})
      this.material.opacity = 0.2
      this.material2 = new window.THREE.MeshPhongMaterial({color:'#04ceff' ,transparent:true})
      this.material2.opacity = 0.5

    this.group2 = new window.THREE.Group()

    for (let x=1;x<=55;x++){
      this.objLoader.load(`/models/${x}.obj`,( city )=> {
        city.traverse( ( node )=> {
            if ( node.isMesh ) {
                this.vidriotest[x] = node
                if(x<10) {this.vidriotest[x].name = `2800${x}`}
                else {this.vidriotest[x].name = `280${x}`}

                this.vidriotest[x].material = this.material
                this.group2.add(this.vidriotest[x]);
                if(x==55)this.group.add(this.group2)
            } } )
        },
        function ( progress ) {
            console.log( ( progress.loaded / progress.total * 100 ) + '% loaded' );
        },
        function ( error ) {
            console.log( 'An error happened loading the city model' );
        }
        );
    }


    




    //ADD CUBE
    // const geometry = new window.THREE.BoxGeometry(3, 3, 3)
    // 
    // 
    // this.cube = new window.THREE.Mesh(geometry, this.material)
    // this.cube2 = new window.THREE.Mesh(geometry, this.material)
    // this.cube.receiveShadow = true
    // this.cube2.receiveShadow = true
    // this.cube.name = "28023"
    // this.cube2.name = "28044"
    // this.cube2.position.x = -5

    
    this.scene.add(this.group,this.light,this.targetObject)

    this.raycaster = new window.THREE.Raycaster(); // create once
    this.mouse = new window.THREE.Vector2(); // create once  
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
        // this.cube.rotation.y += 0.02
        // this.cube2.rotation.y -= 0.03
        if(this.citymodel&&this.vidriotest)this.group.rotation.y -= 0.001
        this.renderScene()
        this.frameId = window.requestAnimationFrame(this.animate)
    }

    update = () => {


        console.log("entro")
        this.raycaster.setFromCamera( this.mouse, this.camera );
        console.log(this.scene.children)
        // console.log(this.group)
        this.intersects = this.raycaster.intersectObjects( this.group2.children )
        console.log(this.intersects)
        if(this.intersects.length>0){
          console.log(this.intersects[0].object.name)
        }

  
        
      if (this.intersects.length > 0) {
        // if the closest object intersected is not the currently stored intersection object
        if (this.intersects[0].object !== this.INTERSECTED) {
          // restore previous intersection object (if it exists) to its original color
          if (this.INTERSECTED) {
            console.log(this.INTERSECTED.position.y)
            this.INTERSECTED.position.y -= 0.03
            this.INTERSECTED.material = this.material
          }
            
          // store reference to closest object as current intersection object
          this.INTERSECTED = this.intersects[0].object;
          // store color of closest object (for later restoration)
          this.INTERSECTED.currentpositiony = this.INTERSECTED.position.y
          // set a new color for closest object
          this.INTERSECTED.material = this.material2
          this.INTERSECTED.position.y += 0.03
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
          <div className="canvas"
              style={{ margin: '0 auto' ,width: '100vw', height: '100vh' }}
              ref={(mount) => { this.mount = mount }}
              onMouseMove={this.onDocumentMouseMove}
          />
        </div>
        )
    }
}
export default ThreeScene