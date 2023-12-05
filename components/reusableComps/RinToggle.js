import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated } from 'react-native';

const SliderToggle = ({ toggled, customColor }) => {
  const [isToggled, setIsToggled] = useState(toggled || false);
  const togglerBarStyles = [];
  const togglerHandleStyles = [];

  const translateAnim = useRef(new Animated.Value(0)).current;

  const handleToggle = () => {
    const toValue = isToggled ? 0 : 20;

    Animated.spring(translateAnim, {
      toValue,
      useNativeDriver: false,
    }).start();

    setIsToggled((prev) => !prev); 
  };

  if (customColor) {
    togglerBarStyles.push({
      backgroundColor: customColor,
      opacity: 0.4,
    });
    togglerHandleStyles.push({
      backgroundColor: customColor,
      borderWidth: 0,
    });
  } else {
    togglerBarStyles.push({
      backgroundColor: 'rgba(0, 127, 255, 0.3)',
      opacity: 0.4,
    });
    togglerHandleStyles.push({
      backgroundColor: 'rgba(0, 127, 255, 1)',
      borderWidth: 0,
    });
  }

  return (
    <TouchableOpacity
      onPress={handleToggle}
      activeOpacity={1}
      style={styles.mainContainer}>
      <View style={styles.toggleContainer}>
        <View
          style={[
            styles.sliderBar,
            isToggled ? togglerBarStyles : null,
          ]}></View>
        <Animated.View
          style={[ 
            styles.sliderTip,
            { left: translateAnim },
            isToggled ? togglerHandleStyles : null,
          ]}></Animated.View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sliderBar: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    height: 16,
    width: 40,
    borderRadius: 25,
  },
  sliderTip: {
    position: 'absolute',
    height: 20,
    width: 20,
    borderRadius: 25,
    backgroundColor: 'white',
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 6,
  },
  sliderTipToggled: {
    backgroundColor: 'rgba(0, 127, 255, 1)',
    borderWidth: 0,
  },
});

export default SliderToggle;
