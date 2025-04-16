import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import LocationCarousel from '@/components/LocationCarousel';
import useLocationStore from '@/store/location.store';
import DatePicker from '@/components/DatePicker';
import HourPicker from '@/components/HourPicker';
import { useNavigation } from '@react-navigation/native';
import { PrimaryButton } from '@/components/ui/button';
import { route as routePath } from '@/configs/routes.config';


export default function Home() {

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const navigation = useNavigation();
  const { loadLocations, locations, errors, currentLocation } = useLocationStore();

  const handleOnPress = () => {
    if (selectedDate && selectedHour && currentLocation) {
      navigation.navigate(routePath.bookingForm, {
        selectedDate,
        selectedHour,
      })
    }else {
      alert('Debe seleccionar una ubicación, fecha y hora')
    }
  }

    useEffect(() => {
      loadLocations().then();
    }, []);

    if (errors) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>{errors}</Text>
        </View>
      )
    }

    return (
      <ScrollView contentContainerStyle={styles.container}>
        {/* Carrusel de locaciones */}
        
        <View style={styles.carouselContainer}>
          <LocationCarousel locations={locations} />
        </View>

        <DatePicker setSelectedDate={setSelectedDate} selectedDate={selectedDate} />
        <HourPicker selectedHour={selectedHour} setSelectedHour={setSelectedHour} />


        {/* Botón de Reservar */}
        <PrimaryButton
          onPress={
            handleOnPress
          }
        >
          Reservar
        </PrimaryButton>
      </ScrollView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      paddingHorizontal: 20,
      paddingBottom: 80,
      backgroundColor: '#F0F4F8',
    },
    carouselContainer: {
    },

    columnContainer: {
      flexDirection: 'row',
      alignItems: 'space-around',
      justifyContent: 'space-around',
      marginBottom: 20,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: '90%',
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
      maxHeight: '70%',
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
      color: '#000',
      marginBottom: 5,
    },
    input: {
      width: '100%',
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      marginTop: 10,
      fontSize: 16,
    },
    formTitle: {
      fontSize: 14,
      color: '#777',
      marginVertical: 10,
      textAlign: 'center',
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: 20,
    },
    confirmButton: {
      backgroundColor: '#007BFF',
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
      flex: 1,
      marginRight: 10,
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
      flex: 1,
    },
    closeButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });