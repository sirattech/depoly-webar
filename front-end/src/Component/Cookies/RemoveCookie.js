import Cookies from "js-cookie"

export const RemoveCookie = (cookiename)=>{
    return Cookies.remove(cookiename)
}

export default RemoveCookie