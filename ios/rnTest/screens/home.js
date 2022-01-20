import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import mainScreen from './main'



const home = () => {
    const Tab = createMaterialBottomTabNavigator();

    
      return (
        <Tab.Navigator>
          <Tab.Screen name="Home" component={mainScreen} />
          <Tab.Screen name="profile" component={profileScreen} />
        </Tab.Navigator>
      );
    }


export default home;

const styles = StyleSheet.create({});
