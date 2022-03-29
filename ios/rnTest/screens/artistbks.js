import { StyleSheet, Text, View ,FlatList} from 'react-native'
import React,{useEffect,useState} from 'react'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import moment from 'moment'
import Header from '../componentsScreen/header'


const artistbks = (props) => {
    const [artistbookings,setArtistbookings]=useState()
    console.log('currentUser',auth().currentUser.uid)
useEffect(()=>{
    fetchArtistbookings()
  

},[])
const fetchArtistbookings= ()=>{
    
       
        firestore().collection('services').doc(auth().currentUser.uid).collection('etts')
     
        .onSnapshot((snapshot)=>{
            let arr=[]
          
            console.log('snappp-->',snapshot)
            if(!snapshot.empty){
                
                console.log(snapshot,'snapppp')
               let requestedServices=snapshot.docs.map(doc=>{
                  const  data=doc.data()
                  console.log('datttta',data)
                  let obj={}
               
                  if(data.status!=='requested'){
              console.log('ddaattaa',data)
                 
                  obj.Event=data.name,
                  obj.timeS=data.start.toDate(),
                  obj.timeE=data.end.toDate(),
                  obj.date=data.date.toDate(),
                  obj.status=data.status,
                  obj.type=data.type
                
                  }
                     firestore().collection('users').doc(data.owner)
                  .onSnapshot((snapshot)=>{
                  
                      console.log('snnnn',snapshot)
                      if(snapshot.exists){
                          console.log('snnbbb',snapshot.data().userName)
                         
                          obj.owner=snapshot.data().userName
                      }
                 
                   })
                  arr.push(obj)
                  
                    console.log('arr',arr)
            
                }
               )
                
            }
            setArtistbookings(arr)  
        })

    
}


console.log('ArtistBKS',artistbookings)
  return (
    <View style={{flex:1,marginTop:40}}>
      <Header nav={props.navigation}/>
      <FlatList
      data={artistbookings}
      keyExtractor={(item,index)=>index.toString()}
      renderItem={({item})=>{
          console.log('item',item)
          return(
              <View>
              <View>
       <Text style={{fontSize:16,fontWeight:'bold',color:'#a16281',justifyContent:'center',alignSelf:'center',marginTop:15}}>
            {item.Event }
        </Text>
       </View>
       
       
       <View  style={{borderBottomColor:'#a16281',width:'100%',borderBottomWidth:3,marginBottom:10}}> 
       <Text style={{fontSize:14,color:'#a16281',marginTop:10,alignSelf:'center'}}>
           {item.owner}
       </Text>
       <Text style={{fontSize:14,color:'#a16281',marginTop:10,alignSelf:'center'}}>
              Starts on {moment(item.date).format("YYYY-MM-DD")} at  {moment(item.timeS).format("hh:mm A")}
        </Text>
        <Text style={{fontSize:14,color:'#a16281',marginBottom:10,alignSelf:'center'}} >
             Ends on {moment(item.date).format("YYYY-MM-DD")} at {moment(item.timeE).format("hh:mm A")}
         </Text>
         <Text style={{fontSize:14,color:'#a16281',marginBottom:10,alignSelf:'center'}}>
             {item.status}
         </Text>
       </View>
                 
              </View>
          )
      }}
      />

  
    </View>
  )
  }

export default artistbks

const styles = StyleSheet.create({})