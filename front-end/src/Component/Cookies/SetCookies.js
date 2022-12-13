// import { Cookie } from "@mui/icons-material"
import Cookies from "js-cookie"

 const SetCookie = (cookiename, logindata)=>{
    Cookies.set(cookiename, logindata,{
        expires: 1,
        secure: true,
        sameSite: "Strict",
        path: '/'
    })

}

export default SetCookie;




