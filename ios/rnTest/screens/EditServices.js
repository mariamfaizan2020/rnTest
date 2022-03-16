
import { StyleSheet, Text, View ,TextInput,TouchableOpacity} from 'react-native';
import React,{useState} from 'react';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import services from '../componentsScreen/services';


const EditServices = (props) => {
    const [price,setPrice]=useState(`${props.navigation.state.params.price}` || '')
    // const [arr,setArr]=useState()
    console.log('propas',props.navigation.state.params)
    const item=props.navigation.state.params
    const type=props.navigation.state.params.type
    const fetchedServices=props.navigation.state.params.fetchedServices

    const onEdit=()=>{
      console.log("fetced")

      const newArr = fetchedServices.map(obj => {
        if (obj.type === type) {
          return {...obj, price: price};
        }
      
        return obj;
      });

      console.log("newww--------->",newArr)
          firestore().collection('services').doc(auth().currentUser.uid)
          .update({
            services:newArr})
        

         
    }

    const onDelete=()=>{

      let obj=[...fetchedServices]
      console.log('obj',obj)
      
      
      let filter;
   
        filter=obj.filter(found=>found.type!==type)
       console.log('filter',filter)
      //  setArr(filter)
       firestore().collection('services').doc(auth().currentUser.uid)
       .update({
         services:filter
       })
       .then(()=>{
         console.log('Userdelete')
         props?.navigation.navigate('tabs')
       })
       
    //  }
     }




      
      
      
       
  
    
  return (
    <View 
    style={{margin:10,padding:10,  justifyContent:'center',
    alignItems:'center'}}
    >
      
      <TextInput  
      style={styles.Button} 
  
      value={item.type}
      editable={false}
      />
      <View style={{flexDirection:'row'}}>
     <View style={{flexDirection:'row', borderWidth:3,
          borderRadius:2,
          borderColor:'#969590',
          backgroundColor:'#969590',
          width:'80%',
          margin:10}}>
     <TextInput
      style={
        {fontSize:16,
          color:'white',
          fontWeight:'bold',
         
        }}
      
       value='$'
       editable={false}
       >
         </TextInput>
     
      <TextInput
      style={
        {fontSize:16,
          color:'white',
          fontWeight:'bold',
          
        }}
        placeholder='$'
       value={price}
       onChangeText={(text)=>setPrice(text)}>
      

           </TextInput>
     </View>
      
          
      </View>
     
           <View style={{flexDirection:'row',padding:10,}}>
           <TouchableOpacity  
           onPress={()=>onEdit()}
           style={{backgroundColor:'#a16281',borderColor:'#a16281',borderWidth:12,padding:5,margin:10}}>
               <Text style={{alignSelf:'center',color:'white'}}>EDIT SERVICE</Text>
           </TouchableOpacity>
           <TouchableOpacity 
              onPress={()=>onDelete()}
           style={{backgroundColor:'#a16281',borderColor:'#a16281',borderWidth:12,padding:5,margin:10}}>
               <Text style={{alignSelf:'center',color:'white'}}>DELETE SERVICE</Text>
           </TouchableOpacity>
           </View>
         
    </View>
    
  );
};

export default EditServices;

const styles = StyleSheet.create({
    Button:{
        backgroundColor:'#a16281',
        borderColor:'#a16281',
        borderWidth:10,
        alignSelf:'center',
        marginTop:20,
        margin:4,
   
        
    }
});
