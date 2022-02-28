import { StyleSheet, Text, View ,TouchableOpacity,FlatList, Pressable,Modal} from 'react-native';
import React,{useEffect,useState} from 'react';
import moment from 'moment';
import Icon from '../icons/icon'
import {connect} from 'react-redux'
// import Modal from "react-native-modal";

import firestore from '@react-native-firebase/firestore';

const editEvents = (props) => {

 
    console.log('props::',props)
  
 
    const screenProps=props.navigation.state.params
    const name=screenProps.nameOfEvent
    const date=screenProps.DateOFEvent
    const starttime=screenProps.StartingTImeOFEvent
    const endtime=screenProps.EndTimeOFEvent
    const TypeOFEvent=screenProps.TypeOFEvent
     const EventId=screenProps.EventId
    const serviceId=props.navigation.getParam('serviceId')
    const [id,setId]=useState() 
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem,setSelectedItem]=useState()

  
   
  //  console.log('serviceIDD',props.navigation.getParam('serviceId'))
   console.log('id111',EventId)

 console.log('screenProps::',screenProps)
 useEffect(()=>{
   const array=[]

   props.events.map(doc=>{
     let obj={}
     obj.EventId=doc.EventId,
      obj.EventName=doc.nameOfEvent
    console.log('AAA',obj.EventId) 
    if(props.bookings.find(x=>x.eventId===obj.EventId)){
      props.bookings.map(y=>{
        obj.ArtistId=y.artistId,
        obj.Status=y.status
      })
    }
    
    
   
    array.push(obj)
    setId(array)
  })
 },[])
console.log('id',id)

const ModalView= (selectedItem) => {
 
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
       <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => cancelService(selectedItem)}
            >
              <Text style={styles.textStyle}>Delete</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
   
    </View>
  );
};
const cancelService=(selectedItem)=>{
  console.log('ITEm',selectedItem)
    firestore().collection('bookings').doc(selectedItem.EventId).delete()
     .then(()=>{
        firestore().collection('bookings').doc(selectedItem.EventId).collection('etts')
        .doc(selectedItem.ArtistId)
        .delete()
       
      })
      setModalVisible(!modalVisible)
}
   
const deleteEvent=()=>{
        firestore().collection('Events').doc(EventId)
        .delete()
        .then(()=>{
            console.log('deleted')
        })
      }
     
  

    
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
            
        <TouchableOpacity 
        onPress={()=>props.navigation.navigate('Browse')}
        > 
           
            <View style={{flexDirection:'row',margin:10}}>
         
            <Text>Find Entertainment</Text>
           
        
          
            <Icon.AntDesign name='search1' size={20}/>
           
            </View>
          
        </TouchableOpacity>
        <FlatList

        data={id}
        keyExtractor={(item,index)=>index.toString()}
        renderItem={({item})=>{
          console.log('temp',item.Status)
          console.log('eventID',EventId)
          console.log('events',props.events)
         console.log('bookings',props.bookings.find(x=>x.eventId===item.EventId))
          return(
       
            <View>
             

               {item.Status==='requested'? 
               <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontWeight:'bold',padding:1,margin:1}}>{item.EventName}|</Text>
                 <TouchableOpacity onPress={()=>{setModalVisible(true);setSelectedItem(item)}}>

                <Text style={{color:'red',padding:1,margin:1}}>{item.Status}</Text>
                </TouchableOpacity>
                
                </View> 
                 :null
              }
            
             
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
 
  console.log("store",store.bookingState.bookings)

  return{
    currentUser:store.userState.currentUser,
    events:store.eventState.events,
    bookings:store.bookingState.bookings
 
  }
}


export default connect(mapStateToProps,null)(editEvents);


// export default editEvents;

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
  elevation: 2
},
buttonOpen: {
  backgroundColor: "#F194FF",
},
buttonClose: {
  backgroundColor: "#2196F3",
},
textStyle: {
  color: "white",
  fontWeight: "bold",
  textAlign: "center"
},
modalText: {
  marginBottom: 15,
  textAlign: "center"
}

});
