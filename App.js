// App.js
import React from 'react';
import {View, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './components/BottomTabNavigator';
import { useFonts } from 'expo-font';

const App = () => {

   const [fontsLoaded] = useFonts({
    'Gabarito': require('./assets/fonts/Gabarito-VariableFont_wght.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <NavigationContainer>
      <BottomTabNavigator style={{fontFamily: 'Gabarito'}} />
    </NavigationContainer>
  );
};

export default App;
