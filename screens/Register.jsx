import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';

export default function Register({ navigation }) {
  const [form, setForm] = useState({
    name: '',
    last_name: '',
    dni: '',
    address: '',
    phone: '',
    birth_date: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleRegister = async () => {
    if (form.password !== form.confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await fetch('http://localhost/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          last_name: form.last_name,
          dni: form.dni,
          address: form.address,
          phone: form.phone,
          birth_date: form.birth_date,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Éxito', 'Usuario registrado correctamente');
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', data.message || 'Error al registrar usuario');
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al conectar con el servidor');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Registro</Text>

        {/* Nombre */}
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          placeholderTextColor="#000"
          value={form.name}
          onChangeText={(value) => handleInputChange('name', value)}
        />

        {/* Apellido */}
        <TextInput
          style={styles.input}
          placeholder="Apellido"
          placeholderTextColor="#000"
          value={form.last_name}
          onChangeText={(value) => handleInputChange('last_name', value)}
        />

        {/* DNI */}
        <TextInput
          style={styles.input}
          placeholder="DNI"
          placeholderTextColor="#000"
          value={form.dni}
          onChangeText={(value) => handleInputChange('dni', value)}
          keyboardType="numeric"
        />

        {/* Dirección */}
        <TextInput
          style={styles.input}
          placeholder="Dirección"
          placeholderTextColor="#000"
          value={form.address}
          onChangeText={(value) => handleInputChange('address', value)}
        />

        {/* Teléfono */}
        <TextInput
          style={styles.input}
          placeholder="Teléfono"
          placeholderTextColor="#000"
          value={form.phone}
          onChangeText={(value) => handleInputChange('phone', value)}
          keyboardType="phone-pad"
        />

        {/* Fecha de Nacimiento */}
        <TextInput
          style={styles.input}
          placeholder="Fecha de nacimiento (YYYY-MM-DD)"
          placeholderTextColor="#000"
          value={form.birth_date}
          onChangeText={(value) => handleInputChange('birth_date', value)}
        />

        {/* Email */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#000"
          value={form.email}
          onChangeText={(value) => handleInputChange('email', value)}
          keyboardType="email-address"
        />

        {/* Contraseña */}
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#000"
          secureTextEntry={true}
          value={form.password}
          onChangeText={(value) => handleInputChange('password', value)}
        />

        {/* Confirmar Contraseña */}
        <TextInput
          style={styles.input}
          placeholder="Confirmar Contraseña"
          placeholderTextColor="#000"
          secureTextEntry={true}
          value={form.confirmPassword}
          onChangeText={(value) => handleInputChange('confirmPassword', value)}
        />

        <Pressable style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonLabel}>Registrarse</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#3BA0C6',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    height: 50,
    backgroundColor: '#3BA0C6',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLabel: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
