import { StyleSheet, Text, View } from 'react-native'
import React ,{ useEffect,useState }from 'react'
import firestore from '@react-native-firebase/firestore';
import moment from 'moment'
import { TouchableOpacity } from 'react-native-gesture-handler';


const reqservdetails = (props) => {
    console.log('props',moment(props?.navigation?.state?.params?.requestedServices.date).format("YYYY-MM-DD"))
    const details=props?.navigation?.state?.params?.requestedServices
    const date=details.date.toDate()
    const start=details.start.toDate()
    const end=details.end.toDate()
    const [userName,setUserName]=useState()
    useEffect(()=>{
        fetchUserName()
    },[])
    const fetchUserName=()=>{
       firestore().collection('users').doc(details.owner)
       .get()
       .then((snapshot)=>{
           console.log('snapp-->',snapshot)
           if(snapshot.exists){
            let userName=snapshot.data().userName
               console.log('username',userName)
               setUserName(userName)
           }
          
       })
    }
    console.log('userr',userName)
  return (
     
    <View style={{flex:1,alignItems:'center',marginTop:50}}>
        
    
     <Text style={styles.heading}>DETAILS OF EVENT</Text>
      <Text style={styles.textStyle}>Event Host:<Text style={styles.textStyle2}>{userName}</Text></Text>
      <Text style={styles.textStyle}>Event Name:<Text style={styles.textStyle2}>{details.name}</Text></Text>
      <Text style={styles.textStyle}>Starts on <Text style={styles.textStyle2}>{moment(date).format("YYYY-MM-DD")} </Text>at  <Text style={styles.textStyle2}>{moment(start).format("hh:mm A")}</Text></Text>
      <Text style={styles.textStyle}>Ends on {moment(date).format("YYYY-MM-DD")} at  {moment(end).format("hh:mm A")}</Text>
     <TouchableOpacity>
         <Text>BACK</Text>
     </TouchableOpacity>

    </View>
  )
}

export default reqservdetails

const styles = StyleSheet.create({
    heading:{
        padding:5,
        margin:5,
        fontSize:25,
        fontWeight:'bold',
        color:'#541629'

    },
    textStyle:{
        padding:5,
        margin:5,
        fontSize:20,
        fontWeight:'bold',
        color:'#a16281'
    },
    textStyle2:{
        padding:5,
        margin:5,
        fontSize:20,
        color:'#541629',
        fontWeight:'normal'
    }
})