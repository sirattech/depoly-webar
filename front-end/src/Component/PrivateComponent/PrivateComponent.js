import React from 'react'
import {Outlet, Navigate} from "react-router-dom"
function PrivateComponent() {
    const auth = localStorage.getItem("webar")
  return (
    <div>
        {auth ? <Outlet/> : <Navigate to="/"/>}
    </div>
  )
}

export default PrivateComponent