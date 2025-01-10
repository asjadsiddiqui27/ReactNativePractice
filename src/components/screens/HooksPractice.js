
import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, Button, TextInput, Platform } from 'react-native';
import KeyboardManager from 'react-native-keyboard-manager';
const HooksPractice = () => {
  if (Platform.OS === 'ios') {
    const appearance =  "light" 
    KeyboardManager.setOverrideKeyboardAppearance(true)
    KeyboardManager.setKeyboardAppearance('dark');


    // KeyboardManager.setToolbarBarTintColor('#ff1111');
    KeyboardManager.setToolbarTintColor('#598deb');

    KeyboardManager.setEnable(true);
  KeyboardManager.setEnableDebugging(true);
  KeyboardManager.setKeyboardDistanceFromTextField(30);
  KeyboardManager.setLayoutIfNeededOnUpdate(true);
  KeyboardManager.setEnableAutoToolbar(true);
  KeyboardManager.setToolbarDoneBarButtonItemText('Done');
  KeyboardManager.setToolbarManageBehaviourBy('subviews'); // "subviews" | "tag" | "position"
  KeyboardManager.setToolbarPreviousNextButtonEnable(true);
  KeyboardManager.setToolbarBarTintColor('#FFFF00'); // Only #000000 format is supported
  KeyboardManager.setShouldShowToolbarPlaceholder(true);
  KeyboardManager.setShouldResignOnTouchOutside(true);
  KeyboardManager.setShouldPlayInputClicks(true);
    // :"light"
  }
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(0);

  const expensiveCalculation = (num) => {
    console.log('Expensive calculation running...');
    return num * 1000;
  };

  const memoizedValue = useMemo(() => expensiveCalculation(value), [value]);
//   useEffect(() => {
//     expensiveCalculation(value)
//   },[value])

  return (
    <View style={{flex: 1,justifyContent: "center",alignItems: "center"}}> 
       <TextInput 
      autoFocus
      returnKeyType='done'
      style={{borderColor:"white",borderWidth:1,width:"100%"}}
      placeholderTextColor={"white"}
      placeholder='Enter here'
      // keyboardAppearance='dark'

      />
  <Text style={{color:"white"}}>Count: {count}</Text>
      <Text style={{color:"white"}}>Expensive Value: {memoizedValue}</Text>
      <Button title="Increment Count" onPress={() => setCount(count + 1)} />
      <Button title="Increment Value" onPress={() => setValue(value + 1)} />
      
      <View>
      <TextInput 
      autoFocus
      returnKeyType='done'
      style={{borderColor:"white",borderWidth:1,width:"100%"}}
      placeholderTextColor={"white"}
      placeholder='Enter here'
      // keyboardAppearance='dark'
      />
      </View>
    </View>
  );
};

export default HooksPractice;
