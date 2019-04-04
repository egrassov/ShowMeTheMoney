import React, { Component } from 'react'
import './Calendar.scss'

let day,hour


export default class Calendar extends Component {
    constructor(props){
        super(props)
    }

  render() {
   
    switch(true){
        case this.props.counter<24:
            day="Sunday"; break;
        case this.props.counter>23&&this.props.counter<48:
            day="Monday"; break;
        case this.props.counter>47&&this.props.counter<72:
            day="Tuesday"; break;
        case this.props.counter>71&&this.props.counter<96:
            day="Wednesday" ; break;
        case this.props.counter>95&&this.props.counter<120:
            day="Thursday"; break;
        case this.props.counter>119&&this.props.counter<144:
            day="Friday"; break;
        case this.props.counter>143&&this.props.counter<168:
            day="Saturday"  ; break    
        default: break;          
    }
    hour = this.props.counter%24<10 ? "0"+this.props.counter%24 : ""+this.props.counter%24
    return (

        <div className="calendar">
            
            
<div class="clock">

  <div class="clock__minute"></div>
    
  <div class="clock__axis"></div>
    <section class="clock__indicator"></section>
    <section class="clock__indicator"></section>
    <section class="clock__indicator"></section>
    <section class="clock__indicator"></section>
    <section class="clock__indicator"></section>
    <section class="clock__indicator"></section>
    <section class="clock__indicator"></section>
    <section class="clock__indicator"></section>
    <section class="clock__indicator"></section>
    <section class="clock__indicator"></section>
    <section class="clock__indicator"></section>
    <section class="clock__indicator"></section>
    <section class="clock__indicator"></section>
    <section class="clock__indicator"></section>
    <section class="clock__indicator"></section>
    <section class="clock__indicator"></section>
    <section class="clock__indicator"></section>
    <section class="clock__indicator"></section>
    <section class="clock__indicator"></section>
    <section class="clock__indicator"></section>
    <section class="clock__indicator"></section>
    <section class="clock__indicator"></section>
    <section class="clock__indicator"></section>
    <section class="clock__indicator"></section>
    <section class="clock__indicator"></section>
    <section class="clock__indicator"></section>
    <section class="clock__indicator"></section>
    <section class="clock__indicator"></section>
    <section class="clock__indicator"></section>
    <section class="clock__indicator"></section>
    <section class="clock__indicator"></section>
    <section class="clock__indicator"></section>
    <section class="clock__indicator"></section>
    <section class="clock__indicator"></section>
    <section class="clock__indicator"></section>
    <section class="clock__indicator"></section>
    <section class="clock__indicator"></section>
    <section class="clock__indicator"></section>
    <section class="clock__indicator"></section>
    <section class="clock__indicator"></section>
    <section class="clock__indicator"></section>
    <section class="clock__indicator"></section>
    <section class="clock__indicator"></section>
    <section class="clock__indicator"></section>
    <section class="clock__indicator"></section>
    <section class="clock__indicator"></section>
    <section class="clock__indicator"></section>
    <section class="clock__indicator"></section>
    <section class="clock__indicator"></section>
    <section class="clock__indicator"></section>
    <section class="clock__indicator"></section>
    <section class="clock__indicator"></section>
    <section class="clock__indicator"></section>
    <section class="clock__indicator"></section>
    <section class="clock__indicator"></section>
    <section class="clock__indicator"></section>
    <section class="clock__indicator"></section>
    <section class="clock__indicator"></section>
    <section class="clock__indicator"></section>
    <section class="clock__indicator"></section>
</div>
<hr className="clockhr"></hr>
<div className="rightaligner">
<h4>{day}</h4>
<h4>{hour}.00h</h4>
</div>
        </div>
    )
  }
}






