import React from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import Logo from '../components/Logo'; 

export default function Login({ navigation }) { // Recepción de la prop navigation
  const goToHome = () => {
    navigation.navigate('Home'); // Navega a la pantalla Register
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
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          placeholder="Contraseña"
          placeholderTextColor="#000"
          secureTextEntry={true}
        />
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.rememberMeContainer}>
          <Text style={styles.rememberMeLabel}>Recuérdame</Text>
        </View>

        <View style={[styles.buttonContainer, styles.loginButtonContainer]}>
          <Pressable 
            style={[styles.button, styles.loginButton]} 
            onPress={goToHome} // Llamamos a handleLogin al presionar el botón
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
