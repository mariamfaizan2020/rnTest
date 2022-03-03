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
    const [bookservices,setBookservices]=useState()


  
    useEffect(()=>{
    FetchEvents()
  
      },[])
 
      const FetchEvents=async()=>{
        let array=[]
      
       
    console.log('user',auth().currentUser?.uid)
       await firestore().collection('Events').where('uid','==',auth().currentUser?.uid)
      .onSnapshot(async(snapshot)=>{
       
       
        console.log('snapshot123',snapshot)
         const data=snapshot.docs.map(async(doc)=>{
           const event=doc.data()
            console.log('data',event.EventId)
        
    
             array.push(event)
             dispatch({type:'USER_EVENTS_DATA',events:array})

             let arr=[]
           await  firestore().collection('bookings').doc(event.EventId)
             .collection('etts')
           
             .onSnapshot(async(snapshot)=>{
              console.log('bookings fetching----->',snapshot)
              if(!snapshot.empty){
               
                let x=snapshot.docs.map(doc=>{
                  const data=doc.data()
                  console.log('data----',data)
              
                  let obj={
                    EventName:event.nameOfEvent,
                    artistId:data.docId,
                    eventId:event.EventId,
                    service:data.type,
                    price:data.price,
                    status:data.status,
                    Artistname:data.name

                  }
                  console.log('arr booking fetch',obj)
                  arr.push(obj)
                  console.log("ar------------------>",arr)
                  dispatch({type:'USER_BOOKINGS_DATA',bookings:arr})
                })
                console.log('abcdefgh',arr)
                setBookservices(arr)
                
              }
            
             })
            
           })
       
         
         console.log('xxxxx----->',array)
           setFetchedEvents(array)
         
        })
      }


  console.log('bookings',bookservices)
   console.log('evenst',fetchedEvents)  
  
  
  
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

                  // const date=item.DateOFEvent.toDate()
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
                           EventId:item.EventId,
                           

                        })}>
                        <Text style={{fontSize:16,fontWeight:'bold',color:'#a16281',justifyContent:'center',alignSelf:'center'}}>
                        {moment(item.DateOFEvent.toDate()).format("YYYY-MM-DD")}
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
