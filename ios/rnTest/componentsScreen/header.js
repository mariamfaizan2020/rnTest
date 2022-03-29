import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from '../icons/icon'
import { TouchableOpacity } from 'react-native-gesture-handler'

const header = (props) => {
console.log('props',props)
  return (
    <View style={styles.header} >
      <View style={{}}>
      <TouchableOpacity style={{marginLeft:5}} onPress={()=>props.nav.goBack()}>
        <Icon.MaterialCommunityIcons  color="white" name='backburger' size={25} />
        </TouchableOpacity>
      </View>
     
        <View style={{justifyContent:'center',alignItems:'center'}}>
        <Text style={styles.headerText}>Back</Text>
        </View>
      
    </View>
  )
}

export default header

const styles = StyleSheet.create({
    header:{
      
        width:'100%',
        height:"8%",
        flexDirection:'row',
        alignItems:'center',
        // justifyContent:'center',
        backgroundColor:"#a16281",
        
     
    },
    headerText:{
        fontSize:20,
        fontWeight:'bold',
        color:"white",
       justifyContent:'center',
        alignItems:'center'
    }
})