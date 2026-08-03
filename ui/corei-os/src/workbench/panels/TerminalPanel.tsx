/**
 * ============================================================================
 * TerminalPanel.tsx
 *
 * PURPOSE
 * Bottom Terminal
 * ============================================================================
 */

import type { IDockviewPanelProps } from "dockview";

export function TerminalPanel(

    props: IDockviewPanelProps

): React.JSX.Element {

    return (

        <div
            style={{
                width:"100%",
                height:"100%",
                background:"#050505",
                color:"#00ff66",
                padding:"12px"
            }}
        >
            TERMINAL
        </div>

    );

}