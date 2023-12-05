import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { textStyles } from '../../theme';

const AnalysisScreen = () => {
  return (
    <SafeAreaView>
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <Text style={textStyles.title}>Analysis Screen</Text>
        <Text style={textStyles.subtitle}>Welcome to the analysis screen!</Text>
        <Text style={textStyles.body}>This is the main content of the screen.</Text>
        <Text style={textStyles.caption}>Additional information goes here.</Text>
      </View>
    </SafeAreaView>
  );
};

export default AnalysisScreen;
