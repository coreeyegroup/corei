// src/services/loggerService.ts
type LogLevel = 'info' | 'warn' | 'error' | 'trade';

export interface LogEntry {
  time: string;
  level: LogLevel;
  message: string;
}

// Simple event bus for logs
type LogListener = (entry: LogEntry) => void;
const listeners: LogListener[] = [];

export function addLogListener(listener: LogListener) {
  listeners.push(listener);
}

export function removeLogListener(listener: LogListener) {
  const index = listeners.indexOf(listener);
  if (index !== -1) listeners.splice(index, 1);
}

export function log(level: LogLevel, message: string) {
  const time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const entry: LogEntry = { time, level, message };
  listeners.forEach((fn) => fn(entry));
}
