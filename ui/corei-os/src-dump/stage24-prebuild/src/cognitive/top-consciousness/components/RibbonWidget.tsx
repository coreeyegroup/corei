import type { CSSProperties } from "react";
import { Surface } from "../../../visualization/primitives/surface";
import { Text } from "../../../visualization/primitives/text";

import type { WidgetLayoutModel } from "../layout";

export interface RibbonWidgetProps {
    widget: WidgetLayoutModel;
}

export function RibbonWidget({ widget }: RibbonWidgetProps) {

    const style: CSSProperties = {
        display: widget.visible ? "flex" : "none",
        flexDirection: "row",
        alignItems: "center",
        padding: "2px 6px",
        borderRadius: "4px",
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.04)",
        gap: "6px",
        minWidth: "90px"
    };

    return (
        <Surface semantic="panel" elevation="flat" style={style}>

            {/* ONLY REAL VALUE — NO PREFIX, NO CORE/OPER */}
            <Text style={{
                fontSize: "11px",
                fontWeight: 500,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
            }}>
                {(widget as any).value ?? widget.id}
            </Text>

        </Surface>
    );
}
