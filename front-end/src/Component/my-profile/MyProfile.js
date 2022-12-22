import React, { useEffect, useState } from 'react'
import "./MyProfile.css"
import billgate from "../../Assets/2190989_user_circle_male_avatar_account_icon.png"
import checkmark from "../../Assets/checkmark.png"
import { Link } from "react-router-dom";
import FilterFramesIcon from '@mui/icons-material/FilterFrames';
import { BACKEND_URI, LOCAL_URL } from "../../config/config"
import { AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Area } from 'recharts';
import axios from 'axios';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
function MyProfile() {
    const [colors, isColor] = useState("Dashboard")
    const [sectionsShow, setSectionsShow] = useState("Dashboard");
    let [totalProject, setTotalProject] = useState(0);
    let [skeleton, setSkelten] = useState(false);
    let [addressCheck, setAddressCheck] = useState(false);
    let [street, setStreet] = useState("");
    let [city, setCity] = useState("");
    let [state, setState] = useState("");
    let [zipCode, setZipCode] = useState("");
    let [country, setCountry] = useState("");
    let [error, setError] = useState(false);
    let [totallAddress, setTotallAddress] = useState([])
    let auth = localStorage.getItem("webar");
    let [pagination, setPagination] = useState(false)
    let auths = JSON.parse(auth)
    // console.log(auths.IdAddress);
    let IdAddress = auths.IdAddress;

    useEffect(async () => {
        setSkelten(true)
        let res = await axios.get(`${BACKEND_URI}/getdata`)
        // console.log("res", res);
        var arr = []
        for (var i = 0; i < res.data.length; i++) {
            console.log(res.data[i].webardata.ids);
            if (res.data[i].webardata.ids == auths.IdAddress) {
                let allData = res.data[i]
                // console.log("allData", allData);
                arr.push(allData)
            }
        }
        // console.log("arr", arr.length);
        setSkelten(false)
        setTotalProject(arr.length)
    }, []);

    const checkAddresses = async () => {
        try {
            setAddressCheck(false)
            await axios.get(`${BACKEND_URI}/addresses`).then((response) => {
                console.log("response", response.data.length);
                //    console.log("response", response.data.IdAddress);
                //    console.log("IdAddress", auths.IdAddress);
                if (response.data.length) {
                    let addressArr = []
                    for (var i = 0; i < response.data.length; i++) {
                        console.log(response.data[i].IdAddress);
                        if (auths.IdAddress == response.data[i].IdAddress) {

                            console.log(response.data[i]);
                            setAddressCheck(false)
                            console.log("333");
                            return setTotallAddress(response.data[i])
                        }
                        else if (auths.IdAddress !== response.data[i].IdAddress) {
                            setAddressCheck(true)
                            console.log("222");
                        }
                    }

                } else {
                    setAddressCheck(true)
                    console.log("111");
                    // if( response.data.IdAddress === auths.IdAddress ){
                    //     setAddressCheck(false)
                    //     checkAddresses();
                    //     setTotallAddress(response.data)
                    // } else{
                    //     setAddressCheck(true)

                    //     console.log("222");
                    // }

                }
            })
        } catch (e) {
            console.log("e", e);
        }
    }
    console.log("totallAddress", totallAddress);
    const submitAddress = async () => {
        console.log(street, city, state, zipCode, country);
        setPagination(true)
        // console.log("IdAddress", IdAddress);
        if (!street || !city || !state || !zipCode || !country) {
            setError(true)
            return false;
        }

        await axios.post(`${BACKEND_URI}/address`, {
            street,
            city,
            state,
            zipCode,
            country,
            IdAddress
        }).then((res) => {
            console.log("res", res.data);
            // localStorage.setItem("Address data", JSON.stringify(res.data))
            setTimeout(() => {
                setAddressCheck(false)
                checkAddresses();
                setPagination(false)
            }, 10000);
        })
    }
    let Addauths;
    useEffect(() => {
        checkAddresses();
        // let addressAuths = localStorage.getItem("Address data");
        // Addauths = JSON.parse(addressAuths)
        // console.log("Addauths",Addauths);

    }, [])
    const data = [
        {
            "name": "Page A",
            "uv": 4000,
            "pv": 2400,
            "amt": 2400
        },
        {
            "name": "Page B",
            "uv": 3000,
            "pv": 1398,
            "amt": 2210
        },
        {
            "name": "Page C",
            "uv": 2000,
            "pv": 9800,
            "amt": 2290
        },
        {
            "name": "Page D",
            "uv": 2780,
            "pv": 3908,
            "amt": 2000
        },
        {
            "name": "Page E",
            "uv": 1890,
            "pv": 4800,
            "amt": 2181
        },
        {
            "name": "Page F",
            "uv": 2390,
            "pv": 3800,
            "amt": 2500
        },
        {
            "name": "Page G",
            "uv": 3490,
            "pv": 4300,
            "amt": 2100
        }
    ]

    return (
        <div className='container' >
            <div className='row d-flex justify-content-around'>
                <div className='col-lg-3 '>
                    <h2 className='account-h2'>My Account</h2>
                    <span className='account-span '>Logged in as: {`${auths?.FistName} ${auths?.LastName}`}</span><br />
                    <img src={billgate} className="mb-3 mt-3" width="130px" height="130px" style={{ borderRadius: '100px' }} />
                    <br />
                    <span className='account-span'>Edit your profile</span>
                    <div className='row d-flex justify-content-center mt-4'>
                        <div className={colors == "Dashboard" ? "col-11 mini-box-active pt-2 pb-2 ps-3" : "col-11 mini-box pt-2 pb-2 ps-3"} id='Dashboard' onClick={() => {
                            isColor("Dashboard")
                            setSectionsShow("Dashboard")
                        }}>
                            Dashboard
                        </div>
                        <div className={colors == "Orders" ? "col-11 mini-box-active pt-2 pb-2 ps-3" : "col-11 mini-box pt-2 pb-2 ps-3"} id='Orders' onClick={() => {
                            isColor("Orders")
                            setSectionsShow("Orders")
                        }} >
                            Orders
                        </div>
                        <div className={colors == "Downloads" ? "col-11 mini-box-active pt-2 pb-2 ps-3" : "col-11 mini-box pt-2 pb-2 ps-3"} id='Downloads' onClick={() => {
                            isColor("Downloads")
                            setSectionsShow("Downloads")
                        }}>
                            Downloads
                        </div>
                        <div className={colors == "Addresses" ? "col-11 mini-box-active pt-2 pb-2 ps-3" : "col-11 mini-box pt-2 pb-2 ps-3"} id='Addresses' onClick={() => {
                            isColor("Addresses")
                            setSectionsShow("Addresses")
                        }}>
                            Addresses
                        </div>
                        <div className={colors == "Account details" ? "col-11 mini-box-active pt-2 pb-2 ps-3" : "col-11 mini-box pt-2 pb-2 ps-3"} id='Account details' onClick={() => {
                            isColor("Account details")
                            setSectionsShow("Account details")
                        }}>
                            Account details
                        </div>
                        <div className={colors == "Logout" ? "col-11 mini-box-active pt-2 pb-2 ps-3" : "col-11 mini-box pt-2 pb-2 ps-3"} id='Logout' onClick={() => isColor("Logout")}>
                            <Link to="/" style={{ textDecoration: "none", color: "black" }}> Logout</Link>
                        </div>
                    </div>
                </div>

                <div className='col-lg-9 col-11'>

                    {
                        sectionsShow == "Dashboard" ? (
                            <div>
                                <div className='row d-flex justify-content-center mt-5 justify-content-around'>

                                    <div className='col-lg-4 col-11 dashboard-box pt-4 pb-4 text-start d-flex '>
                                        <div className='min-box ms-3'>

                                            <i className="fa-solid fa-gavel"></i>

                                        </div>
                                        <div className='ms-2 mt-2' style={{ lineHeight: "1.5rem" }}>
                                            <span className="two-span">

                                                {skeleton ? <SkeletonTheme baseColor="#202020" highlightColor="#444"><span><Skeleton width={120} /></span></SkeletonTheme> : <>{totalProject}</>}</span><br />
                                            <span className='Order-span'>Project</span>
                                        </div>

                                    </div>
                                    <div className='col-lg-4 col-11 dashboard-box pt-4 pb-4 text-start d-flex'>
                                        <div className='min-box ms-3'><i className="fa-solid fa-tag"></i></div>
                                        <div className='ms-2 mt-2' style={{ lineHeight: "1.5rem" }}>
                                            <span className="two-span">5</span><br />
                                            <span className='Order-span'>order</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='row d-flex justify-content-center mt-5'>
                                    <div className='col-lg-11 col-11 ' style={{ height: "55vh" }}>
                                        <h2 className='mb-3 text-start'>Project Details</h2>
                                        <ResponsiveContainer width="100%" height="80%">
                                            <AreaChart data={data}
                                                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                                <defs>
                                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                                    </linearGradient>
                                                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <XAxis dataKey="name" />
                                                <YAxis />
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <Tooltip />
                                                <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                                                <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                        ) : sectionsShow == "Orders" ? (
                            <div>
                                <div className='row d-flex justify-content-center' style={{ height: "80vh", paddingTop: "100px" }}>
                                    <div className='col-lg-10 table-responsive'>
                                        <h1 className='text-start'>Orders</h1>
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Id</th>
                                                    <th scope="col">Title</th>
                                                    <th scope="col">Price</th>
                                                    <th scope="col">Details</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td colspan="4"><h1>No Data Found!</h1></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        ) : sectionsShow == "Downloads" ? (
                            <div>
                                <div className='row d-flex justify-content-center' style={{ height: "80vh", paddingTop: "100px" }}>
                                    <div className='col-lg-10 table-responsive'>
                                        <h1 className='text-start'>Downloads</h1>
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Id</th>
                                                    <th scope="col">Title</th>
                                                    <th scope="col">Price</th>
                                                    <th scope="col">Details</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td colspan="4"><h1>No Data Found!</h1></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        ) : sectionsShow == "Addresses" ? (
                            <div>
                                {
                                    addressCheck ?
                                        (<div className='row d-flex justify-content-center mt-5'>

                                            <div className='col-lg-10 col-11'>
                                                <h1>Address Details</h1>
                                                <Alert variant="danger" className='text-start'>
                                                    Please Enter Address Details
                                                </Alert>
                                                <div className="mb-3 text-start">
                                                    <label htmlFor="exampleInputEmail1" className="text-start">Address</label>
                                                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter Address' value={street} onChange={(e) => setStreet(e.target.value)} style={{ border: "1px solid gray" }} />
                                                    {error && !street && <span className="text-muted222" style={{ color: "red" }}>Please Fill Address</span>}
                                                </div>
                                            </div>
                                            <div className='col-lg-10 col-11'>
                                                <div className="mb-3 text-start">
                                                    <label htmlFor="exampleInputEmail1" className="text-start">City</label>
                                                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter City' value={city} onChange={(e) => setCity(e.target.value)} style={{ border: "1px solid gray" }} />
                                                    {error && !city && <span className="text-muted222" style={{ color: "red" }}>Please Fill City</span>}

                                                </div>
                                            </div>
                                            <div className='col-lg-10 col-11'>
                                                <div className='row d-flex justify-content-between'>
                                                    <div className='col-lg-6 col-11'>
                                                        <div className="mb-3 text-start">
                                                            <label htmlFor="exampleInputEmail1" className="text-start">State</label>
                                                            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter State' value={state} onChange={(e) => setState(e.target.value)} style={{ border: "1px solid gray" }} />
                                                            {error && !state && <span className="text-muted222" style={{ color: "red" }}>Please Fill State</span>}

                                                        </div>
                                                    </div>
                                                    <div className='col-lg-5 col-11'>
                                                        <div className="mb-3 text-start">
                                                            <label htmlFor="exampleInputEmail1" className="text-start">Zip Code</label>
                                                            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter zip code' value={zipCode} onChange={(e) => setZipCode(e.target.value)} style={{ border: "1px solid gray" }} />
                                                            {error && !zipCode && <span className="text-muted222" style={{ color: "red" }}>Please Fill zip code</span>}

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-lg-10 col-11'>
                                                <div className="mb-3 text-start">
                                                    <label htmlFor="exampleInputEmail1" className="text-start">Country</label>
                                                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter Country' value={country} onChange={(e) => setCountry(e.target.value)} style={{ border: "1px solid gray" }} />
                                                    {error && !country && <span className="text-muted222" style={{ color: "red" }}>Please Fill Country</span>}

                                                </div>
                                            </div>
                                            <div className='col-lg-10 col-11'>
                                                <div className="d-grid gap-2">
                                                    <button className='btn btn-submit' size="lg" onClick={submitAddress}>
                                                        {pagination ? <Spinner animation="border" variant="light" /> : <>Submit</>}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>)
                                        : (<div>
                                            <div className='row d-flex justify-content-center mt-5'>
                                                <div className='col-lg-10'>
                                                    <h1 className='mt-5 mb-4'>Address Details</h1>
                                                    <table className="table table-bordered text-start">
                                                        <tbody>
                                                            <tr>
                                                                <th>Address:</th>
                                                                <td >{totallAddress?.street}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>City:</th>
                                                                <td>{totallAddress?.city}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>State:</th>
                                                                <td>{totallAddress?.state}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Zip Code:</th>
                                                                <td>{totallAddress?.zipCode}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Country:</th>
                                                                <td>{totallAddress?.country}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>)
                                }
                            </div>
                        ) : sectionsShow == "Account details" ? (
                            <div className='row d-flex justify-content-center mt-5'>

                                <div className='col-lg-10'>
                                    <h1 className='mt-5 mb-4'>Account details</h1>
                                    <table className="table table-bordered text-start">
                                        <tbody>
                                            <tr>
                                                <th>First Name:</th>
                                                <td >{auths?.FistName}</td>
                                            </tr>
                                            <tr>
                                                <th>Last Name:</th>
                                                <td >{auths?.LastName}</td>
                                            </tr>
                                            <tr>
                                                <th>Email:</th>
                                                <td >{auths?.EmailAddress}</td>
                                            </tr>
                                            <tr>
                                                <th>Address:</th>
                                                <td >{totallAddress?.street}</td>
                                            </tr>
                                            <tr>
                                                <th>City:</th>
                                                <td>{totallAddress?.city}</td>
                                            </tr>
                                            <tr>
                                                <th>State:</th>
                                                <td>{totallAddress?.state}</td>
                                            </tr>
                                            <tr>
                                                <th>Zip Code:</th>
                                                <td>{totallAddress?.zipCode}</td>
                                            </tr>
                                            <tr>
                                                <th>Country:</th>
                                                <td>{totallAddress?.country}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : (
                            <></>
                        )
                    }


                    {/* <div className='row d-flex justify-content-center mt-2'>
                        <div className='col-6 text-start pb-2'>
                            <h5 className='first-h5 pt-4'>First Name</h5>
                            <span className='ps-md-2 first-span'>{auths?.FistName}</span>
                            <h5 className='first-h5 pt-4'>Email Address</h5>
                            <span className='ps-md-2 first-span'>{auths?.EmailAddress}</span>
                            
                        </div>
                        <div className='col-6 text-start'>
                            <h5 className='first-h5 pt-4'>Last Name</h5>
                            <span className='ps-md-2 first-span'> {auths?.LastName}</span>
                        </div>
                    </div>
                    <div className='row d-flex justify-content-between  mt-2 pt-2 pb-2'>
                    <div className='col-md-4 col-11 down-boxes mt-2'>
                            <h4 className='Basic-h4 pt-3'>Basic</h4>
                            <h2 className='account-h22 pt-2'>$49</h2>
                            <h5 className='Website-h5 pt-1'>1 Website/Year</h5>
                            <ul className='text-start ms-5 pt-1'>
                                <li className='li-text'><img src={checkmark} width="12px" alt=''/>&nbsp;&nbsp;Plugins Updates</li>
                                <li className='li-text'><img src={checkmark} width="12px" alt='' />&nbsp;&nbsp;100+ Templates</li>
                                <li className='li-text'><img src={checkmark} width="12px" alt='' />&nbsp;&nbsp;55+ Fields Types</li>
                                <li className='li-text'><img src={checkmark} width="12px" alt='' />&nbsp;&nbsp;PRO Actions</li>
                                <li className='li-text'><img src={checkmark} width="12px" alt='' />&nbsp;&nbsp;Conditional Logic</li>
                                <li className='li-text'><img src={checkmark} width="12px" alt='' />&nbsp;&nbsp;Calculated Fields</li>
                                <li className='li-text'><img src={checkmark} width="12px" alt='' />&nbsp;&nbsp;Extends with Add Ons</li>
                                <li className='li-text'><img src={checkmark} width="12px" alt='' />&nbsp;&nbsp;Professional Support</li>
                            </ul>
                            <div className='row d-flex justify-content-center mb-2'>
                                <div className='col-8'>
                                    <div className="d-grid ">
                                        <button className='btn btn-buy' >
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='col-md-4 col-11 down-boxes-blue mt-2'>
                            <h4 className='Basic-h4 pt-3'>Basic</h4>
                            <h2 className='account-h22 pt-2 text-white'>$49</h2>
                            <h5 className='Website-h5 pt-1'>1 Website/Year</h5>
                            <ul className='text-start ms-5 pt-1'>
                                <li className='li-text'><img src={checkmark} width="12px" alt='' />&nbsp;&nbsp;Plugins Updates</li>
                                <li className='li-text'><img src={checkmark} width="12px" alt='' />&nbsp;&nbsp;100+ Templates</li>
                                <li className='li-text'><img src={checkmark} width="12px" alt='' />&nbsp;&nbsp;55+ Fields Types</li>
                                <li className='li-text'><img src={checkmark} width="12px" alt='' />&nbsp;&nbsp;PRO Actions</li>
                                <li className='li-text'><img src={checkmark} width="12px" alt='' />&nbsp;&nbsp;Conditional Logic</li>
                                <li className='li-text'><img src={checkmark} width="12px" alt='' />&nbsp;&nbsp;Calculated Fields</li>
                                <li className='li-text'><img src={checkmark} width="12px" alt='' />&nbsp;&nbsp;Extends with Add Ons</li>
                                <li className='li-text'><img src={checkmark} width="12px" alt='' />&nbsp;&nbsp;Professional Support</li>
                            </ul>
                            <div className='row d-flex justify-content-center mb-2'>
                                <div className='col-8'>
                                    <div className="d-grid ">
                                        <button className='btn btn-buy' >
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>




                        <div className='col-md-4 col-11 down-boxes mt-2'>
                            <h4 className='Basic-h4 pt-3 '>Basic</h4>
                            <h2 className='account-h22 pt-2 '>$49</h2>
                            <h5 className='Website-h5 pt-1 '>1 Website/Year</h5>
                            <ul className='text-start ms-5 pt-1 '>
                                <li className='li-text'><img src={checkmark} width="12px" alt='' />&nbsp;&nbsp;Plugins Updates</li>
                                <li className='li-text'><img src={checkmark} width="12px" alt='' />&nbsp;&nbsp;100+ Templates</li>
                                <li className='li-text'><img src={checkmark} width="12px" alt='' />&nbsp;&nbsp;55+ Fields Types</li>
                                <li className='li-text'><img src={checkmark} width="12px" alt='' />&nbsp;&nbsp;PRO Actions</li>
                                <li className='li-text'><img src={checkmark} width="12px" alt='' />&nbsp;&nbsp;Conditional Logic</li>
                                <li className='li-text'><img src={checkmark} width="12px" alt='' />&nbsp;&nbsp;Calculated Fields</li>
                                <li className='li-text'><img src={checkmark} width="12px" alt='' />&nbsp;&nbsp;Extends with Add Ons</li>
                                <li className='li-text'><img src={checkmark} width="12px" alt='' />&nbsp;&nbsp;Professional Support</li>
                            </ul>
                            <div className='row d-flex justify-content-center mb-2 '>
                                <div className='col-8 '>
                                    <div className="d-grid ">
                                        <button className='btn btn-buy' >
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>



                    </div> */}
                </div>
            </div>

        </div>
    )
}

export default MyProfile