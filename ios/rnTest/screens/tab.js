import React from 'react';
import { Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import profileScreen from '../tabNavigator/profile'
import mainScreen from '../tabNavigator/main'

import Icon from 'react-native-vector-icons/AntDesign';






const TabNavigator = createBottomTabNavigator({
   
    main:mainScreen,
    profile:profileScreen,
   
 
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({black}) => {
        const { routeName } = navigation.state;
 
       
        if (routeName === 'main') {
          
          return <Icon name='home' size={25} color={black} />
          
       
        } else if (routeName === 'profile') {
         
          return <Icon name='profile' size={25} color={black}/>
        }

       
      },
    }),
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
    },
  }
);

  
  export default createAppContainer(TabNavigator);