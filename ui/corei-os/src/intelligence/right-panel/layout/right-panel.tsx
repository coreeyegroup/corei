/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-19
 *
 * FILE:
 * right-panel.tsx
 *
 * PURPOSE:
 * Institutional Intelligence Right Panel Micro Surface
 *
 * DESCRIPTION:
 * Defines the active presentation surface for the Intelligence Right Panel.
 *
 * The surface preserves the existing Intelligence Provider, Runtime and Engine
 * ownership established before Step-19.
 *
 * This layer consumes the existing intelligence context and adds only the
 * institutional micro presentation required by the active Shell right region.
 *
 ******************************************************************************/

import type {
    ReactElement
} from "react";

import {
    useIntelligence
} from "../provider/intelligence-provider";

import {
    IntelligencePanelHeader
} from "../components/IntelligencePanelHeader";

import {
    IntelligenceContextSurface
} from "../components/IntelligenceContextSurface";

import {
    IntelligenceInsightSurface
} from "../components/IntelligenceInsightSurface";

import {
    IntelligencePanelFooter
} from "../components/IntelligencePanelFooter";

import {
    DEFAULT_INTELLIGENCE_CONTEXT,
    DEFAULT_INTELLIGENCE_INSIGHTS,
    DEFAULT_INTELLIGENCE_PANEL_HEADER
} from "../models/intelligence-micro-model";

import "../styles/intelligence-right-panel.css";

export function RightPanel(): ReactElement {

    const intelligence = useIntelligence();

    const runtimeAvailable = intelligence !== null &&
        intelligence !== undefined;

    const header = runtimeAvailable
        ? DEFAULT_INTELLIGENCE_PANEL_HEADER
        : {
            ...DEFAULT_INTELLIGENCE_PANEL_HEADER,
            statusLabel: "Unavailable",
            statusTone: "critical" as const
        };

    return (

        <section
            className="corei-intelligence-panel"
            data-intelligence-surface="right-panel"
            data-intelligence-runtime={
                runtimeAvailable
                    ? "available"
                    : "unavailable"
            }
        >

            <IntelligencePanelHeader
                model={header}
            />

            <div className="corei-intelligence-body">

                <IntelligenceContextSurface
                    items={DEFAULT_INTELLIGENCE_CONTEXT}
                />

                <IntelligenceInsightSurface
                    items={DEFAULT_INTELLIGENCE_INSIGHTS}
                />

            </div>

            <IntelligencePanelFooter />

        </section>

    );

}

export default RightPanel;
