/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-19
 *
 * FILE:
 * intelligence-micro-model.ts
 *
 * PURPOSE:
 * Intelligence Right Panel Micro Presentation Contracts
 *
 ******************************************************************************/

export type IntelligenceOperationalTone =
    | "operational"
    | "attention"
    | "critical"
    | "neutral";

export interface IntelligencePanelHeaderModel {
    readonly eyebrow: string;
    readonly title: string;
    readonly statusLabel: string;
    readonly statusTone: IntelligenceOperationalTone;
}

export interface IntelligenceContextItemModel {
    readonly id: string;
    readonly label: string;
    readonly value: string;
}

export interface IntelligenceInsightItemModel {
    readonly id: string;
    readonly label: string;
    readonly value: string;
    readonly tone: IntelligenceOperationalTone;
}

export const DEFAULT_INTELLIGENCE_PANEL_HEADER:
    IntelligencePanelHeaderModel = {
        eyebrow: "COREI",
        title: "Intelligence",
        statusLabel: "Operational",
        statusTone: "operational"
    };

export const DEFAULT_INTELLIGENCE_CONTEXT:
    readonly IntelligenceContextItemModel[] = [
        {
            id: "scope",
            label: "Scope",
            value: "Institutional"
        },
        {
            id: "mode",
            label: "Mode",
            value: "Live Context"
        }
    ];

export const DEFAULT_INTELLIGENCE_INSIGHTS:
    readonly IntelligenceInsightItemModel[] = [
        {
            id: "runtime",
            label: "Runtime",
            value: "Connected",
            tone: "operational"
        },
        {
            id: "context",
            label: "Context",
            value: "Available",
            tone: "operational"
        },
        {
            id: "attention",
            label: "Attention",
            value: "Monitoring",
            tone: "neutral"
        }
    ];
