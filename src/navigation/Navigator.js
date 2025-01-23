// Navigator.js
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './routes'; // Import the Routes
import { ChatScreen, Login } from '../components/screens';
import ChatType from '../components/screens/ChatType';
import PrivateChatRoom from '../components/screens/PrivateChatRoom';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        {/* {Routes(Stack)}  */}
        <Stack.Screen  key={"login"}  name={"login"} component={Login} />
        <Stack.Screen  key={"chat"}  name={"chat"} component={ChatScreen} />
        <Stack.Screen  key={"ChatType"}  name={"ChatType"} component={ChatType} />
        <Stack.Screen  key={"PrivateChatRoom"}  name={"PrivateChatRoom"} component={PrivateChatRoom} />
        {/* <Stack.Screen  key={"ChatType"}  name={"ChatType"} component={ChatType} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;

const styles = StyleSheet.create({
  // You can add styles here if needed
});
