import React, { Component } from 'react'


import './Graph.css'



export default class GraphRelations extends Component {


    componentDidMount() {

        this.drawChart();
      }
        
    drawChart() {
        const data = {
            packageNames: ['ca', 'A', 'B','c','ww','ijik'],
            matrix: [[0, 1, 1,1,0,0], // Main depends on A and B
                     [0, 0, 1,0,0,1], // A depends on B
                     [0, 0, 0,1,1,0],
                     [0, 1, 1,1,2,4], // Main depends on A and B
                     [4, 0,1 ,0,1,1], // A depends on B
                     [0, 1, 0,1,1,0]
                    ] // B doesn't depend on A or Main
          };

        let chart = window.d3.chart.dependencyWheel()
        .width(900)    // also used for height, since the wheel is in a a square
        .margin(150)   // used to display package names
        .padding(.02);
        window.d3.select('.testsvg')
        .append("chart")
        .datum(data)
        .call(chart);



    }

 

        
    render(){
    return <div className="testsvg" id={"#" + this.props.id}></div>
    }
}


