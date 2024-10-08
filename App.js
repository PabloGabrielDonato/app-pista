import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Componentes
import Login from './screens/Login';
import Navbar from './components/Navbar'; 
import Register from './screens/Register';

const Stack = createStackNavigator();

// Configuración del deep linking
const linking = {
  prefixes: ['http://localhost:19006'],
  config: {
    screens: {
      Login: '',
      Home: 'home',
      Register: 'register',
    },
  },
};

export default function App() {
  const [isSplashVisible, setSplashVisible] = useState(true);

  useEffect(() => {
    // Mantener la pantalla de splash visible mientras la animación carga
    SplashScreen.preventAutoHideAsync();

    // Simular el tiempo de carga o duración de la animación
    setTimeout(() => {
      setSplashVisible(false);
      SplashScreen.hideAsync(); // Ocultar la splash screen
    }, 3000); // Puedes ajustar el tiempo según la duración de tu animación
  }, []);

  if (isSplashVisible) {
    return (
      <View style={styles.container}>
        <LottieView
          source={require('./assets/Animation - 1728064715295.json')}// Ruta de la animación Lottie
          autoPlay
          loop={false} // Si no quieres que la animación se repita
          onAnimationFinish={() => setSplashVisible(false)} // Ocultar splash cuando termine la animación
        />
      </View>
    );
  }

  // Navegación principal una vez que el splash desaparece
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Navbar} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // Ajusta el color de fondo según tu diseño
  },
});
