

import { USER_LOGOUT } from '../constants';

 export function Logout(navigation){
    return((dispatch)=>{
        
              dispatch({type:USER_LOGOUT})
              navigation.navigate('login')
            }
            )}
            

