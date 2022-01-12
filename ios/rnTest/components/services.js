import React from 'react'
import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'

const services = (props) => {

    return (
        <View>

           <TouchableOpacity 
           style={{font:14,borderWidth:2,borderRadius:2,padding:10,margin:10}}
           onPress={()=>props?.setServicesFunction()}
        // onPress={()=>console.log('props',services)}
        >
               <Text>services</Text>
               </TouchableOpacity>
               {
               props. services?
                <View>
                    <Text>
                        this is poty screen
                    </Text>
                  
                    </View>
                      : null
            }

            
        </View>
    )
}

export default services

const styles = StyleSheet.create({})
