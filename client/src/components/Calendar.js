import React from 'react'



export default function Calendar(props) {
    console.log(props.counter)
    let day,hour
    switch(true){
        case props.counter<24:
            day="Sunday"; break;
        case props.counter>23&&props.counter<48:
            day="Monday"; break;
        case props.counter>47&&props.counter<72:
            day="Tuesday"; break;
        case props.counter>71&&props.counter<96:
            day="Wednesday" ; break;
        case props.counter>95&&props.counter<120:
            day="Thursday"; break;
        case props.counter>119&&props.counter<144:
            day="Friday"; break;
        case props.counter>143&&props.counter<168:
            day="Saturday"  ; break              
    }
    hour = props.counter%24<10 ? "0"+props.counter%24 : ""+props.counter%24
    return (
        <div className="calendar">
            <h4>Day: {day}, Hour: {hour}.00h</h4>
        </div>
    )
}
