import React, { useState } from 'react';
import { View, Text, Alert, Pressable, StyleSheet } from 'react-native';
import Logo from '../components/Logo'; 
import useUserStore from '../store/user.store.js';
import { route } from '../configs/routes.config.js';
import { Button, TextField } from 'react-native-ui-lib';

export default function Login({ navigation }) {
  
  const { login } = useUserStore(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Función para manejar el login
  const handleLogin = async () => {
    // Simulación de autenticación exitosa
    if (email === '' ||  password === '') return Alert.alert('Falta completar el formulario')

      try {
        await login(email, password);
        } catch (e) {
          Alert.alert('Credenciales incorrectas');
        }
    }
    
    const handleKeyPress = (e) => {
      if (e.nativeEvent.key === 'Enter') {
        handleLogin();
      }
    };

    const goToRegister = () => {
      navigation.navigate(route.register); // Navega a la pantalla Register
    };


  return (
    <View style={styles.container}>
      <Logo />

      <Text style={styles.registerText}>
        ¿No tenés cuenta todavía? 
        <Pressable onPress={goToRegister}>
          <Text style={styles.registerLink}> Registrate.</Text>
        </Pressable>
      </Text>

      <View style={styles.inputContainer}>
        <TextField 
          placeholder="Email"
          value={email}
          onKeyPress={handleKeyPress} // Detecta tecla Enter
          onChangeText={setEmail} // Actualiza el valor del email
        />
      </View>

      <View style={styles.inputContainer}>
        <TextField 
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onKeyPress={handleKeyPress} // Detecta tecla Enter
          onChangeText={setPassword} // Actualiza el valor de la contraseña
        />
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.rememberMeContainer}>
          <Text style={styles.rememberMeLabel}>Recuérdame</Text>
        </View>

        <View style={[styles.buttonContainer, styles.loginButtonContainer]}>
          <Button 
            label="Iniciar sesión"
            onPress={handleLogin} // Cambia la función de login
          >
          </Button>
        </View>
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
  inputContainer: {
    width: 320,
    height: 68,
    marginVertical: 10,
    borderColor: '#3BA0C6', // Borde
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: 'center',
  },
  
  bottomContainer: {
    flexDirection: 'row',
    width: 320,
    justifyContent: 'space-between',
    marginTop: 20,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberMeLabel: {
    marginLeft: 8,
    fontSize: 14,
  },
  loginButtonContainer: {
    width: 160, // Ajustar tamaño del botón de Iniciar sesión
  },
  buttonContainer: {
    width: 160,
    height: 68,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
    borderRadius: 10,
    borderWidth: 2,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonLabel: {
    color:'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerText: {
    marginTop: 20,
    fontSize: 16,
  },
  registerLink: {
    color: '#3BA0C6',
    fontWeight: 'bold',
  },
});
