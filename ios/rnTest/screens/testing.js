import { StyleSheet, Text, View ,FlatList,TouchableOpacity,Alert} from 'react-native'
import React,{useState,useEffect} from 'react'
import array from './array'
import Icon from '../icons/icon'


const testing = () => {

 const [arr,setArr]=useState([])



  const selection=(item)=>{
    let abc=[...arr]
   
    //  if(abc.find(x=>x._id===item._id)){
    //  index=abc.indexOf(item)
    //  console.log('ind',index)
    //  abc.splice(index,1)

    //  }else{
    //     abc.push(item)
    //  }
      
    //   console.log('abc',abc) 
    //   setArr(abc)
   let found=abc.find(x=>x._id===item._id)
   if(found){
     console.log('found',found._id)
     console.log('item',item._id)
     let filter=abc.filter(found=>found._id!==item._id)
     setArr(filter)

   
   }else if(arr.length<5){
     abc.push(item)
     setArr(abc)
   }else{
     Alert.alert('you casn only select 5 items')
   }
   
     console.log('abc',abc)
   
    
 }


 console.log('arr',arr)


  return (
    <View>
      <FlatList
      data={array}
      keyExtractor={(item,index)=>index.toString()}
      renderItem={({item})=>{
        // console.log('item',item._id)
        return(
      
            <View style={{borderWidth:2,margin:2,padding:2,borderColor:'black',flex:1,flexDirection:'row'
            }}>
                <View style={{width:'90%'}}> 
                <Text >{item.name.en}</Text>
                <Text>{item.price}</Text>
                </View>
                <View style={{width:'10%',justifyContent:'center',alignItems:'center'}}>
                    <TouchableOpacity onPress={()=>{selection(item)}}>
                      {arr.find(x=>x._id===item._id)? 
                        <Icon.AntDesign name='checkcircleo' size={15} />:<Icon.Entypo name='circle' size={15} />}
                  
                    </TouchableOpacity>
                    </View>
            </View>
        )
        

      }
   
}
      />
    </View>
  )
}

export default testing

const styles = StyleSheet.create({})