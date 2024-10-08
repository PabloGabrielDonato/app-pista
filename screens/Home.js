import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, useWindowDimensions, Modal, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); // Estado del modal
  const [name, setName] = useState('');
  const [dni, setDni] = useState('');
  
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

      {/* Botón de Reservar */}
      <TouchableOpacity style={styles.reserveButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.reserveButtonText}>Reservar</Text>
      </TouchableOpacity>

      {/* Modal de Reserva */}
      <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <ScrollView style={styles.modalContent}>
          <Text style={styles.modalTitle}>Confirmar reserva</Text>
          <Text style={styles.subTitle}>¡Ya casi terminamos!</Text>
          <Text style={styles.text}>
            Para completar tu reserva, termina de completar los siguientes datos
          </Text>
          <Image
            source={require('../assets/images/skating_rink.jpg')}  // Coloca la URL o path local de la imagen aquí
            style={styles.image}
          />
          <Text style={styles.text}>Pista de entrenamiento profesional</Text>
          <Text style={styles.text}>Parque Roca</Text>

          {/* Detalles de la reserva */}
          <View style={styles.card}>
            <Text style={styles.cardText}>Fecha MAR. 1/10/24</Text>
            <Text style={styles.cardText}>Turno 13:00 - 14:00</Text>
            <Text style={styles.cardText}>Pista profesional</Text>
          </View>

          {/* Formulario de datos de reserva */}
          <Text style={styles.formTitle}>Si usted tiene una licencia CAP, al indicar su número de DNI se le aplicará un descuento</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre completo"
            placeholderTextColor="#000000"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="DNI"
            placeholderTextColor="#000000"
            keyboardType="numeric"
            value={dni}
            onChangeText={setDni}
          />
          <TouchableOpacity style={styles.addParticipantButton}>
            <Text style={styles.addParticipantText}>Añadir participante</Text>
          </TouchableOpacity>

          {/* Detalles de pago */}
          <View style={styles.paymentCard}>
            <Text style={styles.paymentTitle}>Pago</Text>
            <Text style={styles.paymentText}>Total 20.000</Text>
            <TextInput style={styles.input} placeholder="Nombre del titular" placeholderTextColor="#000000" />
            <TextInput style={styles.input} placeholder="DNI del titular" placeholderTextColor="#000000" />
            <TextInput style={styles.input} placeholder="Número de tarjeta" placeholderTextColor="#000000" />
            <TextInput style={styles.input} placeholder="Fecha vencimiento" placeholderTextColor="#000000" />
            <TextInput style={styles.input} placeholder="CVV" placeholderTextColor="#000000" />
          </View>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.confirmButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.confirmButtonText}>Pagar y Reservar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 18,
  },
  location: {
    color: '#A0A0A0',
    fontSize: 14,
  },
  price: {
    marginBottom: 5,
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
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
  },
  reserveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Ajustar el alto del contenedor del modal
modalContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
},

// Ajustar el alto del contenido del modal y permitir scroll vertical
modalContent: {
  width: '90%',
  backgroundColor: '#fff',
  borderRadius: 10,
  padding: 20,
  maxHeight: '70%', // Limita el alto del modal
  overflow: 'scroll', // Permite el scroll si el contenido es más grande
},
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#5c5c5c',
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
  },
  card: {
    backgroundColor: '#f4f4f4',
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
  },
  cardText: {
    fontSize: 16,
    color: 'black',
    marginBottom: 5,
  },
  formTitle: {
    fontSize: 14,
    color: '#777',
    marginVertical: 5,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  addParticipantButton: {
    backgroundColor: '#e6f0ff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    alignItems: 'center',
  },
  addParticipantText: {
    fontSize: 16,
    color: '#007BFF',
  },
  paymentCard: {
    backgroundColor: '#f4f4f4',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
  },
  paymentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  paymentText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  confirmButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#f44336',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Alinea los botones con espacio entre ellos
    width: '100%',
    marginBottom:40 // Ocupa todo el ancho disponible
  },
});
