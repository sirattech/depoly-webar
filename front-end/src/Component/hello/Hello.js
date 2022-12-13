import React from 'react'
import "./Hello.css"
function Hello() {
  return (
    <div>
    <div class="row d-flex ">
      <div class="col-lg-5">
        <h2>Open <b>multiple</b></h2>
        <div class="tabs">
          <div class="tab">
            <input type="checkbox" id="chck1"/>
            <label class="tab-label" for="chck1">Item 1</label>
            <div class="tab-content">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum, reiciendis!
            </div>
          </div>
          <div class="tab">
            <input type="checkbox" id="chck2"/>
            <label class="tab-label" for="chck2">Item 2</label>
            <div class="tab-content">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. A, in!
            </div>
          </div>
        </div>
      </div>
      
    </div></div>
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