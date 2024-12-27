import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView 
} from 'react-native';
import useLocationStore from '../../store/location.store';


const HourPicker = ({ selectedHour, setSelectedHour }) => {
  const handleHourSelect = (hour) => setSelectedHour(hour);
  const { availableTimeSlots } = useLocationStore();

  return (
    <View style={styles.container}>
      {availableTimeSlots.length !== 0 && (
        <Text style={styles.scheduleNote}>
          Tenga en cuenta que los turnos son de 60 minutos.
        </Text>
      )}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.hourContainer}
      >
        {availableTimeSlots.map((timeSlot) => (
          <TouchableOpacity
            key={timeSlot.timeSlot_id}
            style={[
              styles.hourButton,
              selectedHour?.startTime === timeSlot.startTime && styles.selectedHourButton,
            ]}
            onPress={() => handleHourSelect(timeSlot)}
          >
            <Text
              style={[
                styles.hourText,
                selectedHour?.startTime === timeSlot.startTime && styles.selectedHourText,
              ]}
            >
              {timeSlot.startTime}
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
    textAlign: "center",
    color: "#A0A0A0",
    marginBottom: 15,
    fontSize: 14,
  },
  hourContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  hourButton: {
    borderWidth: 1,
    borderColor: "#3BA0C6",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    alignItems: "center", // Fondo blanco por defecto
  },
  selectedHourButton: {
    backgroundColor: "#3BA0C6", // Fondo celeste cuando está seleccionada
    borderColor: "#3BA0C6",
  },
  hourText: {
    color: "#3BA0C6", // Texto celeste por defecto
    fontSize: 16,
  },
  selectedHourText: {
    color: "#fff", // Texto blanco cuando está seleccionada
  },
});

export default HourPicker;