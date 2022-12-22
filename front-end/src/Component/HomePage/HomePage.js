import React, { useRef, useState, useEffect } from 'react'
import "./HomePage.css"
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom"
import { BACKEND_URI } from "../../config/config"
import Spinner from 'react-bootstrap/Spinner';

function HomePage({ editData, isNavColor }) {
    const inputRef = useRef();
    const inputImageRef = useRef()
    const [source, setSource] = useState();
    const [imageSource, setImageSource] = useState()
    const [radio, setRadio] = useState('false')
    const [radioOne, setRadioOne] = useState("false");
    const [TranslationURL, setTranslationURL] = useState("");
    const [error,setError] = useState(false)
    const [value, setValue] = useState(0)
    let secondvalue = useRef(0)
    let [image, setimage] = useState("")
    const [ids, setIds] = useState();
    const [getUerId, SetGetUserId] = useState()
    const [getVideoName, setGetVideoName] = useState()
    let [status,setState] = useState(0)
    const navigate = useNavigate()
    const [spinners, setSpinners] = useState(false)
    const handleMind = (e) => {
        let filess = e.target.files[0]
        console.log(filess);
        setImageSource(filess)
    }
    const handleFileChange = (event) => {
        let file = event.target.files[0];
        setSource(file);
    };
    const handleRadio = (e) => {
        setRadio(e.target.value)
    }
    const handleChange = (e) => {
        let filess = e.target.files[0]
        console.log(filess);
        setimage(filess)
    }
    useEffect(() => {
        let auth = localStorage.getItem("webar")
        let auths = JSON.parse(auth)
        setIds(auths.IdAddress)
        console.log("auths", ids);
    }, [])
    const handleRadioOne = async (e) => {
        console.log(value);
        if (e.target.id == 'Second') {
            if (value < 10) {
                await setValue(value + 5)

                setRadioOne(e.target.value)
            } else if (value == 10) {
                await setValue(value - 5)

                setRadioOne(e.target.value)
            }
        } else {
            setRadioOne(e.target.value)
        }
    }
    const GenerateQRCode = async (e) => {

        // navigate("/sidebar/preview")

        try {
            setSpinners(true)
            
            let eventTarget = document.getElementById("projectName")
            if( !editData){
                setError(true)
                setSpinners(false)
                alert("please Fill project Name in TopBar")
                eventTarget.style.border ="2px solid red"
                return false
            }
            const minddata = new FormData();
            minddata.append("mind", imageSource)

            await axios.post(`${BACKEND_URI}/mindfile`, minddata, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Access-Control-Allow-Origin': '*',
                }
            }).then((res) => {
                console.log("minddata", res.data.filename);

                SetGetUserId(res.data.filename);
            }).catch((e) => {
                console.log("e", e);
            })

            const imagedata = new FormData();
            imagedata.append("image", image);

            await axios.post(`${BACKEND_URI}/imageupload`, imagedata, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Access-Control-Allow-Origin': '*',
                }
            }).then((res) => {
                console.log(res);

            }).catch((e) => {
                console.log("e", e);
            })
            const data = new FormData()
            data.append("file", source);
            await axios.post(`${BACKEND_URI}/upload`, data).then((res) => {
                console.log("resaaa", res.data.filename);
                setGetVideoName(res.data.filename)

            }).catch((e) => {
                console.log("e", e);
            })
           
            
           
             
            await axios.post(`${BACKEND_URI}/data`, {
                radio,
                TranslationURL,
                radioOne,
                ids,
                editData,
                status,
            }).then(res => {
                console.log("ressetCheckBoxValue", res.data);
                console.log(res.data);
                let checkdata = res.data.webardata.TranslationURL
                let chexk = res.data.webardata.radioOne;
                let check = res.data.webardata.radio;
                let editDAtessss = res.data.webardata.editData;
                let dataget = res.data.dataget;
                let filetoupload = res.data.filetoupload;

                if (checkdata && chexk && check && dataget && filetoupload, editDAtessss) {
                    setSpinners(false)
                    localStorage.setItem("total data", JSON.stringify(res.data))
                    // isNavColor("Preview")
                    navigate("/sidebar/preview")
                    toast.success("Please Fill All input Feild")
                }

            })
                .catch((err) => {
                    console.log(err);
                });
        } catch (e) {
            console.log("e", e);
        }
    }
    // console.log("homedata", editData);
    // console.log("auths", ids);

    return (
        <div className='container' style={{ maxHeight: '100vh' }} >
            {/* <form onSubmit={handlesubmit} method="post" action='/data'> */}
            <div className='row '>
                <div className='col-12 text-start'>
                    <h5 className='video-h5'>Your Video</h5>
                </div>
            </div>
            <div className='row ms-md-5'>

                <div className='col-lg-6 col-11 text-start' >

                    <div className="VideoInput mt-3">
                        <label className='YouTube-p text-start form-label'>Upload Video</label><br />
                        <input
                            ref={inputRef}
                            className="VideoInput_input form-control"
                            type="file"
                            onChange={handleFileChange}
                            required
                        />
                    </div>
                </div>
            </div>

            <div className='row mt-4'>
                <div className='col-12 text-start'>
                    <h5 className='video-h5'>Your Maker</h5>
                </div>
            </div>
            <div className='row'>
                <div className='col-12 mt-3'>
                    <h5 className="YouTube-p text-start form-label ms-5 mt-3">Convert image to Mind File</h5>
                </div>
                <div className='col-md-2 col-11 ms-md-5 text-start mt-3'>
                    <button className='btn btn-upload'><a href='https://projects.sirattech.com/mind-ar-js-master/examples/image-tracking/compile.html' style={{ textDecoration: "none", color: "white" }} target="_blank">Image Compiler</a></button>
                </div>
            </div>

            <div className='row mt-3 ms-md-5'>
                <div className="col-lg-6 VideoInput mt-3 text-start">


                    <label className='YouTube-p text-start form-label'>Upload Mind File</label><br />
                    <input
                        ref={inputImageRef}
                        onChange={handleMind}
                        className="VideoInput_input form-control"
                        type="file"
                        accept="image/mind"
                        name='mind'
                        required
                    />
                </div>
            </div>

            <div className='row mt-3 ms-md-5'>
                <div className="col-lg-6 VideoInput mt-3 text-start">


                    <label className='YouTube-p text-start form-label'>Upload Image</label><br />
                    <input
                        onChange={handleChange}
                        className="VideoInput_input form-control"
                        type="file"
                        accept="image/gif, image/jpeg, image/png"
                        name='image'
                        required
                    />
                </div>
            </div>
            <div className='row mt-4'>
                <div className='col-12 text-start'>
                    <h5 className='video-h5'>Video Position (In Relation to Your Maker)</h5>
                </div>
                <div className='col-md-10  text-start ms-md-5 mt-3 uper-form'>

                    <div class="form-check d-flex align-items-center mb-3">
                        <input className="form-check-input mt-2" type="radio" name="exampleRadios" id="exampleRadios1" value="0 0.95 0" checked={radio === "0 0.95 0"} onChange={handleRadio} required />
                        <label className="form-check-label YouTube-p mt-2" htmlFor="exampleRadios1">
                            &nbsp;&nbsp;&nbsp;Play Video on above of Maker
                        </label>
                    </div>
                    <div className="form-check d-flex align-items-center mb-3">
                        <input className="form-check-input mt-2" type="radio" name="exampleRadios" id="exampleRadios2" value="0 0.28 0" checked={radio === "0 0.28 0"} onChange={handleRadio} required />
                        <label className="form-check-label YouTube-p mt-2" htmlFor="exampleRadios2">
                            &nbsp;&nbsp;&nbsp;Play Video on top of maker
                        </label>
                    </div>
                    <div className="form-check d-flex align-items-center mb-2">
                        <input className="form-check-input mt-2" type="radio" name="exampleRadios" id="exampleRadios3" value="0 -0.22 0" checked={radio === "0 -0.22 0"} onChange={handleRadio} required />
                        <label className="form-check-label YouTube-p mt-2" htmlFor="exampleRadios3">
                            &nbsp;&nbsp;&nbsp;Float Video below my Maker
                        </label>
                    </div>


                </div>
                <div className='col-lg-6 col-11 text-start  mt-3' >
                    <label htmlFor="formFile" className='YouTube-p text-start form-label'>Transition URL</label>
                    <div className="input-group ms-md-5 mt-4" >
                        <input type="text" className="form-control inputborder" id="inputborder" placeholder="URL" aria-label="Username" aria-describedby="basic-addon1" value={TranslationURL} onChange={(e) => setTranslationURL(e.target.value)}  style={{ border: "1px solid gray" }}/>
                        {/* <span className="input-group-text "><BiSearch size={20} color="white" /></span> */}
                    </div>
                </div>
            </div>

            <div className='row mt-4'>
                <div className='col-12 text-start'>
                    <h5 className='video-h5'>How Long to Wait to Redirect to URL</h5>
                </div>
            </div>

            <div className='col-10 text-start ms-md-5 mt-3 down-form pb-3 uper-form' >
                {/* <form> */}
                <div className="form-check d-flex align-items-center mb-3">
                    <input className="form-check-input mt-2" type="radio" name="Second" id="Second"
                        value={value}
                        // ref={secondvalue}
                        checked={radioOne === value} onChange={handleRadioOne} required

                    />
                    <label className="form-check-label YouTube-p mt-2" htmlFor="Second">
                        &nbsp;&nbsp; {value} Second
                    </label>
                </div>
                <div className="form-check d-flex align-items-center mb-3">
                    <input className="form-check-input mt-2" type="radio" name="Second" id="Video" value="eov" checked={radioOne === "eov"} onChange={handleRadioOne} required />
                    <label className="form-check-label YouTube-p mt-2" htmlFor="Video">
                        &nbsp;&nbsp; End of Video
                    </label>
                </div>

            </div>
            <button className='btn btn-primary mb-3' onClick={GenerateQRCode}>
                {/* Save */}
                {spinners ? <Spinner animation="border" variant="light" /> : <>Save</>}
            </button>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </div>
    )
}

export default HomePage