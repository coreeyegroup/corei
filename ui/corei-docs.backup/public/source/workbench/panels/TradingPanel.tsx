/**
 * ============================================================================
 * TradingPanel.tsx
 *
 * PURPOSE
 * Trading Workspace
 * ============================================================================
 */

import type { IDockviewPanelProps } from "dockview";

export function TradingPanel(

    props: IDockviewPanelProps

): React.JSX.Element {

    return (

        <div
            style={{
                width:"100%",
                height:"100%",
                background:"#111111",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                color:"#d4d4d4"
            }}
        >
            TRADING PANEL
        </div>

    );

}
