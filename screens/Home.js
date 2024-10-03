import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  
  // Reemplazamos Dimensions por useWindowDimensions
  const { height: screenHeight } = useWindowDimensions();

  const hours = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const handleHourSelect = (hour) => {
    setSelectedHour(hour);
  };

  const generateDays = () => {
    const today = new Date();
    const days = [];
    for (let i = 0; i < 15; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const day = date.getDate();
      const dayString = day < 10 ? `0${day}` : day.toString();
      const dayName = date.toLocaleString('es-AR', { weekday: 'short' });
      const monthName = date.toLocaleString('es-AR', { month: 'short' });
      days.push({
        day: dayString,
        dayName,
        monthName,
        dateString: date.toISOString().split('T')[0]
      });
    }
    return days;
  };

  const days = generateDays();

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={[styles.daysContainer, { height: screenHeight * 0.2 }]}>
        {days.map((dayData) => (
          <TouchableOpacity
            key={dayData.dateString}
            style={[styles.dayButton, selectedDate === dayData.dateString && styles.selectedDayButton]}
            onPress={() => onDayPress(dayData)}
          >
            <View style={styles.dayTextContainer}>
              <Text style={[styles.dayText, selectedDate === dayData.dateString && styles.selectedDayText]}>
                {dayData.dayName}
              </Text>
              <Text style={[styles.dayName, selectedDate === dayData.dateString && styles.selectedDayText]}>
                {dayData.day} {dayData.monthName}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.imageContainer}>
        <Image source={require('../assets/images/skating_rink.jpg')} style={styles.image} />
        <View style={styles.infoContainer}>
          <View>
            <View style={styles.sportContainer}>
              <MaterialCommunityIcons name="roller-skate" size={20} color="#A0A0A0" />
              <Text style={styles.sport}>Patín artístico</Text>
            </View>
            <Text style={styles.location}>Pista de entrenamiento profesional</Text>
          </View>
          <View>
            <Text style={styles.price}>$20.000</Text>
            <View style={styles.locationContainer}>
              <Ionicons name="location-outline" size={16} color="#A0A0A0" />
              <Text style={styles.place}>Parque Roca</Text>
            </View>
          </View>
        </View>
      </View>
      
      <Text style={styles.scheduleNote}>Tenga en cuenta que los turnos son de 60 minutos.</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hourScrollContainer}>
        <View style={styles.hourContainer}>
          {hours.map((hour) => (
            <TouchableOpacity
              key={hour}
              style={[styles.hourButton, selectedHour === hour && styles.selectedHourButton]}
              onPress={() => handleHourSelect(hour)}
            >
              <Text style={selectedHour === hour ? styles.selectedHourText : styles.hourText}>{hour}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.reserveButton}>
        <Text style={styles.reserveButtonText}>Reservar</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,  // Asegura que el ScrollView ocupe todo el espacio disponible
    padding: 20,
    backgroundColor: '#F0F4F8',
  },
  daysContainer: {
    marginBottom: '5%',
    maxHeight: '10%',
  },
  dayButton: {
    height: '100%',
    width: 80,
    marginHorizontal: 5,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 24,
  },
  selectedDayText: {
    color: '#fff',
  },
  dayName: {
    fontSize: 14,
    color: '#A0A0A0',
    marginTop: 5,
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  sport: {
    marginBottom:5,
    fontWeight: 'bold',
    fontSize: 18,
  },
  location: {
    color: '#A0A0A0',
    fontSize: 14,
  },
  price: {
    marginBottom:5,
    fontWeight: 'bold',
    fontSize: 18,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sportContainer: {
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  place: {
    color: '#A0A0A0',
    fontSize: 14,
    marginLeft: 5,
  },
  scheduleNote: {
    textAlign: 'center',
    color: '#A0A0A0',
    marginBottom: 10,
  },
  hourScrollContainer: {
    marginBottom: 20,
    maxHeight: '5%',
  },
  hourContainer: {
    flexDirection: 'row',
  },
  hourButton: {
    borderWidth: 1,
    borderColor: '#3BA0C6',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  selectedHourButton: {
    backgroundColor: '#3BA0C6',
  },
  hourText: {
    color: '#3BA0C6',
  },
  selectedHourText: {
    color: '#fff',
  },
  reserveButton: {
    backgroundColor: '#3BA0C6',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  reserveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
