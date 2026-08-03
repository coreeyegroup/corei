// src/main.tsx
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/reset.css';
import './styles/variables.css';
import './styles/theme-dark.css';
import './styles/layout.css';
import './styles/font-scale.css';

// Services
import { startTradeSimulation } from './services/tradeService';
import { startUptimeTimer } from './services/uptimeService';
import { log } from './services/loggerService';
import { Toaster, toast } from 'sonner';
import { startWebhookListener } from './services/webhookListener';

// Keyboard shortcuts component (placeholder for now)
const KeyboardShortcuts: React.FC = () => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Ctrl+Shift+P – open command palette (placeholder)
      if (e.ctrlKey && e.shiftKey && (e.key === 'P' || e.key === 'p')) {
        e.preventDefault();
        toast.info('Command Palette', {
          description: 'Ctrl+Shift+P pressed. Coming soon.',
          duration: 3000,
        });
        log('info', '⌨️ Command palette triggered (placeholder)');
      }
      // Note: Ctrl+B toggles sidebar – that's already handled in App.tsx
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return null;
};

// Start services
startWebhookListener();
log('info', '📩 Webhook listener started');
startTradeSimulation();
startUptimeTimer();
log('info', '🔁 Trade simulation and uptime timer started');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <KeyboardShortcuts />
    <Toaster position="top-right" theme="dark" richColors closeButton />
  </React.StrictMode>
);
