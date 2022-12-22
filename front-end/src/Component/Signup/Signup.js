import React, { useState } from 'react'
import "./Signup.css";
// import more from "../../Assets/more (5).png"
// import GoPrimitiveDot from "react-icons/go"
import { GoPrimitiveDot } from 'react-icons/go';
import logo1 from "../../Assets/logo1.png"
import Shape12 from "../../Assets/Shape12.png"
import user from "../../Assets/user.png"
import { HiUser } from "react-icons/hi"
import { MdOutgoingMail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri"
import facebook from "../../Assets/facebook.png";
import googleplus from "../../Assets/google-plus.png"
import linkedin from "../../Assets/linkedin.png"
import Rectangle3 from "../../Assets/bottom-pc.png"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import {AiFillEyeInvisible} from "react-icons/ai"
import {MdVisibility} from "react-icons/md"
import toast, { Toaster } from 'react-hot-toast';
import {BACKEND_URI, LOCAL_URL} from "../../config/config"
import Spinner from 'react-bootstrap/Spinner';

function Signup() {
  const navigate =useNavigate()
  const formSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("First Name is mandatory"),
    lastName: Yup.string()
      .required(),
    email: Yup.string("last Name is mandatory")
      .required("Email is mandatory")
      .matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Enter a valid email address"
      ),
    password: Yup.string()
      .required('Password is mandatory')
      .min(8, 'Password must be at 8 char long')
      .matches(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character (!@#$*)"
      )
    ,
    confirmPwd: Yup.string()
      .required('Password is mandatory')
      .oneOf([Yup.ref('password')], 'Passwords does not match'),
  })
  const [showPassword,setShowPassword] = useState(false);
  const [showPasswordOne, setShowPasswordOne] = useState(false);
  const [spinners, setSpinners] =  useState(false)
  const formOptions = { resolver: yupResolver(formSchema) }
  const { register, handleSubmit, resetField, watch, formState: { errors } } = useForm(formOptions);
  const onSubmit = async (data) => {
    try {
      console.log("data", data)
      setSpinners(true)
    await axios.post(`${BACKEND_URI}/register`, data,{
      headers: { 'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin' : '*',
   }
    }).then(res=>{
        console.log("res", res.data);
        if(res.data == "data successfully enter"){
          setSpinners(false)
          toast.success('User Created Successfully 🙂! Login Here')
          navigate("/")
        } else if(res.data == "Duplicate"){
          setSpinners(false)
          toast.error("User Already exist, Please Use another Email")
        } else{
          setSpinners(false)
          toast.error("Server Error! Please Try Again")
        }

      }).catch(e=>{
        console.log("e", e);
      })
      // console.log("userRegister", userRegister);
      // resetField("First Name");
      // resetField("Last Name");
      // resetField("Email");
      // resetField("Password");
      // resetField("Conform Password")
      // toast.success('signUp Successfully ')
     
    } catch (e) {
console.log("e", e);
    }

    // toast.success('login Successfully ')
    // navigate("/sidebar")
  };
  return (
    <div className='fluid-container signup-color position-relative'>
      <div className='row d-flex justify-content-start'>
        <div className='col-lg-4  mt-2'>

          <div className='d-flex align-items-center justify-content-around'>
            <h5 className='sign-h5'><img src={logo1} /> AR Create Tool</h5>
            <Link to="/"><button className='btn btn-sign' size="sm">LOGIN</button></Link>
          </div>

        </div>
      </div>
      <div className='row d-flex justify-content-evenly'>
        <div className='col-4 pb-2 pt-2'>

        </div>
        <div className='col-lg-5 col-11 bottom-box mt-3 me-md-3 pb-4 d-flex justify-content-md-start flex-column ms-md-5'>

          <div className='row d-flex justify-content-start'>
            <div className='position-relative d-flex align-items-top justify-content-start '>

              <img src={Shape12} width="180px" className='' />
              <h4 className='welcome-h4 ps-3'>Welcome</h4>
            </div>
          </div>
          <div className='row  d-flex justify-content-center '>
            <div className='col-lg-7 col-11'>
              {/* <div className='row'>
                    <div className='col-md-5'> */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-2'>
                  <div className="input-group  mt-2">
                    <input type="text" className="form-control signupss" name="firstNames" placeholder="First Name" aria-label="Username" aria-describedby="basic-addon1" {...register("firstName", { required: true })} required />
                    <span className="input-group-text" id="basic-addon1"><HiUser /></span>
                  </div>
                  {/* {errors.firstName &&<>&nbsp;<span style={{color:"red"}}>{errors.firstName.message}</span></>} */}
                </div>
                <div className='mb-2'>
                  <div className="input-group ">
                    <input type="text" className="form-control signupss" name='lastName' placeholder="Last Name" aria-label="Username" aria-describedby="basic-addon1" {...register("lastName", { required: true })} required />
                    <span className="input-group-text" id="basic-addon1"><HiUser /></span>
                  </div>
                  {/* {errors.lastName &&<>&nbsp;<span style={{color:"red"}}>{errors.lastName.message}</span></>} */}
                </div>
                <div className='mb-2'>
                  <div className="input-group">
                    <input type="text" className="form-control signupss" name='emailadress' placeholder="Email Address" aria-label="Username" aria-describedby="basic-addon1" {...register("email", { required: true })} required />
                    <span className="input-group-text" id="basic-addon1"><MdOutgoingMail /></span>
                  </div>
                  {/* {errors.email &&<> &nbsp;<span style={{color:"red"}}>{errors.email.message}</span></>} */}
                </div>
                <div className='mb-2'>
                  <div className="input-group ">
                    <input type={showPassword ? "text" : "password"} className="form-control input-data" name='passwords' placeholder="Password" aria-label="Username" aria-describedby="basic-addon1" {...register("password", { required: true })} required />
                    <span className="input-group-text" onClick={()=>setShowPassword(!showPassword)} style={{cursor: "pointer"}} id="basic-addon1">{showPassword ? <MdVisibility/> : <AiFillEyeInvisible/> }</span>
                  </div>
                  {errors.password &&<> &nbsp;<span style={{color:"red", fontSize: "14px"}}>{errors.password.message}</span></>}
                </div>
                <div>
                  <div className="input-group mb-2">
                    <input type={showPasswordOne ? "text" : "password"} className="form-control" name='conform' placeholder="conform Password" aria-label="Username" aria-describedby="basic-addon1" {...register("confirmPwd", { required: true })} required />
                    <span className ="input-group-text" onClick={()=>setShowPasswordOne(!showPasswordOne)} style={{cursor: "pointer"}} id="basic-addon1">{showPasswordOne ? <MdVisibility/> : <AiFillEyeInvisible/> }</span>
                  </div>
                  {errors.confirmPwd && <> &nbsp;<span style={{ color: "red",fontSize: "14px" }}>{errors.confirmPwd.message}</span></>}
                </div>
                {/* <div className='text-start ms-1'>
                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
                    <label for="vehicle1" className='lable-text'>Remember Me?</label>
                  </div> */}
                <div className='row d-flex justify-content-center mt-3 '>
                  <div className='col-6'>
                    <div className="d-grid gap-2">
                      <button className='btn btn-signup' type="submit" size="lg">
                      {spinners? <Spinner animation="border" variant="light" />: <>SignUp</>}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            {/* </div>
                </div> */}
          </div>

          {/* <div>
            <span>OR</span>
            <div className='mt-2 mb-1'>
              <img src={facebook} width="30px" className='me-2' />
              <img src={googleplus} width="30px" className='me-2' />
              <img src={linkedin} width="30px" className='me-2' />
            </div>
            <div className='pb-2  account-text'>Need an account? Login</div>
          </div> */}

        </div>
      </div>



      <div className='box-create position-absolute top-100 start-0 translate-middle'>
        <img src={Rectangle3} className="position-absolute bottom-0 display-n" />

      </div>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </div>
  )
}

export default Signup