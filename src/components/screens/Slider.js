import React, { useRef, useState, useCallback } from "react";
import {
  View,
  Image,
  PanResponder,
  Animated,
  StyleSheet,
  Dimensions,
  Text,
} from "react-native";


const SlideButton= ({

  onRightReached,

}) => {
  const [dragStart, setDragStart] = useState(false);
  const pan = useRef(new Animated.ValueXY()).current;

  const screenWidth = Dimensions.get("window").width;

  const handleRightReached = useCallback(() => {
    onRightReached?.();
  }, [onRightReached]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => setDragStart(true),
      onPanResponderMove: (e, gestureState) => {
        if (gestureState.dx < screenWidth - s(40) - s(30) - s(18)) {
          pan.setValue({ x: gestureState.dx, y: 0 });
        }
      },
      onPanResponderRelease: () => {
        const gradientWidth = screenWidth - s(40) - s(30) - s(18);
        if (pan.x.__getValue() >= gradientWidth - 4) {
          handleRightReached();
        }
        setDragStart(false);
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: true,
        }).start();
      },
      onPanResponderTerminate: () => setDragStart(false),
    })
  ).current;

  return (
    <View style={styles.container}>
      <View style={styles.slideContainer}>
        <Animated.View
          style={{
            flexDirection: "row",
            alignItems: "center",
            transform: [{ translateX: pan.x }],
          }}
          {...panResponder.panHandlers}
        >
          {/* <Image
            source={initialImageUri}
            style={styles.image}
            resizeMode="contain"
          /> */}
        </Animated.View>
        <Text style={[styles.textStyle, { color: "white" }]}>
          {"Slide to unlock"} {/* Replace with localized string */}
        </Text>
      </View>
      {/* <View style={styles.ritIcon}>
        <Image source={ritImageUri} style={styles.image} resizeMode="contain" />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: (20),
    padding: (10),
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor:"red"
  },
  image: {
    width: (30),
    height: (30),
  },
  textStyle: {
    fontSize: (14),
  },
  ritIcon: {
    justifyContent: "center",
    alignItems: "center",
  },
  slideContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 5, // Fallback for 'gap'
  },
});

export default SlideButton;