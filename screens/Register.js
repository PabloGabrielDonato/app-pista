import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

export default function Register({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    if (password === confirmPassword) {
      // Aquí podrías agregar la lógica de registro de usuario
      console.log("Usuario registrado:", email);
      navigation.navigate('Login'); // Redirige a la pantalla de Login después del registro
    } else {
      alert('Las contraseñas no coinciden');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#000"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#000"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirmar Contraseña"
          placeholderTextColor="#000"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={handleRegister}
        >
          <Text style={styles.buttonLabel}>Registrarse</Text>
        </Pressable>
      </View>

      <View style={styles.loginLinkContainer}>
        <Text style={styles.loginText}>
          ¿Ya tienes cuenta?{' '}
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Inicia sesión</Text>
          </Pressable>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: 320,
    height: 68,
    marginVertical: 10,
    borderColor: '#3BA0C6',
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: 'center',
  },
  input: {
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#000',
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    width: 160,
    marginTop: 20,
  },
  button: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#3BA0C6',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  loginLinkContainer: {
    marginTop: 20,
  },
  loginText: {
    fontSize: 16,
  },
  loginLink: {
    color: '#3BA0C6',
    fontWeight: 'bold',
  },
});
