import { StyleSheet, Text, View } from 'react-native';
import React ,{useEffect,useState}from 'react';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const fetchServices = (props)=>{

    const [users,setUsers]=useState()
    const [services,setServices]=useState()
    const [uidU,setUidU]=useState()
    const [uidS,setUidS]=useState()
    useEffect(()=>{
        fetchUsers()
        fetchServices()

    },[])
   
const fetchServices=()=>{
    firestore().collection('services')
    .onSnapshot((snapshot)=>{
      console.log('snapshot',snapshot)
      if(!snapshot.empty){
  
        let services=snapshot.docs.map(doc=>{
          let data=doc.data()
          console.log('data',data.services)
        
          setUidU(data.userUid)
          setServices(data.services)
        })
     
      }
    })
  }  
  console.log('serv',services)
  console.log('uid',uidU)
          
  const fetchUsers=()=>{
    firestore().collection('users').where('uid','==',uidU)
    .get()
    .then((snapshot)=>{
      console.log('sss',snapshot)
    })
  }

         
   
  return (
    <View > 
        {props.services===true? 
          <View>
          <Text>hello</Text>
          </View>:null}
    </View>
  );
};

export default fetchServices;

const styles = StyleSheet.create({});
