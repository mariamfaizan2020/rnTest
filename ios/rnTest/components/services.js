
import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, View ,TouchableOpacity,FlatList} from 'react-native'
import Icon from '../icons/icon'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const services = (props) => {
    const [fetchedServices,setFetchedServices]=useState()
    const [serviceId,setServiceId]=useState()
    useEffect(()=>{
        fetchServices()
    },[])
 const fetchServices=()=>{
    firestore().collection('services').doc(auth().currentUser.uid)
    .onSnapshot((snapshot)=>{
        console.log("snap",snapshot)
        if(snapshot.exists){
            setFetchedServices(snapshot.data().services)
            setServiceId(snapshot.data().userUid)
        }
        
    })
    
 }
 console.log('serviceId',serviceId)
 console.log('serv',fetchedServices)  
    return (
        <View>

          
               {
               props. services==true?
                <View>
                   <TouchableOpacity onPress={()=>props?.navigation.navigate('createServices',
                   {
                       service:fetchedServices
                   }
                  
                     
                   )}>
                       <View style={{flexDirection:'row',justifyContent:'center'}}>
                       <Text style={{marginTop:5}}>Add New Services</Text>
                       <Icon.Entypo name='plus' size={20} color="black" />
                       </View>
                   </TouchableOpacity>
                  <Text style={{fontSize:16,fontWeight:'bold',color:'#a16281',justifyContent:'center',alignSelf:'center',marginTop:20}}> Servies</Text>
                  <FlatList
                  horizontal={false}
                  data={fetchedServices}
                  keyExtractor={(item,index)=>index.toString()}
                  renderItem={({item})=>{
                      console.log('itemhere',item)
                      return(
                          <View>
                              <TouchableOpacity  style={styles.Input} onPress={()=>props?.navigation.navigate('EditServices',{
                                  type:item.type,
                                  price:item.price,
                                  serviceId:serviceId
                                  
                              })}>
                                  <Text style={{fontSize:16,fontWeight:'bold',color:'#a16281',justifyContent:'center',alignSelf:'center'}}
                                  >{item.type}</Text>
                              </TouchableOpacity>
                              </View>
                      )
                  }}
                  />
                    </View>
                      : null
            }

            
        </View>
    )
}

export default services

const styles = StyleSheet.create({
    Input:{
         
        padding:5,
        margin:5,
        alignSelf:'center',
        borderBottomWidth:2,
        borderBottomColor:'#a16281',
        width:'50%'
      
        
        
      
  
    },
})
