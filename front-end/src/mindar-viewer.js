import React, { useEffect, useRef, useState } from 'react';
import "./mindar.css"
export default () => {
let query= new URLSearchParams(window.location.search);
console.log("query", query);
let link = query.get("link");
let mind = query.get("mind");
let TranslationURL = query.get("TranslationURL")
let radio = query.get("radio")
let radioone = query.get('videolimit')
let radioones = radioone *1000
console.log("radioone", radioones);
console.log("link", link);
console.log("mind", mind);
console.log("TranslationURL", TranslationURL);
console.log("radio", radio);
console.log("window.innerWidth", window.innerWidth);
const vidRef = useRef();
let [videoWidth, setVideoWidth] = useState();
let [videoHeight,setVideoHeight] = useState()
  const getPlay = async() => {
    console.log("window.innerWidth", window.innerWidth);
try{
  console.log("before");
  const video = vidRef.current;
  console.log("video", video);
  var myVideoPlayer = await document.querySelector('#vid')
  console.log("myVideoPlayer", myVideoPlayer);
 await myVideoPlayer.addEventListener('loadedmetadata', function () {
    
    console.log("duration", myVideoPlayer.duration);
    console.log("width: " + video.videoWidth + " " + "height: " + video.videoHeight);
});
setVideoWidth(video.videoWidth);
setVideoHeight(video.videoHeight)
// console.log("width: " + video.videoWidth + " " + "height: " + video.videoHeight);
var durations = myVideoPlayer.duration;
var durationss = durations * 1000
console.log("durationsss", durations);

  const sceneEl = document.querySelector('a-scene');
  sceneEl.addEventListener("arReady", (event) => {
    console.log("MindAR is ready", event)
  });
  console.log("sceneEl", sceneEl);
  const exampleTarget = document.querySelector('#example-target');
  exampleTarget.addEventListener("targetFound", event => {
    console.log("target found", event);
    if(radioone === "eov"){
      video.play()
      setTimeout(()=>{
         window.location.href = TranslationURL;
      },durationss )
      
      }else{
        video.play()
        setTimeout(() => {
         window.location.href = TranslationURL;
       }, radioones)
      }
  });
  console.log(exampleTarget);
  exampleTarget.addEventListener("targetLost", event => {
    console.log("target lost", event);
  });
}catch(e){
  console.log("e", e);
}
  }
console.log("videoWidth", videoWidth);
console.log("videoHeight", videoHeight);

  useEffect(() => {
    setTimeout(() => {
      getPlay();
      
    }, 3000);
    // handleLoadedMetadata()
  }, [])


  return (
      <a-scene mindar-image={`imageTargetSrc: ${mind}; maxTrack: 1; uiLoading:no; uiScanning:no;`}
        color-space="sRGB" renderer="colorManagement: false, physicallyCorrectLights" vr-mode-ui="enabled: false" device-orientation-permission-ui="enabled: false"

      >
        <a-assets>
          <video src={link}
            ref={vidRef}
            
            preload="auto" id="vid" response-type="arraybuffer" loop
            crossOrigin="true"  autoPlay muted playsInline style={{ zIndex: '200000000' }}
          >
          </video>
          {/* <img id="card" src="images/river.png" /> */}
          {/* <div className='d-flex justify-content-between'>
            <img id="cardone" src='images/sirat tech.png' width={20} />
            <img id="cardtwo" src='images/google-plus.png' width={20}/>
          <img id="cardthree" src='images/linkedin.png' width={20}/>
          </div> */}
        </a-assets>
        <a-camera position="0 0 0" look-controls="enabled: false" ></a-camera>
        <a-entity mindar-image-target="targetIndex: 0" id="example-target" timeout="50000">
          <a-video src="#vid" position={radio.replaceAll("_", " ")} height="0.50" width="0.75" rotation="0 0 0" scale="1 1 1" className="video-a" id="vido" timeout="50000"></a-video>

          {/* <a-image src="#card" position="0 -0.25 0" height="0.75" width="0.75" rotation="0 0 0"></a-image> */}
          {/* <a-image src="#card" position="0 -0.25 0" height="0.552" width="0.5" rotation="0 0 0"></a-image>
          <a-image src="#cardone" position="0 -0.650 0" height="0.252" width="0.2" rotation="0 0 0"></a-image> */}
          {/* <a-plane src="#cardtwo" position="0 -0.500 1.75" height="0.252" width="0.2" rotation="0 0 0"></a-plane>
        <a-plane src="#cardthree" position="0 -0.500 2.150" height="0.252" width="0.2" rotation="0 0 0"></a-plane> */}
        </a-entity>
        {/* <a-entity mindar-image-target="targetIndex: 1" id="example-target" timeout="50000">
        </a-entity > */}
      </a-scene>
  
  )
}


{/* <a-video src="#vid" position={radio.replaceAll("_", " ")} height="0.50" width="0.70" rotation="0 0 0" scale="1 1 1" className="video-a" id="vido" timeout="50000"></a-video> */}
// 
// {radio.replaceAll("_", " ")} 