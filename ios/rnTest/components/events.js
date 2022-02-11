import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View,TouchableOpacity ,FlatList} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import moment from 'moment'
import { useDispatch } from 'react-redux';





const events= (props,{currentUser}) => {
  const dispatch=useDispatch()
  
    const [fetchedEvents,setFetchedEvents]=useState()
    useEffect(()=>{
    FetchEvents()
      },[])
 
      const FetchEvents=()=>{
    console.log('user',auth().currentUser?.uid)
        firestore().collection('Events').where('uid','==',auth().currentUser?.uid)
      .onSnapshot((snapshot)=>{
        let arr=[]
        console.log('snapshot123',snapshot)
         const data=snapshot.docs.map(doc=>{
           const event=doc.data()
            console.log('data',event)
           
             arr.push(event)
            
           })
           setFetchedEvents(arr)
           dispatch({type:'USER_EVENTS_DATA',events:arr})
        })
      }
     
        // console.log('fetchedEvents',fetchedEvents)
  
  
    return (
        <View>
          <View style={{}}>
           
          </View>
          
               {props.event===true?
               <View style={{}}>
                    <TouchableOpacity 
               onPress={()=>props?.navigation.navigate('createEvents')}
                
               >
                   <View style={{flexDirection:'row',justifyContent:'center'}}>
                   <Text>Create New Event </Text>
                   <Icon name="pluscircleo" size={20} color="black" />
                   </View>
               </TouchableOpacity>
                <Text 
                style={
                  {fontSize:16,
                  fontWeight:'bold',
                  color:'#a16281',
                  justifyContent:'center',
                  alignSelf:'center',
                  padding:10,
                  marginTop:10}}>
                    Events</Text>
                <FlatList style={{alignSelf:'center',}}
               
                horizontal={false}
                data={fetchedEvents}
                keyExtractor={(item,index)=>index.toString()}
        
                renderItem={({item})=>{

                  // console.log('',item)

                  const date=item.DateOFEvent.toDate()
                  return(
                   
                      <View>
                        
                        <TouchableOpacity style={styles.Input} onPress={()=>props?.navigation.navigate('editEvents',{
                           nameOfEvent:item.nameOfEvent,
                           DateOFEvent:item.DateOFEvent.toDate(),
                           StartingTImeOFEvent:item.StartingTImeOFEvent.toDate(),
                           EndTimeOFEvent:item.EndTimeOFEvent.toDate(),
                           TypeOFEvent:item.TypeOFEvent,
                           IsPublic:item.IsPublic.toString(),
                           uid:item.uid,
                           EventId:item.EventId

                        })}>
                        <Text style={{fontSize:16,fontWeight:'bold',color:'#a16281',justifyContent:'center',alignSelf:'center'}}>
                        {moment(date).format("YYYY-MM-DD")}
                        -{item.nameOfEvent}-{item.TypeOFEvent}  </Text>
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
   


    export default events;

const styles = StyleSheet.create({
    Input:{
     
        padding:5,
        margin:5,
    
        alignSelf:'center',
        borderBottomWidth:2,
        borderBottomColor:'#a16281',
      
        
        
      
  
    },
})
