// src/store/infrastructureSelectionStore.ts
import { create } from 'zustand';

interface InfrastructureSelectionState {
  selectedService: string | null;
  setSelectedService: (service: string) => void;
  clearSelection: () => void;
}

export const useInfrastructureSelection = create<InfrastructureSelectionState>((set) => ({
  selectedService: null,
  setSelectedService: (service) => set({ selectedService: service }),
  clearSelection: () => set({ selectedService: null }),
}));
