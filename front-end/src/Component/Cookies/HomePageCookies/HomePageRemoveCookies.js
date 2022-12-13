import Cookies from "js-cookie"
  

const HomePageRemoveCookies = (HomePagecookiename)=>{
    return Cookies.remove(HomePagecookiename)
}
export default HomePageRemoveCookies;