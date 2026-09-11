// src/services/tradingService.ts

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api/v1';

async function request<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
    cache: 'no-store',
    ...options,
  });

  if (!response.ok) {
    throw new Error(
      `Trading API ${response.status}: ${response.statusText}`,
    );
  }

  return response.json() as Promise<T>;
}

/* ==========================================================================
 * POSITIONS
 * ========================================================================== */

export interface Position {
  symbol: string;
  side: 'BUY' | 'SELL';
  qty: number;
  entryPrice: number;
  currentPrice: number;
  pnl: number;
}

export async function fetchPositions(): Promise<Position[]> {
  return request<Position[]>('/trading/positions');
}

/* ==========================================================================
 * ORDERS
 * ========================================================================== */

export interface Order {
  id: string;
  symbol: string;
  side: 'BUY' | 'SELL';
  qty: number;
  price: number;
  status: string;
  time: number;
}

export async function fetchOrders(): Promise<Order[]> {
  return request<Order[]>('/trading/orders');
}

/* ==========================================================================
 * RISK
 * ========================================================================== */

export interface RiskMetrics {
  var95: number;
  drawdown: number;
  riskLimit: number;
  concentration: number;
  dailyLoss: number;
  dailyLossLimit: number;
  exposure: number;
  exposureLimit: number;
  correlation: number;
  correlationLimit: number;
}

export async function fetchRiskMetrics(): Promise<RiskMetrics> {
  return request<RiskMetrics>('/trading/risk');
}

/* ==========================================================================
 * PORTFOLIO
 * ========================================================================== */

export interface PortfolioSummary {
  totalCapital: number;
  allocated: number;
  freeCapital: number;
  utilisation: number;
  pnl: number;
  winRate: number;
  totalTrades: number;
  wins: number;
  losses: number;
}

export async function fetchPortfolioSummary(): Promise<PortfolioSummary> {
  return request<PortfolioSummary>('/trading/portfolio');
}

/* ==========================================================================
 * MARKET DATA
 * ========================================================================== */

export interface InstrumentData {
  price: number;
  change: number;
  history: number[];
}

export type MarketData = Record<string, InstrumentData>;

export async function fetchMarketData(): Promise<MarketData> {
  return request<MarketData>('/trading/market-data');
}

/* ==========================================================================
 * TRADING STATUS
 * ========================================================================== */

export interface TradingStatusItem {
  label: string;
  value: string;
}

export type TradingStatus = Record<string, TradingStatusItem>;

export async function fetchTradingStatus(): Promise<TradingStatus> {
  return request<TradingStatus>('/trading/status');
}
