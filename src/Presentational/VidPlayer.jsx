import React from 'react'
import { useLocation } from "react-router-dom"

const VidPlayer = () => {
    const location = useLocation()
    console.log(location)
    const fromDashboard = location.state?.fromDashboard
    console.log(fromDashboard)
    
  return (

    <div>vidPlayer</div>
  )
}

export default VidPlayer