import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const RinCalendar = ({ onDateSelect }) => {
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
    onDateSelect(currentDate);
  };

  const handleDaySelect = (day) => {
    const newDate = new Date(selectedDate);
    newDate.setFullYear(selectedYear);
    newDate.setMonth(selectedMonth);
    newDate.setDate(day);
    setSelectedDate(newDate);
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

  return (
    <View
      style={[styles.container, Platform.OS === 'ios' && styles.iosContainer]}>
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
        <TouchableOpacity style={styles.resetButton} onPress={resetCalendar} >
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
                    day === 'Sat' || day === 'Sun' ? styles.weekendText : null,
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
                    Platform.OS === 'ios' && styles.iosDay,
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
    padding: 5,
    height: 300,
    display: 'flex',
    flex: 1,
    width: '100%',
  },
  iosContainer: {
    height: 330,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
    
  },
  spinner: { 
    padding: 3
  },
  spinnerText: {
    fontFamily: 'Gabarito',
    fontSize: 20,
    color: 'gray',
  },
  headerText: {
    fontFamily: 'Gabarito',
    fontSize: 16,
  },
  resetButton: {
    backgroundColor: 'white',
    paddingRight: 10
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
  iosDay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderColor: 'darkgray',
  },
  dayText: {
    fontFamily: 'Gabarito',
    fontSize: 16,
    color: 'gray',
  },
});

export default RinCalendar;
