// src/services/uptimeService.ts
import { create } from 'zustand';

interface UptimeState {
  startTime: number;
  uptimeSeconds: number;
  tick: () => void;
}

export const useUptimeStore = create<UptimeState>((set) => ({
  startTime: Date.now(),
  uptimeSeconds: 0,
  tick: () => set((state) => ({ uptimeSeconds: Math.floor((Date.now() - state.startTime) / 1000) })),
}));

// Start the timer (tick every second)
let uptimeInterval: NodeJS.Timeout | null = null;

export function startUptimeTimer() {
  if (uptimeInterval) return;
  uptimeInterval = setInterval(() => {
    useUptimeStore.getState().tick();
  }, 1000);
}

export function stopUptimeTimer() {
  if (uptimeInterval) {
    clearInterval(uptimeInterval);
    uptimeInterval = null;
  }
}
