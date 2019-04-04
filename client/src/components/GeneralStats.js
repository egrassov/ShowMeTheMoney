import {districts} from '../Districts'
import './Display.css';



import React from 'react'

export default function GeneralStats(props) {
    
    if(props.element){
        let title = districts[((parseInt(props.element.Zone)%100)-1)]
        return (
            <div className="selection full">
                <h3>{title}</h3>
                <h1>{props.element.Zone}</h1>
                <hr className="specialhr"></hr>
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

