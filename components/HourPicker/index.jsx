import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView 
} from 'react-native';

const hours = [
  "08:00", "09:00", "10:00", "11:00", 
  "12:00", "13:00", "14:00", "15:00", 
  "16:00", "17:00", "18:00", "19:00"
];

const HourPicker = ({ selectedHour, setSelectedHour }) => {
  const handleHourSelect = (hour) => setSelectedHour(hour);

  return (
    <View style={styles.container}>
      <Text style={styles.scheduleNote}>
        Tenga en cuenta que los turnos son de 60 minutos.
      </Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.hourContainer}
      >
        {hours.map((hour) => (
          <TouchableOpacity
            key={hour}
            style={[
              styles.hourButton, 
              selectedHour === hour && styles.selectedHourButton
            ]}
            onPress={() => handleHourSelect(hour)}
          >
            <Text 
              style={
                selectedHour === hour 
                  ? styles.selectedHourText 
                  : styles.hourText
              }
            >
              {hour}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  scheduleNote: {
    textAlign: 'center',
    color: '#A0A0A0',
    marginBottom: 15,
    fontSize: 14,
  },
  hourContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  hourButton: {
    borderWidth: 1,
    borderColor: '#3BA0C6',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  selectedHourButton: {
    backgroundColor: '#3BA0C6',
    borderColor: '#3BA0C6', // Mantener el mismo color para un estilo cohesivo
  },
  hourText: {
    color: '#3BA0C6',
    fontSize: 16, // Tamaño de fuente un poco mayor para mejor visibilidad
  },
  selectedHourText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default HourPicker;
