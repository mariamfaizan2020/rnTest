import React from 'react'
import { StyleSheet, Text, View ,FlatList,TouchableOpacity} from 'react-native'


const flatlist = (props) => {
   
   console.log('props',props)
  
    return (
        <View style={{justifyContent:'center',alignItems:'center'}}>
             <FlatList 

numColumns={3}
horizontal={false}
data={props.array}
keyExtractor={(item,index)=>index.toString()}
renderItem={({item})=>{

    return(
        <View>
           <TouchableOpacity 
           style={[styles.Input,{borderColor:props.Type==item.Type ?'#a16281':'black',borderWidth:2}]} 
           onPress={()=>props.setTypeFunction(item.Type)}>
              <Text style={{alignSelf:'center'}}>{item.Type}</Text>
           </TouchableOpacity>
            </View>
    )
}}
/>
        </View>
    )
}

export default flatlist

const styles = StyleSheet.create({
    Input:{
        borderWidth:2,
        BOrderColor:'Black',
        padding:5,
        margin:5,
        width:80,
    
        alignSelf:'center'

    },
})
