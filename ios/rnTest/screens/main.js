import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Events from '../components/events'
import Services from '../components/services';
import Venue from '../components/venue';

const main = ({ navigation}) => {
    const [userType, setUserType] = useState('')
    const [event, setEvent] = useState(true)
    const [services, setServices] = useState(false)
    const [venue, setVenue] = useState(false)

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = () => {
        if (auth().currentUser) {
            console.log('uid', auth().currentUser?.uid)
            firestore().collection('users').doc(auth().currentUser?.uid)
                .get()
                .then((snapshot) => {
                    let data = snapshot.data()
                    console.log('user', data)
                    const user = data.type
                    console.log('user', user)
                    setUserType(user)


                });
        }
    }

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
    const nav=()=>{
        navigation.navigate('createEvents')
    }
    const nav2=()=>{
        navigation.navigate('editEvents')
        // ,{
        //     nameOfEvent:item.nameOfEvent,
        //     DateOFEvent:item.DateOFEvent,
        //     StartingTImeOFEvent:item.StartingTImeOFEvent,
        //     EndTimeOFEvent:item.EndTimeOFEvent,
        //     TypeOFEvent:item.TypeOFEvent,
        //     IsPublic:item.IsPublic,
        //     uid:item.uid,
        //     EventId:item.EventId
       
        //  })
    }
    return (
        <View style={{flex:1}}>
               <View style={{
                //    flexDirection:'row',
                //    backgroundColor:"red"
                   }}>

                   <View style={{flexDirection:'row',justifyContent:'center'}}>
                   <TouchableOpacity 
               onPress={()=>{setEventF()}}
               style={{fontSize:14,borderWidth:2,
                borderRadius:2,padding:10,margin:10,
                height:40,width:80
            }}
             >
               <Text>events</Text>
               </TouchableOpacity>
               {userType == 'artists' ?
           

               <TouchableOpacity 
        //    style={{font:14,borderWidth:2,borderRadius:2,padding:10,margin:10}}
        style={{fontSize:14,borderWidth:2,
            borderRadius:2,padding:10,margin:10,
           height:40,width:80
        }}
           onPress={()=>setServicesF()}
        // onPress={()=>console.log('props',services)}
        >
               <Text>services</Text>
               </TouchableOpacity>
                :null
                }
                </View>
            {/* {event==true? */}
              <Events 
              event={event}
              setEventFunction={()=>setEventF()}
            //   navigation={()=>nav()}
            navigation={navigation}
              navigate={()=>nav2()}
             // abc={setEvent(false)}
               />
               {/* :null
            } */}
                 
                   {/* </View> */}
              
    
  
<         View style={{
    // backgroundColor:'pink'
}}>
       
         <Services 
       services={services}
          setServicesFunction={()=>setServicesF()}/>
          </View>
          

  
{userType == 'buisness' ?

    <Venue 
    venue={venue}
    setVenueFunction={()=>setVenueF()}/>
    : null}
</View>
        </View>
       
    )


}



export default main

const styles = StyleSheet.create({})
