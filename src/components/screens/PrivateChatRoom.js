import React, { useEffect, useRef, useState } from 'react';
import { Alert, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { getOnlineStatus } from '../Utils/getOnlineStatus';

const PrivateChatRoom = (props, { navigation }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState(null);
    const [chatId, setChatId] = useState(null);
    const { currentUser, otherUser } = props.route.params;
    const [isTyping, setIsTyping] = useState(false);

    const inputRef = useRef(null);
    const previousText = useRef(''); // Track the previous text value




    useEffect(() => {
        console.log('currentUser', currentUser);
        async function fetchData() {
            const roomId = await getOrCreateRoom(currentUser, otherUser);

            if (!roomId) return;
            const unsubscribe = firestore()
                .collection('chats')
                .doc(roomId)
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
        }
        fetchData();

        
    }, []);


    useEffect(() => {
        const unsubscribe = firestore()
            .collection('chats')
            .doc(chatId)
            .onSnapshot((doc) => {
                const typing = doc?.data()?.typing || {};
                const typingUsers = Object?.keys(typing)?.filter((userId) => typing[userId] === true);
                console.log('Users typing:', typingUsers);
            });

        return () => unsubscribe();
    }, [chatId]);


    const updateTypingStatus = async (chatRoomId, isTyping) => {
        // const user = auth().currentUser;
        await firestore().collection('chats').doc(chatRoomId).update({
            [`typing.${currentUser.uid}`]: isTyping,
        });
    };

    // Call this when the user starts typing

    // Call this when the user stops typing

    // Handle text changes
    const handleTextChange = (msg) => {
        setMessage(msg);

        // Only update isTyping if the user is actually typing something new
        if (inputRef.current && inputRef.current.isFocused()) {
            if (msg.length > previousText.current.length) {
                // The user typed something new
                setIsTyping(true);
                console.log('User is typing...');
                updateTypingStatus('chatRoomId', true);
            } else {
                // The user didn't type anything or deleted something
                setIsTyping(false);
                console.log('User stopped typing...');
                updateTypingStatus('chatRoomId', false);

            }
        }
        // Update the previous text value after handling the change
        previousText.current = msg;
    };






    const handleSendMessage = async () => {
        if (message === '') {
            Alert.alert('Enter a message');
            return;
        }
        try {
            await firestore()
                .collection('chats')
                .doc(chatId)
                .collection('messages')
                .add({
                    text: message,
                    createdAt: firestore.FieldValue.serverTimestamp(),
                    user: currentUser.email,
                    username: currentUser.displayName,
                    displayName: currentUser.displayName,
                });
            setMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };



    const getOrCreateRoom = async (user1, user2) => {
        // Sort the user emails alphabetically to ensure unique room ID
        const roomId = [user1.email, user2.email].sort().join('_');
        // Check if the room exists
        const roomDoc = await firestore().collection('chats').doc(roomId).get();
        if (!roomDoc.exists) {
            // Create the room if it doesn't exist
            await firestore().collection('chats').doc(roomId).set({
                users: [user1.email, user2.email],
                createdAt: firestore.FieldValue.serverTimestamp(),
            });
        }
        console.log('roomId', roomId);
        setChatId(roomId);
        return roomId; // Return the unique room ID
    };



    return (
        <View style={{ flex: 1, padding: 16 }}>
            <Button title="Sign Out" onPress={() => { }} />
            <Text style={{ marginVertical: 10 }}>Welcome :: {currentUser.displayName} ({currentUser?.email})</Text>
            <Text style={{ marginVertical: 10 }}>You ARE IN CHAT WITH {otherUser.displayName} ({otherUser?.email})</Text>
            <TextInput
                    ref={inputRef}

                style={styles.input}
                placeholder="Type a message"
                value={message}
                onChangeText={(text) => { handleTextChange(text) }}
            />
            <Button title="Send Message" onPress={() => { handleSendMessage() }} />
            <ScrollView style={{ marginTop: 20, marginBottom: 100 }}>
                {messages.map((msg, index) => (
                    <View key={index} style={{ marginBottom: 10 }}>
                        <Text style={{ textAlign: msg.displayName == currentUser.displayName ? "right" : 'left' }}>{msg.displayName}: {msg.text}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default PrivateChatRoom;

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});