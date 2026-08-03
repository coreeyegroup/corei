/**
 * ============================================================================
 * STAGE-25
 * STEP-02
 * BUILD UNIT-02
 *
 * FILE
 * ExplorerSection.tsx
 * ============================================================================
 */

import {

    ChevronDown,
    ChevronRight

} from "lucide-react";

import { explorerService } from "./services";

import { useExplorerState } from "./state";

interface ExplorerSectionProps {

    id: string;

    title: string;

    children: React.ReactNode;

}

export function ExplorerSection(

    props: ExplorerSectionProps

): React.JSX.Element {

    const expanded = useExplorerState(

        state =>

            state.isExpanded(

                props.id

            )

    );

    return (

        <div>

            <button

                onClick={() =>

                    explorerService.toggle(

                        props.id

                    )

                }

                style={{

                    width: "100%",

                    display: "flex",

                    alignItems: "center",

                    gap: "6px",

                    padding: "6px 10px",

                    border: 0,

                    cursor: "pointer",

                    background: "transparent",

                    color: "#d4d4d4",

                    fontWeight: 600,

                    fontSize: "12px"

                }}

            >

                {

                    expanded

                        ? <ChevronDown size={14}/>

                        : <ChevronRight size={14}/>

                }

                {props.title}

            </button>

            {

                expanded && (

                    <div>

                        {props.children}

                    </div>

                )

            }

        </div>

    );

}
