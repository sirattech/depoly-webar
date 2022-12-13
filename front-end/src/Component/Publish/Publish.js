import React from 'react'
import { Link } from 'react-router-dom'
import "../Preview/Preview.css"
function Publish() {
  return (
    <div className='container'>
        <div className='col-12'>
            <h2 className='congratulations-h2'>Congratulations &#128525;</h2>
            <p className='Project-p'>Your Project Created Successfully</p>
            <h2 >Check Project details. Click on 
                {/* <Link to="/sidebar/myproject"> */}
                    My Projects Button
                    {/* </Link> */}
                    </h2>
        </div>

    </div>
  )
}

export default Publish