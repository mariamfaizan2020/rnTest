import { StyleSheet, Text, View } from 'react-native';
import React ,{useEffect,useState}from 'react';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const fetchServices = (props)=>{

    const [users,setUsers]=useState()
    const [services,setServices]=useState()
    useEffect(()=>{
        fetchUsers()
        fetchServices()

    },[])
    const fetchUsers=()=>{
        firestore().collection('users')
       
        .onSnapshot((snapshot)=>{
            let arr=[]
            console.log('ALLUSRES',snapshot)
             snapshot.docs.map(doc=>{
               let data=doc.data()
               console.log('data',data)
            
               arr.push(data)
               console.log('arr',arr)
              
            })
            // setUsers(arr)
               let user=Object.values(arr).map(object=>{
                  console.log('obj',object.uid) 
               })
          
        })

    }
    
    console.log('users',users)
const fetchServices=()=>{
    firestore().collection('services')
    .onSnapshot((snapshot)=>{
        let arr=[]
        console.log('ALLSRVICES',snapshot)
        snapshot.docs.map(doc=>{
            let data=doc.data()
            console.log('data',data.uid)
            arr.push(data)
            console.log('arr',arr)
           
         })
         setServices(arr)
    })
}
console.log('SERVICES',services)
console.log('props',props)
  return (
    <View > 
        {props.services===true?
      <Text></Text>
     :null}
    </View>
  );
};

export default fetchServices;

const styles = StyleSheet.create({});
