import { USER_EVENTS_DATA } from "../constants";

const initialState={
   events=[]
}
export const events=(state=initialState,action)=>{
    switch(action.type){
        case USER_EVENTS_DATA:
        return{
       ...state,
         events=[...state.events,action.events]
        }
    }}     
 
