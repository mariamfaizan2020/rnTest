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
        style={styles.Button }
        >
          <TouchableOpacity style={{padding:10}}>
           <Text style={{fontSize:20,fontWeight:'bold',color:'#a16281',color:'white'}}>Venue</Text>
         </TouchableOpacity > 
         </View>
         <View  style={styles.Button }>
        <TouchableOpacity style={{padding:10}}>
           <Text style={{fontSize:20,fontWeight:'bold',color:'#a16281',color:'white'}}>Service</Text>
         </TouchableOpacity> 
         
        </View>
 
    </View>
  );
};

export default Browse;

const styles = StyleSheet.create({
    Button:{
    borderColor:'#a16281',
    width:'50%',
    borderWidth:3,
    backgroundColor:'#a16281',

    justifyContent:'center',
    alignItems:'center'
   

    }
});
