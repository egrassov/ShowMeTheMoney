import React, { Component } from 'react'
import Service from '../services/generalservice'


import './Graph.css'



export default class GraphRelations extends Component {

    constructor(){
      super()
      this.service = new Service()
      this.datasets = undefined
      this.selection = 1
      this.control = 0
    }

    componentDidMount() {
      this.service.getZipRelations()
        .then(data=>{
          this.datasets=data
          this.drawChart(this.datasets[this.selection],this.control)
        })
      }
        
    drawChart(data,control) {
      let chart = window.d3.chart.dependencyWheel()
      .width(900)    // also used for height, since the wheel is in a a square
      .margin(150)   // used to display package names
      .padding(.02);
      window.d3.select('.testsvg')
      .append("chart")
      .datum(data)
      .call(chart,control);

    }

    change = (w)=>{
      if(w!==this.selection){
        this.selection=w
        window.d3.select('chart')
        .remove()
        this.drawChart(this.datasets[this.selection],this.control)
      }
    }

    changeData = (w)=>{
      if(w!==this.control){
        this.control=w
        window.d3.select('chart')
        .remove()
        this.drawChart(this.datasets[this.selection],this.control)
      }
    }
    

 

        
    render(){
    return <div className="testsvg" id={"#" + this.props.id}>
            <div className="buttons">
              <button onClick={()=>this.change(0)}>Full</button>
              <button onClick={()=>this.change(1)}>> 500</button>
              <button onClick={()=>this.change(2)}>> 1000</button>
              <button onClick={()=>this.change(3)}>> 1500</button>
              <hr style={{width:"100px", border:"1px solid white"}}></hr>
              <button onClick={()=>this.changeData(0)}>By Transactions</button>
              <button onClick={()=>this.changeData(1)}>By Average Amount Spent</button>
              <button onClick={()=>this.changeData(2)}>By Volume</button>
            </div>
          </div>
    }
}


