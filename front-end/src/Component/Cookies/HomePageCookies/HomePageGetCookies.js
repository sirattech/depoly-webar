import Cookies from "js-cookie"
  

const HomePageGetCookies = (HomePagecookiename)=>{
    return Cookies.get(HomePagecookiename)
}
export default HomePageGetCookies;