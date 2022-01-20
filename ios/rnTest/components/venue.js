import React, { useState } from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'

const venue = (props) => {
  
    return (
        <View>

          
            {
                props.venue==true?
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
