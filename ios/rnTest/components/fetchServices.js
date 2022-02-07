import { StyleSheet, Text, View,FlatList ,TouchableOpacity,Image} from 'react-native';
import React ,{useEffect,useState}from 'react';

import firestore from '@react-native-firebase/firestore';


const fetchServices = (props)=>{
      console.log("helo",props)
 const [services,setServices]=useState()
   useEffect(()=>{
     fetchServices()
      },[])

      const fetchServices=()=>{
        firestore().collection('services')
        .onSnapshot((snapshot)=>{
          console.log('snapshot',snapshot)
          if(!snapshot.empty){
            let arr=[]
            let services=snapshot.docs.map(doc=>{
              let data=doc.data()
              console.log('data',data.services)
              console.log('uid',data.userUid)
              let combineServices=data.services.map(Allservices=>{
                let obj={}
                console.log('Allservices',Allservices.type)
                obj.serviceType=Allservices.type,
                obj.price=Allservices.price
                // console.log('obj',obj)
                firestore().collection('users').doc(data.userUid)
                .get()
                .then((snapshot)=>{
                  console.log('snap',snapshot.data())
                  obj.name=snapshot.data().userName,
                  obj.image=snapshot.data().image
                  console.log('obj',obj)
                  arr.push(obj)
                  setServices(arr)
                })
          
              })
            
            })
          }
        })
      }      
      console.log('services',services)
   
   


   
  return (
    <View > 
        {props.services===true? 
          <View>
            <FlatList
            data={services}
            keyExtractor={(item,index)=>index.toString()}
            renderItem={({item})=>{
              console.log('item',item)
              return(
                <View style={{flex:1,}} >
               <TouchableOpacity style={{borderBottomWidth:2,padding:5,margin:5}}>
                 
                 <View style={{flexDirection:'row'}}>
                 <Image source={{ uri:item.image}} style={styles.image}/> 
                 <View style={{padding:5,margin:5}}>
                 <Text >{item.name}</Text>
                 <Text >{item.serviceType}</Text>
                 </View>
                 </View>
                 <View style={{justifyContent:'flex-end',alignItems:'flex-end'}}>
                   <Text style={{position:'absolute'}}>${item.price}</Text>
                 </View>
      

               </TouchableOpacity>
                </View>
              )

            }}
            />
          
          </View>
          :null}
    </View>
  );
};

export default fetchServices;

const styles = StyleSheet.create({
  image:{
    height:60,
    width:60,
    borderWidth:2,
    justifyContent:'center',
    alignItems:'center',
    borderColor:'black',
     
  }
});
