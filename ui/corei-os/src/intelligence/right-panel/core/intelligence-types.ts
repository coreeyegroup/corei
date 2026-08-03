/**
 * COREI OS — Stage 25 / Phase 03 / Step 06
 * Module: intelligence-types
 * Layer: Core
 * Responsibility: system intelligence type definitions
 */

export interface SystemHealth {
  status: "HEALTHY" | "WARNING" | "CRITICAL";
  timestamp: number;
}

export interface ExecutionSignal {
  workspaceId: string;
  event: string;
  timestamp: number;
}
