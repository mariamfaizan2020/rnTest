import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native';
import React from 'react';
import moment from 'moment';

import firestore from '@react-native-firebase/firestore';

const editEvents = (props) => {
    console.log('props::',props.navigation.state.params)
 
    const screenProps=props.navigation.state.params
    const name=screenProps.nameOfEvent
    const date=screenProps.DateOFEvent.toDate()
    const starttime=screenProps.StartingTImeOFEvent.toDate()
    const endtime=screenProps.EndTimeOFEvent.toDate()
    const type=screenProps.TypeOFEvent
    const ispublic=screenProps.IsPublic
    const  uid=screenProps.uid
    const EventId=screenProps.EventId
    console.log('screenProps::',screenProps)

    const deleteEvent=()=>{
        firestore().collection('Events').doc(EventId)
        .delete()
        .then(()=>{
            console.log('deleted')
        })
      }
  
  return (
    <View style={{flex:1,alignItems:'center'}} >
        <Text style={{fontSize:16,fontWeight:'bold',color:'#a16281',justifyContent:'center',alignSelf:'center',marginBottom:10,marginTop:15}}>
            Name: {name}
        </Text>
        <Text style={{fontSize:16,fontWeight:'bold',color:'#a16281',margin:10,}}>
        Date: {moment(date).format("YYYY-MM-DD")}
        </Text>
        <View style={{margin:10,padding:10}}>
        <Text style={{fontSize:16,color:'#a16281',fontWeight:'bold'}} >
         startTime:  {moment(starttime).format("hh:mm A")}
         </Text> 
         <Text style={{fontSize:16,color:'#a16281',fontWeight:'bold'}} >

         EndTime:   {moment(endtime).format("hh:mm A")}
        
         </Text>

        </View>
        <View style={{margin:10,padding:10}}> 
        <Text style={{fontSize:16,color:'#a16281',fontWeight:'bold'}}>
            Type:  {type}
        </Text>
        <Text style={{fontSize:16,color:'#a16281',fontWeight:'bold'}}>
            IsPublic:  {ispublic.toString()}
        </Text>
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
