import React,{useState} from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'

const events= (props) => {
    // const [event,setEvent]=useState(false)
    return (
        <View>

           <TouchableOpacity 
           onPress={()=>{props.setEventFunction()}}
           style={{font:14,borderWidth:2,borderRadius:2,padding:10,margin:10}}
           >
               <Text>events</Text>
             
               </TouchableOpacity>
               {props.event===true?<Text>this is event Screen</Text>:null}
        </View>
       
    )
           
    }
   


export default events

const styles = StyleSheet.create({})
