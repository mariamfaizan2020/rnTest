import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { USER_STATE_CHANGE,USER_LOGOUT } from '../constants';

 export function fetchUser(navigation)  {
     return((dispatch)=>{
       
            console.log('uid', auth().currentUser?.uid)
            firestore().collection('users').doc(auth().currentUser?.uid)
           
            .onSnapshot((snapshot)=>{
                if(snapshot.exists){
                    console.log('snaps',snapshot.data())
                    dispatch({type:USER_STATE_CHANGE,currentUser:snapshot.data()})
                    navigation.navigate('tabs')
                }else{
                    console.log('does not exist')
                }
            })
      
             
     })
    
 }
 export function Logout(navigation){
    return((dispatch)=>{
        
              dispatch({type:USER_LOGOUT})
              navigation.navigate('login')
            }
            )}