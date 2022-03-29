
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import auth from '@react-native-firebase/auth';
import Events from '../componentsScreen/events'
import Services from '../componentsScreen/services';
import Venue from '../componentsScreen/venue';
import {connect,useDispatch} from 'react-redux';
import moment from 'moment'
import firestore from '@react-native-firebase/firestore';


const main = ({currentUser, navigation,bookings}) => {
    const [userType, setUserType] = useState('')
    const [event, setEvent] = useState(true)
    const [services, setServices] = useState(false)
    const [venue, setVenue] = useState(false)
    const [requestedServices,setRequestedServices]=useState()
    const dispatch=useDispatch()
   
  
   useEffect(()=>{
    if(currentUser?.type==='artists'){fetchingRequestedServices()}
   },[])
  
 

    const setEventF=()=>{
        setEvent(true)
        setVenue(false)
        setServices(false)
    }
    const setServicesF=()=>{
        setEvent(!event)
        setVenue(false)
        setServices(!services)
    }
    const setVenueF=()=>{
        setEvent(!event)
        setVenue(!venue)
        setServices(false)
    }
    const fetchingRequestedServices=()=>{
       
        firestore().collection('services').doc(currentUser?.uid).collection('etts')
     
        .onSnapshot((snapshot)=>{
            let arr=[]
            console.log('snappp-->',snapshot)
            if(!snapshot.empty){
                console.log(snapshot,'snapppp')
               let requestedServices=snapshot.docs.map(doc=>{
                  const  data=doc.data()
                  console.log('datttta',data.status)
                    console.log('data-->',moment(data.date).format('YYYY-MM-DD'))
                    if(data.status==='requested'){
                    arr.push(data)}
                    console.log('arr',arr)
                }
               
                )
                
            }
            setRequestedServices(arr)  
        })
    }
    console.log('requestedServices',requestedServices)
   console.log('abcd',currentUser)
   if(currentUser?.type==='artists'){console.log('type',currentUser?.type)}
    return (
        
        <View style={{flex:1,marginTop:30}}>
           
           
         <View style={{flexDirection:'row',justifyContent:'center'}}>
             <TouchableOpacity 
               onPress={()=>{setEventF()}}
               style={{fontSize:14,borderWidth:2,
                      borderRadius:2,padding:10,margin:10,
                      height:40,width:80
                       }} >
               <Text>events</Text>
               </TouchableOpacity>

               {currentUser?.type == 'artists' ?
               <TouchableOpacity 
                 style={{fontSize:14,borderWidth:2,
                         borderRadius:2,padding:10,margin:10,
                         height:40,width:80}}
                 onPress={()=>setServicesF()} >
                <Text>services</Text>
                </TouchableOpacity>
                :null
                }
                 {currentUser?.type == 'buisness' ?
                 <TouchableOpacity 
                   style={{fontSize:14,borderWidth:2,
                           borderRadius:2,padding:10,margin:10,
                           height:40,width:80}}
                   onPress={()=>{setVenueF()}} >
                   <Text>venue</Text>
                   </TouchableOpacity>
    
         
             : null}

                </View>
      
              <Events 
              event={event}
              setEventFunction={()=>setEventF()}
              navigation={navigation}/>
             <Services 
              services={services}
              requestedServices={requestedServices}
              setServicesFunction={()=>setServicesF()}
              navigation={navigation}/>
              <Venue 
              venue={venue}
              setVenueFunction={()=>setVenueF()}
              navigation={navigation}/>
          

   
           
           </View>
       
    )


}
const mapStateToProps=(store)=>{
    
console.log('bks---',store.bookingState.bookings)
   

    return {
        currentUser:store.userState.currentUser,
        bookings:store.bookingState.bookings
     
    }
}
// const mapDispatchProps=(dispatch)=>bindActionCreators({fetchUser},dispatch)
export default connect(mapStateToProps,null)(main);


