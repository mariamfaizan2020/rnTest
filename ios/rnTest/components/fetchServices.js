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
        // fetchUsers()
        fetchServices()

    },[])
    // const fetchUsers=()=>{
    //     firestore().collection('users')
       
    //     .onSnapshot((snapshot)=>{
    //         let arr=[]
    //         let array=[]
    //         console.log('ALLUSRES',snapshot)
    //          snapshot.docs.map(doc=>{
    //            let data=doc.data()
    //            console.log('data',data)
            
    //            arr.push(data)
    //            console.log('arr',arr)
              
    //         })
    //         setUsers(arr)
    //            Object.values(arr).map(object=>{
    //               console.log('obj',object.uid) 
    //               let useruid=object.uid
    //              array.push(useruid)
    //             console.log('abcd',array)
                
    //            })
              
    //            setUidU(array) 
    //     })   
            
       

    // }
    // console.log('UIDU',uidU)
    
    // console.log('users',users)
const fetchServices=()=>{
    firestore().collection('services')
    .onSnapshot((snapshot)=>{
        // let arr=[]
        let array=[]
        console.log('ALLSRVICES',snapshot)
       let service= snapshot.docs.map(doc=>{
            let data=doc.data()
            console.log('data',data.uid)
            // arr.push(data)
            // console.log('arr',arr)
            Object.values(data.uid).map(object=>{
              // console.log('obj',object.uid) 
              let serviceuid=object.uid
             array.push(serviceuid)
            console.log('xyz',array)
            
           })
          
         })
       
        .
        
          firestore().collection('users').where('uid','==',array)
          .onSnapshot((snapshot)=>{
            console.log('USERSNAPSHOT',snapshot)
          
          

         
      })
        //  setUidS(array)
        setServices(arr)
    })
  
}
// console.log('UIDS',uidS)
console.log('SERVICES',services)
console.log('props',props)
  return (
    <View > 
        {props.services===true? 
          <View>
            {uidU==uidS}?<Text></Text>
          </View>:null}
    </View>
  );
};

export default fetchServices;

const styles = StyleSheet.create({});
