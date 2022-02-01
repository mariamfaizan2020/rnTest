import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect ,useState} from 'react';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { TouchableOpacity } from 'react-native-gesture-handler';


const Browse = () => {
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
               console.log('data',data.uid)
               arr.push(data)
               console.log('arr',arr)
              
            })
            setUsers(arr)
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
  return (
    <View style={{flexDirection:'row'}}>
        <View 
        >
          <TouchableOpacity style={{padding:10}}>
           <Text style={{fontSize:20,fontWeight:'bold',color:'#a16281'}}>Venue</Text>
         </TouchableOpacity > 
         </View>
         <View >
        <TouchableOpacity style={{padding:10}}>
           <Text style={{fontSize:20,fontWeight:'bold',color:'#a16281'}}>Service</Text>
         </TouchableOpacity> 
         
        </View>
 
    </View>
  );
};

export default Browse;

const styles = StyleSheet.create({
    Button:{flexDirection:'row',
    borderBottomColor:'#a16281',
    width:'100%',
    borderBottomWidth:3,
    padding:5,
    margin:15,
    justifyContent:'center',
    alignItems:'center'
   

    }
});
