// proyecto/frontEnd/src/stores/userStore.js

import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,

      setUser: (userData) => {
        set({
          user: {
            id: userData.id,
            usuario: userData.usuario,
            rol: userData.rol,
            rolNombre: userData.rolNombre,
            nombreCompleto: userData.nombreCompleto,
            label: userData.label,
            token: userData.token,
            permisos: userData.permisos || [],
          },
        });
      },

      logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        set({ user: null });
      },

      async login(usuario, clave) {
        try {
          const response = await axios.post("http://localhost:8000/api/auth/login", {
            usuario,
            clave,
          });

          console.log("👉 response.data crudo recibido del backend:", response.data);

          const {
            id,
            token,
            usuario: userData,
            rol,
            rolNombre,
            nombreCompleto,
            label,
            permisos,
          } = response.data;

          localStorage.setItem("token", token);
          localStorage.setItem("permisos", JSON.stringify(permisos || []));

          const userObj = {
            id,
            usuario: userData,
            rol,
            rolNombre,
            nombreCompleto,
            label,
            token,
            permisos: permisos || [],
          };

          set({ user: userObj });

          return response.data;
        } catch (error) {
          console.error("❌ Error en login:", error.message);
          throw error.response?.data || { error: "Error de conexión con el servidor" };
        }
      },

      async cargarLabel(usuario) {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `http://localhost:8000/api/auth/user/${usuario}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          const { id, rol, rolNombre, nombreCompleto, label, permisos } = response.data;

          set((state) => ({
            user: {
              ...state.user,
              id,
              usuario,
              rol,
              rolNombre,
              nombreCompleto,
              label,
              permisos: permisos || [],
            },
          }));
        } catch (error) {
          console.error("❌ Error al cargar label:", error.message);
        }
      },

      // 🚀 Nuevo método: cargar usuario autenticado con permisos desde /api/auth/me
      async cargarUsuarioAutenticado() {
        try {
          const token = localStorage.getItem("token");
          if (!token) return;

          const response = await axios.get("http://localhost:8000/api/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          });

          const { id, usuario, rol, permisos } = response.data;

          set((state) => ({
            user: {
              ...state.user,
              id,
              usuario,
              rol,
              permisos: permisos || [],
            },
          }));
        } catch (error) {
          console.error("❌ Error al cargar usuario autenticado:", error.message);
        }
      },
    }),
    {
      name: "user-storage",
      getStorage: () => localStorage,
    }
  )
);