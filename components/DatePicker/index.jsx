import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import useLocationStore from '../../store/location.store';
import { DateTime } from 'luxon';

const DatePicker = ({ setSelectedDate, selectedDate }) => {
  const { loadTimeSlotsByDate} = useLocationStore();

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    loadTimeSlotsByDate(day.dateString);
  };

  const days = generateDays();
  const groupedDays = groupDaysByWeek(days, 3); // Agrupa las fechas en 3 columnas (lunes a domingo)

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
  const today = DateTime.now().setZone('America/Argentina/Buenos_Aires'); // Configurar la zona horaria
  const days = [];

  for (let i = 0; i < 15; i++) {
    const date = today.plus({ days: i }); // Incrementar días
    const day = date.day;
    const dayString = day < 10 ? `0${day}` : day.toString();
    const dayName = date.toFormat('ccc'); // Día abreviado
    const monthName = date.toFormat('LLL'); // Mes abreviado

    days.push({
      day: dayString,
      dayName,
      monthName,
      dateString: date.toISODate(), // Fecha en formato ISO
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
