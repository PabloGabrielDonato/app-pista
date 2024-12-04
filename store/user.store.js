import { create } from 'zustand';
import { combine, persist } from 'zustand/middleware';



const useUserStore = create(
  persist(
    combine(
      {
        user: null,
        token: null,
      },
      (set) => ({
        isAuth: () => !!set.user,
        register: async (userData) => {
          try {
            const response = await fetch('http://localhost/api/auth/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
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
            const response = await fetch('http://localhost/api/auth/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
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
        }
      })
    ),
    {
      name: 'user-storage', // Nombre del almacenamiento persistente
    }
  )
);

export default useUserStore;
