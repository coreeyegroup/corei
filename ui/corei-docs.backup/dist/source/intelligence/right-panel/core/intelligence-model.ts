/**
 * COREI OS — Stage 25 / Phase 03 / Step 06
 * Module: intelligence-model
 * Layer: Core
 * Responsibility: runtime intelligence state model
 */

import { SystemHealth, ExecutionSignal } from "./intelligence-types";

export interface IntelligenceModel {
  health: SystemHealth;
  signals: ExecutionSignal[];
}
