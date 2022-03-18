import React, { PureComponent } from 'react'
import { View, Text, StyleSheet,TouchableOpacity, Alert } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Entypo'
import stripe from 'tipsi-stripe'
import Button from '../components/Button'
import axios from 'axios'
import { demoCardFormParameters } from './demodata/demodata'

stripe.setOptions({
  publishableKey:'pk_test_51IIHeJKkI1eBMEemFlhq1gbbrl9fL39YMihlO8n4dtWzwrqdm0Tynx1EPyeRxxkVootdG72VDXiS2rmbWXMNPDEj00lqk4qnW4'
})


export default class CardFormScreen extends PureComponent {
  static title = 'Card Form'
  
 constructor() {
    super();
    this.state = {
   eventId:this.props?.navigation?.state?.params.eventId,
  eventName:this.props?.navigation?.state?.params.eventName,
  artistName:this.props?.navigation?.state?.params.artistName,
  artistId:this.props?.navigation?.state?.params.artistId,
  eventOwner:this.props?.navigation?.state?.params.eventOwner,
  servicePrice:this.props?.navigation?.state?.params.servicePrice,
  serviceName:this.props?.navigation?.state?.params.serviceName,  
  status:this.props?.navigation?.state?.params.status
    };
 
  }
  state = {
    loading: false,
    paymentMethod: null,
  }
 
  handleCardPayPress = async () => {
    console.log("handle card")
    try {
      this.setState({ loading: true, paymentMethod: null })
    
      const paymentMethod = await stripe.paymentRequestWithCardForm(demoCardFormParameters)
      console.log('paymentMethod',paymentMethod.tokenId)

      this.setState({ loading: false, paymentMethod })
    } catch (error) {
      console.log("err--->",error)
      this.setState({ loading: false })
    }
  }

  makePayment=()=>{
   this.setState({laoding:true})
   console.log(this.loading)
   axios({
     method:'POST',
     url:'https://us-central1-rntest-4f44d.cloudfunctions.net/completePaymentWithStripe',
     data:{
       amount:500,
       currency:'usd',
       token:this.state.paymentMethod
     },
   }).then(response=>{
     console.log(response.data.status)
     console.log('payment done')
     if(response.data.status===true){
       Alert.alert('paid successfully')
           this.props.navigation.navigate('tabs')
      firestore().collection('bookings').doc(this.props?.navigation?.state?.params.eventId).collection('etts').doc(this.props?.navigation?.state?.params.artistId)
      .update({
        status:'paid'
      })
      firestore().collection('services').doc(this.props?.navigation?.state?.params.artistId).collection('etts').doc(this.props?.navigation?.state?.params.eventId)
      .update({
        status:'paid'
      })
     }

     this.setState({loading:false})
   })
  }
  
  render() {
    const { loading, paymentMethod } = this.state
    console.log('hello',this.props?.navigation?.state?.params.eventId)
 

    


    
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Click button to proceed</Text>
        <Text style={styles.instruction}>Once paid cannot be return.</Text>
        <View style={{flexDirection:'row'}}>

      
        <Button
          text="Continue...."
          loading={loading}
          onPress={this.handleCardPayPress}
       
        />
       
        </View>
        <View style={styles.paymentMethod} >
          {paymentMethod && (
            <>
            <Text style={styles.instruction}>TOKEN: {JSON.stringify(paymentMethod.tokenId)}</Text>
            <Button text='Make Payment' loading={loading}
          onPress={this.makePayment}/>
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
}

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
