/**
 * ============================================================================
 * COREI Operating System
 * Widget Model
 * ============================================================================
 */

import type {
    WidgetContract,
    WidgetInteraction,
    WidgetPriority,
    WidgetStatus,
    WidgetVisibility
} from "../contracts";

export interface WidgetModel extends WidgetContract {

    priority: WidgetPriority;

    visibility: WidgetVisibility;

    interaction: WidgetInteraction;

    status: WidgetStatus;

    enabled: boolean;

}
