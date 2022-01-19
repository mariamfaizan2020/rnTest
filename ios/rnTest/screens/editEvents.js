import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import moment from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';

const editEvents = (props) => {
    console.log('props::',props.navigation.state.params)
 
    const screenProps=props.navigation.state.params
    const name=screenProps.nameOfEvent
    const date=screenProps.DateOFEvent
    const starttime=screenProps.StartingTImeOFEvent
    const endtime=screenProps.EndTimeOFEvent
    const type=screenProps.TypeOFEvent
    const ispublic=screenProps.IsPublic
    const  uid=screenProps.uid
    const EventId=screenProps.EventId
    console.log('screenProps::',screenProps)
  return (
    <View style={{flex:1}} >
        <Text style={{fontSize:16,color:'#a16281',justifyContent:'center',alignSelf:'center',marginBottom:10,pading:10,marginTop:15}}>
            Name: {name}
        </Text>
        <Text style={{fontSize:16,color:'#a16281',margin:10,pading:10}}>
        Date:  {moment(date).format("YYYY-MM-DD")}
        </Text>
        <View style={{margin:10,pading:10}}>
        <Text style={{fontSize:16,color:'#a16281'}} >
         startTime:  {moment(starttime).format("hh:mm A")}
         </Text> 
         <Text style={{fontSize:16,color:'#a16281'}} >

         EndTime:   {moment(endtime).format("hh:mm A")}
        
         </Text>

        </View>
        <View style={{margin:10,pading:10}}> 
        <Text style={{fontSize:16,color:'#a16281',}}>
            Type:  {type}
        </Text>
        <Text style={{fontSize:16,color:'#a16281',}}>
            IsPublic:  {ispublic.toString()}
        </Text>
        </View>
        <View style={{flexDirection:'row',padding:10,margin:15}}>
        <TouchableOpacity 
        style={{backgroundColor:'#a16281',borderColor:'#a16281',borderWidth:12,padding:5,margin:10}}
        onPress={()=>props.navigation.navigate('createEvents')}
        >
            <Text style={{alignSelf:'center',color:'white'}}>EDIT EVENT</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor:'#a16281',borderColor:'#a16281',borderWidth:12,padding:5,margin:10}}>
            <Text style={{alignSelf:'center',color:'white'}}>DELETE EVENT</Text>
        </TouchableOpacity>
       
        </View>
       
      
    </View>
  );
};

export default editEvents;

const styles = StyleSheet.create({});
