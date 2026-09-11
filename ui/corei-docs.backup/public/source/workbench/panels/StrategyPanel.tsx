/**
 * ============================================================================
 * StrategyPanel.tsx
 *
 * PURPOSE
 * Strategy Editor
 * ============================================================================
 */

import type { IDockviewPanelProps } from "dockview";

export function StrategyPanel(

    props: IDockviewPanelProps

): React.JSX.Element {

    return (

        <div
            style={{
                width:"100%",
                height:"100%",
                background:"#111827",
                color:"#d4d4d4",
                display:"flex",
                justifyContent:"center",
                alignItems:"center"
            }}
        >
            STRATEGY PANEL
        </div>

    );

}
