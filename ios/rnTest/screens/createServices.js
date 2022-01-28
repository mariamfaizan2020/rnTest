import { StyleSheet, Text, View ,TouchableOpacity,TextInput,FlatList} from 'react-native';
import React,{useState} from 'react';




const createServices = () => {

    const [serviceType,setServiceType]=useState()
    const [price,setPrice]=useState()

    const arr=[
        {Type:'DJ'},
        {Type:'SINGER'},
        {Type:'BAND'},
        {Type:'RAPPER'},
        {Type:'MUSICIAN'},
    ]
console.log('arrr',arr)
  return (
      <View style={{flex:1}}>
     <Text>hello</Text>
          <FlatList
        
          horizontal={false}
          data={arr}
          keyExtractor={(item,index)=>index.toString()}
          renderItem={({item})=>{
              console.log('item',item)
            return(
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:20}}>
                   <TouchableOpacity style={styles.Button} onPress={()=>{setServiceType(item.Type)}}>
                     <Text>{item.Type}</Text>
                      </TouchableOpacity>

                    </View>
            )
        }}/>
    <TextInput
    placeholder='price:$'
    value={price}
    onChnageText={(text)=>setPrice(text)}
    />
      
   
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
