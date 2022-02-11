import { USER_STATE_CHANGE } from "../constants"
import { USER_LOGOUT } from "../constants"

const initialState={
    currentUser:null
}
export const user=(state=initialState,action)=>{
    console.log("actions from user reducer",action)
    console.log("state from user reducer",state)
    switch(action.type){
        case 'USER_STATE_CHANGE':
        return{
       ...state,
       currentUser:action.currentUser
        }
        case USER_LOGOUT:
            return{
                currentUser:null
            } 
        default :
        return state
    }
}