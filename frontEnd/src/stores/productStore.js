import { create } from 'zustand';

export const useCalcStore = create((set) => ({
  // Estado para suma
  sumaNum1: '',
  sumaNum2: '',
  sumaResultado: null,

  // Estado para multiplicación
  multNum1: '',
  multNum2: '',
  multResultado: null,

  // Acciones para suma
  setSumaNum1: (valor) => set({ sumaNum1: valor }),
  setSumaNum2: (valor) => set({ sumaNum2: valor }),
  sumar: () =>
    set((state) => ({
      sumaResultado: Number(state.sumaNum1) + Number(state.sumaNum2),
    })),

  // Acciones para multiplicación
  setMultNum1: (valor) => set({ multNum1: valor }),
  setMultNum2: (valor) => set({ multNum2: valor }),
  multiplicar: () =>
    set((state) => ({
      multResultado: Number(state.multNum1) * Number(state.multNum2),
    })),
}));