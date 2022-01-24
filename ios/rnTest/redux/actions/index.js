import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { USER_STATE_CHANGE } from '../constants';

 export function fetchUser()  {
     return((dispatch)=>{
        // if (auth().currentUser) {
            console.log('uid', auth().currentUser?.uid)
            firestore().collection('users').doc(auth().currentUser?.uid)
           
            .onSnapshot((snapshot)=>{
                if(snapshot.exists){
                    console.log('snaps',snapshot.data())
                    dispatch({type:USER_STATE_CHANGE,currentUser:snapshot.data()})
                }
            })
                // .get()
                // .then((snapshot) => {
                //     let data = snapshot.data()
                //     console.log('user', data)
                //     const user = data.type
                //     console.log('user', user)
                //     setUserType(user)
    
    
                // });
        // }
     })
   
 }