import React, { useEffect, useState } from 'react';
//import useLocationStore from '../store/location.store';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  useWindowDimensions, 
  Modal, 
  TextInput 
} from 'react-native';


const DatePicker = ({ setSelectedDate, selectedDate }) => {
    const { height: screenHeight } = useWindowDimensions();
  
    const onDayPress = (day) => {
        setSelectedDate(day.dateString);
      };
    
      const days = generateDays();

    
    return (
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

    )
}

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
  

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 20,
      backgroundColor: '#F0F4F8',
    },
  
    //dias
  
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
  
    //locaciones
  
    imageCarousel: {
      
    },
    imageContainer: {
      marginRight: 15,
      borderRadius: 10,
      overflow: 'hidden',
      backgroundColor: '#fff',
      width: 400, // Ajusta el ancho según necesites
      elevation: 2, // Sombra para Android
      shadowColor: '#000', // Sombra para iOS
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
    },
    image: {
      width: '100%',
      height: 150,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    infoContainer: {
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    sportContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
    },
    sport: {
      fontSize: 14,
      color: '#A0A0A0',
      marginLeft: 5,
    },
    location: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
    },
    description: {
      fontSize: 12,
      color: '#777',
      marginTop: 5,
    },
  
    pabellon: {
      fontSize: 12,
      color: '#777',
    },
    price: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
      textAlign: 'right',
    },
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 5,
    },
    place: {
      fontSize: 14,
  
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
  

  export default DatePicker;