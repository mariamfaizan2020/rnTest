const initialState={
    bookedevents:[]
 }
 export const bookedevents=(state=initialState,action)=>{
     console.log("actions from bookedevvent reducer",action)
     console.log("state from bookedevent reducer",state)
     switch(action.type){
         case 'USER_BOOKED_EVENTS':
         return{
        ...state,
          bookedevents:action.bookedevents
         } 
         default :
         return state
     }}     
  