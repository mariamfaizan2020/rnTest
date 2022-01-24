
import React ,{useState}from 'react'
import auth from '@react-native-firebase/auth';
import { StyleSheet, Text, View ,TextInput,TouchableOpacity} from 'react-native'



const login = ({navigation}) => {
    const [email,setEmail]=useState('test2@gmail.com')
    const [password,setPassword]=useState('111111')

    const onSignIn=()=>{
        auth().signInWithEmailAndPassword(email,password)
        .then(()=>{
            console.log('USER IS LOGGED IN')
            navigation.navigate('tabs')
        })
    }
    
    return (
        <View style={{backgroundColor:'black',flex:1,justifyContent :'center',alighnItems:'center'}}>
    
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

export default login

const styles = StyleSheet.create({})
