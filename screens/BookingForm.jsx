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
  

export default BookingForm;
