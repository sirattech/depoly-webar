import React, { useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Congratulations from '../Congratulations/Congratulations';
import "../Preview/Preview.css"
function Publish({setIsColor}) {
let navigate = useNavigate();

// useEffect(()=>{
//   setTimeout(()=>{
// navigate("/sidebar/myproject")
// setIsColor("My Project")}
//   },3000)
// })

useEffect(()=>{
setTimeout(()=>{
  setIsColor("My Project")
  navigate("/sidebar/myproject")
},3000)
},[])

  return (
    <div className='container'>
      <div className='row '>
        <div className='col-12'>
          <Congratulations/>
            {/* <h2 className='congratulations-h2'>Congratulations &#128525;</h2>
            <p className='Project-p'>Your Project Created Successfully</p>
            <h2 >Check Project details. Click on&nbsp;
                <Link to="/sidebar/myproject" onClick={() => setIsColor("My Project")}> 
                    My Projects 
                    </Link>
                    &nbsp;Button
                    </h2> */}
        </div>
        </div>
    </div>
  )
}

export default Publish