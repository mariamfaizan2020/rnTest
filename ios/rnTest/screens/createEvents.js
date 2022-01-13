import React,{useState} from 'react'
import { StyleSheet, Text, View ,TouchableOpacity, TextInput,Button} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';

const createEvents = () => {
    const [name,setName]=useState()
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
   

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
      };
      const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
      };
    
      const showDatepicker = () => {
          
        showMode('date');
      };
    
      const showTimepicker = () => {
        showMode('time');
      };
      

    return (
        <View>
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <TouchableOpacity style={styles.Button}>
            <Text>Private</Text>
            </TouchableOpacity >
            <TouchableOpacity style={styles.Button}>
            <Text>public</Text>
            <TextInput
            value={date}
            onChangeText={(date)=>{setDate(date)}}></TextInput>
            </TouchableOpacity>
        </View>
        <View>
            
            <TextInput style={styles.InputField}
            placeholder='name your Event'
            value={name}
            onChangeText={(text)=>setName(text)}>
           </TextInput>
           <TouchableOpacity onPress={()=>showDatepicker()}>
               <Text>Date</Text>
           </TouchableOpacity>

           <View>
      {/* <View>
        <Button onPress={showDatepicker} title="Show date picker!" />
      </View> */}
      <View style={{flexDirection:'row',justifyContent:"center",alignSelf:'center'}}>
          <TouchableOpacity style={{borderWidth:2,padding:10,marginHorizontal:30,marginVertical:10}} onPress={()=>showTimepicker()}>
               <Text>StartTime</Text>
           </TouchableOpacity>
           <TouchableOpacity  style={{borderWidth:2,padding:10,marginHorizontal:30,marginVertical:10}} onPress={()=>showTimepicker()}>
               <Text>EndTime</Text>
           </TouchableOpacity>

       
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display=""
          onChange={onChange}
        />
      )}
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
