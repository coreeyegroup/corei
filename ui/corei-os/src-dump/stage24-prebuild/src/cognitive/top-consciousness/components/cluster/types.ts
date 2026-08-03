/**
 * ============================================================================
 * COREI Operating System
 * Top Consciousness Cluster Types
 * ============================================================================
 */

import type { WidgetLayoutModel } from "../../layout/models";

export interface RibbonCluster {
    id: "identity"
      | "environment"
      | "context"
      | "execution"
      | "assurance";

    title: string;

    widgets: WidgetLayoutModel[];
}
