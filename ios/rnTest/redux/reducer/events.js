import { USER_EVENTS_DATA } from "../constants";

const initialState={
   events:[]
}
export const events=(state=initialState,action)=>{
    console.log("actions from evvent reducer",action)
    console.log("state from event reducer",state)
    switch(action.type){
        case 'USER_EVENTS_DATA':
        return{
       ...state,
         events:action.events
        } 
        default :
        return state
    }}     
 
