/**
 * ============================================================================
 * STAGE-25
 * STEP-02
 * BUILD UNIT-01
 *
 * FILE
 * activity-contract.ts
 * ============================================================================
 */

import type { ActivityType } from "../../state/workbench-state";

export interface ActivityDefinition {

    id: ActivityType;

    title: string;

    icon: React.ComponentType<{

        size?: number;

    }>;

    order: number;

    enabled: boolean;

}
