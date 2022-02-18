const initialState={
    bookings:[]
 }
 export const bookings=(state=initialState,action)=>{
     console.log("actions from booking reducer",action)
     console.log("state from event reducer",state)
     switch(action.type){
         case 'USER_BOOKINGS_DATA':
         return{
        ...state,
         bookings:action.bookings
         } 
         default :
         return state
     }}     