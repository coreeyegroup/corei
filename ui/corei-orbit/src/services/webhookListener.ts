// src/services/webhookListener.ts
import { log } from './loggerService';

// This service can be used to listen for incoming webhooks from n8n
// For now, we simulate receiving webhook events via a setInterval.

let listenerInterval: NodeJS.Timeout | null = null;

export function startWebhookListener() {
  if (listenerInterval) return;
  listenerInterval = setInterval(() => {
    // Simulate a webhook event (e.g., trade executed, workflow completed)
    const events = [
      'Workflow completed successfully',
      'New trade signal: BUY BTC/USDT',
      'Risk check passed',
      'Position closed: +$120.50',
    ];
    const msg = events[Math.floor(Math.random() * events.length)];
    // Log the event
    log('info', `📩 Webhook received: ${msg}`);
  }, 10000); // every 10 seconds
}

export function stopWebhookListener() {
  if (listenerInterval) {
    clearInterval(listenerInterval);
    listenerInterval = null;
  }
}
