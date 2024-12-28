import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Linking } from 'react-native';
import { Badge, Button, Modal, Text} from 'react-native-ui-lib';
import RepeaterInvites from '@/components/RepeaterInvites';
import { OutlinedButton, PrimaryButton } from '@/components/ui/button';
import { AntDesign } from '@expo/vector-icons';
import { apiEndpoint } from '@/configs/routes.config';
import useLocationStore from '@/store/location.store';
import useUserStore from '@/store/user.store';
import { useNavigation } from '@react-navigation/native';
import { route as routePath } from '@/configs/routes.config';

const BookingForm = ({ route }) => {
    const [invites, setInvites] = useState([]);
    const { selectedDate, selectedHour } = route.params;
    const { currentLocation} = useLocationStore();
    const { token } = useUserStore();
    const navigation = useNavigation();

    if (!selectedDate || !selectedHour) {
        navigation.goBack();
        return null;
    }
    const [isVisible, setIsVisible] = useState(false);

    const handleOnCancel = () => {
        navigation.navigate(routePath.home);
        return null;
    }

    const handleOnSubmit = async () => {
        const bodyForm = {
          location_id: currentLocation.id,
          timeSlots: [selectedHour.timeSlot_id],
          invites,
          date: selectedDate,
        };
    
        try {
          const response = await fetch(apiEndpoint.bookings.create, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(bodyForm),
          });
    
          if (response.status >= 200) {
            const data = await response.json();
            const supported = await Linking.canOpenURL(data.init_point);
            if (supported) {
              await Linking.openURL(data.init_point);
            } else {
              alert("No se puede abrir el enlace");
            }
          }
        } catch (error) {
          alert("Error al crear reserva");
          console.error("Error al crear reserva:", error);
        }
      };

    return (
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <Text style={styles.modalTitle}>Confirmar reserva</Text>
                <Text style={styles.subTitle}>¡Ya casi terminamos!</Text>
                {/* Otros textos e imágenes */}
            </View>

            <View>
                <Text style={styles.modalTitle}>Lista de invitados</Text>
                {invites.length === 0 && <Text style={styles.subTitle}>No se cargaron invitados</Text>}
                {invites.map((invite) => (
                    <Badge label={`${invite.name} ${invite.lastName}`} key={invite.id} />
                ))}

                <Modal visible={isVisible} style={{ width: 500, height: 300 }}>
                    <RepeaterInvites setInvites={setInvites} />
                    <Button onPress={()=>{setIsVisible(false)}} label="Volver" />
                </Modal>
                <Button onPress={() => setIsVisible(true)}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <AntDesign name="plus" size={24} color="black" style={{ marginRight: 8 }} />
                        <Text>Agregar Invitado</Text>
                    </View>
                </Button>
            </View>

            <View style={styles.bottonContainer}>
                <PrimaryButton style={{padding: 15}} onPress={handleOnSubmit}>Pagar y Reservar</PrimaryButton>
                <OutlinedButton onPress={handleOnCancel}>Cancelar</OutlinedButton>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    mainContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    bottonContainer: { justifyContent: 'center', alignItems: 'center' },
    modalTitle: { fontSize: 24, fontWeight: 'bold' },
    subTitle: { fontSize: 18, color: '#555' },
});

export default BookingForm;
