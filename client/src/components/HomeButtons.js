import React, { Component } from 'react'
import './HomeButtons.css'

export default class HomeButtons extends Component {

    constructor(){
        super()
        this.active = undefined
    }

    toggle = (e)=>{
        e.preventDefault()
        document.querySelectorAll('.btn6').forEach(e=>{
            e.classList="btn6"
        })
        e.currentTarget.classList.toggle('active')
    }

    render() {
        return (
        <div className="butcontainer">
                <a href="#" onClick={e=>this.toggle(e)} class="btn6">MERCHANTS</a>
                <a href="#" onClick={e=>this.toggle(e)} class="btn6">TRANSACTIONS</a>
                <a href="#" onClick={e=>this.toggle(e)} class="btn6">CARDS</a>
        </div>
        )
    }
}
