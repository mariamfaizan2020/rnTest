import React,{useState} from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'


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
               {props.event===true?<TouchableOpacity 
               onPress={()=>props?.navigation()}
                // {props?.navigation.navigate('createEvents')}}
               >
                   <View style={{flexDirection:'row'}}>
                   <Text>Create New Event </Text>
                   <Icon name="pluscircleo" size={20} color="black" />
                   </View>
               </TouchableOpacity>:null}
        </View>
       
    )
           
    }
   


export default events

const styles = StyleSheet.create({})
