import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View,TouchableOpacity ,FlatList} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import moment from 'moment'



const events= (props) => {
    const [fetchedEvents,setFetchedEvents]=useState()
    useEffect(()=>{
        FetchEvent()
      },[])
      const FetchEvent=()=>{
         let arr=[]
        firestore().collection('Events').where('uid','==',auth().currentUser?.uid)
      .onSnapshot((snapshot)=>{
         const data=snapshot.docs.map(doc=>{
           const event=doc.data()
            console.log('data',event)
           
             arr.push(event)
            
           })
           setFetchedEvents(arr)
        })
      }
        console.log('fetchedEvents',fetchedEvents)
    
  
    return (
        <View>

           <TouchableOpacity 
           onPress={()=>{props.setEventFunction()}}
           style={{font:14,borderWidth:2,borderRadius:2,padding:10,margin:10}}
           >
               <Text>events</Text>
             
               </TouchableOpacity>
               {props.event===true?
               <View>
                    <TouchableOpacity 
               onPress={()=>props?.navigation()}
                // {props?.navigation.navigate('createEvents')}}
               >
                   <View style={{flexDirection:'row'}}>
                   <Text>Create New Event </Text>
                   <Icon name="pluscircleo" size={20} color="black" />
                   </View>
               </TouchableOpacity>
                <Text style={{fontSize:16,fontWeight:'bold',color:'#a16281',justifyContent:'center',alignSelf:'center',padding:10,marginTop:10}}>Events</Text>
                <FlatList style={{alignSelf:'center',}}
               
                horizontal={false}
                data={fetchedEvents}
                keyExtractor={(item,index)=>index.toString()}
        
                renderItem={({item})=>{
                  return(
                   
                      <View>
                        
                        <TouchableOpacity style={styles.Input} onPress={()=>navigation.navigate('editEvents',{
                           nameOfEvent:item.nameOfEvent,
                           DateOFEvent:item.DateOFEvent,
                           StartingTImeOFEvent:item.StartingTImeOFEvent,
                           EndTimeOFEvent:item.EndTimeOFEvent,
                           TypeOFEvent:item.TypeOFEvent,
                           IsPublic:item.IsPublic,
                           uid:item.uid,
                           EventId:item.EventId
                      
                        })}>
                        <Text style={{fontSize:16,fontWeight:'bold',color:'#a16281',justifyContent:'center',alignSelf:'center'}}>
                        {moment(item.DateOFEvent).format("YYYY-MM-DD")}-{item.nameOfEvent}-{item.TypeOFEvent}            </Text>
                        </TouchableOpacity>
                      </View>
                   
                  )
                
                }}
                />
                   </View>
                  

               
               :null}

        
        </View>
       
    )
           
    }
   


export default events

const styles = StyleSheet.create({
    Input:{
     
        padding:5,
        margin:5,
    
        alignSelf:'center',
        borderBottomWidth:2,
        borderBottomColor:'#a16281',
      
        
        
      
  
    },
})
