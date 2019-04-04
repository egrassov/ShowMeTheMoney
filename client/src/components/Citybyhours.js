import React, { Component } from 'react'


import Service from '../services/generalservice'
import Calendar from './Calendar';
import SectionInfo from './SectionInfo';







class CitybyHours extends Component{

  constructor(){
    super()
    this.running = false
    this.service = new Service()
    this.txslist = undefined
    this.state = {
        counter:0
    }
    this.objLoader = new window.THREE.OBJLoader()
    this.textureLoader = new window.THREE.TextureLoader()
  }

  getTxsbyHours = () => {
    this.service.getCitybyHours()
    .then(response=>{
        this.txslist = response
    })
  }

  componentDidMount(){
    this.getTxsbyHours()
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

    this.light = new window.THREE.DirectionalLight( 0xdddddd, 1.5 )
    this.light.position.set( -10, 10, -10 )

    this.targetObject = new window.THREE.Object3D();
    this.targetObject.position.set(0,0,0)
    this.light.target = this.targetObject

    this.camera.position.y = 2.2
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

    this.material = []

    this.group2 = new window.THREE.Group()

    for (let x=1;x<=55;x++){
      this.objLoader.load(`/models/${x}.obj`,( city )=> {
        city.traverse( ( node )=> {
            if ( node.isMesh ) {
                this.vidriotest[x] = node
                this.material[x] = new window.THREE.MeshPhongMaterial({color:`hsl(200,50%,70%)` ,opacity: 0.4, transparent:true})
                if(x<10) {this.vidriotest[x].name = `2800${x}`}
                else {this.vidriotest[x].name = `280${x}`}

                this.vidriotest[x].material = this.material[x]
                this.group2.add(this.vidriotest[x]);
                if(x===55)this.group.add(this.group2)
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


    
    this.scene.add(this.group,this.light,this.targetObject)



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


    animate = () => {
        this.renderScene()
        this.frameId = window.requestAnimationFrame(this.animate)
    }



    renderScene = () => {
        this.renderer.render(this.scene, this.camera)
    }

    initMagic = () => {
        if(this.txslist&&!this.running){
            this.running = true
            document.querySelector(".clock__minute").style.setProperty("animation-play-state", "running")
            document.querySelector("#control").innerHTML="STOP"
            document.querySelector("#control").classList.toggle('stop')
            this.interval = setInterval(()=>{
                for(let i=1; i<55; i++){
                    this.material[i].opacity = (this.txslist[i-1][this.state.counter]/3000)>=0.9 ? 0.9 : (this.txslist[i-1][this.state.counter]/3000+0.4)
                    this.vidriotest[i].position.y = this.txslist[i-1][this.state.counter]/10000
                    this.material[i].color = new window.THREE.Color(`hsl(${this.txslist[i-1][this.state.counter]/7000*360+200}, 50%, 70%)`);
                }
                this.state.counter===167? this.setState({counter:0}) : this.setState({counter:this.state.counter+1})
            },100)
        } else {
            this.running = false
            clearInterval(this.interval)
            document.querySelector(".clock__minute").style.setProperty("animation-play-state", "paused")
            document.querySelector("#control").innerHTML="START"
            document.querySelector("#control").classList.toggle('stop')
        }

    }

    render(){

        return(
        <div>
          <SectionInfo title="Money is shaping up the city" description="Day by day, hour by hour. Amount of transactions for each area. Click the start button and bring life to the city."/>
          <div className="timercontainer"><a id="control" className="btn10" onClick={this.initMagic}>START</a></div>
          <Calendar counter={this.state.counter} />
          <div className="canvas"
              style={{ margin: '0 auto' ,width: '100vw', height: '100vh' }}
              ref={(mount) => { this.mount = mount }}
              onMouseMove={this.onDocumentMouseMove}
          />
        </div>
        )
    }
}
export default CitybyHours