import { StyleSheet, Text, View ,TouchableOpacity,FlatList, Pressable,Modal,Alert} from 'react-native';
import React,{useEffect,useState} from 'react';
import moment from 'moment';
import Icon from '../icons/icon'
import {connect} from 'react-redux'
import auth from '@react-native-firebase/auth';

import firestore from '@react-native-firebase/firestore';


const editEvents = (props) => {
console.log('helllo')
console.log('props',props.navigation.state.params.etts)
  
    console.log('props::',props.bookings)
  
    
    const screenProps=props.navigation.state.params
    const name=screenProps.nameOfEvent
    const date=screenProps.DateOFEvent
    const starttime=screenProps.StartingTImeOFEvent
    const endtime=screenProps.EndTimeOFEvent
    const TypeOFEvent=screenProps.TypeOFEvent
     const EventId=screenProps.EventId
     const eventOwner=screenProps.uid
    const serviceId=props.navigation.getParam('serviceId')

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem,setSelectedItem]=useState()
    const [etts,setEtts]=useState()
    const [fetchedEvents,setFetchedEvents]=useState()
    const [booking,setBooking]=useState()
   
   


console.log('Eve--->',EventId)
console.log('serv--->',serviceId)
 console.log('nnn----',date<new Date())
 useEffect(()=>{
   fetchUserbookings()

 },[])


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
      })
      
      firestore().collection('Events').doc(EventId)
      .onSnapshot((snapshot)=>{
        console.log('sss--->',snapshot)
        if (snapshot.exists){
          let event=snapshot.data()
          console.log('ddd---',event.EventId)
          object.eventId=event.EventId,
          object.EventName=event.nameOfEvent,
        

          console.log('obj--',object)
          arr.push(object)
        }
        console.log('arr----->',arr)
        setBooking(arr)
      })
      
      
   
    }
   
    
  })

}


const ModalView= () => {
 
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Are you sure you want delete this service</Text>
            <View style={{flexDirection:'row',padding:5,margin:5}}>
       <Pressable
              style={[styles.button, styles.buttonClose]}
              // onPress={() => cancelService()}
              onPress={() =>cancelService() }
            >
              <Text style={styles.textStyle}>yes</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              // onPress={() => cancelService()}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>No</Text>
            </Pressable>
            </View>

          </View>
        </View>
      </Modal>
   
    </View>
  );
};
const past=()=>{
  
      Alert.alert('You Cannot Select Entertainment for your past Events')
  
  
 
   

}
console.log('selectedItem',selectedItem)


const cancelService=()=>{
if(selectedItem){
  console.log('ITtEm',selectedItem.eventId)
        firestore().collection('bookings').doc(selectedItem.eventId).collection('etts')
        .doc(selectedItem.artistId)
        .delete()
        .then(()=>{
          firestore().collection('bookings').doc(selectedItem.eventId)
          .delete()
        })
        firestore().collection('services').doc(selectedItem.artistId).collection('etts')
        .doc(selectedItem.eventId)
        .delete()
      
      
      setModalVisible(!modalVisible)}
}
   
const deleteEvent=()=>{
        firestore().collection('Events').doc(EventId)
        .delete()
        
        .then(()=>{
            console.log('deleted')
        })
      }
     
  
      console.log('bookings-->',booking)
      console.log('eeee',fetchedEvents)
  return (

    <View style={{flex:1,alignItems:'center'}} >
        {modalVisible?ModalView(selectedItem):null}
     
         
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
        {date<new Date()?  
        <TouchableOpacity 
        onPress={()=>past()}
        > 
         <View style={{flexDirection:'row',margin:10}}>
         
            <Text>Find Entertainment</Text>
            <Icon.AntDesign name='search1' size={20}/>
        </View>
        </TouchableOpacity>
   :       <TouchableOpacity 
            onPress={()=>props.navigation.navigate('Browse',{
              nameOfEvent:name,
              DateOFEvent: date,
              StartingTImeOFEvent:  starttime,
              EndTimeOFEvent:  endtime,
              TypeOFEvent:  TypeOFEvent,
              EventId:   EventId,
              eventOwner:eventOwner
      
   })}
   > 
      
       <View style={{flexDirection:'row',margin:10}}>
    
       <Text>Find Entertainment</Text>
      
   
     
       <Icon.AntDesign name='search1' size={20}/>
      
       </View>
     
   </TouchableOpacity>

        
        }    
        
 
      <FlatList

      data={booking}
      keyExtractor={(item,index)=>index.toString()}
      renderItem={({item})=>{
        setSelectedItem(item)
        console.log('list',item)
      
        return(
     
     
          <View style={{flexDirection:'row',}}>
           {item?item.status? 
            
          
             <View style={{flexDirection:'row'}}>
               <Text style={{fontWeight:'bold',padding:1,margin:1}}>{item.servicename}|</Text>
              <TouchableOpacity onPress={()=>{setModalVisible(true)}}>

             <Text style={{color:'red',padding:1,margin:1}}>{item.status}</Text>
             </TouchableOpacity>
          
              </View> 
               
             
        
             
           :null:null  }
        
      {item?item.status==='accepted'?
                <View>
                  <TouchableOpacity 
                  onPress={()=>{setEtts('service');props.navigation.navigate('CardForm',{
                   eventId:item.eventId,
                   eventName:item.EventName,
                   artistName:item.artistName,
                   artistId:item.artistId,
                   serviceName:item.servicename,
                   servicePrice:item.serviceprice,
                   status:item.status,
                   eventOwner:eventOwner,
                   etts:etts
                   


                  })}}
                  style={styles.paytab}>
                    <Text>pay</Text>
                  </TouchableOpacity>
                  </View>:null:null} 
          </View>
         )
                 

      }}
      />

        
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
 
  console.log("store",store)

  return{
    currentUser:store.userState.currentUser,
    events:store.eventState.events,
    bookings:store.bookingState.bookings
 
  }
}


export default connect(mapStateToProps,null)(editEvents);




const styles = StyleSheet.create({
  centeredView: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 22
},
modalView: {
  margin: 20,
  backgroundColor: "white",
  borderRadius: 20,
  padding: 35,
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5
},
button: {
  borderRadius: 20,
  padding: 10,
  margin:20,
  elevation: 2
},
// buttonOpen: {
//   backgroundColor: 'white',
// },
buttonClose: {
  backgroundColor: "#a16281",
},
textStyle: {
  color: "white",
  fontWeight: "bold",
  textAlign: "center"
},
modalText: {
  marginBottom: 15,
  textAlign: "center"
},
paytab:{
  backgroundColor:'#a16281',
  borderColor:'#a16281',
  borderWidth:2,
  paddingHorizontal:10,
  borderRadius:10,
  paddingVertical:2,
  marginHorizontal:2
}

});
