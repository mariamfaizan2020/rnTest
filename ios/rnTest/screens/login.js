
import React ,{useState}from 'react'
import auth from '@react-native-firebase/auth';
import { StyleSheet, Text, View ,TextInput,TouchableOpacity} from 'react-native'


const login = () => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const onSignIn=()=>{
        auth().signInWithEmailAndPassword(email,password)
        .then(()=>{
            console.log('USER IS LOGGED IN')
        })
    }
    
    return (
        <View style={{flex:1,justifyContent :'center',alighnItems:'center'}}>
    
          <View style={{justifyContent:'center',alignItems:'center',marginTop:5}}>
             <Text>EMAIL:</Text>
             <TextInput style={{borderWidth:2,width:'80%',}}
               placeHolder={email}
               value={email}
               onChangeText={(email)=>setEmail(email)}
          />
          </View>
            <View style={{justifyContent:'center',alignItems:'center',marginTop:5}}>
         <Text>password:</Text>
          <TextInput style={{borderWidth:2,width:'80%',}}
          placeHolder={password}
          value={password}
          secureTextEntry
          onChangeText={(password)=>setPassword(password)}
          />
          </View>
          <TouchableOpacity
           style={{padding:10 ,paddingLeft:20,paddingRight:20,borderWidth:2,margin:30,justifyContent:'center',alignSelf:'center'}}
           onPress={()=>onSignIn()}
          >
                   <Text>LOGIN</Text>
          </TouchableOpacity>

        </View>
    )
}

export default login

const styles = StyleSheet.create({})
