import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { route as routePath } from '../configs/routes.config';

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
          bottom: 10,
          left: 10,
          right: 10,
          height: 70,
          backgroundColor: 'white',
          borderRadius: 20,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.25,
          shadowRadius: 5,
        },
        tabBarIcon: ({ color, size, focused }) => {
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
          }

          // Valores animados
          const scale = useSharedValue(focused ? 1.2 : 1);
          const translateY = useSharedValue(focused ? -6 : 0);

          // Update animation cuando cambia el foco
          scale.value = withSpring(focused ? 1.2 : 1, {
            damping: 5,
            stiffness: 150,
            mass: 0.8,
          });

          translateY.value = withSpring(focused ? -6 : 0, {
            damping: 6,
            stiffness: 120,
            mass: 0.8,
          });

          const animatedStyle = useAnimatedStyle(() => ({
            transform: [
              { scale: scale.value },
              { translateY: translateY.value },
            ],
          }));

          return (
            <Animated.View style={animatedStyle}>
              <Ionicons name={iconName} size={size} color={color} />
            </Animated.View>
          );
        },
        tabBarLabel: () => null,
        tabBarActiveTintColor: '#3BA0C6',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name={routePath.home} component={Home} />
      <Tab.Screen name={routePath.reservas} component={Reservas} />
      <Tab.Screen name={routePath.perfil} component={Perfil} />
    </Tab.Navigator>
  );
}
