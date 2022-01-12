import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Events from '../components/events'
import Services from '../components/services';
import Venue from '../components/venue';
const main = ({ currentUser }) => {
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
   
// {event===true?setServices(false)&& setVenue(false) :services===true?setEvent(false):venue===true?setEvent(false):null}

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
    return (
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>


            <Events 
            event={event}
            setEventFunction={()=>setEventF()}
            // abc={setEvent(false)}
            />
                
          
            {userType == 'artists' ?

                <Services 
                services={services}
                setServicesFunction={()=>setServicesF()}/>
                : null
            }
            {userType == 'buisness' ?

                <Venue 
                venue={venue}
                setVenueFunction={()=>setVenueF()}/>
                : null}
        </View>
    )


}


export default main

const styles = StyleSheet.create({})
