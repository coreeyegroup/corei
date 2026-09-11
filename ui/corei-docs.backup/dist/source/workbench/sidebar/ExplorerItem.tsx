/**
 * ============================================================================
 * STAGE-25
 * STEP-02
 * BUILD UNIT-02
 *
 * FILE
 * ExplorerItem.tsx
 * ============================================================================
 */

import { File } from "lucide-react";

import { explorerService } from "./services";

import { useExplorerState } from "./state";

interface ExplorerItemProps {

    id: string;

    label: string;

}

export function ExplorerItem(

    props: ExplorerItemProps

): React.JSX.Element {

    const selected = useExplorerState(

        state =>

            state.selected === props.id

    );

    return (

        <button

            onClick={() =>

                explorerService.select(

                    props.id

                )

            }

            style={{

                width: "100%",

                display: "flex",

                alignItems: "center",

                gap: "8px",

                padding: "5px 24px",

                border: 0,

                cursor: "pointer",

                textAlign: "left",

                background:

                    selected

                        ? "#2d2d30"

                        : "transparent",

                color:

                    selected

                        ? "#ffffff"

                        : "#bdbdbd"

            }}

        >

            <File size={14}/>

            {props.label}

        </button>

    );

}
