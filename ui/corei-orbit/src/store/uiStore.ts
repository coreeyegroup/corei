// src/store/uiStore.ts
import { create } from 'zustand';
import { usePreferencesStore } from './preferencesStore';

interface UiState {
  strategyName: string;
  setStrategyName: (name: string) => void;
  terminalAutoScroll: boolean;
  toggleAutoScroll: () => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
}

const prefs = usePreferencesStore.getState();
const DEFAULT_FONT_SIZE = 12;

// Apply font size by setting the root font-size in rem (1rem = 16px by default)
// We'll use a multiplier: rem = size / 16
const applyFontSize = (size: number) => {
  const rem = size / 16;
  document.documentElement.style.fontSize = `${rem}rem`;
  localStorage.setItem('appFontSize', String(size));
};

const initialSize = parseInt(localStorage.getItem('appFontSize') || String(DEFAULT_FONT_SIZE), 10);
applyFontSize(initialSize);

export const useUiStore = create<UiState>((set, get) => ({
  strategyName: prefs.strategyName,
  setStrategyName: (name) => {
    set({ strategyName: name });
    usePreferencesStore.getState().setStrategyName(name);
  },
  terminalAutoScroll: prefs.terminalAutoScroll,
  toggleAutoScroll: () => {
    set((state) => {
      const newValue = !state.terminalAutoScroll;
      usePreferencesStore.getState().setTerminalAutoScroll(newValue);
      return { terminalAutoScroll: newValue };
    });
  },
  fontSize: initialSize,
  setFontSize: (size) => {
    const clamped = Math.min(Math.max(size, 9), 18);
    set({ fontSize: clamped });
    applyFontSize(clamped);
  },
  increaseFontSize: () => {
    const current = get().fontSize;
    get().setFontSize(current + 1);
  },
  decreaseFontSize: () => {
    const current = get().fontSize;
    get().setFontSize(current - 1);
  },
}));
