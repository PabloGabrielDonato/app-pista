import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Logo from '../components/Logo';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Asegúrate de importar AsyncStorage
import useUserStore from '../store/user.store';

const Perfil = () => {
  const navigation = useNavigation();
  const { logout, user } = useUserStore();

const handleLogout = async () => {  
  await logout();
  navigation.navigate('Login');
};


  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Logo />
        {/* Formulario de perfil */}
        <View style={styles.form}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre de usuario"
            value={user.name}
            editable={false}
          />

          <Text style={styles.label}>Correo electrónico</Text>
          <TextInput
            style={styles.input}
            placeholder="Correo"
            value="pablo@ejemplo.com"
            editable={false}
          />

          <Text style={styles.label}>DNI</Text>
          <TextInput
            style={styles.input}
            placeholder="DNI"
            value="12345678"
            editable={false}
          />
        </View>

        {/* Botón de cerrar sesión */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#E9E9E9',
    padding: 20,
    justifyContent: 'center',
  },
  form: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#4A4A4A',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderColor: '#3BA0C6',
    borderWidth: 2,
    borderRadius: 10,
    height: 60,
    marginBottom: 20,
    fontSize: 16,
    color: '#4A4A4A',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Perfil;
