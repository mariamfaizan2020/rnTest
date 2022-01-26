import { USER_STATE_CHANGE } from "../constants"
import { USER_LOGOUT } from "../constants"

const initialState={
    currentUser:null
}
export const user=(state=initialState,action)=>{
    switch(action.type){
        case USER_STATE_CHANGE:
        return{
       ...state,
       currentUser:action.currentUser
        }
        case USER_LOGOUT:
            return initialState
        default :
        return initialState
    }
}