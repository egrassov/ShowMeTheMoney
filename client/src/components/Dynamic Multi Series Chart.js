import React, { Component } from 'react';
import CanvasJSReact from './assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;



var dataPoints1 = [];
var dataPoints2 = [];
var dataPoints3 = [];

var updateInterval = 500;
//initial values
var yValue1 = 408;
var yValue2 = 350;
var yValue3 = 380;

var xValue = 5;
class DynamicMultiSeriesChart extends Component {
	constructor() {
		super();
		this.updateChart = this.updateChart.bind(this);		
	}
	start(){
		this.updateChart(5);
		this.timer = setInterval(this.updateChart, updateInterval);
	}
	
	updateChart(count) {
		count = count || 1;		
		for (var i = 0; i < count; i++) {
			xValue += 2;
			yValue1 = Math.floor(Math.random()*(408-400+1)+400);
			yValue2 = Math.floor(Math.random()*(350-340+1)+340);
			yValue3 = Math.floor(Math.random()*(350-340+1)+370);
			dataPoints1.push({
			  x: xValue,
			  y: yValue1
			});
			dataPoints2.push({
			  x: xValue,
			  y: yValue2
			});
			dataPoints3.push({
				x: xValue,
				y: yValue3
			  });
		}
		this.chart.options.data[0].legendText = " Bugatti Veyron - " + yValue1 + " km/h";
		this.chart.options.data[1].legendText = " Lamborghini Aventador - " + yValue2 + " km/h";
		this.chart.options.data[2].legendText = " Ford Focus - " + yValue3 + " km/h";
		this.chart.render();
	}

	componentWillUnmount(){
		clearInterval(this.timer)
	}
	render() {
		const options = {
			zoomEnabled: true,
			theme: "light1",
			backgroundColor: "#161319",
			title: {
				text: "Speed of Bugatti vs Lamborghini"
			},
			axisX: {
				title: "chart updates every 2 secs"
			},
			axisY:{
				suffix: " km/h",
				includeZero: false
			},
			toolTip: {
				shared: true
			},
			legend: {
				cursor:"pointer",
				verticalAlign: "top",
				fontSize: 18,
				fontColor: "dimGrey",
				itemclick : function(e){
					if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
						e.dataSeries.visible = false;
					}
					else {
						e.dataSeries.visible = true;
					}
					e.chart.render();
				}
			},
			data: [
				{
					type: "stepLine",
					xValueFormatString: "#,##0 seconds",
					yValueFormatString: "#,##0 km/h",
					showInLegend: true,
					name: "Bugatti Veyron",
					dataPoints: dataPoints1
				},
				{
					type: "stepLine",
					xValueFormatString: "#,##0 seconds",
					yValueFormatString: "#,##0 km/h",
					showInLegend: true,
					name: "Lamborghini Aventador" ,
					dataPoints: dataPoints2
				},
				{
					type: "stepLine",
					xValueFormatString: "#,##0 seconds",
					yValueFormatString: "#,##0 km/h",
					showInLegend: true,
					name: "Lamborghini Ford Focus" ,
					dataPoints: dataPoints3
				}
			]
		}
		
		return (
		<div>
			<button onClick={()=>this.start()}>Start</button>
			<CanvasJSChart options = {options} 
				onRef={ref => this.chart = ref}
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default DynamicMultiSeriesChart;