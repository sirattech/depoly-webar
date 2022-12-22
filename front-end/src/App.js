import React,{useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'mind-ar/dist/mindar-image.prod.js';
// import 'aframe';
// import 'mind-ar/dist/mindar-image-aframe.prod.js';
import './App.css';
import {
  Routes,
  Route,
} from "react-router-dom";
import SideBar from "./Component/SideBar/SideBar"
import Signup from './Component/Signup/Signup';
import Login from './Component/Login/Login';
import MyProject from "./Component/MyProject/MyProject"
import MyProfile from "./Component/my-profile/MyProfile"
import HomePage from "./Component/HomePage/HomePage";
import PrivateComponent from './Component/PrivateComponent/PrivateComponent';
import MindarViewer from './mindar-viewer';
import Preview from './Component/Preview/Preview';
import Publish from './Component/Publish/Publish';
import Congratulations from './Component/Congratulations/Congratulations';
import Hello from "./Component/hello/Hello"
function App() {
  let [data, setData] = useState("")
  console.log("data1111", data);

  const dataEdit =()=>{
    setData(data)
  }
  useEffect(()=>{
    console.log("data", data);
  },[])
  return (
    <div className="App">
      {/* <Pagination/> */}
      {/* <Congratulations/> */}
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route element={<PrivateComponent />}>
          
          <Route exact path='/sidebar' element={<SideBar />} >
            <Route path='Homepage' element={<HomePage />}>
            </Route>
              <Route path='preview' element={<div className="container121"><Preview/><video></video></div>}/>
              <Route path="publish" element={<Publish/>}/>
            <Route path='myproject' element={<MyProject />} />
            <Route path="myprofile" element={<MyProfile />} />
          </Route>
            
        </Route>
            <Route path="/mindar" element={<div className="container121"><MindarViewer /><video></video></div>} />
      </Routes>
      {/* <Hello/> */}
    

    </div>

  );
}

export default App;
