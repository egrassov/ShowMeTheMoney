
import './Display.css';



import React from 'react'

export default function GeneralStats(props) {
    console.log(props)
    if(props.element){
        return (
            <div className="selection">
                <p className="minititle">ZIPCODE</p>
                <h1>{props.element.Zone}</h1>
                <hr></hr>
                <p className="minititle">MERCHANTS</p>
                <p className="content">{props.element.Merchants}</p>
                <p className="minititle"># CARDS</p>
                <p className="content">{props.element.Cards}</p>
                <p className="minititle"># TRANSACTIONS</p>
                <p className="content">{props.element.Txs}</p>
                <p className="minititle">PEAK / VALLEY DAYS</p>
                <p className="content">{props.element.Peakday} / {props.element.Valleyday}</p>
                <p className="minititle">PEAK / VALLEY HOURS</p>
                <p className="content">{props.element.Peakhour} / {props.element.Valleyhour}</p>
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

