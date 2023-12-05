import React, { useState} from 'react';
import { SafeAreaView, StyleSheet, TextInput, View, Text } from 'react-native';
import {colors} from '../theme';
import { Ionicons } from '@expo/vector-icons';

const CustomTextInput = ({label, labelStyles = null, inputStyles = null, borderLabel = true, iconName}) => {
  const [text, onChangeText] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}> 
        {borderLabel && 
          <Text style={{...styles.label, ...labelStyles}}>{label || 'Input Label'}</Text>
        }
        <TextInput
          style={{...styles.input, ...inputStyles}}
          onChangeText={onChangeText}
          value={text}
          placeholder= {borderLabel ? '' : label || 'Input Label'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    width: '100%',
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 4,
    position: 'relative',
    backgroundColor: 'white'
  },
  label: {
    position: 'absolute',
    top: -9,
    left: 8,
    color: `${colors.inputLabelTextColor}`,
    fontSize: 14,
    backgroundColor: 'white',
    paddingHorizontal: 4,
    fontFamily: 'Gabarito'
  },
  input: {
    height: 40,
    fontSize: 16,
    paddingVertical: 8,
    paddingLeft: 10,
    fontFamily: 'Gabarito',
  },
  
});

export default CustomTextInput;
