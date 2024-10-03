import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack'; 

// Componentes
import Login from './screens/Login'; 
import Navbar from './components/Navbar'; // Importamos el componente Navbar
import Register from './screens/Register';

const Stack = createStackNavigator();

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
