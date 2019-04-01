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
                    <h3>Something interesting</h3><span>View the data</span>
                    <h3>Something interesting</h3><span>View the data</span>
                    <h3>Something interesting</h3><span>View the data</span>
                    <h3>Something interesting</h3><span>View the data</span>
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
