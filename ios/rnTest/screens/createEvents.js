import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View ,TouchableOpacity, TextInput,Button, Alert,FlatList} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'
import Flatlist from '../components/flatlist'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';



const createEvents = (props,{navigation}) => {
    const [name,setName]=useState(props.navigation.getParam('name') ? props.navigation.getParam('name')  :'')
    const [date, setDate] = useState(props.navigation.getParam('date')?props.navigation.getParam('date').toDate():new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [starttime,setStartTime]= useState(props.navigation.getParam('starttime')?props.navigation.getParam('starttime').toDate():new Date())
    const [sTime,setSTime]=useState(false)
    const [endtime,setEndTime]= useState(props.navigation.getParam('endtime')?props.navigation.getParam('endtime').toDate():new Date())
    const [eTime,setETime]=useState(false)
    const [type,setType]=useState(props.navigation.getParam('type')?props.navigation.getParam('type'):'')
    const [ispublic,setIsPublic]=useState(props.navigation.getParam('ispublic')?props.navigation.getParam('ispublic'):true)
//  console.log("props122",props.navigation.getParam('date').toDate())
    // const event= props.navigation.state.params.screenProps
   
  
 
    const arr=[
      {Type:'Type1'},
      {Type:'Type2'},
      {Type:'Type3'},
      {Type:'Type4'},
      {Type:'Type5'},
      {Type:'Type6'},
      {Type:'Type7'},
      {Type:'Type8'},
      {Type:'Type9'},
      {Type:'Type10'},
      {Type:'Type11'},
      {Type:'Type12'}

  ]
 

  const editEvent=()=>{
      firestore().collection('Events').doc(props.navigation.getParam('EventId'))
      
      .update({
        nameOfEvent:name,
        DateOFEvent:date,
        StartingTImeOFEvent:starttime,
        EndTimeOFEvent:endtime,
        TypeOFEvent:type,
        IsPublic:ispublic,
       

       
      }).then(
        console.log('userUpdated')
      )
  }
  

  const Validation=()=>{
    if (name==null){return Alert.alert('Please enter the event name')}
    if (type==null){return Alert.alert('Please select your event type')}
   
    eventDetails()
  }
 const setTypeF=(type)=>{
   console.log("type",type)
   setType(type)
 }
  const eventDetails=()=>{
   firestore().collection('Events').add({
     nameOfEvent:name,
     DateOFEvent:date,
     StartingTImeOFEvent:starttime,
     EndTimeOFEvent:endtime,
     TypeOFEvent:type,
     IsPublic:ispublic,
     uid:auth().currentUser?.uid


   }).then((res)=>{
         console.log('res',res)
         firestore().collection('Events').doc(res.id)
         .update({
           EventId:res.id
         })
   })
  
  }
 const onChange = (event, selectedValue) => {
        
        setShow(Platform.OS === 'ios');
        if (mode == 'date') {
          const currentDate = selectedValue 
          if (selectedValue>=new Date()){
            setDate(currentDate)
          }else{
            return Alert.alert('Please enter Valid date')
          }
        ;
        
        }if (mode=='time' && sTime==true){
           const selectedTime = selectedValue ;
           
            setStartTime(selectedTime)
         
          
      }if (mode=='time' && eTime==true){
           const selectedTime = selectedValue ;
           if (selectedTime>=new Date(starttime)){
            setEndTime(selectedTime)
           }
           else{
            return Alert.alert('Please select correct time')
           }
         
         
         
    }};
      const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode)
       ;
      };
    
      const showDatepicker = () => {
          
        showMode('date');
       
    
       
       
      };
    
      const showTimepicker = () => {
       
        showMode('time')
        
       
      };
     
      
      
     

    return (
        <View>
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <TouchableOpacity style={[styles.Button,{borderColor:!ispublic ? '#a16281' : 'black'}]} onPress={()=>setIsPublic(false)}>
            <Text>Private</Text>
            </TouchableOpacity >
            <TouchableOpacity style={[styles.Button,{borderColor:ispublic ? '#a16281' : 'black'}]} onPress={()=>setIsPublic(true)}>
            <Text>public</Text>
          </TouchableOpacity>
           
        </View>
        <View>
            
            <TextInput style={styles.InputField}
            placeholder='name your Event'
            value={name}
            onChangeText={(text)=>setName(text)}>
           </TextInput>
         <TouchableOpacity 
              style={styles.InputField}
              onPress={()=>{showDatepicker()}}>
                <View style={{flexDirection:'row'}}>
                  <Text>Date:</Text>
                 {!show?<Text>{moment(date).format("YYYY/MM/DD")}</Text>: null
          }
             </View>
             
       </TouchableOpacity>
          {show && (
           <View>
              <DateTimePicker
              testID="dateTimePicker"
              value={mode =='date' ? date  : mode=='time' && sTime==true ? starttime: endtime} 
              mode={mode}
              is24Hour={true}
              display="spinner"
              onChange={onChange}

        />
        <TouchableOpacity   style={styles.Button} onPress={()=>{setShow(false);setSTime(false);setETime(false)}}>
          <Text>OK</Text>
        </TouchableOpacity>
        
              </View>
              )
      }
         <View style={{flexDirection:'row',justifyContent:"center",alignSelf:'center'}}>
          <TouchableOpacity style={{borderWidth:2,padding:10,marginHorizontal:30,marginVertical:10}} onPress={()=>{showTimepicker();setSTime(true)}}>
               <Text>{moment(starttime).format("hh:mm A")}</Text>
           </TouchableOpacity>
           <TouchableOpacity  style={{borderWidth:2,padding:10,marginHorizontal:30,marginVertical:10}} onPress={()=>{showTimepicker();setETime(true)}}>
               <Text>{moment(endtime).format("hh:mm A")}</Text>
           </TouchableOpacity>

       
      </View>
     
   

        </View>
        <View>
            <TextInput style={{justifyContent:'center',alignSelf:'center',marginTop:10}}
            value={'select Your Event Type'}/>

            <Flatlist 
            array={arr}
            Type={type}
            setTypeFunction={(type)=>setTypeF(type)}  />
       
        </View>
       
       
        {props?.navigation.getParam('EventId')?
        <TouchableOpacity 
        onPress={()=>editEvent()}
        style={{backgroundColor:'#a16281',borderColor:'#a16281',borderWidth:12,alignSelf:'center',width:'60%'}}>
          <Text style={{alignSelf:'center',fontSize:18}}>Save Cahnges</Text>

        </TouchableOpacity>: <View>
          <TouchableOpacity 
          style={{backgroundColor:'#a16281',borderColor:'#a16281',borderWidth:12,alignSelf:'center',width:'60%'}}
          onPress={()=>Validation()}>
            <Text style={{alignSelf:'center',fontSize:18}}>Create Event</Text>
          </TouchableOpacity>
        </View> }
        </View>
       
    )
    
}

export default createEvents

const styles = StyleSheet.create({
    Button:{
        borderWidth:2,
        BOrderColor:'Black',
        padding:10,
        margin:5,
        alignSelf:'center'
    },
  
   
    InputField:{
        borderWidth:2,
        BOrderColor:'Black',
        padding:10,
        margin:5,
        width:'90%',
        alignSelf:'center'

    },Input:{
     
      padding:5,
      margin:5,
  
      alignSelf:'center',
      borderBottomWidth:2,
      borderBottomColor:'#a16281',
      width:'100%',
      
      
    

  },
    
   
})
