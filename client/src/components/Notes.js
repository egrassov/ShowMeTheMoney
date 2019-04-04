import React from 'react'
import './Notes.css'

export default function Notes(props) {
    console.log(props.category)
    let text = ""
    switch(props.category){
        case "Cards":
            text = "As expected, City centre and the airport concentrate the maximum number of different cards used in purchases"; break;
        case "Transactions":
            text = "Close to Merchants metrics, City Centre holds the main economic activity"; break;
        case "Merchants":
            text = "City Centre is where most shops and restaurants carry on their activities"; break;
        default: break;
    }
    return (
        <div className="notes">
        <p>{text}</p>
        </div>
    )
}
