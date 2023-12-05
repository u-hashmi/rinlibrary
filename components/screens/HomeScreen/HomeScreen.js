// HomeScreen.js
import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  View,
  ScrollView,
  Text,
  Button,
} from 'react-native';

import RinToggle from '../../reusableComps/RinToggle';
import RinCalendar from '../../reusableComps/RinCalendar';
import RinCalendarInput from '../../reusableComps/RinCalendarInput';
import RinCard from '../../reusableComps/RinCard';
import RinTextInput from '../../reusableComps/RinTextInput';
import RinCheckBox from '../../reusableComps/RinCheckBox';
import { colors, textStyles, viewStyles } from '../../theme';

const HomeScreen = () => {
  const [isChecked, setChecked] = useState(false);
  const [isChecked2, setChecked2] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');

  const handleToggle = () => {
    setChecked(!isChecked);
  };

  const handleDateSelect = (dateString) => {
    setSelectedDate(dateString.toLocaleString());
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView>
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Text style={textStyles.title}>Home Screen</Text>
          <Text style={textStyles.subtitle}>Welcome to the home screen!</Text>
          <Text style={textStyles.body}>
            This is the main content of the screen.
          </Text>
          <Text style={textStyles.caption}>
            Additional information goes here.
          </Text>
        </View>

        <RinCard variant="outlined">
          <RinCalendarInput onDateSelect={handleDateSelect} />
        </RinCard>

        <RinCard variant="outlined">
          <Text style={styles.textBasicStyle}>
            Rin Card with variant "outlined"
          </Text>
        </RinCard>

        <RinCard shadow="small">
          <Text style={styles.textBasicStyle}>
            Rin Card with shadow "small"{' '}
          </Text>
        </RinCard>

        <RinCard shadow="medium">
          <Text style={styles.textBasicStyle}>
            Rin Card with shadow "medium"
          </Text>
        </RinCard>

        <RinCard shadow="large">
          <Text style={styles.textBasicStyle}>
            Rin Card with shadow "large"
          </Text>
        </RinCard>

        <RinCard shadow="large">
          <RinTextInput
            label={'Input with header label'}
            labelStyles={{ color: colors.secondary }}
          />
        </RinCard>

        <RinCard shadow="large">
          <RinTextInput
            label={'Input with border label false'}
            labelStyles={{ color: colors.secondary }}
            borderLabel={false}
          />
        </RinCard>

        <RinCard
          shadow="none"
          style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'transparent' }}>
          <RinCheckBox
            isChecked={isChecked2}
            onToggle={handleToggle}
            style={{ fontWeight: 'bold' }}
            fillColor="#3498db"
            iconName="add-circle-outline"
          />

          <RinCheckBox
            label="Rin custom color"
            isChecked={isChecked}
            onToggle={handleToggle}
            style={{ fontWeight: 'bold' }}
            fillColor="red"
            iconName="add-circle-outline"
          />
          <RinToggle/>
          <RinToggle toggled={true} customColor={'#e67e22'}/>
        </RinCard>

        <RinCard shadow="large">
          <RinCalendar onDateSelect={handleDateSelect} />
        </RinCard>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'ghostwhite',
    display: 'flex',
    marginBottom: 60,
    flex: 1,
  },
  textBasicStyle: {
    fontFamily: 'Gabarito',
  },
});

export default HomeScreen;
