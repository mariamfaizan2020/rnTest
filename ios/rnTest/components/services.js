import React from 'react'
import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'

const services = (props) => {

    return (
        <View>

          
               {
               props. services==true?
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
