// components/Navbar.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import { Ionicons } from '@expo/vector-icons'; // Asegúrate de tener instalada esta dependencia

// Componentes
import Home from '../screens/Home'; 
import Reservas from '../screens/Reservas'; 
import Perfil from '../screens/Perfil'; 

const Tab = createBottomTabNavigator();

export default function Navbar() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          position: 'absolute',
          bottom: 20,  // Deja un espacio en la parte inferior
          left: 20,    // Margen izquierdo
          right: 20,   // Margen derecho
          height: 80,  // Ajusta la altura de la barra
          backgroundColor: 'white',
          borderRadius: 30,  // Borde redondeado
          elevation: 10,   // Sombra en Android
          shadowColor: '#000',  // Sombra en iOS
          shadowOffset: { width: 0, height: 10 },  // Desplazamiento de la sombra
          shadowOpacity: 0.25,  // Opacidad de la sombra
          shadowRadius: 5,     // Radio de la sombra
          padding: 25,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Reservas') {
            iconName = 'calendar-outline';
          } else if (route.name === 'Perfil') {
            iconName = 'person-outline';
          }

          return (
            <Ionicons 
              name={iconName} 
              size={size} 
              color={color} 

            />
          );
        },
        tabBarLabel: () => null,  // Elimina el texto
        tabBarActiveTintColor: '#3BA0C6',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Reservas" component={Reservas} />
      <Tab.Screen name="Perfil" component={Perfil} />
    </Tab.Navigator>
  );
}
