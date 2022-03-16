import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import moment from 'moment'
import { connect, useDispatch } from 'react-redux';





const events = (props, { currentUser }) => {
  const dispatch = useDispatch()

  const [fetchedEvents, setFetchedEvents] = useState()
  const [bookservices, setBookservices] = useState()
  const [pastEvents,setPastEvents]=useState()
  const [upcomingEvents,setUpcomingEvents]=useState()



  useEffect(() => {
    FetchEvents()

  }, [])

  const FetchEvents = async () => {
    let array = []
    let pE=[]
    let upE=[]
    await firestore().collection('Events').where('uid', '==', auth().currentUser?.uid)
   .onSnapshot((snapshot) => {
      console.log('my eve', snapshot)
      if(!snapshot.empty){

    
     
        const data = snapshot.docs.map(async (doc) => {
          const event = doc.data()

          console.log('eID--', event.DateOFEvent.toDate()<new Date())
        
            
              console.log('doc-->',doc)
             if(event.DateOFEvent.toDate()<new Date()===true){
            
             
               console.log('events--',event)
               pE.push(event)  
               setPastEvents(pE)
              
              
               console.log('pE---->',pE)
             
             }else {
               upE.push(event)
               setUpcomingEvents(upE)
             }
           
           
       
          array.push(event)
          dispatch({ type: 'USER_EVENTS_DATA', events: array })

         

      

        }
        )
      }
        console.log('xxxxx----->', array)
        setFetchedEvents(array)

      })
  }

    useEffect(()=>{
      if(fetchedEvents?.length>0){
        fetchBks()
      }
      
    },[fetchedEvents])

    
  const fetchBks=async()=>{
    let arr=[]  
    fetchedEvents.map(event=>{
      
      console.log("efce--->",event)

    firestore().collection('bookings')
      .doc(event.EventId)
      .collection('etts')
      
      .onSnapshot(async (snapshot) => {
        console.log("iddd--->",event.EventId)
        console.log('bookings fetching----->', snapshot)
        if (!snapshot.empty) {
          
         
          let x = snapshot.docs.map(doc => {
            const data = doc.data()
            console.log('data of bks----', data)
  
            let obj = {
              EventName: event.nameOfEvent,
              artistId: data.docId,
              eventId: event.EventId,
              service: data.type,
              price: data.price,
              status: data.status,
              Artistname: data.name
  
            }
            console.log('arr booking fetch', obj)
            let find=props.bookings.find(x=>x.eventId==event.EventId)
            console.log("find redux",find)
            console.log("bookings-=---> redux",props.bookings)
            // if(find){
  
            // }else{
              arr.push(obj)
            // }
            
            console.log("ar------------------>", arr)
            dispatch({ type: 'USER_BOOKINGS_DATA', bookings: arr })
           

          })
      
         
  
          // })
  
          setBookservices(arr)
  
        }
  
      })
    })
  
  }
  
  console.log('pastEvents-->',pastEvents)
  console.log('upcomingEvents',upcomingEvents)
  console.log('bookings', bookservices)
  console.log('evenst', fetchedEvents)



  return (
    
    <View>
      <View style={{}}>
  

      </View>

      {props.event === true ?
        <View style={{}}>
          <TouchableOpacity
            onPress={() => props?.navigation.navigate('createEvents')}

          >
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Text>Create New Event </Text>
              <Icon name="pluscircleo" size={20} color="black" />
            </View>
          </TouchableOpacity>
          <Text
            style={
              {
                fontSize: 16,
                fontWeight: 'bold',
                color: '#a16281',
                justifyContent: 'center',
                alignSelf: 'center',
                padding: 10,
                marginTop: 5
              }}>
            Past Events</Text>
          <FlatList style={{ alignSelf: 'center', }}

            horizontal={false}
            data={pastEvents}
            keyExtractor={(item, index) => index.toString()}

            renderItem={({ item }) => {

              console.log('',item)

              const date=item.DateOFEvent.toDate()
              return (

                <View>

                  <TouchableOpacity style={styles.Input} onPress={() => props?.navigation.navigate('editEvents', {
                    nameOfEvent: item.nameOfEvent,
                    DateOFEvent: item.DateOFEvent.toDate(),
                    StartingTImeOFEvent: item.StartingTImeOFEvent.toDate(),
                    EndTimeOFEvent: item.EndTimeOFEvent.toDate(),
                    TypeOFEvent: item.TypeOFEvent,
                    IsPublic: item.IsPublic.toString(),
                    uid: item.uid,
                    EventId: item.EventId,


                  })}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#a16281', justifyContent: 'center', alignSelf: 'center' }}>
                      {moment(date).format("YYYY-MM-DD")}
                      -{item.nameOfEvent}-{item.TypeOFEvent}  </Text>
                  </TouchableOpacity>
                </View>

              )

            }}
          />
           <Text
            style={
              {
                fontSize: 16,
                fontWeight: 'bold',
                color: '#a16281',
                justifyContent: 'center',
                alignSelf: 'center',
                padding: 10,
                marginTop: 5
              }}>
           upcoming Events</Text>
           <FlatList style={{ alignSelf: 'center', }}

horizontal={false}
data={upcomingEvents}
keyExtractor={(item, index) => index.toString()}

renderItem={({ item }) => {

  console.log('',item)

  const date=item.DateOFEvent.toDate()
  return (

    <View>

      <TouchableOpacity style={styles.Input} onPress={() => props?.navigation.navigate('editEvents', {
        nameOfEvent: item.nameOfEvent,
        DateOFEvent: item.DateOFEvent.toDate(),
        StartingTImeOFEvent: item.StartingTImeOFEvent.toDate(),
        EndTimeOFEvent: item.EndTimeOFEvent.toDate(),
        TypeOFEvent: item.TypeOFEvent,
        IsPublic: item.IsPublic.toString(),
        uid: item.uid,
        EventId: item.EventId,


      })}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#a16281', justifyContent: 'center', alignSelf: 'center' }}>
          {moment(date).format("YYYY-MM-DD")}
          -{item.nameOfEvent}-{item.TypeOFEvent}  </Text>
      </TouchableOpacity>
    </View>

  )

}}
/>
        </View>



        : null}


    </View>

  )

}


const mapStateToProps=(store)=>{
 
  console.log("store",store.bookingState.bookings)

  return{
    currentUser:store.userState.currentUser,
    events:store.eventState.events,
    bookings:store.bookingState.bookings
 
  }
}


export default connect(mapStateToProps,null)(events);
// export default events;

const styles = StyleSheet.create({
  Input: {

    padding: 5,
    margin: 5,

    alignSelf: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#a16281',





  },
})
