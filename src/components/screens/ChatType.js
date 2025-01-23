import { StyleSheet, Text, TouchableOpacity, View,ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';

const ChatType = (props, { }) => {
    const [alluser , setAllUser] = useState([])
    const { currentUser } = props.route.params;

    useEffect(() => {
        // Set up a Firestore real-time listener
        const unsubscribe = firestore()
          .collection('users')
          .where('email', '!=', currentUser.email) // Exclude the current user's email
          .onSnapshot((snapshot) => {
            const fetchedUsers = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));


               // Add online status from Realtime Database
      const usersWithStatus = fetchedUsers.map((user) => {
        const userStatusRef = database().ref(`/status/${user.id}/state`);
        userStatusRef.once('value', (snapshot) => {
          user.isOnline = snapshot.val() === 'online'; // Add online/offline status to the user data
        });
        return user;
      });


            setAllUser(usersWithStatus);
          });
    
        // Clean up the listener when the component unmounts
        return () => unsubscribe();
      }, [currentUser.email]);

 
    return (
        <View>
            <Text>name : {currentUser.displayName}</Text>
            <Text>ChatType</Text>
            <ScrollView style={{ marginTop: 20, marginBottom: 100 }}>
                {alluser.map((user, index) => (
                    console.log("user",user),
                    <TouchableOpacity onPress={()=>{props.navigation.navigate("PrivateChatRoom",{currentUser:currentUser,otherUser:user})}} key={index} style={{ marginBottom: 10,padding:10,backgroundColor:'#dadada' }}>
                        <Text style={{ textAlign: 'center' }}>{user.email}: {user.username}  {user.isOnline ? '🟢 Online' : '🔴 Offline'}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}

export default ChatType

const styles = StyleSheet.create({})