import React, {useState} from 'react'
import logo1 from "../../Assets/logo1.png"
import Shape12 from "../../Assets/Shape12.png"
import { HiUser } from "react-icons/hi"
import Rectangle3 from "../../Assets/bottom-pc.png"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import toast, { Toaster } from 'react-hot-toast';
import * as Yup from 'yup';
import axios from "axios"
import RemoveCookie from '../Cookies/RemoveCookie';
import {AiFillEyeInvisible} from "react-icons/ai"
import {MdVisibility} from "react-icons/md";
import {BACKEND_URI} from "../../config/config"
import Spinner from 'react-bootstrap/Spinner';

function Login() {
  const navigate = useNavigate()
  const formSchema = Yup.object().shape({
    email: Yup.string()
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
      ),

  })
  const [passwordShown, setPasswordShown] = useState(false);
  const [spinners, setSpinners] =  useState(false)
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const formOptions = { resolver: yupResolver(formSchema) }
  const { register, handleSubmit, formState: { errors } } = useForm(formOptions);
  const onSubmit = async (data) => {
    setSpinners(true)
    await axios.post(`${BACKEND_URI}/login-data`, data,{
      headers: { 'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin' : '*',
   }
    }).then(res => {
      // console.log("res", res);
      if (res.data.status == "Email not match") {
        toast.error("Email not match")
      } else if (res.data.status == "Login Successfully") {
        RemoveCookie('logindata')
        // console.log("res", res.data.loginInfo);
        let cookiesdata = res.data.loginInfo;
        localStorage.setItem("webar", JSON.stringify(cookiesdata))
        // SetCookie('logindata', JSON.stringify(cookiesdata))
        toast.success("Login Successfully")
        setSpinners(false)
        navigate('/sidebar/HomePage')
        // dispatch(userLogin(data))
      } else {
        toast.error("password or Email incorrect! Please enter correct gmail and password")
        setSpinners(false)
      }
    }).catch(e => {
      console.log("e", e);
    })
    // dispatch(userLogin(data))
    // navigate("/sidebar/HomePage")

  };
  return (
    <div className='fluid-container signup-color position-relative'>
      <div className='row d-flex justify-content-start'>
        <div className='col-lg-4  mt-2'>

          <div className='d-flex align-items-center justify-content-around'>
            <h5 className='sign-h5'><img src={logo1} alt="image"/> AR Create Tool</h5>
            <Link to="/signup"><button className='btn btn-sign' size="sm">SignUp</button></Link>
          </div>

        </div>
      </div>
      <div className='row d-flex justify-content-evenly'>
        <div className='col-4 pb-2 pt-2'>

        </div>
        <div className='col-lg-5 col-11 bottom-box mt-3 me-md-3 pb-5 d-flex justify-content-md-start flex-column ms-md-5'>
          <div className=''>
            <div className='row d-flex justify-content-start'>
              <div className='position-relative d-flex align-items-top justify-content-start '>

                <img src={Shape12} width="200px" className='' />
                <h4 className='welcome-h4 ps-3'>Welcome</h4>
              </div>
            </div>
            <div className='row  d-flex justify-content-center'>
              <div className='col-lg-8 col-11'>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className='mb-3'>
                    <div className="input-group  mt-2">

                      <input type="text" className="form-control signupss" placeholder="Email Address" aria-label="Username" aria-describedby="basic-addon1" {...register("email", { required: true })} />
                      <span className="input-group-text" id="basic-addon1"><HiUser /></span>

                      {errors.email && <> &nbsp;<span className='' style={{ color: "red" }}>{errors.email.message}</span></>}
                    </div>
                  </div>
                  <div className='mb-3'>
                    <div className="input-group">
                      <input type={passwordShown ? "text" : "password"} className="form-control" placeholder="Password" aria-label="Username" aria-describedby="basic-addon1" {...register("password", { required: true })} />
                      <span className="input-group-text" id="basic-addon1" onClick={togglePassword} style={{cursor: "pointer"}}>{passwordShown ? <MdVisibility/> : <AiFillEyeInvisible/> }</span>
                    </div>
                    {errors.password && <> &nbsp;<span style={{ color: "red", textAlign: "start" }}>{errors.password.message}</span></>}
                  </div>
                  <div>
                    <span className='Password-span'>Forget Password?</span>
                  </div>
                  <div className='row d-flex justify-content-center mt-3 mb-3'>
                    <div className='col-6'>
                      <div className="d-grid gap-2">
                        <button className='btn btn-signup' size="lg"
                          type="submit"
                        // onClick={()=>navigate("/sidebar")}
                        >
                          {spinners? <Spinner animation="border" variant="light" />: <>Login</>}
                          
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
                <div className='mt-3 mb-3'>
                  <img src={facebook} width="30px" className='me-2'/>
                  <img src={googleplus} width="30px" className='me-2'/>
                  <img src={linkedin} width="30px" className='me-2'/>
                </div>
                <div className='pb-4 account-text'>Need an account? Login</div>
              </div> */}
          </div>
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

export default Login