import React from 'react'
import { Link } from 'react-router-dom'
import "../Preview/Preview.css"
function Publish({setIsColor}) {
  return (
    <div className='container'>
        <div className='col-12'>
            <h2 className='congratulations-h2'>Congratulations &#128525;</h2>
            <p className='Project-p'>Your Project Created Successfully</p>
            <h2 >Check Project details. Click on&nbsp;
                <Link to="/sidebar/myproject" onClick={() => setIsColor("My Project")}> 
                    My Projects 
                    </Link>
                    &nbsp;Button
                    </h2>
        </div>

    </div>
  )
}

export default Publish