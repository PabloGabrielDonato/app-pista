import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importar AsyncStorage
import Logo from '../components/Logo'; 

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [data, setData] = useState();

  useEffect(()=> {
    const loadData = async() =>{
      const response = await fetch('http://localhost/api/locations', {
        headers:
        {
          "Content-Type": "application/json",
        }
      });
      const sata = await response.json();
      console.log(response.body)
      setData(sata);
      console.log(sata)
    }
    loadData().catch((error) => (
      console.error('Error al cargar los datos:', error)
    ))

  },[])


  // Función para manejar el login
  const handleLogin = async () => {
    // Aquí iría la lógica para la autenticación con tu backend (por ejemplo, hacer una llamada a la API)

    // Simulación de autenticación exitosa
    if (email === 'pablo@ejemplo.com' && password === 'password123') {
      // Guarda el token en AsyncStorage
      try {
        await AsyncStorage.setItem('userToken', 'dummy-auth-token');
        navigation.navigate('Home'); // Navega a Home después del login
      } catch (e) {
        console.log('Error al guardar el token', e);
      }
    } else {
      Alert.alert('Error', 'Correo o contraseña incorrectos');
    }
  };

  const goToRegister = () => {
    navigation.navigate('Register'); // Navega a la pantalla Register
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
        <TextInput 
          style={styles.input} 
          placeholder="Email"
          placeholderTextColor="#000"
          value={email}
          onChangeText={setEmail} // Actualiza el valor del email
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          placeholder="Contraseña"
          placeholderTextColor="#000"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword} // Actualiza el valor de la contraseña
        />
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.rememberMeContainer}>
          <Text style={styles.rememberMeLabel}>Recuérdame</Text>
        </View>

        <View style={[styles.buttonContainer, styles.loginButtonContainer]}>
          <Pressable 
            style={[styles.button, styles.loginButton]} 
            onPress={handleLogin} // Cambia la función de login
          >
            <Text style={[styles.buttonLabel, { color: 'black' }]}>Iniciar sesión</Text>
          </Pressable>
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
  input: {
    paddingHorizontal: 10, // Espacio para el texto
    fontSize: 16,
    color: '#000', // Texto en negro
    width: '100%',
    height: '100%',
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
  loginButton: {
    borderColor: "#3BA0C6", // Fondo del botón de Iniciar sesión
  },
  buttonLabel: {
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
