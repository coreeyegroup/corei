/**
 * COREI OS — Stage 25 / Phase 03 / Step 06
 * Module: intelligence-runtime
 * Layer: Runtime
 * Responsibility: runtime wrapper for intelligence engine
 */

import { IntelligenceEngine } from "../engine/intelligence-engine";

export class IntelligenceRuntime {

  getSnapshot() {
    return IntelligenceEngine.snapshot();
  }

}
