
import React ,{useState}from 'react'
import auth from '@react-native-firebase/auth';
import { StyleSheet, Text, View ,TextInput,TouchableOpacity} from 'react-native'
import { NavigationContext } from 'react-navigation';


const login = ({navigation}) => {
    const [email,setEmail]=useState('test2@gmail.com')
    const [password,setPassword]=useState('111111')

    const onSignIn=()=>{
        auth().signInWithEmailAndPassword(email,password)
        .then(()=>{
            console.log('USER IS LOGGED IN')
            navigation.navigate('main')
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
          <TouchableOpacity onPress={()=>navigation.navigate('register')}>
              <Text>if not registered CLICK HERE!</Text>
          </TouchableOpacity>

        </View>
    )
}

export default login

const styles = StyleSheet.create({})
