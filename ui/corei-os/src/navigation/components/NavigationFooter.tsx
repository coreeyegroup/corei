/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-17
 *
 * FILE:
 * NavigationFooter.tsx
 *
 * PURPOSE:
 * Institutional Navigation Footer
 *
 * OWNERSHIP:
 * Navigation Domain
 *
 ******************************************************************************/

import type {
    ReactElement
} from "react";

export interface NavigationFooterProps {

    readonly label: string;

    readonly activeNavigation: string;

}

export function NavigationFooter({
    label,
    activeNavigation
}: NavigationFooterProps): ReactElement {

    return (

        <footer
            className="corei-navigation-footer"
            data-navigation-element="footer"
        >

            <span
                className="corei-navigation-footer__status"
                aria-hidden="true"
            />

            <span className="corei-navigation-footer__label">
                {label}
            </span>

            <span className="corei-navigation-footer__active">
                {activeNavigation}
            </span>

        </footer>

    );

}

export default NavigationFooter;
