/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-17
 *
 * FILE:
 * NavigationItem.tsx
 *
 * PURPOSE:
 * Institutional Navigation Item
 *
 * DESCRIPTION:
 * Renders a deterministic operator-selectable navigation item.
 *
 * Activation is delegated to the existing Navigation state contract.
 *
 * OWNERSHIP:
 * Navigation Domain
 *
 ******************************************************************************/

import type {
    ReactElement
} from "react";

import type {
    NavigationItem as NavigationItemModel
} from "../models/navigation";

export interface NavigationItemProps {

    readonly item: NavigationItemModel;

    readonly active: boolean;

    readonly onActivate: (navigationId: string) => void;

}

function resolveNavigationGlyph(
    navigationId: string
): string {

    switch (navigationId) {

        case "workspace":
            return "W";

        case "trading":
            return "T";

        case "infrastructure":
            return "I";

        default:
            return navigationId
                .slice(0, 1)
                .toUpperCase();

    }

}

export function NavigationItem({
    item,
    active,
    onActivate
}: NavigationItemProps): ReactElement {

    function handleActivate(): void {

        onActivate(item.id);

    }

    return (

        <button
            className="corei-navigation-item"
            type="button"
            data-navigation-item={item.id}
            data-navigation-active={active ? "true" : "false"}
            aria-current={active ? "page" : undefined}
            onClick={handleActivate}
        >

            <span
                className="corei-navigation-item__indicator"
                aria-hidden="true"
            />

            <span
                className="corei-navigation-item__icon"
                aria-hidden="true"
            >
                {resolveNavigationGlyph(item.id)}
            </span>

            <span className="corei-navigation-item__content">

                <span className="corei-navigation-item__label">
                    {item.label}
                </span>

                <span className="corei-navigation-item__path">
                    {item.path}
                </span>

            </span>

            <span
                className="corei-navigation-item__chevron"
                aria-hidden="true"
            >
                ›
            </span>

        </button>

    );

}

export default NavigationItem;
