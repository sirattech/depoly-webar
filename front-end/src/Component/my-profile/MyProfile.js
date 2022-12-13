import React, { useEffect, useState } from 'react'
import "./MyProfile.css"
import billgate from "../../Assets/BillGates.jpg"
import checkmark from "../../Assets/checkmark.png"
import {Link} from "react-router-dom"
function MyProfile() {
    const [colors, isColor] = useState("Dashboard")
    let data
    // console.log("get", GetCookie("logindata"));
     let auth = localStorage.getItem("webar")
    let auths = JSON.parse(auth)
    //  console.log("auth", auths);

    // data = GetCookie("logindata");
    // data = JSON.parse(data)
    // console.log("data", data.FistName);
    useEffect(()=>{
         
    })
    // console.log("data", data);

    return (
        <div className='container' >
            <div className='row d-flex justify-content-around'>
                <div className='col-lg-3 '>
                    <h2 className='account-h2'>My Account</h2>
                    <span className='account-span '>Logged in as: { `${auths?.FistName} ${auths?.LastName}`}</span><br />
                    <img src={billgate} className="mb-3 mt-3" width="130px" height="130px" style={{ borderRadius: '100px' }} />
                    <br />
                    <span className='account-span'>Edit your profile</span>
                    <div className='row d-flex justify-content-center mt-4'>
                        <div className={colors == "Dashboard" ? "col-11 mini-box-active pt-2 pb-2 ps-3" : "col-11 mini-box pt-2 pb-2 ps-3"} id='Dashboard' onClick={()=>isColor("Dashboard")}>
                            Dashboard
                        </div>
                        <div className={colors == "Orders" ? "col-11 mini-box-active pt-2 pb-2 ps-3" : "col-11 mini-box pt-2 pb-2 ps-3"} id='Orders' onClick={()=>isColor("Orders")} >
                            Orders
                        </div>
                        <div className={colors == "Downloads" ? "col-11 mini-box-active pt-2 pb-2 ps-3" : "col-11 mini-box pt-2 pb-2 ps-3"} id='Downloads' onClick={()=>isColor("Downloads")}>
                            Downloads
                        </div>
                        <div className={colors == "Addresses" ? "col-11 mini-box-active pt-2 pb-2 ps-3" : "col-11 mini-box pt-2 pb-2 ps-3"} id='Addresses' onClick={()=>isColor("Addresses")}>
                            Addresses
                        </div>
                        <div className={colors == "Account details" ? "col-11 mini-box-active pt-2 pb-2 ps-3" : "col-11 mini-box pt-2 pb-2 ps-3"} id='Account details' onClick={()=>isColor("Account details")}>
                            Account details
                        </div>
                        <div className={colors == "Logout" ? "col-11 mini-box-active pt-2 pb-2 ps-3" : "col-11 mini-box pt-2 pb-2 ps-3"} id='Logout' onClick={()=>isColor("Logout")}>
                        <Link to="/" style={{ textDecoration: "none" }}> Logout</Link>
                        </div>
                    </div>
                </div>
                <div className='col-lg-9 col-11'>
                    <div className='row d-flex justify-content-center mt-2'>
                        <div className='col-6 text-start pb-2'>
                            <h5 className='first-h5 pt-4'>First Name</h5>
                            <span className='ps-md-2 first-span'>{auths?.FistName}</span>
                            <h5 className='first-h5 pt-4'>Email Address</h5>
                            <span className='ps-md-2 first-span'>{auths?.EmailAddress}</span>
                            {/* <h5 className='first-h5 pt-4'>Contact</h5>
                            <span className='ps-md-2 first-span'>001-212-456-7890 </span> */}
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



                    </div>
                </div>
            </div>

        </div>
    )
}

export default MyProfile