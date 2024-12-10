import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { DateTime } from 'luxon';
import useLocationStore from '../../store/location.store';

const DatePicker = ({ setSelectedDate, selectedDate }) => {
  const { loadTimeSlotsByDate } = useLocationStore();

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    loadTimeSlotsByDate(day.dateString);
  };

  const days = generateDays();
  const groupedDays = groupDaysByWeek(days, 3);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {groupedDays.map((week, index) => (
        <View key={index} style={styles.weekRow}>
          {week.map((dayData) => (
            <TouchableOpacity
              key={dayData.dateString}
              style={[
                styles.dayButton,
                selectedDate === dayData.dateString && styles.selectedDayButton,
              ]}
              onPress={() => onDayPress(dayData)}
            >
              <View style={styles.dayTextContainer}>
                <Text
                  style={[
                    styles.dayText,
                    selectedDate === dayData.dateString && styles.selectedDayText,
                  ]}
                >
                  {dayData.dayName}
                </Text>
                <Text
                  style={[
                    styles.dayName,
                    selectedDate === dayData.dateString && styles.selectedDayText,
                  ]}
                >
                  {dayData.day} {dayData.monthName}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const generateDays = () => {
  const today = DateTime.now().setZone('America/Argentina/Buenos_Aires');
  const days = [];

  for (let i = 0; i < 15; i++) {
    const date = today.plus({ days: i });
    const day = date.day < 10 ? `0${date.day}` : date.day.toString();

    // Usar Intl.DateTimeFormat para la localización en español
    const dayName = new Intl.DateTimeFormat('es-ES', { weekday: 'short' }).format(date.toJSDate());
    const monthName = new Intl.DateTimeFormat('es-ES', { month: 'short' }).format(date.toJSDate());

    days.push({
      day,
      dayName,
      monthName,
      dateString: date.toISODate(),
    });
  }

  return days;
};

const groupDaysByWeek = (days, columns) => {
  const weeks = [];
  for (let i = 0; i < days.length; i += columns) {
    weeks.push(days.slice(i, i + columns));
  }
  return weeks;
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 10,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dayButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F4F8',
  },
  selectedDayButton: {
    backgroundColor: '#3BA0C6',
  },
  dayTextContainer: {
    alignItems: 'center',
  },
  dayText: {
    color: '#3BA0C6',
    fontWeight: 'bold',
    fontSize: 16,
  },
  selectedDayText: {
    color: '#fff',
  },
  dayName: {
    fontSize: 14,
    color: '#A0A0A0',
    marginTop: 5,
  },
});

export default DatePicker;
