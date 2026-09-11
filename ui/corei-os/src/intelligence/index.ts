// Backend
export { IntelligenceRuntime } from './right-panel/runtime/intelligence-runtime';
export { IntelligenceService } from './right-panel/services/intelligence-service';
export { IntelligenceContext } from './context';
export type { WorkspaceContext } from './context';
export { IntelligenceState } from './state';
export type { Insight, Recommendation } from './state';
export { IntelligenceEventHandlers } from './events';
export { createIntelligencePlatform } from './backend-composition';

// Frontend (React)
export { IntelligenceProvider, useIntelligence } from './right-panel/provider';
export { IntelligenceRightPanel } from './right-panel/IntelligenceRightPanel';

// Components – export only the ones that exist
export {
  IntelligenceContextSurface,
  IntelligenceInsightSurface,
  IntelligencePanelFooter,
  IntelligencePanelHeader
} from './right-panel/components';
