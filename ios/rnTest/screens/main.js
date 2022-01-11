import React,{useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


const main = ({currentUser}) => {
    useEffect(()=>{
        fetchUsers()
    },[])

    const fetchUsers=()=>{
        if(auth().currentUser){
            console.log('uid',currentUser?.uid)

        }
       

    }
    return(
        <Text>hello there</Text>
    )
}


export default main

const styles = StyleSheet.create({})
