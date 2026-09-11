/**
 * ============================================================================
 * STAGE-25
 * STEP-01
 * BUILD UNIT-03
 *
 * FILE
 * WelcomePanel.tsx
 *
 * PURPOSE
 * Default Workbench Panel
 * ============================================================================
 */

import type { IDockviewPanelProps } from "dockview";

export function WelcomePanel(

    props: IDockviewPanelProps

): React.JSX.Element {

    return (

        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#111111",
                color: "#d4d4d4",
                fontSize: "15px"
            }}
        >
            COREI WORKBENCH
        </div>

    );

}
