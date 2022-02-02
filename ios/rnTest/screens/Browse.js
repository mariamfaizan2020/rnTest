import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect ,useState} from 'react';

import { TouchableOpacity } from 'react-native-gesture-handler';
import FetchServices from '../components/fetchServices';


const Browse = () => {

const [Serv,setServ]=useState(false)
   
  return (
    <View style={{flex:1}}>
      <View style={{flexDirection:"row",}}>
        <View style={styles.Button}>  
        <TouchableOpacity >
           <Text style={{fontSize:20,fontWeight:'bold',color:'#a16281',color:'white'}}>Venue</Text>
         </TouchableOpacity > 
         </View>
         <View style={styles.Button}>
         <TouchableOpacity 
        onPress={()=>setServ(!Serv)}>
           <Text style={{fontSize:20,fontWeight:'bold',color:'#a16281',color:'white'}}>Service</Text>
           
         </TouchableOpacity> 
        
        </View>
      </View>
       
       

        <View style={{flex:1}}>
        <FetchServices
       services={Serv}
  
       />    
        </View>
      
  </View>
  );
}
export default Browse;

const styles = StyleSheet.create({
    Button:{
    
    borderColor:'#a16281',
    width:'50%',
    padding:10,
    justifyContent:'center',
    alignItems:'center',
    borderWidth:3,
    backgroundColor:'#a16281',
    

   
   

    }
});
