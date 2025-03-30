  import React, { useState } from "react";
  import { ScrollView, View, StyleSheet, Linking } from "react-native";
  import { Badge, Button, FloatingButton, Image, Modal, Text } from "react-native-ui-lib";
  import RepeaterInvites from "@/components/RepeaterInvites";
  import { OutlinedButton, PrimaryButton } from "@/components/ui/button";
  import { AntDesign } from "@expo/vector-icons";
  import { apiEndpoint } from "@/configs/routes.config";
  import useLocationStore from "@/store/location.store";
  import useUserStore from "@/store/user.store";
  import { useNavigation } from "@react-navigation/native";
  import { route as routePath } from "@/configs/routes.config";
  import { TOAST_COLOR, useToast } from "@/components/ToastProvider";

  const BookingForm = ({ route }) => {
    const [invites, setInvites] = useState([]);
    const { selectedDate, selectedHour } = route.params;
    const { currentLocation } = useLocationStore();
    const { token } = useUserStore();
    const navigation = useNavigation();
    const {showToast} = useToast()

    const handleOnFabAction = () => (
      setIsVisible(true)
      //showToast('toast', TOAST_COLOR.success)
    )

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
      <ScrollView contentContainerStyle={styles.mainContainer}>
        {/* <View
        //style={styles.container}
        >
          <Text style={styles.title}>Confirmar reserva</Text>
          <Text style={styles.subtitle}>¡Ya casi terminamos!</Text>
        </View> */}

        <View style={styles.card}>
            <Text style={styles.sectionTitle}>Información de la reserva</Text>
            {/* <Image
              source={{ uri: currentLocation.image }}
              style={styles.image}
              aspectRatio={1}
              resizeMode="cover"
              borderRadius={10}
            /> */}
            <Text style={styles.subtitle}>Fecha: {selectedDate}</Text>
            <Text style={styles.subtitle}>Hora: {selectedHour.timeSlot}</Text>
            <Text style={styles.subtitle}>
              Pabellón: {currentLocation.pavilion || "Pabellón Europa"}
            </Text>
            <Text style={styles.subtitle}>
              Dirección: {currentLocation.address || "Ubicación no especificada"}
            </Text>
          </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Lista de invitados</Text>
          {invites.length === 0 && (
            <Text style={styles.subtitle}>No se cargaron invitados</Text>
          )}
          {invites.map((invite) => (
            <Badge label={`${invite.name} ${invite.lastName}`} key={invite.dni} />
          ))}
        </View>
        <FabAddInvite onClick={handleOnFabAction} />

          <View>
            <MenuActions
              onSubmit={handleOnSubmit}
              onCancel={handleOnCancel}
            />
          </View>

        <ComponentModal 
          setInvites={setInvites} 
          setIsVisible={setIsVisible}
          isVisible={isVisible} />
      </ScrollView>
    );
  };

  const MenuActions = ({onSubmit, onCancel}) => (
    < 
    //style={[styles.buttonContainer, styles.bottomPadding]}
    >
      <PrimaryButton style={styles.primaryButton} onPress={onSubmit}>
        Pagar y Reservar
      </PrimaryButton>
      <OutlinedButton
        style={styles.outlinedButton}
        onPress={onCancel}
      >
        Cancelar
      </OutlinedButton>
    </>
  )

  const FabAddInvite = ({ onClick }) => (
    <FloatingButton
      visible
      style={{
        position: "absolute",
        bottom: 20, // Distancia desde la parte inferior
        right: 20,  // Distancia desde la derecha
      }}
      buttonLayout="Vertical"
      button={{
        backgroundColor: "#00838F",
        label: "Agregar invitado",
        //style={styles.fabButton} round
        onPress: () => onClick(),
        icon: {
          name: "plus",
          size: 24,
          color: "white",
        },
      }}
    />
  );

  
  const ComponentModal = ({ setInvites, setIsVisible, isVisible }) => (
    <Modal
      transparent
      visible={isVisible}
      style={styles.modal}
      animationType="fade"
      overlayBackgroundColor={"rgba(168, 168, 168, 0.5)"}
    >
      <View style={styles.modalContent}>
        <RepeaterInvites setInvites={setInvites} />
        <Button
          onPress={() => setIsVisible(false)}
          label="Volver"
          style={styles.modalButton}
        />
      </View>
    </Modal>
  );

  const styles = StyleSheet.create({
    mainContainer: {
      flexGrow: 1,
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 120, // Increased to accommodate FAB button
    },
    container: {
      paddingTop: 20,
    },
    bottomPadding: {
      marginBottom: 100,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#4CBAF5",
      marginBottom: 20,
      textAlign: "center",
    },
    subtitle: {
      fontSize: 16,
      color: "#555",
      textAlign: "center",
      marginVertical: 2,
    },
    card: {
      backgroundColor: "#FFFFFF",
      padding: 20,
      borderRadius: 10,
      marginBottom: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 4,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
      color: "#4CBAF5",
    },
    image: {
      width: "100%",
      marginVertical: 10,
    },
    fabButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      height: 56,
      paddingHorizontal: 20,
      borderRadius: 28,
      backgroundColor: "#00838F",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      elevation: 8,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      zIndex: 999,
    },
    buttonContainer: {
      alignItems: "center",
      marginTop: 20,
      marginBottom: 20,
    },
    primaryButton: {
      fontSize: 16,
      paddingVertical: 15,
      borderRadius: 8,
      alignItems: "center",
    },
    outlinedButton: {
      marginTop: 10,
      fontSize: 16,
    },
    modal: {
      alignContent: 'center',
      justifyContent: 'center',
      width: "80%",
      maxHeight: "75%",
      borderRadius: 12,
      alignSelf: "center",
    },
    modalContent: {
      backgroundColor: "white",
      padding: 20,
    },
    modalButton: {
      marginTop: 16,
    },
  });

  export default BookingForm;
