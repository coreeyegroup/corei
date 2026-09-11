/**
 * ============================================================================
 * AIPanel.tsx
 *
 * PURPOSE
 * AI Workspace
 * ============================================================================
 */

import type { IDockviewPanelProps } from "dockview";

export function AIPanel(

    props: IDockviewPanelProps

): React.JSX.Element {

    return (

        <div
            style={{
                width:"100%",
                height:"100%",
                background:"#0f172a",
                color:"#d4d4d4",
                display:"flex",
                justifyContent:"center",
                alignItems:"center"
            }}
        >
            AI PANEL
        </div>

    );

}
