import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Logo from "../components/Logo";
import useUserStore from "../store/user.store";
import { route } from "../configs/routes.config";
import { Button } from "react-native-ui-lib";
import { MaterialIcons } from "@expo/vector-icons";

const Perfil = () => {
  const navigation = useNavigation();
  const { logout, user } = useUserStore();

  const handleLogout = () => {
    logout().then(() => navigation.navigate(route.login));
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Logo />
        <Text style={styles.title}>{user?.name} {user?.last_name}</Text>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Datos Personales</Text>

          <TouchableOpacity style={styles.infoBox}>
            <Text style={styles.label}>DNI</Text>
            <Text style={styles.value}>{user?.dni}</Text>
            <MaterialIcons name="edit" size={20} color="#4CBAF5" style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.infoBox}>
            <Text style={styles.label}>Edad</Text>
            <Text style={styles.value}>{user?.birth_date}</Text>
            <MaterialIcons name="edit" size={20} color="#4CBAF5" style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.infoBox}>
            <Text style={styles.label}>Domicilio</Text>
            <Text style={styles.value}>{user?.address}</Text>
            <MaterialIcons name="edit" size={20} color="#4CBAF5" style={styles.icon} />
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Información de la cuenta</Text>
          <TouchableOpacity style={styles.infoBox}>
            <Text style={styles.value}>{user?.email}</Text>
            <MaterialIcons name="edit" size={20} color="#4CBAF5" style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.infoBox}>
            <Text style={styles.label}>Celular</Text>
            <Text style={styles.value}>{user?.phone}</Text>
            <MaterialIcons name="edit" size={20} color="#4CBAF5" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      <Button onPress={handleLogout} label="Cerrar sesión" style={styles.logoutButton} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 80,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%'
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CBAF5",
    marginBottom: 20,
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
    width: '100%'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: "#4CBAF5",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CBAF5",
  },
  value: {
    fontSize: 16,
    color: "#4CBAF5",
  },
  icon: {
    marginLeft: 10,
  },
  logoutButton: {
    backgroundColor: "#4CBAF5",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
});

export default Perfil;
