import React,{useState} from 'react'
import { StyleSheet, Text, View,TextInput,TouchableOpacity,Alert} from 'react-native'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const registerScreen = ({navigation}) => {
    const [userName,setUserName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [repeatpassword,setRepeatPassword]=useState('')
    const [type,setType]=useState(null)

    const Validation=()=>{
        if(!userName){return Alert.alert('Please enter userName')}
        if(!email){return Alert.alert('Please enter email')}
        if(!password){return Alert.alert('Please enter password')}
        if(!repeatpassword){return Alert.alert('Please enter  Repeat password')}
        if(password!==repeatpassword){return  Alert.alert('PASSWORDS MUST BE MATCHED')}
        if(type===null){return Alert.alert('Please Select Your Type')}
        else {
            onSignUp()
        }

    }

    const onSignUp=()=>{
        auth().createUserWithEmailAndPassword(email,password)
        .then((result)=>{
            firestore().collection('users')
            .doc(auth().currentUser.uid)
            .set({
                userName,
                email,
                password,
                type
            })
            .then((result)=>{
                console.log('resuilt',result)
            })
            .catch((err)=>{
                console.log('err',err)
                alert(err)
            })
        }).catch((error)=>{
            console.log('error',error)
            alert(error)
           
        })
        
       
    }
   
    return (
       
        <View style={{flex:1,justifyContent :'center',alighnItems:'center'}}>
            
        <View style={{justifyContent :'center',alighnItems:'center',flexDirection:'row'} }>
            <TouchableOpacity style={{padding:10,borderWidth:2,margin:10}}
            onPress={()=>setType('standard')}
           >
                <Text>STANDARD</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{padding:10,borderWidth:2,margin:10}}
               onPress={()=>setType('artists')}>
                <Text>ARTISTS</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{padding:10,borderWidth:2,margin:10}}
               onPress={()=>setType('buisness')}>
                <Text>BUISNESS</Text>
            </TouchableOpacity>
        </View>
            <View style={{marginTop:5,justifyContent:'center',alignItems:'center'}}>
         <Text>USERNAME:</Text>
          <TextInput style={{borderWidth:2,width:'80%',}}
          placeHolder={userName}
          value={userName}
          onChangeText={(userName)=>setUserName(userName)}
          />


            </View>
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
            <View style={{justifyContent:'center',alignItems:'center',marginTop:5}}>
         <Text>Repeat password:</Text>
          <TextInput style={{borderWidth:2,width:'80%',}}
          placeHolder={repeatpassword}
          value={repeatpassword}
          secureTextEntry
          onChangeText={(repeatpassword)=>setRepeatPassword(repeatpassword)}
          />
           </View>
          
           <TouchableOpacity 
           style={{padding:10 ,paddingLeft:20,paddingRight:20,borderWidth:2,margin:30,justifyContent:'center',alignSelf:'center'}}
           onPress={()=> {Validation();navigation.navigate('login')}}            
           >
               <Text>NEXT</Text>
           </TouchableOpacity>


         
        </View>
    )
}

export default registerScreen

const styles = StyleSheet.create({})
