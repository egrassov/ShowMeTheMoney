import './SideBar.css'

import React, { Component } from 'react'

import burger from './menu.svg'
import back from './right-arrow.svg'
import Card from './Card';




export default class SideBar extends Component {

  toggle = ()=>{
    document.querySelector('.menu').classList.toggle('open')
  }

  toggleX = (e)=>{
    e.preventDefault()
    document.querySelector('.menu').classList.toggle('open')
}

  render() {
    return (
      <div className="menu">
        <div className="container">
              <h2 className="minititle">Show me <br></br>the Money</h2>
              {/* <ul className="aboutmenu"><li>Elements</li><li>Elements</li><li>Elements</li></ul> */}
              <div className="columns3">
                  <h1 className="column1">Stories in money</h1>
                  <div className="column">
                      <Card title="Overview" toggle={this.toggle} way='/' />
                      <Card title="Money is shaping up the city" toggle={this.toggle} way='/byhours' />
                      <Card title="From where to where?" toggle={this.toggle} way='/relations' />
                      <Card title="Consumption patterns" toggle={this.toggle} way='/relations' />
                  </div>
                  <div className="column">
                      <Card title="Overview" toggle={this.toggle} way='/' />
                      <Card title="Money is shaping up the city" toggle={this.toggle} way='/byhours' />
                      <Card title="From where to where?" toggle={this.toggle} way='/relations' />
                      <Card title="Consumption patterns" toggle={this.toggle} way='/relations' />
                  </div>
              </div>
        </div>
        <div className="sidebarvisible">
          <a href="" className="burger" onClick={(e)=>this.toggleX(e)}><img src={back} /></a>
        </div>
        <div className="sidebar">
          <h2>Show<br/>me<br/>the<br/>Money</h2>
          <a href="" className="burger" onClick={(e)=>this.toggleX(e)}><img src={burger} /></a>
        </div>
      </div>
    )
  }
}


