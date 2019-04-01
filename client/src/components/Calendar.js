import React from 'react'



export default function Calendar({counter}) {
    let day,hour
    switch(true){
        case counter<24:
            day="Sunday"; break;
        case counter>23&&counter<48:
            day="Monday"; break;
        case counter>47&&counter<72:
            day="Tuesday"; break;
        case counter>71&&counter<96:
            day="Wednesday" ; break;
        case counter>95&&counter<120:
            day="Thursday"; break;
        case counter>119&&counter<144:
            day="Friday"; break;
        case counter>143&&counter<168:
            day="Saturday"  ; break    
        default: break;          
    }
    hour = counter%24<10 ? "0"+counter%24 : ""+counter%24
    return (
        <div className="calendar">
            <h4>Day: {day}, Hour: {hour}.00h</h4>
        </div>
    )
}
