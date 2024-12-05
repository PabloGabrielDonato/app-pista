import React, { useEffect, useState } from 'react';
import LocationCarousel from '../components/LocationCarousel';
import useLocationStore from '../store/location.store';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  TextInput,
} from 'react-native';
import DatePicker from '../components/DatePicker';
import HourPicker from '../components/HourPicker';
import useUserStore from '../store/user.store';
//import { Button } from 'react-native-ui-lib';

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  
  const { loadLocations, locations } = useLocationStore();

  useEffect(() => {
    loadLocations().catch();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Carrusel de locaciones */}
      <LocationCarousel locations={locations} />
      <DatePicker setSelectedDate={setSelectedDate} selectedDate={selectedDate} />
      <HourPicker selectedHour={selectedHour} setSelectedHour={setSelectedHour} />

      {/* Botón de Reservar */}
      <TouchableOpacity
        style={styles.reserveButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.reserveButtonText}>Reservar</Text>
      </TouchableOpacity>

      {/* Modal de Reserva */}
      <FormModal 
        setModalVisible={setModalVisible} 
        modalVisible={modalVisible} 
        selectedDate={selectedDate}
        selectedHour={selectedHour}
        />
    </ScrollView>
  );
}

const FormModal = ({ setModalVisible, modalVisible, selectedDate, selectedHour }) => {
  const [peopleCount, setPeopleCount] = useState(1);
  const { currentLocation } = useLocationStore();
  const { user } = useUserStore();

  const handleOnSubmit = () => {
    alert('Formulario enviado');
    setModalVisible(false);
  }


  return (
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
              source={require('../assets/images/skating_rink.jpg')}
              style={styles.image}
            />
            <Text style={styles.text}>Pista de entrenamiento profesional</Text>
            <Text style={styles.text}>Parque Roca</Text>

            {/* Detalles de la reserva */}
            <View style={styles.columnContainer}>
              <View style={styles.card}>
                <Text style={styles.cardText}>Fecha MAR. 1/10/24</Text>
                <Text style={styles.cardText}>Turno 13:00 - 14:00</Text>
                <Text style={styles.cardText}>Pista profesional</Text>
              </View>
              <View style={styles.card}>
                <Text style={styles.cardText}>Nombre {user?.name}</Text>
                <Text style={styles.cardText}>DNI {user?.dni}</Text>
                <Text style={styles.cardText}>Cantidad de personas</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Número de personas"
                  placeholderTextColor="#000000"
                  value={`${peopleCount}`}
                  onChangeText={(text) => setPeopleCount(parseInt(text) || 1)}
                />
              </View>
            </View>

            {/* Formulario de datos de reserva */}
            <Text style={styles.formTitle}>
              Si usted tiene una licencia CAP, al indicar su número de DNI se le
              aplicará un descuento
            </Text>

            <View style={styles.buttonsContainer}>
              {/* <Button 
                label="Pagar y Reservar" 
                onPress={ () => handleOnSubmit() } 
                size={ Button.sizes.medium }
                backgroundColor={ Button.colors.primary }
              /> */}
               

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
)
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 80,
    backgroundColor: '#F0F4F8',
  },

  columnContainer: {
    
    flexDirection: 'row',
    alignItems: 'space-around',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  reserveButton: {
    backgroundColor: '#3BA0C6',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    marginVertical: 20,
  },
  reserveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
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
