import React from 'react'
import './SectionInfo.css'

export default function SectionInfo({title,description}) {
  return (
    <div className="info">
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  )
}
