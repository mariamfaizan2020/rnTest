import React,{useEffect,useState} from 'react';
import { StyleSheet, Text, View ,TextInput,TouchableOpacity,Image} from 'react-native';

import {connect, useDispatch} from 'react-redux'
import { fetchUser, Logout } from '../redux/actions/index';
// import { bindActionCreators } from 'redux'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icon from '../icons/icon'
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';







const profile = ({currentUser,navigation}) => {
  const [userName,setUserName]=useState(currentUser?.userName)
  const [userType,setUserType]=useState(currentUser?.type)
  const [selectType,setSelectType]=useState(false)
  const [image,setImage]=useState('')
  const dispatch=useDispatch()
  

console.log('user',currentUser)
console.log('userName',userName)

const onEdit=()=>{
   firestore().collection('users').doc(auth().currentUser.uid).update({
     userName:userName,
     type:userType,
    //  image
   })
}

const pickAndUploadImage = async () => {
   
        
  let result = await launchImageLibrary({
    mediaType: 'photo',

    aspect: [1, 1],
    quality: 1,
  });

  console.log("uriiiiii",result);


  if (!result.cancelled) {
    setImage(result.assets[0].uri);
  }
  const response=await fetch(result.assets[0].uri);
 
  const blob= await response.blob();

  const task=await storage().ref('users/').child(`${auth().currentUser.uid}/${Math.random.toString(36)}`)
  task.put(blob).then(async(res)=>{
    console.log('res',res)

      let imageURL=await task.getDownloadURL()
      firestore().collection('users').doc(auth().currentUser.uid)
      .set({image:imageURL},{merge:true})
      console.log("fb img",imageURL)

      return imageURL
     
  })
  console.log("task",task)

  

  };


console.log("currentUser",currentUser)
const LogOut=()=>{
  auth().signOut().then(()=>{
    console.log('loggedOut')
    // navigation.navigate('login')
    dispatch(Logout(navigation))
  })
}

  return (
   
    <View>
      
 <View style={{justifyContent:'flex-end',alignItems:'flex-end',marginTop:15,marginRight:10}}>
      <TouchableOpacity onPress={()=>LogOut()}>
        <Icon.AntDesign name='logout' size={25}/>
      </TouchableOpacity>
    </View>
 
    <View style={{justifyContent:'center',alignItems:'center',marginTop:15}}>
     
        <TouchableOpacity style={styles.image}
        onPress={()=>{pickAndUploadImage()}}>
          <View>
                
     {
      currentUser?.image? 
      // image ? 
      <Image source={{ uri:currentUser?.image}} style={styles.image}/> :<Icon.FontAwesome name='user' size={170} color='grey'/>}
      {/* // <Icon  type ="AntDesign" name="user" size={150} color= 'black' */}
      {/* //       />} */}
            
            
            </View>
   
        </TouchableOpacity>
     <TextInput style={styles.InputFields}
     value={currentUser?.email}
     editable={false}/>
     <TextInput  style={styles.InputFields}
     value={userName}
     onChangeText={(text)=>setUserName(text)}/>
     <TouchableOpacity style={styles.Input}
     onPress={()=>setSelectType(!selectType)}>
       <Text>{userType?.toUpperCase()}</Text>
     </TouchableOpacity>
     
     

{selectType?
  <View style={{justifyContent :'center',alighnItems:'center',flexDirection:'row'}}>
     
      
  <TouchableOpacity style={{padding:10,borderWidth:2,margin:10}}
      onPress={()=>setUserType('standard')}
     >
          <Text>STANDARD</Text>
      </TouchableOpacity> 
       <TouchableOpacity style={{padding:10,borderWidth:2,margin:10}} 
         onPress={()=>setUserType('artists')}>
          <Text>ARTISTS</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{padding:10,borderWidth:2,margin:10}}
         onPress={()=>setUserType('buisness')}>
          <Text>BUISNESS</Text>
      </TouchableOpacity>
</View> 
: null}
     <View>
     <TouchableOpacity onPress={()=>onEdit()}>
       <View style={{flexDirection:'row',marginTop:20}}> 
         <Text style={{fontSize:20,fontWeight:'bold'}}> EDIT</Text>
         <Icon.FontAwesome name="user" size={22} color='grey' />
     </View>
    </TouchableOpacity>
    {userType==='artists'?
       <View style={{marginTop:20}}> 
       <TouchableOpacity onPress={()=>navigation.navigate('artistbks')}>
        <Text style={{fontSize:20,fontWeight:'bold'}}>YOUR BOOKINGS</Text>
       </TouchableOpacity>
       </View>:null}
   
     </View>

   
    </View>
    </View>
  );
};
const styles=StyleSheet.create({
  InputFields:{
    borderWidth:2,
    padding:5,
    margin:10,
    width:'60%',
   textAlign:'center'
  },
  Input:{
    borderWidth:2,
    padding:5,
    margin:10,
    width:'60%',
    justifyContent:'center',
    alignItems:'center'

  },
  image:{
    height:200,
    width:200,
    borderWidth:2,
    justifyContent:'center',
    alignItems:'center',
    borderColor:'black',
     borderRadius:360
  }
})
const mapStateToProps=(store)=>{
  console.log("store profile",store)
  return{
    currentUser:store.userState.currentUser
  }
}
// const mapDispatchProps=(dispatch)=>bindActionCreators({fetchUser},dispatch)

export default connect(mapStateToProps,null)(profile);



