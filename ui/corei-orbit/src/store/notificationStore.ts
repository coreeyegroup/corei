// src/store/notificationStore.ts
import { create } from 'zustand';

interface NotificationState {
  alerts: number;
  addAlert: (count?: number) => void;
  clearAlerts: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  alerts: 3, // Start with 3 to show non‑zero state, or set to 0. Let's set 0 default.
  addAlert: (count = 1) => set((state) => ({ alerts: state.alerts + count })),
  clearAlerts: () => set({ alerts: 0 }),
}));
