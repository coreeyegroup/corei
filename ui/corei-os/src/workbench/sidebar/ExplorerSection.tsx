/**
 * ============================================================================
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * STEP-02
 * BUILD UNIT-02
 *
 * FILE:
 * ExplorerSection.tsx
 *
 * PURPOSE:
 * Institutional Explorer Section
 *
 * EXISTING CAPABILITIES:
 * - Explorer runtime
 * - Explorer state
 * - Explorer service
 *
 * EXECUTION BOUNDARY:
 * - No new runtime.
 * - No new state.
 * - No navigation redesign.
 * ============================================================================
 */

import {
    ChevronDown,
    ChevronRight
} from "lucide-react";

import {
    explorerService
} from "./services";

import {
    useExplorerState
} from "./state";


interface ExplorerSectionProps {

    id: string;

    title: string;

    children: React.ReactNode;

    /**
     * Optional badge count (e.g., number of items in the section)
     * Displayed on the right side of the section header.
     */
    badge?: number;

}


export function ExplorerSection(
    props: ExplorerSectionProps
): React.JSX.Element {

    const expanded =
        useExplorerState(
            state =>
                state.isExpanded(
                    props.id
                )
        );


    return (

        <section
            className="corei-explorer-section"
        >

            <button
                type="button"
                className="corei-explorer-section-header"
                aria-expanded={expanded}
                onClick={() =>
                    explorerService.toggle(
                        props.id
                    )
                }
            >

                <span
                    className="corei-explorer-section-chevron"
                    aria-hidden="true"
                >

                    {
                        expanded
                            ? (
                                <ChevronDown
                                    size={12}
                                    strokeWidth={1.8}
                                />
                            )
                            : (
                                <ChevronRight
                                    size={12}
                                    strokeWidth={1.8}
                                />
                            )
                    }

                </span>


                <span
                    className="corei-explorer-section-title"
                >
                    {props.title}
                </span>

                {
                    props.badge !== undefined && props.badge > 0 && (
                        <span
                            className="corei-explorer-section-badge"
                            aria-label={`${props.badge} items`}
                        >
                            {props.badge}
                        </span>
                    )
                }

            </button>


            {
                expanded && (

                    <div
                        className="corei-explorer-section-content"
                    >
                        {props.children}
                    </div>

                )
            }

        </section>

    );

}


export default ExplorerSection;
