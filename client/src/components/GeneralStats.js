
import './Display.css';



import React from 'react'

export default function GeneralStats(props) {
    console.log(props)
    if(props.element){
        return (
            <div className="selection full">
                <p className="sectitle">ZIPCODE</p>
                <h1>{props.element.Zone}</h1>
                <hr></hr>
                <p className="sectitle">MERCHANTS</p>
                <p className="content">{props.element.Merchants}</p>
                <p className="sectitle"># CARDS</p>
                <p className="content">{props.element.Cards}</p>
                <p className="sectitle"># TRANSACTIONS</p>
                <p className="content">{props.element.Txs}</p>
                <p className="sectitle">PEAK / VALLEY DAYS</p>
                <p className="content">{props.element.Peakday} / {props.element.Valleyday}</p>
                <p className="sectitle">PEAK / VALLEY HOURS</p>
                <p className="content">{props.element.Peakhour}.00h / {props.element.Valleyhour}.00h</p>
                <p></p>
            </div>
            )
    } else {
        return (
            <div className="selection">
            </div>
        )
    }

}

