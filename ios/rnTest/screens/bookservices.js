import { StyleSheet, Text, View ,Image,FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import {connect} from 'react-redux'
import Icon from '../icons/icon'
import moment from 'moment'

import {FetchEvents} from '../components/events'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
const bookservices = (props) => {
  const nameOfService=props.navigation.getParam('serviceName')
  const price=props.navigation.getParam('priceOfService')
  const userName=props.navigation.getParam('userName')
  const image=props.navigation.getParam('profileImage')
  const serviceID=props.navigation.getParam('serviceId')


 const book=(item)=>{
      firestore().collection('bookings').doc(item.EventId).set({
         date:item.StartingTImeOFEvent,
         end:item.EndTimeOFEvent,
         owner:item.uid
      }).then(()=>{
        firestore().collection('bookings').doc(item.EventId).collection('etts').doc(serviceID).set({
          docId:serviceID,
          name:userName,
          price:price,
          type:nameOfService
         
        })
      })
      props.navigation.navigate('editEvents',{
        serviceId:serviceID
      })
 }

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center',margin:20}}>
        <Image source={{ uri: image }} style={styles.image} />

        <View style={{ padding:2,margin:2 }}>
          <Text style={{ fontWeight: 'bold', }}>{nameOfService}</Text>
          <Text style={{ color: '#fc8c03', marginTop:20}}>${price}</Text>
 
        </View>
        <Text style={{ marginBottom:35}}>{userName}</Text>
        
      </View>
    
   
        <View style={{alignItems:'center',justifyContent:'center',marginTop:50,borderTopWidth:5,padding:20}}>
        <Text style={{fontWeight:'bold',fontSize:18,marginBottom:10,marginTop:25}}>YOUR EVENTS:</Text>
   
      
      
      <View  style={{}}>
       <FlatList
            data={props.events}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              console.log('itemmmm', item)
              console.log('id',item.EventId)
              return (
                <View  style={{padding:4,flexDirection:'row',alignSelf:'center'}}>
                 
                  <Text style={{fontSize:16}}>
                    {moment(item.DateOFEvent).format( 'MMM Do')} -{item.nameOfEvent} |</Text>
                    <TouchableOpacity onPress={()=>book(item)}>
                      <View style={{flexDirection:'row'}}>
                      <Text style={{fontSize:16}}>Book</Text>
                      <Icon.AntDesign name='pluscircleo' size={15}/>
                      </View>
                    </TouchableOpacity>
                </View>
              )

            }}
          />

      </View>
     
        </View>
    </View>
  
  
      
 
   
  );
};
const mapStateToProps=(store)=>{
 
  console.log("store",store.eventState.events)

  return{
    currentUser:store.userState.currentUser,
    events:store.eventState.events
  }
}
// const mapDispatchProps =(dispatch)=>bindActionCreators({FetchEvents()},dispatch)
// export default connect( mapStateToProps, mapDispatchProps)(bookservices);

export default connect(mapStateToProps,null)(bookservices);

const styles = StyleSheet.create({
  image:{
    height:100,
    width:100,
    borderWidth:2,
    justifyContent:'center',
    alignItems:'center',
    borderColor:'black',
     
  }
});
