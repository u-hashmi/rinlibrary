import React, { useState } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const RinCheckBox = ({
  label,
  isChecked,
  onToggle,
  style,
  fillColor = 'gray',
}) => {
  return (
    <TouchableOpacity onPress={onToggle} style={styles.checkboxContainer}>
      <View
        style={[
          styles.checkbox,
          isChecked && { backgroundColor: fillColor, borderColor: fillColor },
          style,
        ]}>
        {isChecked && (
          <Ionicons
            style={Platform.OS === 'ios' && styles.iosCheckboxContainer}
            name="checkmark-outline"
            size={20}
            color="#ffffff"
          />
        )}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  checkbox: {
    width: 20,
    height: 20,
    display: 'flex',
    borderRadius: 3,
    borderWidth: 2,
    borderColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  iosCheckboxContainer: {
    display: 'flex',
    width: 20,
    height: 20,
  },
  label: {
    color: '#333333',
    fontFamily: 'Gabarito',
  },
});

export default RinCheckBox;
