import { StyleSheet, Text, View ,TouchableOpacity,TextInput,FlatList, Alert} from 'react-native';
import React,{useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';





const createServices = (props) => {

    const [serviceType,setServiceType]=useState()
    const [price,setPrice]=useState(null)
    const [type,setType]=useState(false)
  console.log('ppp',props.navigation.state.params.service)
const ppp=props.navigation.state.params.service
    const arr=[
        {Type:'DJ'},
        {Type:'SINGER'},
        {Type:'BAND'},
        {Type:'RAPPER'},
        {Type:'MUSICIAN'},
    ]
    // let obj = ppp.find(o => o.service === );

    // console.log('obj',obj);
   
// const data=Object.values(ppp)
//     console.log('data',data)


  const validation=()=>{
      if(price===null){return(Alert.alert('mention the price please'))}
      serviceDetails()
  } 
  const serviceDetails=()=>{
     firestore().collection('services').add({
         service:serviceType,
         price:price,
         uid:auth().currentUser.uid
     }).then((res)=>{
         console.log('res',res)
         firestore().collection('services').doc(res.id).update({
             ServiceId:res.id
         })
     })
  }
            
console.log('arrr',arr)
console.log('price',price)
console.log('servicetype',serviceType)
  return (
      <View style={{marginTop:20}}>
  
          <FlatList
        
          horizontal={true}
    
          data={arr}
          keyExtractor={(item,index)=>index.toString()}
          renderItem={({item})=>{
              console.log('item',item.Type)
              const found=ppp.find(x=>x.service==item.Type)
              console.log("found",found)
           

              if(found){ 
                  return null
                }else{
                    return(
                
                        <View style={{  }}>
                         
                           <TouchableOpacity style={styles.Button} onPress={()=>{setServiceType(item.Type); setType(!type) }}>
                             <Text style={{}}>{item.Type}</Text>
                            
                              </TouchableOpacity>
                     
        
                            </View>
                    )
                }


        }}/>
   {type===true?      <View>
                      <TextInput   style={{borderRadius:2,borderColor:'#969590',borderWidth:5,backgroundColor:'#969590',}}             
                        placeholder='price:$'
                        placeholderTextColor='white'
                        value={price}
                        keyboardType='numeric'
                       onChangeText={(text)=>setPrice(text)}
                        />
                        <TouchableOpacity onPress={()=>validation()}
                        style=
                        {{backgroundColor:'#a16281',borderColor:'#a16281',borderWidth:12,alignSelf:'center',width:'60%',marginTop:10}}> 
                            <View>
                            <Text style={{alignSelf:'center',fontSize:18}}>create Service</Text>

                            </View>
                        </TouchableOpacity>
                        </View>
                        :null
                         }
   
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
        margin:4,
   
        
    }
});
