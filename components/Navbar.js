// components/Navbar.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import { Ionicons } from '@expo/vector-icons'; // Asegúrate de tener instalada esta dependencia
import { route as routePath } from '../configs/routes.config';

// Componentes
import Reservas from '../screens/Reservas'; 
import Perfil from '../screens/Perfil'; 
import Home from '../screens/Home';

const Tab = createBottomTabNavigator();

export default function Navbar() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          position: 'absolute',
          bottom: 10, // Deja un espacio en la parte inferior
          left: 10,   // Margen izquierdo
          right: 10,  // Margen derecho
          height: 70, // Ajusta la altura de la barra
          backgroundColor: 'white',
          borderRadius: 20,  // Borde redondeado
          elevation: 10,   // Sombra en Android
          shadowColor: '#000',  // Sombra en iOS
          shadowOffset: { width: 0, height: 10 },  // Desplazamiento de la sombra
          shadowOpacity: 0.25,  // Opacidad de la sombra
          shadowRadius: 5,     // Radio de la sombra
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;
            
          switch (route.name) {
            case routePath.home:
              iconName = 'home-outline';
              break;
            case routePath.reservas:
              iconName = 'calendar-outline';
              break;
            case routePath.perfil:
              iconName = 'person-outline';
              break;
            default:
              iconName = 'home-outline';
              break;
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
