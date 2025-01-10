import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import ToggleSwitch from '../common/AnimatedButton'

const Home = () => {
    const [toggle, setToggle] = useState(false);
  
    function onToggle() {
      console.log("Toggled!");
      setToggle((prev) => !prev);
    }
  
    return (
      <View style={{ flex: 1 }}>
        <ToggleSwitch isOn={toggle} onToggle={onToggle} />
      </View>
    );
  };

export default Home

const styles = StyleSheet.create({})