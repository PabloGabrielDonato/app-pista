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
import useLocationStore from './store/location.store';
import useUserStore from './store/user.store';

const cors = require('cors');

const Stack = createStackNavigator();

// Configuración del deep linking


export default function App() {
  const [isSplashVisible, setSplashVisible] = useState(true);
  const {loadLocations} = useLocationStore()
  const {token} = useUserStore()

  useEffect(() => {

    // Mantener la pantalla de splash visible mientras la animación carga
    SplashScreen.preventAutoHideAsync();
    loadLocations().catch(error => console.error(error))
    // Simular el tiempo de carga o duración de la animación
    setTimeout(() => {
      setSplashVisible(false);
      SplashScreen.hideAsync(); // Ocultar la splash screen
    }, 3000); // Puedes ajustar el tiempo según la duración de tu animación
  }, []);

  if (token !== null) {
    return(
      <NavigationContainer >
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Home" component={Navbar} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
    )
  } else {
    return(
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Navbar} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
    )
  }

  // Navegación principal una vez que el splash desaparece

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // Ajusta el color de fondo según tu diseño
  },
});
