import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

export const useUserStore = create(
  persist(
    (set) => ({
      user: null, // { usuario, rol, rolNombre, nombreCompleto, label, token }

      setUser: (userData) => set({ user: userData }),

      logout: () => {
        localStorage.removeItem("token");
        set({ user: null });
      },

      async login(usuario, clave) {
        try {
          const response = await axios.post("http://localhost:8000/api/auth/login", {
            usuario,
            clave,
          });

          const { token, usuario: userData, rol, rolNombre, nombreCompleto, label } = response.data;

          localStorage.setItem("token", token);

          set({
            user: {
              usuario: userData,
              rol,         // 👈 ID numérico
              rolNombre,   // 👈 nombre del rol para mostrar
              nombreCompleto,
              label,
              token,
            },
          });

          return response.data;
        } catch (error) {
          console.error("❌ Error en login:", error);
          throw error.response?.data || { error: "Error de conexión con el servidor" };
        }
      },

      async cargarLabel(usuario) {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `http://localhost:8000/api/auth/user/${usuario}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const { rol, rolNombre, nombreCompleto, label } = response.data;

          set((state) => ({
            user: {
              ...state.user,
              usuario,
              rol,         // 👈 mantener el ID numérico
              rolNombre,   // 👈 actualizar nombre del rol
              nombreCompleto,
              label,
            },
          }));
        } catch (error) {
          console.error("❌ Error al cargar label:", error);
        }
      },
    }),
    {
      name: "user-storage", // 👈 clave en localStorage
      getStorage: () => localStorage,
    }
  )
);