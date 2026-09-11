// src/services/tradeService.ts

import { create } from 'zustand';
import {
  fetchPositions,
  fetchOrders,
  fetchPortfolioSummary,
  type Position,
  type Order,
  type PortfolioSummary,
} from './tradingService';
import { log } from './loggerService';

export interface TradeState {
  positions: Position[];
  orders: Order[];
  portfolio: PortfolioSummary | null;
  loading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
}

export const useTradeStore = create<TradeState>((set) => ({
  positions: [],
  orders: [],
  portfolio: null,
  loading: false,
  error: null,

  fetchData: async () => {
    set({
      loading: true,
      error: null,
    });

    try {
      const [positions, orders, portfolio] = await Promise.all([
        fetchPositions(),
        fetchOrders(),
        fetchPortfolioSummary(),
      ]);

      set({
        positions,
        orders,
        portfolio,
        loading: false,
        error: null,
      });
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Unable to fetch trading data';

      set({
        loading: false,
        error: message,
      });

      log('error', `Trade data fetch error: ${message}`);
    }
  },
}));

let tradeInterval: number | null = null;

export function startTradePolling(
  intervalMs: number = 10000,
): void {
  if (tradeInterval !== null) {
    return;
  }

  void useTradeStore.getState().fetchData();

  tradeInterval = window.setInterval(() => {
    void useTradeStore.getState().fetchData();
  }, intervalMs);
}

export function stopTradePolling(): void {
  if (tradeInterval !== null) {
    window.clearInterval(tradeInterval);
    tradeInterval = null;
  }
}

/* ==========================================================================
 * DERIVED TRADING SELECTORS
 *
 * These consume the portfolio provider instead of maintaining duplicate
 * trading state.
 * ========================================================================== */

export const selectPnl = (state: TradeState): number =>
  state.portfolio?.pnl ?? 0;

export const selectTotalTrades = (state: TradeState): number =>
  state.portfolio?.totalTrades ?? state.orders.length;

export const selectWins = (state: TradeState): number =>
  state.portfolio?.wins ?? 0;

export const selectExposure = (state: TradeState): number =>
  state.portfolio
    ? state.portfolio.allocated
    : state.positions.reduce(
        (total, position) =>
          total + Math.abs(position.qty * position.currentPrice),
        0,
      );
