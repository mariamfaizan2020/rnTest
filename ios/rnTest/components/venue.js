import React, { useState } from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'

const venue = (props) => {
  
    return (
        <View>

           <TouchableOpacity 
           style={{font:14,borderWidth:2,borderRadius:2,padding:10,margin:10}}
        //    
        // onPress={()=>{ }}
        onPress={()=>{props?.setVenueFunction()}}
           >
               <Text>venue</Text>
               </TouchableOpacity>

            {
                props.venue?
                <View>
                    <Text>
                        this is venue screen
                    </Text>
                  
                    </View>
                      : null
            }
        </View>
    )
}

export default venue

const styles = StyleSheet.create({})
