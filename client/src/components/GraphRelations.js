import React, { Component } from 'react'
import Service from '../services/generalservice'
import GeneralStats from './GeneralStats'
import {districts} from '../Districts'
import './Graph.css'
import SectionInfo from './SectionInfo';



const d3=window.d3
d3.chart = d3.chart || {};



export default class GraphRelations extends Component {

    constructor(){
      super()
      this.service = new Service()
      this.datasets = undefined
      this.selection = 1
      this.control = 0
      this.ziplist = undefined
      this.state = {
        current : null
      }
    }

    updateCurrent = (data) => {
      this.setState({current:data})
    }

    componentDidMount() {
      this.service.getZipStats()
      .then(response=>{
          this.ziplist = response
      })
      this.service.getZipRelations()
        .then(data=>{
          this.datasets=data
          this.drawChart(this.datasets[this.selection],this.control)
        })
      }
        
    drawChart(data,control) {
      let chart = this.dependencyWheel()
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

    changeData = (e,w)=>{
      e.preventDefault()

      if(w!==this.control){
        this.control=w
        window.d3.select('chart')
        .remove()
        this.drawChart(this.datasets[this.selection],this.control)
      }

      document.querySelectorAll('.btnX').forEach(e=>{
          e.classList="btnX"
      })
      e.currentTarget.classList.toggle('activeX')

    }
    

    dependencyWheel = (options)=>{
        const uptrick = this.updateCurrent
        var width = 700;
        var margin = 150;
        var padding = 0.02;

        function chart(selection,i) {
          selection.each(function(data) {
            var matrix
            if(i===0) matrix = data.matrixTxs;
            if(i===1) matrix = data.matrixAvg;
            if(i===2) matrix = data.matrixVolume;
            
            var packageNames = data.packageNames;
            var radius = width / 2 - margin;

            // create the layout
            var chord = d3.chord()
              .padAngle(padding)
              .sortSubgroups(d3.descending);

            // Select the svg element, if it exists.
            var svg = d3.select(this).selectAll("svg").data([data]);

            // Otherwise, create the skeletal chart.
            var gEnter = svg.enter().append("svg:svg")
              .attr("width", width)
              .attr("height", width)
              .attr("class", "dependencyWheel")
            .append("g")
              .attr("transform", "translate(" + (width / 2) + "," + (width / 2) + ")");

            var arc = d3.arc()
              .innerRadius(radius)
              .outerRadius(radius + 20);

            var fill = function(d) {
              return "hsl(" + ((d.index/150) * 360 +170) + ",60%,30%)";
            };

            // Returns an event handler for fading a given chord group.
            var fade = function(opacity) {
              return function(g, i) {
                gEnter.selectAll(".chord")
                    .filter(function(d) {
                      return d.source.index != i && d.target.index != i;
                    })
                  .transition()
                    .style("opacity", opacity);
                var groups = [];
                gEnter.selectAll(".chord")
                    .filter(function(d) {
                      if (d.source.index == i) {
                        groups.push(d.target.index);
                        uptrick(data.packageNames[d.source.index])
                      }
                      if (d.target.index == i) {
                        groups.push(d.source.index);
                      }
                    });
                groups.push(i);
                var length = groups.length;
                gEnter.selectAll('.group')
                    .filter(function(d) {
                      for (var i = 0; i < length; i++) {
                        if(groups[i] == d.index) return false;
                      }
                      return true;
                    })
                    .transition()
                      .style("opacity", opacity);
              };
            };

              var chordResult = chord(matrix);

              var rootGroup = chordResult.groups[0];
              var rotation = - (rootGroup.endAngle - rootGroup.startAngle) / 2 * (180 / Math.PI);

              var g = gEnter.selectAll("g.group")
                .data(chordResult.groups)
                .enter().append("svg:g")
                .attr("class", "group")
                .attr("transform", function(d) {
                  return "rotate(" + rotation + ")";
                });

              g.append("svg:path")
                .style("fill", fill)
                .style("stroke", fill)
                .attr("d", arc)
                .style("cursor", "pointer")
                .on("mouseover", fade(0.1))
                .on("mouseout", fade(0.8));

              g.append("svg:text")
                .each(function(d) { d.angle = (d.startAngle + d.endAngle) / 2; })
                .attr("dy", ".35em")
                .attr("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
                .attr("transform", function(d) {
                  return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")" +
                    "translate(" + (radius + 26) + ")" +
                    (d.angle > Math.PI ? "rotate(180)" : "");
                })
                .style("cursor", "pointer")
                .text(function(d) { return districts[d.index]; })
                .on("mouseover", fade(0.1))
                .on("mouseout", fade(0.8));

              gEnter.selectAll("path.chord")
                  .data(chordResult)
                  .enter().append("svg:path")
                  .attr("class", "chord")
                  .style("stroke", function(d) { return d3.rgb(fill(d.source)).darker(); })
                  .style("fill", function(d) { return fill(d.source); })
                  .attr("d", d3.ribbon().radius(radius))
                  .attr("transform", function(d) {
                    return "rotate(" + rotation + ")";
                  })
                  .style("opacity", 0.8);
            });
          }

            chart.width = function(value) {
              if (!arguments.length) return width;
              width = value;
              return chart;
            };

            chart.margin = function(value) {
              if (!arguments.length) return margin;
              margin = value;
              return chart;
            };

            chart.padding = function(value) {
              if (!arguments.length) return padding;
              padding = value;
              return chart;
            };

            return chart;
    }
 

        
    render(){
      let elementtoprint = undefined
      if(this.ziplist&&this.state.current){
        elementtoprint = this.ziplist.filter(e=>e.Zone===this.state.current)[0]
      }
      return (
      <div>
              <SectionInfo title="From where to where?" description="People spend their money mostly on their neighbourhood or anywhere else? Find the relations between areas playing with the chart."/>
              <GeneralStats element={elementtoprint}/>
              <div className="graphbuttonscontainer">
                <a  className="btnX activeX" onClick={(e)=>this.changeData(e,0)}>TRANSACTIONS</a><br></br>
                <a  className="btnX" onClick={(e)=>this.changeData(e,1)}>AVERAGE SPENT</a><br></br>
                <a  className="btnX" onClick={(e)=>this.changeData(e,2)}>TOTAL VOLUME</a>
              </div>
              <div className="filterlevel"><p>Filter level </p></div>
              <div className="graphbuttonscontainer2">
                <div class="radioSliderGroup">
                  <input onClick={()=>this.change(0)} type="radio" class="male" id="1" name="gender"/>
                  <input onClick={()=>this.change(1)} type="radio" class="female" id="2" name="gender"/>
                  <input onClick={()=>this.change(2)} type="radio" class="other" id="3" name="gender"/>  
                  <input onClick={()=>this.change(3)} type="radio" class="other2" id="4" name="gender"/> 
                  <label for="1">></label>
                  <label for="2">>></label>
                  <label for="3">>>></label>
                  <label for="4">>>>></label>
                  <div class="slider"></div>
                </div>    
              </div>
          <div className="testsvg" style={{width:"1000px"}}></div>
      </div>
      )
      }
}


