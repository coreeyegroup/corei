// src/services/n8nService.ts

import { create } from 'zustand';
import { config, isN8nConfigured } from '../config/apiConfig';
import { log } from './loggerService';

export type WorkflowState =
  | 'idle'
  | 'running'
  | 'paused'
  | 'stopped';

type WorkflowAction =
  | 'START'
  | 'PAUSE'
  | 'STOP'
  | 'KILL';

interface N8nState {
  state: WorkflowState;

  start: () => Promise<void>;
  pause: () => Promise<void>;
  stop: () => Promise<void>;
  kill: () => Promise<void>;
}

interface SystemRequest {
  source: string;
  action: WorkflowAction;
  timestamp: string;
}

async function n8nRequest<T = any>(
  endpoint: string,
  method: 'GET' | 'POST' = 'POST',
  body?: unknown,
): Promise<T> {

  const url = `${config.n8n.baseUrl}${endpoint}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (config.n8n.apiKey) {
    headers['X-N8N-API-KEY'] = config.n8n.apiKey;
  }

  const response = await fetch(url, {
    method,
    headers,
    credentials: 'include',
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(
      `HTTP ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
}

async function executeSystemAction(
  action: WorkflowAction,
) {

  if (!isN8nConfigured()) {
    return;
  }

  const payload: SystemRequest = {

    source: 'COREI_ORBIT',

    action,

    timestamp: new Date().toISOString(),

  };

  const result = await n8nRequest(
    '/webhook/system',
    'POST',
    payload,
  );

  log(
    'info',
    `✔ n8n ${action} completed`,
  );

  return result;
}

export const useN8nStore = create<N8nState>((set) => ({

  state: 'idle',

  start: async () => {

    if (isN8nConfigured()) {

      try {

        await executeSystemAction('START');

        set({
          state: 'running',
        });

      } catch (error: unknown) {

        const message =
          error instanceof Error
            ? error.message
            : String(error);

        log(
          'error',
          `START failed: ${message}`,
        );

        throw error;
      }

    } else {

      set({
        state: 'running',
      });

      log(
        'info',
        '[MOCK] START',
      );

    }

  },

  pause: async () => {

    if (isN8nConfigured()) {

      try {

        await executeSystemAction('PAUSE');

        set({
          state: 'paused',
        });

      } catch (error: unknown) {

        const message =
          error instanceof Error
            ? error.message
            : String(error);

        log(
          'error',
          `PAUSE failed: ${message}`,
        );

        throw error;
      }

    } else {

      set({
        state: 'paused',
      });

      log(
        'warn',
        '[MOCK] PAUSE',
      );

    }

  },

  stop: async () => {

    if (isN8nConfigured()) {

      try {

        await executeSystemAction('STOP');

        set({
          state: 'stopped',
        });

      } catch (error: unknown) {

        const message =
          error instanceof Error
            ? error.message
            : String(error);

        log(
          'error',
          `STOP failed: ${message}`,
        );

        throw error;
      }

    } else {

      set({
        state: 'stopped',
      });

      log(
        'info',
        '[MOCK] STOP',
      );

    }

  },

  kill: async () => {

    if (isN8nConfigured()) {

      try {

        await executeSystemAction('KILL');

        set({
          state: 'stopped',
        });

      } catch (error: unknown) {

        const message =
          error instanceof Error
            ? error.message
            : String(error);

        log(
          'error',
          `KILL failed: ${message}`,
        );

        throw error;
      }

    } else {

      set({
        state: 'stopped',
      });

      log(
        'error',
        '[MOCK] KILL',
      );

    }

  },

}));