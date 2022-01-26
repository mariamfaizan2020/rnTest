
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'

import Events from '../components/events'
import Services from '../components/services';
import Venue from '../components/venue';
import {connect,useDispatch} from 'react-redux';
import { fetchUser } from '../redux/actions/index';


const main = ({currentUser, navigation}) => {
    const [userType, setUserType] = useState('')
    const [event, setEvent] = useState(true)
    const [services, setServices] = useState(false)
    const [venue, setVenue] = useState(false)

  
   

    console.log("123", userType)
   

    const setEventF=()=>{
        setEvent(true)
        setVenue(false)
        setServices(false)
    }
    const setServicesF=()=>{
        setEvent(false)
        setVenue(false)
        setServices(!services)
    }
    const setVenueF=()=>{
        setEvent(false)
        setVenue(!venue)
        setServices(false)
    }
   console.log('abcd',currentUser)
    return (
        <View style={{flex:1}}>
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
    
        console.log("store",store)

   

    return {
        currentUser:store.userState.currentUser
    }
}
// const mapDispatchProps=(dispatch)=>bindActionCreators({fetchUser},dispatch)
export default connect(mapStateToProps,null)(main);


