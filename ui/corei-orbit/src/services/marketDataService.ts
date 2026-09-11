// src/services/marketDataService.ts
import { create } from 'zustand';
import { fetchMarketData, type MarketData } from './tradingService';
import { log } from './loggerService';

interface MarketState {
  instruments: MarketData;
  loading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
}

export const useMarketStore = create<MarketState>((set) => ({
  instruments: {},
  loading: false,
  error: null,

  fetchData: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchMarketData();
      set({ instruments: data, loading: false });
    } catch (err) {
      set({ error: (err as Error).message, loading: false });
      log('error', `❌ Market data fetch error: ${(err as Error).message}`);
    }
  },
}));

// Polling
let marketInterval: number | null = null;

export function startMarketPolling(intervalMs: number = 2000) {
  if (marketInterval) return;
  marketInterval = window.setInterval(() => {
    useMarketStore.getState().fetchData();
  }, intervalMs);
}

export function stopMarketPolling() {
  if (marketInterval) {
    clearInterval(marketInterval);
    marketInterval = null;
  }
}

// Auto‑start
startMarketPolling();
