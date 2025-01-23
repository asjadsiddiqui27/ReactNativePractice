import { ActivityIndicator, Alert, Button, Image, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';




const Login = (props, { navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('123456');
  const [username, setUsername] = useState();
  const [loader, setLoader] = useState(false);


  const handleSignIn = async () => {
    if (email == '' || password == "" || username == "") {
      Alert.alert("Enter Valid Cred")
      return
    }
    console.log("emailsplit", email.split("@")[0])
    try {
      setLoader(true)
      const result = await auth().signInWithEmailAndPassword(email.trim(), password.trim());
      const currentUser = auth().currentUser;
      //////
      // Track the user's online status in Realtime Database
       // Mark user as online in Realtime Database
       const userStatusDatabaseRef = database().ref(`/status/${currentUser.uid}`);

       const isOfflineForDatabase = {
         state: 'offline',
         last_changed: database.ServerValue.TIMESTAMP,
       };
   
       const isOnlineForDatabase = {
         state: 'online',
         last_changed: database.ServerValue.TIMESTAMP,
       };
   
       // When the user disconnects (background or closed), mark them as offline
       userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase);
   
       // Mark the user as online when they sign in
       userStatusDatabaseRef.set(isOnlineForDatabase);
   
       setLoader(false);

      //////
      setLoader(false)
      props.navigation.navigate("ChatType", { currentUser: currentUser })
      console.log("result -------", result);
      console.log("currentUser -------", currentUser);
    } catch (error) {
      setLoader(false)
      console.error(error.message);
    }
  };

  const handleSignUp = async () => {
    if (email == '' || password == "" || username == "") {
      Alert.alert("Enter Valid Cred")
      return
    }
    console.log("emailsplit:::", username)

    try {
      const result = await auth().createUserWithEmailAndPassword(email.trim(), password.trim());
      const { uid } = result.user;
      // Update the user's displayName in Firebase Authentication
      await result.user.updateProfile({
        displayName: username.trim(),
      });
      // Save user details in Firestore
      await firestore().collection('users').doc(uid).set({
        email: email.trim(),
        username: username.trim(),
        displayName: username.trim(),
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      console.log("SignUp result -------", result);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSignOut = async () => {
    const result = await auth().signOut();
    console.log("result -------", result);


    /////
    const userStatusDatabaseRef = database().ref(`/status/${auth().currentUser.uid}`);
    userStatusDatabaseRef.set({
      state: 'offline',
      last_changed: database.ServerValue.TIMESTAMP,
    });
  
    // Mark as offline in Firestore
    await firestore().collection('users').doc(auth().currentUser.uid).update({
      isOnline: false,
      lastSeen: firestore.FieldValue.serverTimestamp(),
    });
    /////
  };


  return (
    <View>
      <Text>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => { setEmail(text), setUsername(text.split("@")[0]) }}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        // secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="username"
        value={username}
        onChangeText={setUsername}
      />

      <Button title="Sign In" onPress={handleSignIn} />
      <Button title="SignUp" onPress={handleSignUp} />
      <Button title="Sign Out" onPress={handleSignOut} />
      <ActivityIndicator animating={loader} size="large" />
    </View>
  )
}

export default Login



const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});