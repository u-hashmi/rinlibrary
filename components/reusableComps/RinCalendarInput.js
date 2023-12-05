import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Animated, { EasingNode } from 'react-native-reanimated';

const RinCalendar = ({
  label,
  onDateSelect,
  labelStyles = null,
  inputStyles = null,
  borderLabel = true,
}) => {
  const [text, onChangeText] = useState('');
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(selectedYear, selectedMonth, 1).getDay();
  const inputRef = useRef(null);
  const [isTextInputLayoutCalled, setTextInputLayoutCalled] = useState(false);
  const [calendarPosition, setCalendarPosition] = useState({
    top: 0,
    left: 0,
  });

  const handleCalendarVisible = () => {
    setCalendarVisible(!isCalendarVisible);
  };

  const onTextInputLayout = () => {
    if (!isTextInputLayoutCalled && inputRef.current) {
      inputRef.current.measure((x, y, width, height, pageX, pageY) => {
        setCalendarPosition({ top: pageY + height, left: pageX });
        setTextInputLayoutCalled(true);
      });
    }
  };

  const closeCalendar = () => {
    setCalendarVisible(false);
  };

  const handleYearChange = (year) => {
    if (year < 1980) {
      setSelectedYear(1980);
    } else if (year > 3000) {
      setSelectedYear(3000);
    } else {
      setSelectedYear(year);
    }

    const newDate = new Date(selectedDate);
    setSelectedDate(newDate);
  };

  const handleMonthChange = (month) => {
    if (month < 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else if (month > 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(month);
    }
  };

  const resetCalendar = () => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDate = new Date();

    setSelectedYear(currentYear);
    setSelectedMonth(currentMonth);
    setSelectedDate(currentDate);
    onChangeText(currentDate.toLocaleDateString());
    onDateSelect(currentDate);
  };

  const handleDaySelect = (day) => {
    const newDate = new Date(selectedDate);
    newDate.setFullYear(selectedYear);
    newDate.setMonth(selectedMonth);
    newDate.setDate(day);
    setSelectedDate(newDate);
    onChangeText(newDate.toLocaleDateString());
    onDateSelect(newDate);
  };

  const getWeeksArray = () => {
    const weeksArray = [];
    let week = Array(7).fill('');
    let dayCounter = 1;
    for (let i = 0; i < firstDayOfWeek; i++) {
      week[i] = ' ';
    }
    for (let i = firstDayOfWeek; i < 7; i++) {
      week[i] = dayCounter++;
    }
    while (dayCounter <= daysInMonth) {
      weeksArray.push(week);
      week = Array(7).fill('');
      for (let i = 0; i < 7; i++) {
        if (dayCounter <= daysInMonth) {
          week[i] = dayCounter++;
        }
      }
    }
    while (week.length < 7) {
      week.push(' ');
    }
    weeksArray.push(week);
    return weeksArray;
  };

  const getDayLabel = (day) => {
    return day ? day.toString() : '';
  };

  const isSameDate = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const renderModalContent = () => (
    <View
      style={[
        styles.modalContainer,
        { top: calendarPosition.top, left: calendarPosition.left },
        Platform.OS === 'ios' && styles.iosModalContainer, // Conditional iOS styles
      ]}>
      <View
        style={[
          styles.modalInnerContainer,
          Platform.OS === 'ios' && styles.iosModalInnerContainer,
        ]}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.spinner}
            onPress={() => handleYearChange(selectedYear - 1)}>
            <FontAwesome style={styles.spinnerText} name="angle-left" size={20} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>{selectedYear}</Text>
          <TouchableOpacity
            style={styles.spinner}
            onPress={() => handleYearChange(selectedYear + 1)}>
            <FontAwesome style={styles.spinnerText} name="angle-right" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.spinner}
            onPress={() => handleMonthChange(selectedMonth - 1)}>
            <FontAwesome style={styles.spinnerText} name="angle-left" size={20} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>{MONTH_NAMES[selectedMonth]}</Text>
          <TouchableOpacity
            style={styles.spinner}
            onPress={() => handleMonthChange(selectedMonth + 1)}>
            <FontAwesome style={styles.spinnerText} name="angle-right" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.resetButton} onPress={resetCalendar}>
            <FontAwesome name="refresh" size={18} color="black" />
          </TouchableOpacity>
        </View>
        <View>
          <View style={styles.calendar}>
            <View style={styles.dayLabels}>
              {DAY_LABELS.map((day) => (
                <View
                  key={day}
                  style={[
                    styles.dayLabel,
                    day === 'Sat' || day === 'Sun' ? styles.weekend : null,
                  ]}>
                  <Text
                    style={[
                      styles.dayLabelText,
                      day === 'Sat' || day === 'Sun'
                        ? styles.weekendText
                        : null,
                    ]}>
                    {day}
                  </Text>
                </View>
              ))}
            </View>
            {getWeeksArray().map((week, weekIndex) => (
              <View key={weekIndex} style={styles.week}>
                {week.map((day, dayIndex) => (
                  <TouchableOpacity
                    key={dayIndex}
                    style={[
                      styles.day,
                      day != '' &&
                      ((firstDayOfWeek + day - 1) % 7 === 0 ||
                        (firstDayOfWeek + day - 1) % 7 === 6)
                        ? styles.weekend
                        : null,
                      isSameDate(
                        selectedDate,
                        new Date(selectedYear, selectedMonth, day)
                      )
                        ? styles.selectedDate
                        : null,
                    ]}
                    onPress={() => handleDaySelect(day)}>
                    <Text
                      style={[
                        styles.dayText,
                        (firstDayOfWeek + day - 1) % 7 === 0 ||
                        (firstDayOfWeek + day - 1) % 7 === 6
                          ? styles.weekendText
                          : null,
                        isSameDate(
                          selectedDate,
                          new Date(selectedYear, selectedMonth, day)
                        )
                          ? styles.selectedDateText
                          : null,
                      ]}>
                      {getDayLabel(day)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );

  const formatDate = (date) => {
    const mm = date.getMonth() + 1;
    const dd = date.getDate();
    const yyyy = date.getFullYear();

    return `${mm.toString().padStart(2, '0')}/${dd
      .toString()
      .padStart(2, '0')}/${yyyy}`;
  };

  const parseDate = (input) => {
    const parts = input.split('/');
    if (parts.length === 3) {
      const mm = parseInt(parts[0], 10);
      const dd = parseInt(parts[1], 10);
      const yyyy = parseInt(parts[2], 10);

      if (!isNaN(mm) && !isNaN(dd) && !isNaN(yyyy)) {
        return new Date(yyyy, mm - 1, dd);
      }
    }
    return null;
  };

  const isValidInput = (input) => {
    return parseDate(input) !== null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputMainContainer}>
        <View style={styles.inputContainer}>
          {borderLabel && (
            <Text style={{ ...styles.label, ...labelStyles }}>
              {label || 'Basic date picker'}
            </Text>
          )}
          <TextInput
            ref={inputRef}
            onLayout={onTextInputLayout}
            style={{ ...styles.input, ...inputStyles }}
            value={text}
            onChangeText={(input) => {
              if (isValidInput(input)) {
                onChangeText(input);
                const parsedDate = parseDate(input);
                setSelectedYear(parsedDate.getFullYear());
                setSelectedMonth(parsedDate.getMonth());
                setSelectedDate(parsedDate);
                onDateSelect(parsedDate);
              }
            }}
            editable={false}
            selectTextOnFocus={false} 
            placeholder={text || 'MM/DD/YYYY'}
          />
          <TouchableOpacity
            style={styles.calendarButton}
            onPress={handleCalendarVisible}>
            <FontAwesome name="calendar" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isCalendarVisible}
        onRequestClose={closeCalendar}
        presentationStyle="overFullScreen">
        <TouchableOpacity
          style={{ borderWidth: 1, display: 'flex', flex: 1 }}
          onPress={closeCalendar}>
          {renderModalContent()}
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: 'white',
  },
  modalContainer: {
    position: 'absolute',
    marginTop: 4,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 4,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
    padding: 15,
    width: '84%',
    zIndex: 100,
  },
  resetButton: {
    paddingRight: 10
  },
  modalInnerContainer: {
    backgroundColor: 'white',
  },
  iosModalContainer: {
    marginTop: 62,
    width: '87.5%',
  },
  iosModalInnerContainer: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  spinner: {
    padding: 3,
  },
  spinnerText: {
    fontFamily: 'Gabarito',
    fontSize: 18,
    color: 'gray',
  },
  headerText: {
    fontFamily: 'Gabarito',
    fontSize: 16,
  },
  calendar: {},
  selectedDate: {
    backgroundColor: 'darkgray',
  },
  selectedDateText: {
    color: 'white',
  },
  dayLabels: {
    flexDirection: 'row',
  },
  dayLabel: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  dayLabelText: {
    fontFamily: 'Gabarito',
    fontSize: 14,
    color: 'gray',
  },
  weekend: {
    backgroundColor: 'white',
  },
  weekendText: {
    color: 'gray',
    fontFamily: 'Gabarito',
  },
  week: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  day: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderColor: 'darkgray',
  },
  dayText: {
    fontFamily: 'Gabarito',
    fontSize: 16,
    color: 'gray',
  },
  inputMainContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarButton: {
    paddingRight: 10,
  },
  inputContainer: {
    width: '100%',
    borderWidth: 2,
    borderColor: 'gray',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 4,
    position: 'relative',

    backgroundColor: 'white',
  },
  label: {
    position: 'absolute',
    top: -9,
    left: 8,
    color: 'gray',
    fontSize: 14,
    backgroundColor: 'white',
    paddingHorizontal: 4,
    fontFamily: 'Gabarito',
  },
  input: {
    height: 40,
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    paddingLeft: 10,
    fontFamily: 'Gabarito',
  },
});

export default RinCalendar;
