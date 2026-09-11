/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-19
 *
 * FILE:
 * IntelligenceContextSurface.tsx
 *
 * PURPOSE:
 * Institutional Intelligence Context Surface
 *
 ******************************************************************************/

import type {
    ReactElement
} from "react";

import type {
    IntelligenceContextItemModel
} from "../models/intelligence-micro-model";

export interface IntelligenceContextSurfaceProps {
    readonly items: readonly IntelligenceContextItemModel[];
}

export function IntelligenceContextSurface({
    items
}: IntelligenceContextSurfaceProps): ReactElement {

    return (

        <section
            className="corei-intelligence-context"
            data-intelligence-region="context"
            aria-label="Intelligence context"
        >

            <div className="corei-intelligence-section-heading">
                Context
            </div>

            <div className="corei-intelligence-context-grid">

                {items.map((item) => (

                    <div
                        key={item.id}
                        className="corei-intelligence-context-item"
                        data-intelligence-context={item.id}
                    >

                        <span className="corei-intelligence-context-label">
                            {item.label}
                        </span>

                        <span className="corei-intelligence-context-value">
                            {item.value}
                        </span>

                    </div>

                ))}

            </div>

        </section>

    );

}

export default IntelligenceContextSurface;
