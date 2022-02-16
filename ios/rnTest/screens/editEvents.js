import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native';
import React,{useEffect,useState} from 'react';
import moment from 'moment';
import Icon from '../icons/icon'
import { useDispatch } from 'react-redux';

import firestore from '@react-native-firebase/firestore';

const editEvents = (props) => {
    const dispatch=useDispatch()
 
    console.log('props::',props)
    const [bookEvents,setBookEvents]=useState()
 
    const screenProps=props.navigation.state.params
    const name=screenProps.nameOfEvent
    const date=screenProps.DateOFEvent
    const starttime=screenProps.StartingTImeOFEvent
    const endtime=screenProps.EndTimeOFEvent
    const type=screenProps.TypeOFEvent
    const ispublic=screenProps.IsPublic
    const  uid=screenProps.uid
    const EventId=screenProps.EventId
    const serviceID=screenProps.serviceID
 console.log('screenProps::',screenProps)
 
 useEffect(()=>{
    fetchbookevents()
},[])
   
const deleteEvent=()=>{
        firestore().collection('Events').doc(EventId)
        .delete()
        .then(()=>{
            console.log('deleted')
        })
      }
     
      const fetchbookevents=()=>{
       
         firestore().collection('bookings').doc(EventId)
         .collection('etts')
        .onSnapshot((snapshot)=>{
             console.log('snapshott',snapshot)
            
             if(!snapshot.empty){
                 let arr=[]
                 console.log('hellll')
                 let x=snapshot.docs.map(doc=>{
                 const data=doc.data()
                   console.log('data',data.type)
                   arr.push(data.type)
                   
                 })
                 setBookEvents(arr)
                 dispatch({type:'USER_BOOKED_EVENTS',bookedevents:arr})
             }
         })
      }
  console.log(bookEvents,'123334')
  return (
    <View style={{flex:1,alignItems:'center'}} >
       <View style={{borderBottomColor:'#a16281',width:'100%',borderBottomWidth:3,}}>
       <Text style={{fontSize:16,fontWeight:'bold',color:'#a16281',justifyContent:'center',alignSelf:'center',marginBottom:10,marginTop:15}}>
            {name} - {type}
        </Text>
       </View>
       
       <View  style={{borderBottomColor:'#a16281',width:'100%',borderBottomWidth:3,}}> 
       <Text style={{fontSize:14,color:'#a16281',marginTop:10,alignSelf:'center'}}>
              Starts on {moment(date).format("YYYY-MM-DD")} at  {moment(starttime).format("hh:mm A")}
        </Text>
        <Text style={{fontSize:14,color:'#a16281',marginBottom:10,alignSelf:'center'}} >
             Ends on {moment(date).format("YYYY-MM-DD")} at {moment(endtime).format("hh:mm A")}
         </Text>
       </View>
       
        

         <View style={{borderBottomColor:'#a16281',width:'100%',borderBottomWidth:3,padding:5,margin:15,justifyContent:'center',alignItems:'center'}}>
         <Text style={{fontSize:20,fontWeight:'bold',color:'#a16281'}}>Entertainment:</Text>
            
        <TouchableOpacity 
        onPress={()=>props.navigation.navigate('Browse')}
        > 
           
            <View style={{flexDirection:'row',margin:10}}>
            <Text>Find Entertainment</Text>
             <Text></Text>
            <Icon.AntDesign name='search1' size={20}/>
           
            </View>
          
        </TouchableOpacity>
         </View>
    
        <View style={{flexDirection:'row',padding:10,margin:15}}>
        <TouchableOpacity 
        style={{backgroundColor:'#a16281',borderColor:'#a16281',borderWidth:12,padding:5,margin:10}}
        onPress={()=>props.navigation.navigate('createEvents',{

             name:props.navigation.state.params.nameOfEvent,
             date:props.navigation.state.params.DateOFEvent,
             starttime:props.navigation.state.params.StartingTImeOFEvent,
             endtime:props.navigation.state.params.EndTimeOFEvent,
             type:props.navigation.state.params.TypeOFEvent,
             ispublic:props.navigation.state.params.IsPublic,
             uid:props.navigation.state.params.uid,
             EventId:props.navigation.state.params.EventId
        })}
        >
           
            <Text style={{alignSelf:'center',color:'white'}}>EDIT EVENT</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor:'#a16281',borderColor:'#a16281',borderWidth:12,padding:5,margin:10}}
         onPress={()=>deleteEvent()}>
            
            <Text style={{alignSelf:'center',color:'white'}}>DELETE EVENT</Text>
        </TouchableOpacity>
       
        </View>
       
      
    </View>
  );
};

export default editEvents;

const styles = StyleSheet.create({});
