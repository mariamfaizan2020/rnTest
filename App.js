import React from 'react';
import {Text,View} from 'react-native'
import { createAppContainer ,createSwitchNavigator} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import registerScreen from './ios/rnTest/screens/registerScreen';
import loginScreen from './ios/rnTest/screens/login'
import tabsScreen from './ios/rnTest/screens/tab'
import createEventsScreen from './ios/rnTest/screens/createEvents';
import editEvents from './ios/rnTest/screens/editEvents';
import EditServicesScreen from './ios/rnTest/screens/EditServices';
import { Provider } from 'react-redux';
import {persistStore,persistReducer} from 'redux-persist';
import {createStore, applyMiddleware } from 'redux';
import rootReducer  from './ios/rnTest/redux/reducer';
import thunk from 'redux-thunk';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import { PersistGate } from 'redux-persist/integration/react'
import createServices from './ios/rnTest/screens/createServices';
import { composeWithDevTools } from 'redux-devtools-extension';
import BrowseScreen from './ios/rnTest/screens/Browse';
import bookservicesScreen from './ios/rnTest/screens/bookservices'
import testingScreen from './ios/rnTest/screens/testing';
import reqservdetailsScreen from './ios/rnTest/screens/reqservdetails'
import CardFormScreen from './ios/rnTest/scenes/CardFormScreen';
import ArtistbksScreen from './ios/rnTest/screens/artistbks'
import Header from './ios/rnTest/componentsScreen/header'

const persistConfig={
  key:'root',
  storage:AsyncStorageLib,
  timeout:null
};
const persistedReducer=persistReducer(persistConfig,rootReducer);
// const store=createStore(persistedReducer,applyMiddleware(thunk));
const store = createStore(persistedReducer, {},composeWithDevTools(
	applyMiddleware(thunk)
  ));
const persistor=persistStore(store)

const AuthStack = createStackNavigator({

    register: {
      screen:registerScreen,
      headerMode:"none",
      navigationOptions:{
     
        headerShown:false,

      }

    },
    login:{
      screen:loginScreen,
      headerMode:'none',
    navigationOptions:{
      
      headerShown:false
    }}},
    {
      initialRouteName:'login',
     
       
      }
    )
const AppStack=createStackNavigator({
    tabs:tabsScreen,
    createEvents:createEventsScreen,
    editEvents:editEvents,
    createServices:createServices,
    EditServices:EditServicesScreen,
    Browse:BrowseScreen,
    bookservices:bookservicesScreen,
    testing:testingScreen,
    reqServdetails:reqservdetailsScreen,
    CardForm:CardFormScreen,
    artistbks:ArtistbksScreen,
  
},
{
  initialRouteName:'tabs',
  headerMode:'none',
  navigationOptions:{
    headerShown :false,
   
  }
 
})

let AppNavigator=createAppContainer(
  (createSwitchNavigator({
     Auth:AuthStack,
     App:AppStack
})))
  

let Navigation=createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <Navigation />
        </PersistGate>
      </Provider>
    );
  }
}


// const App=()=>{
// return (
//   // <View>
//   //   <Text style={{marginTop:30}}>HELLLOirf7i WORLD</Text>

//   // </View>
// )
// }
// export default App;
// import type {Node} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// const Section = ({children, title}): Node => {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// };

// const App: () => Node = () => {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.js</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;
