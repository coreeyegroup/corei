/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-17
 *
 * FILE:
 * NavigationGroup.tsx
 *
 * PURPOSE:
 * Institutional Navigation Group
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

import {
    NavigationItem
} from "./NavigationItem";

export interface NavigationGroupProps {

    readonly label: string;

    readonly items: readonly NavigationItemModel[];

    readonly activeNavigation: string;

    readonly onActivate: (navigationId: string) => void;

}

export function NavigationGroup({
    label,
    items,
    activeNavigation,
    onActivate
}: NavigationGroupProps): ReactElement {

    return (

        <section
            className="corei-navigation-group"
            data-navigation-element="group"
        >

            <div className="corei-navigation-group__header">

                <span className="corei-navigation-group__label">
                    {label}
                </span>

                <span className="corei-navigation-group__count">
                    {items.length}
                </span>

            </div>

            <div className="corei-navigation-group__items">

                {items.map((item) => (

                    <NavigationItem
                        key={item.id}
                        item={item}
                        active={activeNavigation === item.id}
                        onActivate={onActivate}
                    />

                ))}

            </div>

        </section>

    );

}

export default NavigationGroup;
