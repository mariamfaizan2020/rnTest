
import { StyleSheet, Text, View ,TextInput} from 'react-native';
import React,{useState} from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';


const EditServices = (props) => {
    const [price,setPrice]=useState(props.navigation.state.params.price)
    console.log('propas',props.navigation.state.params.serviceId)
    const item=props.navigation.state.params
  return (
    <View style={{margin:10,padding:10}}>
      <TextInput  style={styles.Button} 
  
      value={item.service}
      editable={false}
      />
      <TextInput
      style={{fontSize:16,color:'white',fontWeight:'bold',borderWidth:3,borderRadius:2,borderColor:'#969590',backgroundColor:'#969590'}}
       value={price}
       onChangeText={(text)=>setPrice(text)}>
          
           </TextInput>
           <View style={{flexDirection:'row',margin:10,padding:10}}>
           <TouchableOpacity  style={{backgroundColor:'#a16281',borderColor:'#a16281',borderWidth:12,padding:5,margin:10}}>
               <Text style={{alignSelf:'center',color:'white'}}>EDIT SERVICE</Text>
           </TouchableOpacity>
           <TouchableOpacity  style={{backgroundColor:'#a16281',borderColor:'#a16281',borderWidth:12,padding:5,margin:10}}>
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
