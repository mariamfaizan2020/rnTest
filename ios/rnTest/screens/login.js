
import React ,{useEffect, useState}from 'react'
import auth from '@react-native-firebase/auth';
import { StyleSheet, Text, View ,TextInput,TouchableOpacity} from 'react-native'
import {fetchUser} from "../redux/actions/index"
import { useDispatch } from "react-redux";
import {connect} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
const login = ({navigation,currentUser}) => {
    const dispatch=useDispatch()
    const [email,setEmail]=useState('test3@gmail.com')
    const [password,setPassword]=useState('111111')



    useEffect(()=>{
        if(currentUserĀ ){
            navigation.navigate("tabs")
        }

    },[])
    const onSignIn=()=>{
        auth().signInWithEmailAndPassword(email,password)
        .then((user)=>{
            console.log('USER IS LOGGED IN')
              firestore().collection('users').doc(user.user.uid)
            .get().then((snapshot)=>{
             // .onSnapshot((snapshot)=>{
                 if(snapshot.exists){
                     console.log('snaps login',snapshot.data())
                     dispatch({type:'USER_STATE_CHANGE',currentUser:snapshot.data()})
                     navigation.navigate('tabs')
                 }else{
                     console.log('does not exist')
                 }
             })
            // dispatch(fetchUser(navigation))
        //   navigation.navigate('tabs')
        })
    }
    
    return (
        <View style={{backgroundColor:'#a16281',flex:1,justifyContent :'center',alighnItems:'center'}}>
    
          <View style={{justifyContent:'center',alignItems:'center',marginTop:5}}>
             <Text style={{color:'white'}}>EMAIL:</Text>
             <TextInput style={{borderWidth:2,width:'80%',color:"white",borderColor:'white'}}
               placeHolder={email}
               value={email}
               onChangeText={(email)=>setEmail(email)}
          />
          </View>
            <View style={{justifyContent:'center',alignItems:'center',marginTop:5}}>
         <Text style={{color:'white'}}>password:</Text>
          <TextInput style={{borderWidth:2,width:'80%',color:'white',borderColor:'white'}}
          placeHolder={password}
          value={password}
          secureTextEntry
          onChangeText={(password)=>setPassword(password)}
          />
          </View>
          <TouchableOpacity
           style={{padding:10 ,paddingLeft:20,paddingRight:20,borderWidth:2,margin:30,justifyContent:'center',alignSelf:'center',borderColor:'white'}}
           onPress={()=>onSignIn()}
          >
                   <Text style={{color:'white'}}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate('register')}>
              <Text style={{color:'white'}}>if not registered CLICK HERE!</Text>
          </TouchableOpacity>

        </View>
    )
}
const mapStateToProps=({userState})=>{
    




return {
    currentUser:userState.currentUser
}
}
export default connect(mapStateToProps,{fetchUser})(login);

const styles = StyleSheet.create({})
