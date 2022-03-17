import React, { PureComponent } from 'react'
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native'

import Icon from 'react-native-vector-icons/Entypo'
import stripe from 'tipsi-stripe'
import Button from '../components/Button'

import { demoCardFormParameters } from './demodata/demodata'

stripe.setOptions({
  publishableKey:'pk_test_51IIHeJKkI1eBMEemFlhq1gbbrl9fL39YMihlO8n4dtWzwrqdm0Tynx1EPyeRxxkVootdG72VDXiS2rmbWXMNPDEj00lqk4qnW4'
})


export default class CardFormScreen extends PureComponent {

  static title = 'Card Form'

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

  render() {
    const { loading, paymentMethod } = this.state

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
            <Text style={styles.instruction}>TOKEN: {JSON.stringify(paymentMethod.tokenId)}</Text>
          )}
        </View>
        <TouchableOpacity 
        style={{margin:10,justifyContent:'flex-end',alignItems:'flex-end'}}
        onPress={()=>this.props.navigation.navigate('editEvents')}>
        {/* <Text>back</Text> */}
        <Icon name='arrow-long-left' size={50}/>
        </TouchableOpacity>
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
