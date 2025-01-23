import auth from '@react-native-firebase/auth';
import  firestore  from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Alert, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

const ChatScreen = ({ navigation }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState(null);
  

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((currentUser) => {
        setUser(currentUser)
        console.log('currentUser', currentUser);
    });
    return subscriber; 
  }, []);
  
    useEffect(() => {
      const unsubscribe = firestore()
        .collection('chats')
        .doc('default-room')
        .collection('messages')
        .orderBy('createdAt', 'asc')
        .onSnapshot((snapshot) => {
          const fetchedMessages = snapshot.docs.map((doc) => ({
            _id: doc.id,
            ...doc.data(),
          }));
          console.log('fetchedMessages', JSON.stringify(fetchedMessages));
          setMessages(fetchedMessages);
        });
      return () => unsubscribe();
    }, []);
  
  
  const handleSendMessage = () => {
   if ( message == "") {
      Alert.alert("Enter message")
      return
    }
    firestore()
      .collection('chats')
      .doc('default-room')
      .collection('messages')
      .add({
        text: message,
        createdAt: firestore.FieldValue.serverTimestamp(),
        user: user.email,
        userName: user.displayName,
      });
      setMessage('');
    }

    const handleSignOut = async () => {
      await auth().signOut();
      navigation.navigate('Login');
    };
  
    return (
      <View style={{ flex: 1, padding: 16 }}>
        <Button title="Sign Out" onPress={handleSignOut} />
        <Text style={{ marginVertical: 10 }}>Welcome :: {user.displayName} ({user?.email})</Text>
        <TextInput
           style={styles.input}
          placeholder="Type a message"
          value={message}
          onChangeText={setMessage}
        />
        <Button title="Send Message" onPress={handleSendMessage} />
        <ScrollView style={{ marginTop: 20,marginBottom:100 }}>
          {messages.map((msg, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <Text style={{ textAlign: msg.userName==user.displayName? "right" :'left'}}>{msg.userName}: {msg.text}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

  export default ChatScreen;

  const styles = StyleSheet.create({
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 10,
    },
  });