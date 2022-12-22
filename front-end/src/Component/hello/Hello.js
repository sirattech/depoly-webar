import React, { useEffect, useState } from 'react'
import "./Hello.css";
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom"
import { BACKEND_URI, LOCAL_URL } from "../../config/config"
function Hello() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  let [totalProject, setTotalProject] = useState();
  let [projectName, setProjectName] = useState([]);
  let [getStatus, setGetStatus] = useState([])
  let [status, setStatus] = useState(1);

  const params = useParams();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  let auth = localStorage.getItem("webar")
  let auths = JSON.parse(auth)
  let addressAuths = auths.IdAddress;
  // console.log("auths", auths);
  const StatusData = async () => {
    try {

      await axios.get(`${BACKEND_URI}/getdata`).then((resp) => {
        let statusShow = []
        let projectnames = []
        for (var i = 0; i < resp.data.length; i++) {
          // console.log(resp.data[i]);
          if (resp.data[i].webardata.ids == auths.IdAddress) {
            // console.log("res1", resp.data[i].webardata.editData);
            let statusData = resp.data[i]

            // setProjectName([resp.data[i].webardata.editData])
            console.log("statusData",statusData.webardata.status);
            if(statusData.webardata.status == "0"){
              projectnames.push(resp.data[i])
              statusShow.push(statusData)
            } else{
              projectnames.push()
              statusShow.push()
            }
            
          }
        }
        setTotalProject(statusShow.length)
        setProjectName(projectnames)
      })
    } catch (e) {
      console.log("e", e);
    }
  }

// console.log("totalProject", totalProject);
  // const getsingleItem = async (id) => {
    
  // }



  const ProjectId = async (id) => {
  
    
    await axios.put(`${BACKEND_URI}/notification/${id}`,{status}).then((res) => {
      console.log("res", res);
    })
 window.location.reload(true)

  }

  useEffect(() => {
    StatusData()

  }, [])
  // useEffect(() => {
  //   getsingleItem()
  // }, [])
  // console.log("totalProjectaa", totalProject);
  // console.log("projectName", projectName);
  return (
    <div>
      <div class="row d-flex ">

        <Badge
          aria-describedby={id}
          onClick={handleClick}
          badgeContent={totalProject}
          color="primary"><NotificationsIcon style={{ color: '#0e1a35' }} /> </Badge>

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Typography sx={{ p: 2 }}>
            {projectName.map((items) => {
              return (
                <div key={items._id}>
                  <h5 className='created-h5 pt-2 pb-2 ps-2' onClick={() => ProjectId(items._id)}>{items.webardata.editData} has been Created Successfully
                  </h5>
                </div>
              )
            })}
          </Typography>
        </Popover>
      </div>
    </div>
  )
}

export default Hello






















// import React, {useState,} from 'react'
// import QRCode from 'qrcode'
// function Hello() {
//   const [url, setUrl] = useState('')
// 	const [qr, setQr] = useState('')

// 	const GenerateQRCode = () => {
// 		QRCode.toDataURL(url, {
// 			width: 400,
// 			margin: 2,
// 			color: {
// 				dark: '#335383FF',
// 				light: '#EEEEEEFF'
// 			}
// 		}, (err, url) => {
// 			if (err) return console.error(err)

// 			console.log(url)
// 			setQr(url)
// 		})
// 	}
//   return (
//     <div >
// 			<h1>QR Generator</h1>
// 			<input
//       style={{border: '2px solid red'}}
// 				type="text"
// 				placeholder="e.g. https://google.com"
// 				value={url}
// 				onChange={e => setUrl(e.target.value)} />
// 			<button onClick={GenerateQRCode}>Generate</button>
// 			{qr && <>
// 				<img src={qr} />
// 				<a href={qr} download="qrcode.png">Download</a>
// 			</>}
// 		</div>
//   )
// }

// export default Hello














// import React, {useRef,useState,useEffect} from 'react'
// import {AFrameRenderer, Marker} from "react-web-ar"
// function Hello() {
//   const inputRef = React.useRef();

//   const [source, setSource] = React.useState();

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     const url = URL.createObjectURL(file);
//     setSource(url);
//   };

//   const handleChoose = (event) => {
//     inputRef.current.click();
//   };
//   return (
//     <>
//     <div className="VideoInput">
//       <input
//         ref={inputRef}
//         className="VideoInput_input"
//         type="file"
//         onChange={handleFileChange}
//         accept=".mov,.mp4"
//       />
//       {!source && <button onClick={handleChoose}>Choose</button>}
//       {source && (
//         <video
//           className="VideoInput_video"
//           width="100%"
//           height={"100%"}
//           controls
//           src={source}
//         />
//       )}
//       <div className="VideoInput_footer">{source || "Nothing selectd"}</div>
//     </div>
//     </>
//   )
// }

// export default Hello