import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native';
import React,{useEffect,useState} from 'react';
import moment from 'moment';
import Icon from '../icons/icon'
import {connect} from 'react-redux'

import firestore from '@react-native-firebase/firestore';

const editEvents = (props) => {

 
    console.log('props::',props)
  
 
    const screenProps=props.navigation.state.params
    const name=screenProps.nameOfEvent
    const date=screenProps.DateOFEvent
    const starttime=screenProps.StartingTImeOFEvent
    const endtime=screenProps.EndTimeOFEvent
    const TypeOFEvent=screenProps.TypeOFEvent
    // const ispublic=screenProps.IsPublic
    // const  uid=screenProps.uid
    const EventId=screenProps.EventId

   console.log('type',props.bookings)
   let abc=Object.values(props.bookings).map(x=>{
    console.log('abc',abc)
   })
   
   

 console.log('screenProps::',screenProps.nameOfService)
  

   
const deleteEvent=()=>{
        firestore().collection('Events').doc(EventId)
        .delete()
        .then(()=>{
            console.log('deleted')
        })
      }
     
  

  return (
    <View style={{flex:1,alignItems:'center'}} >
       <View style={{borderBottomColor:'#a16281',width:'100%',borderBottomWidth:3,}}>
       <Text style={{fontSize:16,fontWeight:'bold',color:'#a16281',justifyContent:'center',alignSelf:'center',marginBottom:10,marginTop:15}}>
            {name} - {TypeOFEvent}
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
           
        
          
            <Icon.AntDesign name='search1' size={20}/>
           
            </View>
          
        </TouchableOpacity>
        <Text>{}|requested</Text>
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
const mapStateToProps=(store)=>{
 
  console.log("store",store.bookingState.bookings)

  return{
    currentUser:store.userState.currentUser,
    events:store.eventState.events,
    bookings:store.bookingState.bookings
 
  }
}


export default connect(mapStateToProps,null)(editEvents);


// export default editEvents;

const styles = StyleSheet.create({});
