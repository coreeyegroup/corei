/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-17
 *
 * FILE:
 * Navigation.tsx
 *
 * PURPOSE:
 * Institutional Navigation Micro Composition Root
 *
 * DESCRIPTION:
 * Composes the operator-facing Navigation micro surface while preserving the
 * existing Navigation provider, registry, state, and Shell ownership boundary.
 *
 * AUTHORITATIVE FLOW:
 *
 * LeftRegion
 *     ↓
 * Navigation Public API
 *     ↓
 * Navigation
 *     ↓
 * NavigationProvider
 *     ↓
 * Existing Navigation Registry + State
 *     ↓
 * Navigation Micro Surface
 *
 * OWNERSHIP:
 * Navigation Domain
 *
 ******************************************************************************/

import {
    useMemo,
    useState
} from "react";

import type {
    ReactElement
} from "react";

import {
    NavigationProvider
} from "../providers/navigation-provider";

import {
    useNavigation
} from "../hooks/use-navigation";

import {
    DEFAULT_NAVIGATION_MICRO_METADATA
} from "../models/navigation-micro-model";

import {
    NavigationHeader
} from "./NavigationHeader";

import {
    NavigationSearch
} from "./NavigationSearch";

import {
    NavigationGroup
} from "./NavigationGroup";

import {
    NavigationFooter
} from "./NavigationFooter";

import "../styles/navigation.css";

function NavigationSurface(): ReactElement {

    const {
        navigations,
        activeNavigation,
        activate
    } = useNavigation();

    const [query, setQuery] = useState("");

    const normalizedQuery = query
        .trim()
        .toLowerCase();

    const visibleItems = useMemo(
        () => {

            if (normalizedQuery.length === 0) {

                return navigations.items;

            }

            return navigations.items.filter(
                (item) => {

                    return (
                        item.label
                            .toLowerCase()
                            .includes(normalizedQuery) ||
                        item.id
                            .toLowerCase()
                            .includes(normalizedQuery) ||
                        item.path
                            .toLowerCase()
                            .includes(normalizedQuery)
                    );

                }
            );

        },
        [
            navigations.items,
            normalizedQuery
        ]
    );

    return (

        <nav
            className="corei-navigation"
            data-navigation="institutional"
            data-navigation-active={activeNavigation}
        >

            <NavigationHeader
                eyebrow={DEFAULT_NAVIGATION_MICRO_METADATA.eyebrow}
                mark={DEFAULT_NAVIGATION_MICRO_METADATA.mark}
                title={DEFAULT_NAVIGATION_MICRO_METADATA.title}
                description={DEFAULT_NAVIGATION_MICRO_METADATA.description}
            />

            <NavigationSearch
                value={query}
                placeholder={
                    DEFAULT_NAVIGATION_MICRO_METADATA.searchPlaceholder
                }
                onChange={setQuery}
            />

            <div
                className="corei-navigation__body"
                data-navigation-element="body"
            >

                {visibleItems.length > 0 ? (

                    <NavigationGroup
                        label={
                            DEFAULT_NAVIGATION_MICRO_METADATA.groupLabel
                        }
                        items={visibleItems}
                        activeNavigation={activeNavigation}
                        onActivate={activate}
                    />

                ) : (

                    <div
                        className="corei-navigation-empty"
                        data-navigation-element="empty"
                    >

                        <span className="corei-navigation-empty__title">
                            No matching domain
                        </span>

                        <span className="corei-navigation-empty__query">
                            {query}
                        </span>

                    </div>

                )}

            </div>

            <NavigationFooter
                label={
                    DEFAULT_NAVIGATION_MICRO_METADATA.footerLabel
                }
                activeNavigation={activeNavigation}
            />

        </nav>

    );

}

export function Navigation(): ReactElement {

    return (

        <NavigationProvider>

            <NavigationSurface />

        </NavigationProvider>

    );

}

export default Navigation;
