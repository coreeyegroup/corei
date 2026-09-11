// src/config/apiConfig.ts

export const config = {
  n8n: {
    baseUrl: import.meta.env.VITE_N8N_BASE_URL || 'http://localhost:5678',
    apiKey: import.meta.env.VITE_N8N_API_KEY || '',
  },
  market: {
    binanceWs: import.meta.env.VITE_BINANCE_WS_URL || 'wss://stream.binance.com:443/ws',
    source: import.meta.env.VITE_DATA_SOURCE || 'mock', // 'real' or 'mock'
  },
};

// Helper to check if n8n is configured
export const isN8nConfigured = () => {
  return config.n8n.baseUrl && config.n8n.baseUrl !== 'http://localhost:5678';
};
