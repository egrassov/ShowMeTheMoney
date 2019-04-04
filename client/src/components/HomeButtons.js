import React, { Component } from 'react'
import './HomeButtons.css'

export default class HomeButtons extends Component {

    constructor(props){
        super(props)
        this.active = undefined
    }

    toggle = (e)=>{
        e.preventDefault()
        if(e.currentTarget.classList.contains("active")) e.currentTarget.classList.toggle('active')
        else{
            document.querySelectorAll('.btn6').forEach(e=>{
                e.classList="btn6"
            })
            e.currentTarget.classList.toggle('active')
        }
        this.active=undefined
        document.querySelectorAll('.btn6').forEach(e=>{
            if(e.classList.contains("active")) this.active=e.innerText
        })
        console.log(this.active)
        this.props.method(this.active)
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
