import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from '../icons/icon'

const header = () => {
  return (
    <View style={styles.header}>
        <Icon.MaterialCommunityIcons name='backburger' size={25}/>
      <Text style={styles.headerText}>hello</Text>
    </View>
  )
}

export default header

const styles = StyleSheet.create({
    header:{
        width:'100%',
        height:"100%",
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
     
    },
    headerText:{
        fontSize:20,
        fontWeight:'bold',
        color:"#a16281"
    }
})