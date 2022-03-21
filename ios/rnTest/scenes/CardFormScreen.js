import React, { useState,PureComponent, useEffect } from 'react'
import { View, Text, StyleSheet,TouchableOpacity, Alert } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Entypo'
import stripe from 'tipsi-stripe'
import Button from '../components/Button'
import axios from 'axios'
import { demoCardFormParameters } from './demodata/demodata'
import {connect} from 'react-redux'



stripe.setOptions({
  publishableKey:'pk_test_51IIHeJKkI1eBMEemFlhq1gbbrl9fL39YMihlO8n4dtWzwrqdm0Tynx1EPyeRxxkVootdG72VDXiS2rmbWXMNPDEj00lqk4qnW4'
})


// export default class CardFormScreen extends PureComponent {
//   static title = 'Card Form'

//   state = {
//     loading: false,
//     paymentMethod: null,
//     amount: null,
//   }
  
  
   
   const CardFormScreen = (props) => {
     console.log('props111',props.navigation.state.params)
     const serviceName=props.navigation.state.params.serviceName
     const artistName=props.navigation.state.params.artistName
     const artistId=props.navigation.state.params.artistId
    const eventId=props.navigation.state.params.eventId
    const [loading,setLoading]=useState(false)
    const [paymentMethod,setPaymentMethod]=useState(null)
    const [amount,setAmount]=useState()

    const [thisEvent,setThisEvent]=useState([])
    const [qty,setqty]=useState()
    //NOEO=NAME OF EVENT OWNER
    const [NOEO,setNOEO]=useState()
    const servicePrice=props.navigation.state.params.servicePrice
    let x=(parseInt(servicePrice)*(10/100))
    let y=x+parseInt(servicePrice)
    console.log('x-->',y);
  console.log('eevent',eventId)
  
  useEffect(()=>{
    setAmount(y)
 
    EventOwnerDetais()
    props.events.map((doc)=>{

      console.log('aaa',doc.EventId)
      if(doc.EventId===eventId){
        console.log('evnt',doc)
        let date1=(doc.StartingTImeOFEvent).toDate(),
            date2=(doc.EndTimeOFEvent).toDate()
        let    Difference_In_Time=date2.getTime()-date1.getTime()
            console.log('duration', Difference_In_Time)
         let Duration =   (Difference_In_Time/ (1000 * 3600 * 24))*24;
            console.log('days', Duration)
            setqty(Duration)
           setThisEvent(doc)
      }

      
 
    }
 
 
    )
   },[])

   const EventOwnerDetais=()=>{
    firestore().collection('users').doc(thisEvent.uid)
    .onSnapshot((snapshot)=>{
      if(snapshot.exists){
      console.log('snap-->',snapshot.data().userName)
      setNOEO(snapshot.data().userName)
    }})
   }
 console.log('thisEvent',thisEvent.TypeOFEvent)
console.log('NOEO',NOEO)
console.log('amoutn',amount)
  handleCardPayPress = async () => {
    console.log("handle card")
    try{
    
      setLoading(true)
      // this.setState({ loading: true, paymentMethod: null })
    
      const paymentMethod = await stripe.paymentRequestWithCardForm(demoCardFormParameters)
      console.log('paymentMethod',paymentMethod.tokenId)
      setLoading(false)
      setPaymentMethod(paymentMethod)
      // this.setState({ loading: false, paymentMethod })
    } catch (error) {
      console.log("err--->",error)
      setLoading(false)
      // this.setState({ loading: false })
    }
  }

  makePayment=()=>{
    setLoading(false)
  //  this.setState({laoding:true})
   console.log(loading)
   axios({
     method:'POST',
     url:'https://us-central1-rntest-4f44d.cloudfunctions.net/completePaymentWithStripe',
     data:{
       amount:'50',
       currency:'usd',
       token:paymentMethod.tokenId
     },
   }).then(response=>{
     console.log("response==",response)
     console.log('payment done')
     if(response.data.status===true){
       Alert.alert('paid successfully')
          //  this.props.navigation.navigate('tabs')
           props.navigation.navigate('tabs')
      firestore().collection('bookings').doc(this.props?.navigation?.state?.params.eventId).collection('etts').doc(this.props?.navigation?.state?.params.artistId)
      .update({
        status:'paid'
      })
      firestore().collection('services').doc(this.props?.navigation?.state?.params.artistId).collection('etts').doc(this.props?.navigation?.state?.params.eventId)
      .update({
        status:'paid'
      })
      firestore().collection('transection').add({
        F:"service",
        amount:amount*qty,
        event:{
          date:thisEvent.DateOFEvent,
          name:thisEvent.nameOfEvent,
          timeE:thisEvent.EndTimeOFEvent,
          tiemS:thisEvent.StartingTImeOFEvent,
          type:thisEvent.TypeOFEvent
        },
        eventID:eventId,
        for:"service"-serviceName,
        from:{
         id:thisEvent.uid,
         name:NOEO
        },
        price:servicePrice*qty,
        qty:qty,
        paidAt:new Date(),
        to:{
          id:artistId,
          name:artistName
         },
        


    

        

      
      }).then((res)=>{
        console.log('res',res.id)
        
        firestore().collection('transection').doc(res.id).update({
           transectionID:res.id
        })

      })
     }

    //  this.setState({loading:false})
    setLoading(false)
   })
  }
  
  // render() {
  //   const { loading, paymentMethod } = this.state
  //   console.log('hello',this.props?.navigation?.state?.params.eventId)
  //    console.log('amount',this.amount)

    
console.log('amount',amount)

    
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Click button to proceed</Text>
        <Text style={styles.instruction}>Once paid cannot be return.</Text>
        <View style={{flexDirection:'row'}}>

      
        <Button
          text="Continue...."
          loading={loading}
          onPress={handleCardPayPress}
       
        />
       
        </View>
        <View style={styles.paymentMethod} >
          {paymentMethod && (
            <>
            <Text style={styles.instruction}>TOKEN: {JSON.stringify(paymentMethod.tokenId)}</Text>
            <Button text='Make Payment' loading={loading}
          onPress={makePayment}/>
              </>
          )}
          
       
          
        </View>
        {/* <TouchableOpacity 
        style={{margin:10,justifyContent:'flex-end',alignItems:'flex-end'}}
        onPress={()=>this.props.navigation.navigate('editEvents')}>
      
        <Icon name='arrow-long-left' size={50}/>
        </TouchableOpacity> */}
      </View>
    )
  }
  const mapStateToProps=(store)=>{
 
    console.log("store1111",store.eventState.events)
  
    return{
      currentUser:store.userState.currentUser,
      events:store.eventState.events,
      // bookings:store.bookingState.bookings
   
    }
  }

  export default connect(mapStateToProps,null)(CardFormScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instruction: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  paymentMethod: {
    height: 20,
  },
})
