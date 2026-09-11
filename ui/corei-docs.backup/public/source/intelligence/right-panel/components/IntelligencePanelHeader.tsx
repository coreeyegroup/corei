/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-19
 *
 * FILE:
 * IntelligencePanelHeader.tsx
 *
 * PURPOSE:
 * Institutional Intelligence Panel Header
 *
 ******************************************************************************/

import type {
    ReactElement
} from "react";

import type {
    IntelligencePanelHeaderModel
} from "../models/intelligence-micro-model";

export interface IntelligencePanelHeaderProps {
    readonly model: IntelligencePanelHeaderModel;
}

export function IntelligencePanelHeader({
    model
}: IntelligencePanelHeaderProps): ReactElement {

    return (

        <header
            className="corei-intelligence-header"
            data-intelligence-region="header"
        >

            <div className="corei-intelligence-header-copy">

                <span className="corei-intelligence-eyebrow">
                    {model.eyebrow}
                </span>

                <h2 className="corei-intelligence-title">
                    {model.title}
                </h2>

            </div>

            <div
                className="corei-intelligence-status"
                data-intelligence-status-tone={model.statusTone}
            >

                <span
                    className="corei-intelligence-status-indicator"
                    aria-hidden="true"
                />

                <span className="corei-intelligence-status-label">
                    {model.statusLabel}
                </span>

            </div>

        </header>

    );

}

export default IntelligencePanelHeader;
