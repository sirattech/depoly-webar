import Cookies from "js-cookie"
const HomePageSetCookies = (HomePagecookiename, HomePageData)=>{
    Cookies.set(HomePagecookiename, HomePageData,{
        expires: 1,
        secure: true,
        sameSite: "Strict",
    })
}
export default HomePageSetCookies;