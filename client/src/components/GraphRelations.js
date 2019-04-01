import React, { Component } from 'react'
import * as d3 from "d3";

import './Graph.css'



export default class GraphRelations extends Component {


    componentDidMount() {

        this.drawChart();
      }
        
    drawChart() {
        const data = [
            [11975,  5871, 8916, 2868],
            [ 1951, 10048, 20060, 6171],
            [ 8010, 16145, 8090, 8045],
            [ 1013,   990,  940, 6907]
        ]


        const formatValue = d3.formatPrefix(",.0", 1e3)  
  
        const outerRadius = Math.min(660, 660) * 0.5 - 30
    
        const innerRadius = outerRadius - 20
    

        this.chord = d3.chord()
        .padAngle(0.05)
        .sortSubgroups(d3.descending)

        const arc = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)

        const ribbon = d3.ribbon()
        .radius(innerRadius)

        const color = d3.scaleOrdinal()
        .domain(d3.range(4))
        .range(["#FF0000", "#FFDD89", "#957244", "#F26223"])

        const svg = d3.select(".testsvg")
            .append("svg")
            .attr("viewBox", [-660 / 2, -660 / 2, 660, 660])
            .attr("font-size", 10)
            .attr("font-color", "#FFFFFF")
            .attr("font-family", "sans-serif");

        const chords = this.chord(data);    
    
        const group = svg.append("g")
        .selectAll("g")
        .data(chords.groups)
        .join("g");

        group.append("path")
        .attr("fill", d => color(d.index))
        .attr("stroke", d => d3.rgb(color(d.index)).darker())
        .attr("d", arc);

        const groupTick = group.append("g")
            .selectAll("g")
            .data(d => this.groupTicks(d, 1e3))
            .join("g")
            .attr("transform", d => `rotate(${d.angle * 180 / Math.PI - 90}) translate(${outerRadius},0)`);

        groupTick.append("line")
            .attr("stroke", "#000")
            .attr("x2", 6);

        groupTick
            .filter(d => d.value % 5e3 === 0)
            .append("text")
            .attr("x", 8)
            .attr("dy", ".35em")
            .attr("transform", d => d.angle > Math.PI ? "rotate(180) translate(-16)" : null)
            .attr("text-anchor", d => d.angle > Math.PI ? "end" : null)
            .text(d => formatValue(d.value));

        svg.append("g")
            .attr("fill-opacity", 0.67)
            .selectAll("path")
            .data(chords)
            .join("path")
            .attr("d", ribbon)
            .attr("fill", d => color(d.target.index))
            .attr("stroke", d => d3.rgb(color(d.target.index)).darker());

    }

    groupTicks(d, step) {
        const k = (d.endAngle - d.startAngle) / d.value;
        return d3.range(0, d.value, step).map(value => {
          return {value: value, angle: value * k + d.startAngle};
        });
      }



    


        
    render(){
    return <div className="testsvg" id={"#" + this.props.id}></div>
    }
}


