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
    // fetchbookedServices()
      },[])
 
      const FetchEvents=async()=>{
    console.log('user',auth().currentUser?.uid)
       await firestore().collection('Events').where('uid','==',auth().currentUser?.uid)
      .onSnapshot(async(snapshot)=>{
        let array=[]
        let arr=[]
        console.log('snapshot123',snapshot)
         const data=snapshot.docs.map(async(doc)=>{
           const event=doc.data()
            console.log('data',event.EventId)
        
    
             array.push(event)
             dispatch({type:'USER_EVENTS_DATA',events:array})


           await  firestore().collection('bookings').doc(event.EventId)
             .collection('etts')
             .get()
             .then((snapshot)=>{
              console.log('snapshott111',snapshot)
              if(!snapshot.empty){
              
                let x=snapshot.docs.map(doc=>{
                  const data=doc.data()
                  console.log('data',data)
                  arr.push(data)
                })
                console.log('arr',arr)
              }
              dispatch({type:'USER_BOOKINGS_DATA',bookings:arr})
             })
            
           })
           setBookservices(arr)
           setFetchedEvents(array)
         
        })
      }
  //         const fetchbookedServices=()=>{
       
  //        firestore().collection('bookings').doc(eventId)
      
  //        .collection('etts')
  //       .onSnapshot((snapshot)=>{
  //         console.log('snapshott111',snapshot)
            
  //            if(!snapshot.empty){
  //                let arr=[]
  //                console.log('hellll')
  //                let x=snapshot.docs.map(doc=>{
  //                const data=doc.data()
  //                  console.log('data',data.type)
  //                  setType(data.type)
  //                  arr.push(data)
                   
  //                })
                
  //                setBookservices(arr)
  //                dispatch({type:'USER_BOOKED_SERVICES',bookedServices:arr})
                 
   
      //    }
      // )          }
      // }

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
