/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-09
 *
 * FILE:
 * IntelligenceRightPanel.tsx
 *
 * PURPOSE:
 * Institutional Intelligence Right Panel Composition Root
 *
 * DESCRIPTION:
 * Defines the authoritative outer composition boundary for the existing
 * Intelligence Right Panel subsystem.
 *
 * This component composes the existing IntelligenceProvider and RightPanel.
 * It does not recreate intelligence runtime, engine, registry, state, event,
 * service, agent, or cognitive infrastructure.
 *
 * AUTHORITATIVE COMPOSITION:
 *
 * Shell RightRegion
 *     ↓
 * Intelligence Right Panel Public API
 *     ↓
 * IntelligenceRightPanel
 *     ↓
 * IntelligenceProvider
 *     ↓
 * RightPanel
 *     ↓
 * Existing Intelligence Runtime / Engine
 *
 ******************************************************************************/

import type {
    ReactElement
} from "react";

import {
    IntelligenceProvider
} from "./provider/intelligence-provider";

import {
    RightPanel
} from "./layout/right-panel";

export function IntelligenceRightPanel(): ReactElement {

    return (

        <IntelligenceProvider>

            <RightPanel />

        </IntelligenceProvider>

    );

}

export default IntelligenceRightPanel;
