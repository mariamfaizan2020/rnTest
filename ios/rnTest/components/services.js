import React from 'react'
import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import Icon from '../icons/icon'

const services = (props) => {

    return (
        <View>

          
               {
               props. services==true?
                <View>
                   <TouchableOpacity onPress={()=>props?.navigation.navigate('createServices')}>
                       <View style={{flexDirection:'row',justifyContent:'center'}}>
                       <Text style={{marginTop:3}}>Add New Services</Text>
                       <Icon.Entypo name='plus' size={20} color="black" />
                       </View>
                   </TouchableOpacity>
                  
                    </View>
                      : null
            }

            
        </View>
    )
}

export default services

const styles = StyleSheet.create({})
