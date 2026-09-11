/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-16
 *
 * FILE:
 * default-ribbon-micro-model.ts
 *
 * PURPOSE:
 * Deterministic default Ribbon micro presentation model.
 *
 * IMPORTANT:
 * These values are explicit presentation defaults.
 *
 * They do not represent live command availability, live platform health,
 * authenticated permissions, persisted preferences or runtime discovery.
 *
 ******************************************************************************/

import type {
    RibbonMicroModelContract
} from "../contracts/ribbon-micro-contract";

export const DEFAULT_RIBBON_MICRO_MODEL: RibbonMicroModelContract = {

    groups: [

        {
            id: "workspace",
            label: "Workspace",
            actions: [
                {
                    id: "workspace-overview",
                    label: "Workspace Overview",
                    shortLabel: "Overview",
                    state: "active",
                    keyboardHint: "Alt+1"
                },
                {
                    id: "workspace-focus",
                    label: "Focus Workspace",
                    shortLabel: "Focus",
                    state: "available",
                    keyboardHint: "Alt+2"
                }
            ]
        },

        {
            id: "operations",
            label: "Operations",
            actions: [
                {
                    id: "operations-activity",
                    label: "Operational Activity",
                    shortLabel: "Activity",
                    state: "available"
                },
                {
                    id: "operations-alerts",
                    label: "Operational Alerts",
                    shortLabel: "Alerts",
                    state: "available"
                }
            ]
        }

    ],

    status: {
        id: "shell-status",
        label: "Shell",
        value: "Operational",
        tone: "operational"
    },

    contextualControl: {
        id: "operating-context",
        label: "Context",
        value: "Institutional Workspace",
        expanded: false
    }

};
