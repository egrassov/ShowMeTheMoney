import './SideBar.css'

import React from 'react';
import { Link } from 'react-router-dom';


export default function SideBar() {
  return (
    <div className="sidebar">
      <h2>Show<br/>me<br/>the<br/>Money</h2>
      <Link to={`/byhours`}>BYHOURS</Link>
    </div>
  )
}
