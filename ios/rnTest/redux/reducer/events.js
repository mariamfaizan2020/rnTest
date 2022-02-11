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
 
// import { USER_EVENTS_DATA } from "../constants"


// const initialState={
//     currenteventsUser:null
// }
// export const user=(state=initialState,action)=>{
//     switch(action.type){
//         case USER_EVENTS_DATA:
//         return{
//        ...state,
//        events:action.events
//         }
//         case USER_LOGOUT:
//             return initialState
//         default :
//         return initialState
//     }
// }