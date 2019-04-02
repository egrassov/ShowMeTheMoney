import React from 'react'
import { Link } from 'react-router-dom';

import './Card.css'

export default function Card({title,toggle,way}) {
  return (
    <div className="story">
      <h2>{title}</h2><Link className="link" onClick={toggle} to={way}><span>View the data</span></Link>
    </div>
  )
}
