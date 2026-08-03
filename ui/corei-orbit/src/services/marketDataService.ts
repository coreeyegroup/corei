// src/services/marketDataService.ts
import { create } from 'zustand';
import { config } from '../config/apiConfig';
import { log } from './loggerService';

export interface Instrument {
  symbol: string;
  price: number;
  change: number;
  history: number[];
}

interface MarketState {
  instruments: Record<string, Instrument>;
  updatePrices: () => void;
  setPrice: (symbol: string, price: number) => void;
}

const HISTORY_LENGTH = 60;

// Map Binance symbols to our display names
const symbolMap: Record<string, string> = {
  btcusdt: 'BTC/USD',
  ethusdt: 'ETH/USD',
  // Add more mappings as needed
};

// Initial prices for fallback
const INITIAL_PRICES: Record<string, number> = {
  'BTC/USD': 67450,
  'ETH/USD': 3450,
  'EUR/USD': 1.0874,
  'USD/INR': 83.12,
  'XAU/USD': 2345.6,
  'WTI': 78.45,
  'NIFTY 50': 22145,
};

export const useMarketStore = create<MarketState>((set, get) => ({
  instruments: Object.entries(INITIAL_PRICES).reduce((acc, [symbol, price]) => {
    acc[symbol] = {
      symbol,
      price,
      change: 0,
      history: Array(HISTORY_LENGTH).fill(price),
    };
    return acc;
  }, {} as Record<string, Instrument>),

  updatePrices: () => {
    // Fallback mock update (used when no WebSocket or in mock mode)
    const current = get().instruments;
    const updated: Record<string, Instrument> = {};
    for (const [symbol, data] of Object.entries(current)) {
      const volatility = symbol.includes('BTC') ? 120 :
                         symbol.includes('ETH') ? 25 :
                         symbol.includes('EUR') ? 0.0012 :
                         symbol.includes('INR') ? 0.05 :
                         symbol.includes('XAU') ? 1.8 :
                         symbol.includes('WTI') ? 0.6 :
                         symbol.includes('NIFTY') ? 18 : 1;
      const delta = (Math.random() - 0.48) * volatility;
      const newPrice = Math.max(data.price + delta, 0.01);
      const change = ((newPrice - data.price) / data.price) * 100;
      const newHistory = [...data.history, newPrice];
      if (newHistory.length > HISTORY_LENGTH) newHistory.shift();
      updated[symbol] = { ...data, price: newPrice, change, history: newHistory };
    }
    set({ instruments: updated });
  },

  setPrice: (symbol: string, price: number) => {
    const current = get().instruments;
    if (!current[symbol]) return;
    const data = current[symbol];
    const change = ((price - data.price) / data.price) * 100;
    const newHistory = [...data.history, price];
    if (newHistory.length > HISTORY_LENGTH) newHistory.shift();
    set({
      instruments: {
        ...current,
        [symbol]: { ...data, price, change, history: newHistory },
      },
    });
  },
}));

// WebSocket manager
let ws: WebSocket | null = null;
let fallbackInterval: NodeJS.Timeout | null = null;

export function startMarketTicker() {
  const useReal = config.market.source === 'real';
  if (useReal) {
    connectWebSocket();
  } else {
    startFallbackTicker();
  }
}

function connectWebSocket() {
  if (ws && ws.readyState === WebSocket.OPEN) return;
  ws = new WebSocket(config.market.binanceWs);

  ws.onopen = () => {
    log('info', '📡 Binance WebSocket connected');
    // Subscribe to BTCUSDT and ETHUSDT streams
    const subscribeMsg = {
      method: 'SUBSCRIBE',
      params: [
        'btcusdt@trade',
        'ethusdt@trade',
      ],
      id: 1,
    };
    ws.send(JSON.stringify(subscribeMsg));
  };

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      if (data.e === 'trade') {
        const symbol = data.s.toLowerCase();
        const price = parseFloat(data.p);
        const mappedSymbol = symbolMap[symbol] || symbol.toUpperCase();
        useMarketStore.getState().setPrice(mappedSymbol, price);
      }
    } catch (err) {
      // Ignore parsing errors
    }
  };

  ws.onerror = (err) => {
    log('error', `WebSocket error: ${err}`);
    // Fallback to mock if WebSocket fails
    if (fallbackInterval === null) {
      log('warn', 'Falling back to mock market data');
      startFallbackTicker();
    }
  };

  ws.onclose = () => {
    log('warn', 'WebSocket disconnected, reconnecting in 5s...');
    setTimeout(() => {
      if (config.market.source === 'real') connectWebSocket();
    }, 5000);
  };
}

function startFallbackTicker() {
  if (fallbackInterval) return;
  fallbackInterval = setInterval(() => {
    useMarketStore.getState().updatePrices();
  }, 500);
  log('info', '📊 Using mock market data (fallback)');
}

export function stopMarketTicker() {
  if (ws) {
    ws.close();
    ws = null;
  }
  if (fallbackInterval) {
    clearInterval(fallbackInterval);
    fallbackInterval = null;
  }
}

// Auto-start
startMarketTicker();
