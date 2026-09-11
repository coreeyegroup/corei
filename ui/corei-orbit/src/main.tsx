// src/main.tsx
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster, toast } from 'sonner';

import App from './App';
import { ErrorBoundary } from './components/ErrorBoundary';
import './styles/reset.css';
import './styles/variables.css';
import './styles/theme-dark.css';
import './styles/layout.css';
import './styles/font-scale.css';

// Services
import { startUptimeTimer } from './services/uptimeService';
import { log } from './services/loggerService';
import { startWebhookListener } from './services/webhookListener';

// ─── Keyboard Shortcuts (global) ──────────────────────────────────────
const KeyboardShortcuts: React.FC = () => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Ctrl+Shift+P – command palette (placeholder)
      if (e.ctrlKey && e.shiftKey && (e.key === 'P' || e.key === 'p')) {
        e.preventDefault();
        toast.info('Command Palette', {
          description: 'Ctrl+Shift+P pressed. Coming soon.',
          duration: 3000,
        });
        log('info', '⌨️ Command palette triggered (placeholder)');
      }
      // Ctrl+B is already handled in App.tsx (sidebar toggle)
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return null;
};

// ─── Start services ──────────────────────────────────────────────────────
startWebhookListener();
log('info', '📩 Webhook listener started');

startUptimeTimer();
log('info', '⏱️ Uptime timer started');

// ─── NOTE: Trade and market data polling now start inside App.tsx ──────
//       This ensures they respect the React lifecycle and component
//       mount/unmount behaviour. The polling intervals are started
//       in a useEffect inside App.tsx, which is the correct pattern.

// ─── Render app ──────────────────────────────────────────────────────────
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
    <KeyboardShortcuts />
    <Toaster position="top-right" theme="dark" richColors closeButton />
  </React.StrictMode>
);
