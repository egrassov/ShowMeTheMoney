
import './Display.css';



import React from 'react'

export default function GeneralStats(props) {
    console.log(props)
    if(props.element){
        return (
            <div className="selection">
                <h1>{props.element.Zone}</h1>
                <p>{props.element.Merchants}</p>
            </div>
            )
    } else {
        return (
            <div className="selection">
                <h1>Toy vacio</h1>
            </div>
        )
    }

}

