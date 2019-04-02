import './SideBar.css'

import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import burger from './menu.svg'

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
              <h5>Show me the Money</h5>
              <ul className="aboutmenu"><li>Elements</li><li>Elements</li><li>Elements</li></ul>
              <div className="columns3">
                  <h1 className="column1">Stories in money</h1>
                  <div className="column">
                      <h3>Overview</h3><p>Spain's money is in Madrid</p><Link onClick={this.toggle} to={'/'}><span>View the data</span></Link>
                      <h3>Money is shaping up the city</h3><p>Typical week, hour by hour</p><Link onClick={this.toggle} to={'/byhours'}><span>View the data</span></Link>
                      <h3>From where to where?</h3><p>View how the money flows between different areas</p><Link onClick={this.toggle} to={'/graph'}><span>View the data</span></Link>
                      <h3>Consumption patterns</h3><p>When are we spending our money?</p><span>View the data</span>
                  </div>
                  <div className="column">
                      <h3>Something interesting</h3><span>View the data</span>
                      <h3>Something interesting</h3><span>View the data</span>
                      <h3>Something interesting</h3><span>View the data</span>
                      <h3>Something interesting</h3><span>View the data</span>
                  </div>
        </div>

        </div>
        <div className="sidebar">
          <h2>Show<br/>me<br/>the<br/>Money</h2>
          <a href="" className="burger" onClick={(e)=>this.toggleX(e)}><img src={burger} /></a>
        </div>
      </div>
    )
  }
}


