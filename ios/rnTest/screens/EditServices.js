
import { StyleSheet, Text, View ,TextInput,TouchableOpacity} from 'react-native';
import React,{useState} from 'react';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


const EditServices = (props) => {
    const [price,setPrice]=useState(`$${props.navigation.state.params.price}` || '$')
    console.log('propas',props.navigation.state.params.price)
    const item=props.navigation.state.params

    const onEdit=()=>{
          firestore().collection('services').doc(props.navigation.state.params.serviceId)
          .update({
            price:price
          }).then(()=>{
            console.log('userUpdated')
            props?.navigation.navigate('tabs')
          })
          
    }

    const onDelete=()=>{
      console.log('serviceIIDDD',props.navigation.state.params.serviceId)
      firestore().collection('services').doc(props.navigation.state.params.serviceId)
      .delete()
      .then(()=>{
        console.log('Userdelete')
        props?.navigation.navigate('tabs')
      })
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
     
      <TextInput
      style={
        {fontSize:16,
          color:'white',
          fontWeight:'bold',
          borderWidth:3,
          borderRadius:2,
          borderColor:'#969590',
          backgroundColor:'#969590',
          width:'80%',
          margin:10
        }}
       value={price}
       onChangeText={(text)=>setPrice(text)}>

           </TextInput>
          
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
