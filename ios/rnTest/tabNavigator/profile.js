import { StyleSheet, Text, View ,TextInput} from 'react-native';
import React,{useEffect,useState} from 'react';
import {connect, useDispatch} from 'react-redux'
import { fetchUser } from '../redux/actions/index';
import { bindActionCreators } from 'redux'
import { useDerivedValue } from 'react-native-reanimated';


const profile = ({currentUser}) => {
  const [userName,setUserName]=useState(currentUser?.userName)
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(fetchUser())
  },[])
console.log('user',currentUser)
  return (
    <View>
     <TextInput
     value={currentUser?.email}
     editable={false}/>
     <TextInput
     value={userName}
     onChangeText={(text)=>setUserName(text)}/>


     
    </View>
  );
};
const mapStateToProps=(store)=>{
  console.log("store",store)
  return{
    currentUser:store.userState.currentUser
  }
}
// const mapDispatchProps=(dispatch)=>bindActionCreators({fetchUser},dispatch)

export default connect(mapStateToProps,null)(profile);



