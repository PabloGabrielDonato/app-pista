import { create } from 'zustand';
import { combine, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiEndpoint } from '../configs/routes.config';


const useUserStore = create(
  persist(
    combine(
      {
        user: null,
        token: null,
      },
      (set, get) => ({
        isAuthenticated: () => !!set.user,
        register: async (userData) => {
          try {
            const response = await fetch(apiEndpoint.auth.register, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'acept': 'application/json',
              },
              body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (response.ok) {
              set({ user: data.data, token: data.auth_token });
              return { success: true };
            } else {
              return { success: false, message: data.message || 'Error al registrar usuario' };
            }
          } catch (error) {
            return { success: false, message: 'Hubo un problema al conectar con el servidor' };
          }
        },
        login: async (email, password) => {
          try {
            const response = await fetch(apiEndpoint.auth.login, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'acept': 'application/json',
              },
              body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
              set({ user: data.data, token: data.auth_token });
              return { success: true };
            } else {
              return { success: false, message: data.message || 'Error al logear usuario' };
            }
          } catch (error) {
            return { success: false, message: 'Hubo un problema al conectar con el servidor' };
          };
        },
        logout: async () => {
          const { token } = get();

          try {
            const response = await fetch(apiEndpoint.auth.logout, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'acept': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            });
        
            if (response.status >= 200) {
              set({ user: null, token: null });
              await AsyncStorage.removeItem('user-storage'); // Limpia el almacenamiento persistente
              return { success: true };
            } else {
              return { success: false, message: data.message || 'Error al deslogear usuario' };
            }
          } catch (error) {
            return { success: false, message: 'Hubo un problema al conectar con el servidor' };
          }
        },
        
      })
    ),
    {
      name: 'user-storage', // Nombre del almacenamiento persistente
    }
  )
);

export default useUserStore;
