import './Series.css'

import React, { Component } from 'react';
import CanvasJSReact from './assets/canvasjs.react';
import Service from '../services/generalservice'


var CanvasJSChart = CanvasJSReact.CanvasJSChart;


var testing = []
for (let i=0; i<168; i++){
	testing.push({x:i,y:Math.random()*1000})
}
 
class MultiSeriesAreaChart extends Component {

	constructor() {
		super()
		this.service = new Service()
    	this.txslist = []
		this.state = {
			data : []
		}
	}
	start = ()=>{
		this.setState({data:this.txslist})
	}

	getTxsbyHours = () => {
		this.service.getTxsforCompare()
		.then(response=>{
			response.forEach((e,i)=>{
				this.txslist.push({name:i,fillOpacity:0.05 ,type:"area",dataPoints:e})
			})
			this.start()
		})
	}

	test = (e) => {
		console.log(e)
	}

	componentDidMount(){
		this.getTxsbyHours()
	}


	render() {
		console.log(this.state.data)
		if(this.txslist)console.log(this.txslist[0])
		const options = {
			theme: "light1",
			animationEnabled: true,
			animationDuration: 7000,
			backgroundColor: "rgba(0,0,0,0)",
			axisX:{
				interval: 24,
				intervalType: "month",
			  },
			axisY:{
				gridColor: "rgba(0,0,0,0)",
				labelFontColor: "rgb(200,200,200)"
			}  ,

			toolTip: {
				shared: true
			},
			data: this.state.data
		}
		
		return (
		<div className="testchart">
			<CanvasJSChart  options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default MultiSeriesAreaChart;