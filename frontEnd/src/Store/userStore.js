import { create } from 'zustand';

export const useUserStore = create((set) => ({
  usuario: null,
  rol: null,
  setUsuario: (usuario) => set({ usuario }),
  setRol: (rol) => set({ rol }),
  logout: () => set({ usuario: null, rol: null })
}));