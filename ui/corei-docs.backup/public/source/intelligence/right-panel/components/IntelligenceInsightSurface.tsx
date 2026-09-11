/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-19
 *
 * FILE:
 * IntelligenceInsightSurface.tsx
 *
 * PURPOSE:
 * Institutional Intelligence Insight Surface
 *
 ******************************************************************************/

import type {
    ReactElement
} from "react";

import type {
    IntelligenceInsightItemModel
} from "../models/intelligence-micro-model";

export interface IntelligenceInsightSurfaceProps {
    readonly items: readonly IntelligenceInsightItemModel[];
}

export function IntelligenceInsightSurface({
    items
}: IntelligenceInsightSurfaceProps): ReactElement {

    return (

        <section
            className="corei-intelligence-insights"
            data-intelligence-region="insights"
            aria-label="Intelligence insights"
        >

            <div className="corei-intelligence-section-heading">
                Intelligence State
            </div>

            <div className="corei-intelligence-insight-list">

                {items.map((item) => (

                    <article
                        key={item.id}
                        className="corei-intelligence-insight"
                        data-intelligence-insight={item.id}
                        data-intelligence-tone={item.tone}
                    >

                        <span className="corei-intelligence-insight-label">
                            {item.label}
                        </span>

                        <span className="corei-intelligence-insight-value">
                            {item.value}
                        </span>

                    </article>

                ))}

            </div>

        </section>

    );

}

export default IntelligenceInsightSurface;
