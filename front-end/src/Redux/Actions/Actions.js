import {LOGIN} from "../type"
import axios from "axios"

export const userLogin = (data) =>(dispatch)=>{
    // console.log("data1", data);
    
    dispatch({
        type : LOGIN,
        payload: data
    })
}