/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-17
 *
 * FILE:
 * NavigationHeader.tsx
 *
 * PURPOSE:
 * Institutional Navigation Header
 *
 * OWNERSHIP:
 * Navigation Domain
 *
 ******************************************************************************/

import type {
    ReactElement
} from "react";

export interface NavigationHeaderProps {

    readonly eyebrow: string;

    readonly mark?: string;

    readonly title: string;

    readonly description: string;

}

export function NavigationHeader({
    eyebrow,
     mark,
    title,
    description
}: NavigationHeaderProps): ReactElement {

    return (

        <header
            className="corei-navigation-header"
            data-navigation-element="header"
        >

            <span className="corei-navigation-header__eyebrow">
                {eyebrow}
            </span>

            <div className="corei-navigation-header__identity">

                    {mark && (

                        <span
                            className="corei-navigation-header__mark"
                            aria-hidden="true"
                        >
                            {mark}
                        </span>

                    )}

                <div className="corei-navigation-header__copy">

                    <strong className="corei-navigation-header__title">
                        {title}
                    </strong>

                    <span className="corei-navigation-header__description">
                        {description}
                    </span>

                </div>

            </div>

        </header>

    );

}

export default NavigationHeader;
