import axios from 'axios'
import React, { useEffect, useState, useMemo } from 'react'
import "./MyProject.css"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Pagination from "../../Pagination"
import QRCode from "qrcode.react";
import { BACKEND_URI, LOCAL_URL } from "../../config/config"
import Spinner from 'react-bootstrap/Spinner';
let PageSize = 7;
function MyProject() {

    let [data, setdata] = useState([])
    const [modalShow, setModalShow] = useState(false);
    let [video, setvideo] = useState();
    let [mind, setMind] = useState();
    let [urls, setUrls] = useState();
    let [radiosss, setradiosss] = useState()
    let [radiossOne, setRadiossOne] = useState()
    let [spinners, setSpinner] = useState(false)
    let [dataCheck, setDataCheck] = useState(false)
    useEffect(async () => {
        let auth = localStorage.getItem("webar")
        let auths = JSON.parse(auth)
        // setIds(auths.IdAddress)
        // console.log(auths.IdAddress);
        setSpinner(true)
        let res = await axios.get(`${BACKEND_URI}/getdata`, {
            mode: "cors",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': '*',
            }
        })
        // console.log("res2323", res.data.length);
        // setdata(res.data)
        var arr = []
        for (var i = 0; i < res.data.length; i++) {
            console.log(res.data[i].webardata.ids);
            if (res.data[i].webardata.ids == auths.IdAddress) {
                let allData = res.data[i]
                console.log("allData", allData);

                arr.push(allData)
                // setdata()
            }
        }
        console.log("arr", arr.length);
        if (!arr.length) {
            setSpinner(false)
            setDataCheck(true)
        }else{
            setSpinner(false)
            setDataCheck(false)
            setdata(arr)
        }
        
        console.log("res2323", data);
    }, [])
    console.log("res2323", data);
    const [currentPage, setCurrentPage] = useState(1);
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;

    // console.log("currentTableData", currentTableData);

    const showProject = (index) => {
        // console.log(index);
        let datas = data[index]

        // console.log("res2323", datas);
        setvideo(datas?.filetoupload)
        // setClickedIndexes(index)
        setMind(datas?.dataget)
        setUrls(datas?.webardata?.TranslationURL)
        setradiosss(datas?.webardata?.radio)
        setRadiossOne(datas?.webardata?.radioOne)
        setModalShow(true)

    }

    var encodeurl = encodeURIComponent(``)
    // console.log("video", video);
    // console.log("mind", mind);
    // console.log("urls", urls);
    // console.log("radiosss", radiosss);
    // console.log("radiosss", radiossOne);
    // // console.log("video",video);
    // console.log("mind",mind);

    return (
        <div className='container'>
            <div className='row d-flex justify-content-center'>
                <div className='col-12 d-flex justify-content-center flex-columnn mt-3'>
                    <h6 className='daily-p'>My Project</h6>

                </div>
                <div className="col-md-4 col-8 border-css" ></div>
                <span className='daily-span'>The projects that you have created are listed below.</span>
            </div>
            <div className='row d-flex justify-content-center'>
                <div className='col-lg-12 mt-4 table-responsive table-id' >

                    <table className="table  table-bordered"  >
                        <thead style={{ backgroundColor: '#497DD3', color: 'white' }}>
                            <tr>
                                {/* <th className='text-start pt-3 pb-3'>Days</th> */}
                                <th className=' pt-3 pb-3'>Image</th>
                                <th className=' pt-3 pb-3'>Project Name</th>
                                <th className=' pt-3 pb-3'>Video Name</th>
                                <th className=' pt-3 pb-3'>Mind File</th>
                                <th className=' pt-3 pb-3'>Translation URL</th>
                                <th className=' pt-3 pb-3'>Video Position</th>
                                <th className=' pt-3 pb-3'>Video Duration</th>
                                <th className=' pt-3 pb-3'>View Scene</th>
                            </tr>
                        </thead>
                        {
                            spinners ? <tbody ><tr style={{ height: "400px" }}> <td colSpan="8" > <Spinner animation="border" variant="primary" className='mt-5' style={{ width: "4rem", height: "4rem" }} /></td></tr></tbody> :
                                <>

                                {
                               dataCheck? <tbody ><tr> <td colSpan="8" style={{fontSize: "25px"}}> No Project Create Yet</td></tr></tbody>:
                                <>
                                {data
                                        // .slice(firstPageIndex, lastPageIndex)
                                        .map((items, index) => {
                                            return (
                                                <tbody>
                                                    <tr>
                                                        <td className='table-td pt-3 pb-3 ellipsis'> <img src={`${BACKEND_URI}/image/${items?.imageget}`} width="100px" height="50px" /></td>
                                                        <td className='table-td pt-3 pb-3 ellipsis'><span>{items?.webardata?.editData}</span></td>
                                                        <td className='table-td pt-3 pb-3 ellipsis first' key={index}><span>{items?.filetoupload}</span></td>
                                                        <td className='table-td pt-3 pb-3 ellipsis'><span>{items?.dataget}</span></td>
                                                        <td className='table-td pt-3 pb-3 ellipsis'><span>{items?.webardata?.TranslationURL}</span></td>
                                                        <td className='table-td pt-3 pb-3 ellipsis'><span>{items?.webardata?.radio}</span></td>
                                                        <td className='table-td pt-3 pb-3 ellipsis'><span>{items?.webardata?.radioOne.replaceAll("eov", "End of Video")}</span></td>
                                                        <td className='table-td pt-3 pb-3 ellipsis'><button className='btn-wwww' onClick={() => showProject(index)}>View</button></td>
                                                    </tr>
                                                </tbody>
                                            )
                                        })}
                               </>

                                }
                                   
                                </>
                        }


                    </table>

                </div>
            </div>
            <div className='row d-flex justify-content-center'>
                <div className='col-md-3'>
                    {/* <Pagination
                        className="pagination-bar"
                        currentPage={currentPage}
                        totalCount={data.length}
                        pageSize={PageSize}
                        onPageChange={page => setCurrentPage(page)}
                    /> */}
                </div>
            </div>

            {modalShow ? (
                // console.log()
                <Modal
                    show={modalShow}
                    onHide={() => setModalShow(false)}

                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >

                    <Modal.Body className="border flex-column d-flex justify-content-center text-center">
                        <h1>Qr Scene</h1>
                        <div className='d-flex justify-content-center text-center'>
                            <QRCode
                                size={356}
                                // style={{ height: "auto", maxWidth: "100%", width: "100%", }}
                                id="qrCodeEl"
                                value={`${LOCAL_URL}/mindar?mind=${BACKEND_URI}/mind/${mind}&link=${BACKEND_URI}/uploads/${video}&radio=${radiosss.replaceAll(" ", "_")}&videolimit=${radiossOne}&TranslationURL=${urls}`}
                                // viewBox={`0 0 256 256`}
                                level={"H"}
                                includeMargin={true}
                            />
                        </div>
                        <button className='bouon' onClick={() => setModalShow(false)}>Close</button>

                    </Modal.Body>

                </Modal>
            ) : (
                <>
                </>
            )
            }

        </div>
    )
}

export default MyProject