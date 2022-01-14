import React,{useState} from 'react'
import { StyleSheet, Text, View ,TouchableOpacity, TextInput,Button} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'

const createEvents = () => {
    const [name,setName]=useState()
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [starttime,setStartTime]= useState(new Date())
    const [sTime,setSTime]=useState(false)
    const [endtime,setEndTime]= useState(new Date())
    const [eTime,setETime]=useState(false)

   

    const onChange = (event, selectedValue) => {
        
        setShow(Platform.OS === 'ios');
        if (mode == 'date') {
          const currentDate = selectedValue 
          setDate(currentDate);
          // setMode('time');
          // setShow(Platform.OS !== 'ios'); // to show time
        }if (mode=='time'){
          const selectedTime = selectedValue ;
        {  sTime=='true'? setStartTime(selectedTime):setEndTime(selectedTime)}
          }
           
       
  
      };
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
            <TouchableOpacity style={styles.Button}>
            <Text>Private</Text>
            </TouchableOpacity >
            <TouchableOpacity style={styles.Button}>
            <Text>public</Text>
            
            </TouchableOpacity>
            {/* <TextInput
            // value={date}
            // onChangeText={(date)=>{setDate(date)}}
            ></TextInput> */}
        </View>
        <View>
            
            <TextInput style={styles.InputField}
            placeholder='name your Event'
            value={name}
            onChangeText={(text)=>setName(text)}>
           </TextInput>
           {/* <View>
             <Text>{date.toUTCString()}</Text>
           </View> */}
      <View >
      <TouchableOpacity 
      style={styles.InputField}
      onPress={()=>{showDatepicker()}}>
        <View style={{flexDirection:'row'}}>
            <Text>Date:</Text>
             {!show?<Text>{moment(date).format("YYYY/MM/DD")}</Text>: null
          }
          </View>
             
         </TouchableOpacity>
         
        
           
      </View>
            

          
            {show && (
              <View>
         <DateTimePicker
          testID="dateTimePicker"
          // minimumDate={Date.parse(new Date())}
          value={mode =='date' ? date  : sTime=='true'? starttime:endtime} 
          mode={mode}
          is24Hour={true}
          display="spinner"
          onChange={onChange}
          // neutralButtonLabel="clear"
        />
        <TouchableOpacity   style={styles.Button} onPress={()=>{setShow(false);setSTime(false)}}>
          <Text>OK</Text>
        </TouchableOpacity>
        
              </View>
       
        
      )
      // &&(<TouchableOpacity opPress={()=>setShow(false)}>
      //   <Text>OK</Text>
      // </TouchableOpacity>)
      }
      
      
      
           

           <View>
      {/* <View>
        <Button onPress={showDatepicker} title="Show date picker!" />
      </View> */}
      <View style={{flexDirection:'row',justifyContent:"center",alignSelf:'center'}}>
          <TouchableOpacity style={{borderWidth:2,padding:10,marginHorizontal:30,marginVertical:10}} onPress={()=>{showTimepicker();setSTime(true)}}>
               <Text>{moment(starttime).format("hh:mm A")}</Text>
           </TouchableOpacity>
           <TouchableOpacity  style={{borderWidth:2,padding:10,marginHorizontal:30,marginVertical:10}} onPress={()=>{showTimepicker();setETime(true)}}>
               <Text>{moment(starttime).format("hh:mm A")}</Text>
           </TouchableOpacity>

       
      </View>
     
    </View>

        </View>
        <TextInput style={{justifyContent:'center',alignSelf:'center',marginTop:40}}
            value={'select Your Event Type'}/>
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',}}>
        
          <TouchableOpacity style={styles.Input}>
            <Text>Type1</Text>
            </TouchableOpacity >
             <TouchableOpacity  style={styles.Input}>
                 <Text>Type2</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.Input}>
            <Text>Type3</Text>
            </TouchableOpacity >
             <TouchableOpacity  style={styles.Input}>
                 <Text>Type4</Text>
           </TouchableOpacity>
          
          
          
           
         
        </View>
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
           
        <TouchableOpacity style={styles.Input}>
            <Text>Type5</Text>
            </TouchableOpacity >
             <TouchableOpacity  style={styles.Input}>
                 <Text>Type6</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.Input}>
            <Text>Type7</Text>
            </TouchableOpacity >
            
            
         
        </View>
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
        <TouchableOpacity style={styles.Input}>
            <Text>Type8</Text>
            </TouchableOpacity >
             <TouchableOpacity  style={styles.Input}>
                 <Text>Type9</Text>
           </TouchableOpacity>
           
          </View>
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
        <TouchableOpacity style={styles.Input}>
            <Text>Type10</Text>
            </TouchableOpacity >
           
         </View>
        </View>
    )
}

export default createEvents

const styles = StyleSheet.create({
    Button:{
        borderWidth:2,
        BOrderColor:'Black',
        padding:10,
        margin:10,
        alignSelf:'center'
    },
    Input:{
        borderWidth:2,
        BOrderColor:'Black',
        padding:10,
        margin:10,
        width:'20%',
        alignSelf:'center'

    },
   
    InputField:{
        borderWidth:2,
        BOrderColor:'Black',
        padding:10,
        margin:10,
        width:'90%',
        alignSelf:'center'

    },
    
   
})
