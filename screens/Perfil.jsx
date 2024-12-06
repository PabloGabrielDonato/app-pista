import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Logo from '../components/Logo';
import useUserStore from '../store/user.store';
import { route } from '../configs/routes.config';
import { Button, TextField } from 'react-native-ui-lib';

const Perfil = () => {
  const navigation = useNavigation();
  const { logout, user } = useUserStore();

const handleLogout = () => {  
  logout().then(
    () => navigation.navigate(route.login)
  );
};


  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Logo />
        {/* Formulario de perfil */}
        <View style={styles.form}>
          <View>
            <Text style={styles.label}>Nombre</Text>
            <TextField
              placeholder="Nombre de usuario"
              value={user?.name}
              editable={false}
            />
          </View>

          <View>
            < Text style={styles.label}>Correo electrónico</Text>
            <TextField
              placeholder="Correo"
              value={user?.email}
              editable={false}
            />
          </View>

          <View>
            <Text style={styles.label}>DNI</Text>
            <TextInput
              placeholder="DNI"
              value={user?.dni}
              editable={false}
            />
          </View>
        </View>

        {/* Botón de cerrar sesión */}
        <Button 
            onPress={handleLogout}
            label="Logout"
            outline
            color="danger"
        />
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
