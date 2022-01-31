
import { StyleSheet, Text, View ,TextInput} from 'react-native';
import React,{useState} from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';


const EditServices = (props) => {
    const [price,setPrice]=useState()
    console.log('propas',props.navigation.state.params.serviceId)
    const item=props.navigation.state.params
  return (
    <View>
      <TextInput  
      value={item.service}
      editable={false}
      />
      <TextInput
       value={item.price}
      onChnageText={(text)=>setPrice(text)}>
           </TextInput>
           <View style={{flexDirection:'row',margin:10,padding:10}}>
           <TouchableOpacity>
               <Text>EDIT SERVICE</Text>
           </TouchableOpacity>
           <TouchableOpacity>
               <Text>DELETE SERVICE</Text>
           </TouchableOpacity>
           </View>
         
    </View>
    
  );
};

export default EditServices;

const styles = StyleSheet.create({});
