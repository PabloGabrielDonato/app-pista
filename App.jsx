import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import "./themes/ligth";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";

// Componentes
import Login from "./screens/Login";
import Navbar from "./components/Navbar";
import Register from "./screens/Register";
import useLocationStore from "./store/location.store";
import useUserStore from "./store/user.store";
import { route } from "./configs/routes.config";
import BookingForm from "./screens/BookingForm";
import { ToastProvider } from "./components/ToastProvider";

const Stack = createStackNavigator();

export default function App() {
  const [isSplashVisible, setSplashVisible] = useState(true);
  const { loadLocations } = useLocationStore();
  const { token } = useUserStore();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await loadLocations();
      } catch (error) {
        console.error("Error during initialization:", error);
      } finally {
        setSplashVisible(false);
        SplashScreen.hideAsync().catch(console.error);
      }
    };

    initializeApp();

    return () => {
      // Limpieza si se usa un temporizador o recursos que necesitan ser liberados
    };
  }, []);

  if (isSplashVisible) return null;

  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer>
        <ToastProvider>
          {token !== null ? (
            <Stack.Navigator initialRouteName={route.home}>
              <Stack.Screen
                name={route.tab_main}
                component={Navbar}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={route.bookingForm}
                component={BookingForm}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          ) : (
            <Stack.Navigator initialRouteName={route.login}>
              <Stack.Screen
                name={route.login}
                component={Login}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={route.register}
                component={Register}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          )}
        </ToastProvider>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
});
