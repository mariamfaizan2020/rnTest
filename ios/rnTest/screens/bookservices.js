import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import Icon from '../icons/icon'
import moment from 'moment'



import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import events from '../components/events';

const bookservices = (props) => {
  const nameOfService = props.navigation.getParam('serviceName')
  const price = props.navigation.getParam('priceOfService')
  const userName = props.navigation.getParam('userName')
  const image = props.navigation.getParam('profileImage')
  const serviceID = props.navigation.getParam('serviceId')
  console.log('SERVICEID',serviceID)
  const [events, setEvents] = useState()


  useEffect(() => {
    const array = []

    props.events.map((x) => {
      console.log('x---',x)
      let obj = {}
      obj = x
   
      props.bookings.map(y => {
       console.log('y===',y)
       console.log('hello')
      
        if (y.eventId === x.EventId) {
          console.log("booking found",y.status)
            obj=x
            obj.status = y.status
  
           
        
       }
       
      

      })
      console.log('arr->',array)
      array.push(obj)


      setEvents(array)
    })



  }, [])
  console.log('array->', events)
  const book = (item) => {

    firestore().collection('bookings').doc(item.EventId).set({
      date:item.DateOFEvent,
      start: item.StartingTImeOFEvent,
      end: item.EndTimeOFEvent,
      owner: item.uid
    }).then(() => {
      firestore().collection('bookings').doc(item.EventId).collection('etts').doc(serviceID).set({
        docId: serviceID,
        name: userName,
        price: price,
        type: nameOfService,
        status: 'requested'

      })

    })
    props.navigation.navigate('editEvents',{
      serviceId:serviceID,
      EventId:item.EventId

    }

    )
  }

  console.log('bookedService', props.bookings)

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: 20 }}>
        <Image source={{ uri: image }} style={styles.image} />

        <View style={{ padding: 2, margin: 2 }}>
          <Text style={{ fontWeight: 'bold', }}>{nameOfService}</Text>
          <Text style={{ color: '#fc8c03', marginTop: 20 }}>${price}</Text>

        </View>
        <Text style={{ marginBottom: 35 }}>{userName}</Text>

      </View>


      <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 50, borderTopWidth: 5, padding: 20 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10, marginTop: 25 }}>YOUR EVENTS:</Text>



        <View style={{}}>
          <FlatList
            data={events}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              console.log('itemmmm', item)
              // console.log('id',item.EventId)
              return (

                <View style={{ padding: 4, flexDirection: 'row', alignSelf: 'center' }}>

                  <Text style={{ fontSize: 16 }}>
                    {moment(item.DateOFEvent).format('MMM Do')} -{item.nameOfEvent} |</Text>
                  {item.status==='requested'?<Text>Requested</Text>:  
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
          />

        </View>

      </View>
    </View>





  );
};
const mapStateToProps = (store) => {

  console.log("store-->", store)
  console.log("storeEvents", store.eventState.events)

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
