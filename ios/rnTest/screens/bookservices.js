import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import Icon from '../icons/icon'
import moment from 'moment'
import Header from '../componentsScreen/header'


import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import events from '../componentsScreen/events';

const bookservices = (props) => {
  // console.log('props',props.navigation.state.params.etts)
  // console.log(props.navigation.getParam('etts'))
  const etts=props.navigation.getParam('etts')
  const nameOfService = props.navigation.getParam('serviceName')
  const price = props.navigation.getParam('priceOfService')
  const userName = props.navigation.getParam('userName')
  const image = props.navigation.getParam('profileImage')
  const serviceID = props.navigation.getParam('serviceId')
  const nameOfEvent=props.navigation.getParam('nameOfEvent')
  const EventId=props.navigation.getParam('EventId')
  const DateOFEvent=props.navigation.getParam('DateOFEvent')
  const start=props.navigation.getParam('StartingTImeOFEvent')
  const end=props.navigation.getParam('EndTimeOFEvent')
  const eventOwner=props.navigation.getParam('eventOwner')
  const TypeOFEvent=props.navigation.getParam('TypeOFEvent')
  console.log('SERVICEID',serviceID)
  const [status, setStatus] = useState()
  const [booking,setBooking]=useState()


  const fetchUserbookings=()=>{
  
   
    let object={}
    let arr=[] 
    firestore().collection('bookings').doc(EventId).collection('etts')
    
    .onSnapshot((snapshot)=>{
      console.log('snapshot--->',snapshot)
    
      if(!snapshot.empty){
      
        console.log('snapshot',snapshot)
    
             snapshot.docs.map(doc=>{
           let booking=doc.data()
               console.log('doc',booking)
               object.artistId=booking.docId,
               object.status=booking.status,
               object.servicename=booking.type,
               object.serviceprice=booking.price,
               object.artistName=booking.name
               console.log('data--->',object)
               setStatus(object.status)
        })
        
        firestore().collection('Events').doc(EventId)
        .onSnapshot((snapshot)=>{
          console.log('sss--->',snapshot)
          if (snapshot.exists){
            let event=snapshot.data()
            console.log('ddd---',event.EventId)
            object.eventId=event.EventId,
            object.EventName=event.nameOfEvent
            console.log('obj--',object)
            arr.push(object)
          }
          console.log('arr----->',arr)
          setBooking(arr)
        })
        
       
     
      }
     
      
    })
  
  }
  console.log('bookings',booking)
  useEffect(() => {
    fetchUserbookings()

    


  }, [])
  
  console.log('array->', events)
  console.log('ppp---',props.bookings)
  const book = () => {

    firestore().collection('bookings').doc(EventId).set({
      date:DateOFEvent,
      start: start,
      end: end,
      owner: eventOwner
    }).then(() => {
      firestore().collection('bookings').doc(EventId).collection('etts').doc(serviceID).set({
        docId: serviceID,
        name: userName,
        price: price,
        type: nameOfService,
        status: 'requested'

      }).then(()=>{
        firestore().collection('services').doc(serviceID).collection('etts').doc(EventId).set({
          date:DateOFEvent,
          name:nameOfEvent,
          start: start,
          end: end,
          owner: eventOwner,
          price: price,
          type: nameOfService,
          status: 'requested',
          EventId:EventId,
          serviceId:serviceID
        })
      })

    })
    props.navigation.navigate('editEvents',{
      serviceId:serviceID,
      EventId:EventId,
      etts:etts

    }

    )
  }

  console.log('bookedService', props.bookings)

  return (
    <View style={{flex:1,marginTop:40}}>
      <Header nav={props.navigation}/>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: 20 }}>
        <Image source={{ uri: image }} style={styles.image} />

        <View style={{ padding: 2, margin: 2 }}>
          <Text style={{ fontWeight: 'bold', }}>{nameOfService}</Text>
          <Text style={{ color: '#fc8c03', marginTop: 20 }}>${price}</Text>

        </View>
        <Text style={{ marginBottom: 35 }}>{userName}</Text>

      </View>


      <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 50, borderTopWidth: 5, padding: 20 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10, marginTop: 25 }}>YOUR EVENT:</Text>



        <View style={{}}>
        <View style={{ padding: 4, flexDirection: 'row', alignSelf: 'center' }}>

         <Text style={{ fontSize: 16 }}>
       {moment(DateOFEvent).format('MMM Do')} -{nameOfEvent} |</Text>
       {booking!==undefined?booking.find(x=>x.eventId===EventId)?<Text>{status}</Text>:
       <TouchableOpacity onPress={() => book()}>
         <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 16 }}>Book</Text>

        <Icon.AntDesign name='pluscircleo' size={15} /> 

       </View>
       </TouchableOpacity>:<TouchableOpacity onPress={() => book()}>
         <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 16 }}>Book</Text>

        <Icon.AntDesign name='pluscircleo' size={15} /> 

       </View>
       </TouchableOpacity>}
          {/* {events?events.status?<Text>Requested</Text>:  
      <TouchableOpacity onPress={() => book()}>
         <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 16 }}>Book</Text>

        <Icon.AntDesign name='pluscircleo' size={15} /> 

       </View>
       </TouchableOpacity> :<TouchableOpacity onPress={() => book()}>
         <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 16 }}>Book</Text>

        <Icon.AntDesign name='pluscircleo' size={15} /> 

       </View>
       </TouchableOpacity> 
 } */}



</View>

          {/* <FlatList
            data={events}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              console.log('itemmmm', item)
              // console.log('id',item.EventId)
              return (

                <View style={{ padding: 4, flexDirection: 'row', alignSelf: 'center' }}>

                  <Text style={{ fontSize: 16 }}>
                    {moment(item.DateOFEvent).format('MMM Do')} -{item.nameOfEvent} |</Text>
                  {item.status?<Text>Requested</Text>:  
                  <TouchableOpacity onPress={() => book(item)}>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ fontSize: 16 }}>Book</Text>

                      <Icon.AntDesign name='pluscircleo' size={15} />

                    </View>
                  </TouchableOpacity>
}

                

                </View>
              )

            }}
          /> */}

        </View>

      </View>
    </View>





  );
};
const mapStateToProps = (store) => {

  console.log("store-->", store)
  console.log("storeEvents", store.bookingState.bookings)

  return {
    currentUser: store.userState.currentUser,
    events: store.eventState.events,
    bookings: store.bookingState.bookings,
 

  }
}


export default connect(mapStateToProps, null)(bookservices);

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',

  }
});
