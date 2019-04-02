import React, { Component } from 'react'
import './About.css'
import { Link } from 'react-router-dom';

export default class About extends Component {
    constructor(){
        super()
        this.state = {
            currentselection : "xxx"
        }
    }

    render() {
        return (
        <div className="container">
            <h5>Show me the Money</h5>
            <ul className="aboutmenu"><li>Elements</li><li>Elements</li><li>Elements</li></ul>
            <div className="columns3">
                <h1 className="column1">Stories in money</h1>
                <div className="column">
                    <h3>Overview</h3><p>Spain's money is in Madrid</p><Link to={'/'}><span>View the data</span></Link>
                    <h3>Money is shaping up the city</h3><p>Typical week, hour by hour</p><Link to={'/byhours'}><span>View the data</span></Link>
                    <h3>From where to where?</h3><p>View how the money flows between different areas</p><Link to={'/graph'}><span>View the data</span></Link>
                    <h3>Consumption patterns</h3><p>When are we spending our money?</p><span>View the data</span>
                </div>
                <div className="column">
                    <h3>Something interesting</h3><span>View the data</span>
                    <h3>Something interesting</h3><span>View the data</span>
                    <h3>Something interesting</h3><span>View the data</span>
                    <h3>Something interesting</h3><span>View the data</span>
                </div>
                <Link to={'/'}>HOME</Link>
            </div>

        </div>
        )
    }
}
