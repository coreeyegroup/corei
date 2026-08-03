// src/services/tradeService.ts
import { create } from 'zustand';
import { useMarketStore } from './marketDataService';
import { useN8nStore } from './n8nService';
import { config, isN8nConfigured } from '../config/apiConfig';
import { log } from './loggerService';

interface Position {
  id: string;
  symbol: string;
  side: 'BUY' | 'SELL';
  qty: number;
  entryPrice: number;
  currentPrice: number;
  pnl: number;
}

interface TradeState {
  positions: Position[];
  totalTrades: number;
  wins: number;
  losses: number;
  pnl: number;
  exposure: number;
  generateTrade: () => Promise<void>;
}

export const useTradeStore = create<TradeState>((set, get) => ({
  positions: [],
  totalTrades: 0,
  wins: 0,
  losses: 0,
  pnl: 0,
  exposure: 0,

  generateTrade: async () => {
    const instruments = useMarketStore.getState().instruments;
    const symbols = Object.keys(instruments);
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];
    const price = instruments[symbol]?.price || 100;
    const side = Math.random() > 0.5 ? 'BUY' : 'SELL';
    const qty = +(0.1 + Math.random() * 1.5).toFixed(2);

    // Determine P&L: random win/loss (for now)
    const win = Math.random() > 0.4;
    const pnlChange = win ? (0.5 + Math.random() * 2) : -(0.5 + Math.random() * 3);
    const pnl = +(qty * pnlChange * (symbol.includes('BTC') ? 100 : 10)).toFixed(2);

    // If n8n is configured, send execution request
    if (isN8nConfigured()) {
      try {
        const response = await fetch(`${config.n8n.baseUrl}/webhook/execute`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-N8N-API-KEY': config.n8n.apiKey,
          },
          body: JSON.stringify({ symbol, side, qty, price }),
        });
        if (!response.ok) throw new Error('Execution failed');
        const result = await response.json();
        log('trade', `📈 Trade executed via n8n: ${side} ${symbol} @ ${price} | Qty: ${qty}`);
        // Use actual response data if available
      } catch (err) {
        log('error', `❌ Trade execution error: ${err.message}`);
        // Fallback to mock execution
      }
    } else {
      log('trade', `📈 [MOCK] ${side} ${symbol} @ ${price} | Qty: ${qty}`);
    }

    // Update local state (regardless of execution)
    const newPosition: Position = {
      id: `pos-${Date.now()}`,
      symbol,
      side,
      qty,
      entryPrice: price,
      currentPrice: price + pnlChange,
      pnl,
    };

    set((state) => ({
      positions: [...state.positions, newPosition],
      totalTrades: state.totalTrades + 1,
      wins: state.wins + (win ? 1 : 0),
      losses: state.losses + (win ? 0 : 1),
      pnl: state.pnl + pnl,
      exposure: +(state.exposure + qty * 0.1).toFixed(2),
    }));

    // Limit positions to 20
    if (get().positions.length > 20) {
      set((state) => ({ positions: state.positions.slice(-20) }));
    }
  },
}));

// Start trade simulation interval
let tradeInterval: NodeJS.Timeout | null = null;

export function startTradeSimulation() {
  if (tradeInterval) return;
  tradeInterval = setInterval(async () => {
    const state = useN8nStore.getState().state;
    if (state === 'running') {
      await useTradeStore.getState().generateTrade();
    }
  }, 3000 + Math.random() * 5000);
}

export function stopTradeSimulation() {
  if (tradeInterval) {
    clearInterval(tradeInterval);
    tradeInterval = null;
  }
}
