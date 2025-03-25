import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Linking } from 'react-native';
import { Badge, Button, Modal, Text } from 'react-native-ui-lib';
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
    const { currentLocation } = useLocationStore();
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
    };

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
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Confirmar reserva</Text>
                <Text style={styles.subtitle}>¡Ya casi terminamos!</Text>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Lista de invitados</Text>
                    {invites.length === 0 && <Text style={styles.subtitle}>No se cargaron invitados</Text>}
                    {invites.map((invite) => (
                        <Badge label={`${invite.name} ${invite.lastName}`} key={invite.id} />
                    ))}
                    <Button onPress={() => setIsVisible(true)} style={styles.addButton}>
                        <AntDesign name="plus" size={20} color="#fff" />
                        <Text style={styles.buttonText}>Agregar Invitado</Text>
                    </Button>
                </View>

                <Modal visible={isVisible} style={styles.modal}>
                    <RepeaterInvites setInvites={setInvites} />
                    <Button onPress={() => setIsVisible(false)} label="Volver" />
                </Modal>

                <View style={styles.buttonContainer}>
                    <PrimaryButton style={styles.primaryButton} onPress={handleOnSubmit}>Pagar y Reservar</PrimaryButton>
                    <OutlinedButton style={styles.outlinedButton} onPress={handleOnCancel}>Cancelar</OutlinedButton>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        paddingTop: 40,
        paddingBottom: 80,
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4CBAF5',
        marginBottom: 20,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#4CBAF5',
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00838F',
        paddingVertical: 10,
        borderRadius: 8,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    primaryButton: {
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    outlinedButton: {
        marginTop: 10,
    },
    modal: {
        width: '80%',
        height: 300,
        alignSelf: 'center',
    },
});

export default BookingForm;
