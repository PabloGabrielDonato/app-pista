import * as Linking from 'expo-linking';
import RepeaterInvites from "@/components/RepeaterInvites";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { apiEndpoint } from "@/configs/routes.config";
import useLocationStore from "@/store/location.store";
import useUserStore from "@/store/user.store";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";

const BookingForm = ({route}) => {
    const navigation = useNavigation();
    const [invites, setInvites] = useState([])
    const { selectedDate, selectedHour } = route.params;
    const { currentLocation } = useLocationStore();
    const { user, token } = useUserStore();
    
    if(!selectedDate || !selectedHour){
        navigation.goBack();
        return;
    }

    const handleOnSubmit = async() => {
        const bodyForm = {
          location_id: currentLocation.id,
          timeSlots: [selectedHour.timeSlot_id],
          invites,
          date: selectedDate,
        }
        
        console.log(bodyForm);
        try{
          const response = await fetch(apiEndpoint.bookings.create, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
              body: JSON.stringify(bodyForm),
            })
            if(response.status >= 200){
            data = await response.json()
            console.log(data);
            const supported = await Linking.canOpenURL(data.init_point);
            if(supported){
              await Linking.openURL(data.init_point);
            }else {
              alert('No se puede abrir el enlace');
            }
          }
  
        }catch(error){
          alert('Error al crear reserva');
            console.error('Error al crear reserva:', error);
        }
    }

    return (
        <ScrollView style={styles.modalContent}>
          <Text style={styles.modalTitle}>Confirmar reserva</Text>
          <Text style={styles.subTitle}>¡Ya casi terminamos!</Text>
          <Text style={styles.text}>
            Para completar tu reserva, termina de completar los siguientes datos
          </Text>
          <Image
            source={require('../assets/skating_rink.jpg')}
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

            <Text>Participantes (incluido el usuario) {invites.length + 1}</Text>
            <RepeaterInvites setInvites={setInvites} />
            </View>
          </View>

          {/* Formulario de datos de reserva */}
          <Text style={styles.formTitle}>
            Si usted tiene una licencia CAP, al indicar su número de DNI se le
            aplicará un descuento
          </Text>

          <View style={styles.buttonsContainer}>
            <Button
              onPress={() => handleOnSubmit()}
            >
              <ButtonText>Pagar y Reservar</ButtonText>
            </Button>

            <Button
              onPress={() => navigation.goBack()}
            >
              <ButtonText>Cancelar</ButtonText>
            </Button>
          </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 80,
    backgroundColor: '#F9FAFB',
  },
  columnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  reserveButton: {
    backgroundColor: '#2563EB',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  reserveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#1F2937',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#4B5563',
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 10,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    marginVertical: 15,
  },
  card: {
    backgroundColor: '#F3F4F6',
    padding: 15,
    marginVertical: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
    width: '45%',
  },
  cardText: {
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 5,
    fontWeight: '500',
  },
  formTitle: {
    fontSize: 15,
    color: '#6B7280',
    marginVertical: 15,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  confirmButton: {
    backgroundColor: '#10B981',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

  

export default BookingForm;
