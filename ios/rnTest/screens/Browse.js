import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native';
import React, { useEffect ,useState} from 'react';
import Header from '../componentsScreen/header'
import FetchServices from '../componentsScreen/fetchServices';


const Browse = (props) => {
 
  console.log('ppp',props)
const [Serv,setServ]=useState(false)
const [etts,setEtts]=useState()
 
  return (
    <View style={{flex:1,marginTop:20}}>
      <Header nav={props.navigation}/>
      <View style={{flexDirection:"row",}}>
        <View style={styles.Button}>  
        <TouchableOpacity >
           <Text style={{fontSize:20,fontWeight:'bold',color:'#a16281',color:'white'}}>Venue</Text>
         </TouchableOpacity > 
         </View>
         <View style={styles.Button}>
         <TouchableOpacity 
        onPress={()=>{setServ(!Serv)}}>
           <Text style={{fontSize:20,fontWeight:'bold',color:'#a16281',color:'white'}}>Service</Text>
           
         </TouchableOpacity> 
        
        </View>
      </View>
       
       

        <View style={{flex:1}}>
        <FetchServices
       services={Serv}
      //  navigation={navigation}
       props={props}
       etts={etts}

  
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
