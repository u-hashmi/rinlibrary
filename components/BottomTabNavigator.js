// BottomTabNavigator.js
import React from 'react';
import {StyleSheet} from 'react-native';
import { BlurView } from 'expo-blur';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen/HomeScreen';
import AnalysisScreen from './screens/AnalysisScreen/AnalysisScreen';
import AboutScreen from './screens/AboutScreen/AboutScreen';
import {colors} from './theme';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconColor = focused ? colors.primary : colors.tabIconInactive;
          if (route.name === 'Home') {
            iconName = 'ios-home-outline';
          } else if (route.name === 'Analysis') {
            iconName = 'analytics-outline';
          } else if (route.name === 'About') {
            iconName = 'information-circle-outline';
          }

          return <Ionicons name={iconName} size={size} color={iconColor} />;
        },
        tabBarStyle: { position: 'absolute' },
        tabBarBackground: () => (
          <BlurView tint="light" intensity={100} style={StyleSheet.absoluteFill} />
        ),
      })}
      tabBarOptions={{
        showLabel: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Analysis" component={AnalysisScreen} />
      <Tab.Screen name="About" component={AboutScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;