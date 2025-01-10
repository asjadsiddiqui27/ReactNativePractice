import React, { useRef, useEffect } from "react";
import { Animated, TouchableWithoutFeedback, StyleSheet } from "react-native";

const ToggleSwitch = ({ isOn, onToggle }) => {
  const animation = useRef(new Animated.Value(isOn ? 1 : 0)).current;

  // Synchronize animation with the external state
  useEffect(() => {
    Animated.timing(animation, {
      toValue: isOn ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isOn]);

  const switchInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(125, 70, 227, 0.5)", "#7D46E3"],
  });

  const circlePosition = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22],
  });

  const circleColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(255,255,255,0.5)", "#fff"],
  });

  return (
    <TouchableWithoutFeedback onPress={onToggle}>
      <Animated.View style={[styles.switch, { backgroundColor: switchInterpolate }]}>
        <Animated.View
          style={[
            styles.circle,
            {
              transform: [{ translateX: circlePosition }],
              backgroundColor: circleColor,
            },
          ]}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  switch: {
    width: 44,
    height: 24,
    borderRadius: 15,
    paddingTop: 3,
    paddingHorizontal: 2,
  },
  circle: {
    width: 17,
    height: 17,
    borderRadius: 12,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});

export default ToggleSwitch;
