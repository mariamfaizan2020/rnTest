import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { USER_STATE_CHANGE,USER_LOGOUT, USER_EVENTS_DATA } from '../constants';

//  export function fetchUser(navigation)  {
//      return((dispatch)=>{
       
//             console.log('uid', auth().currentUser.uid)
//             firestore().collection('users').doc(auth().currentUser?.uid)
//            .get().then((snapshot)=>{
//             // .onSnapshot((snapshot)=>{
//                 if(snapshot.exists){
//                     console.log('snaps login',snapshot.data())
//                     dispatch({type:USER_STATE_CHANGE,currentUser:snapshot.data()})
//                     navigation.navigate('tabs')
//                 }else{
//                     console.log('does not exist')
//                 }
//             })
      
             
//      })
    
//  }
//  export  function fetchUserEvents(){
//     return(dispatch)=>{
//         console.log('uidddd12',auth().currentUser.uid)
      
//         firestore().collection('Events').where('uid','==',auth().currentUser?.uid)
//         .onSnapshot((snapshot)=>{
//             console.log('1111',snapshot)
//             if(!snapshot.empty){
//                 let data=snapshot.docs.map(doc=>{
//                     const events=doc.data()
//                     console.log('daata',events)
//                     return{...events}
             
//                 })
//                 dispatch({type:'USER_EVENTS_DATA',events:data})
//             }
//         })
    
//     }
// }
 export function Logout(navigation){
    return((dispatch)=>{
        
              dispatch({type:USER_LOGOUT})
              navigation.navigate('login')
            }
            )}
            

