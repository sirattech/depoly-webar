import {LOGIN} from "../type"

let initialState = {
    // success: false,
    isAdmin: false,
    userData: []
}

export const LOGIN_REDUCERS = (state = initialState, action, payload)=>{
  switch(action.type){
    case LOGIN :
        // console.log("payload.success", payload.success);
        // if(payload.success){
            
        // }
        return {
            ...state,
           
            isAdmin: true,
            userData: payload,
        }
            default:
                return {
                    ...state
                }
        
       
       

  }
}