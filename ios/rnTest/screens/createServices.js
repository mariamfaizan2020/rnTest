import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native';
import React from 'react';


const createServices = () => {
  return (
      <View style={{flex:1}}>
 <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
    <TouchableOpacity style={styles.Button}>
        <Text>DJ</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.Button}>
        <Text>SINGER</Text>
    </TouchableOpacity>
    
    <TouchableOpacity style={styles.Button}>
        <Text>MUSICIAN</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.Button}>
        <Text>REPPER</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.Button}>
        <Text>ABCD</Text>
    </TouchableOpacity>
      </View>
      </View>
     
  
  );
};

export default createServices;

const styles = StyleSheet.create({
    Button:{
        backgroundColor:'#a16281',
        borderColor:'#a16281',
        borderWidth:10,
        alignSelf:'center',
        marginTop:20,
        margin:4
     
        
    }
});
