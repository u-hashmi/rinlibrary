import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { textStyles } from '../../theme';

const AboutScreen = () => {
  return (
    <SafeAreaView>
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <Text style={textStyles.title}>About Screen</Text>
        <Text style={textStyles.subtitle}>Welcome to the about screen!</Text>
        <Text style={textStyles.body}>This is the main content of the screen.</Text>
        <Text style={textStyles.caption}>Additional information goes here.</Text>
      </View>
    </SafeAreaView>
  );
};

export default AboutScreen;
