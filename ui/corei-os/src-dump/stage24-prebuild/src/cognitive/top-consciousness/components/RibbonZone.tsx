import type { ZoneLayoutModel } from "../layout";
import { RibbonWidget } from "./RibbonWidget";

interface RibbonZoneProps {
    zone: ZoneLayoutModel;
}

export function RibbonZone({ zone }: RibbonZoneProps) {

    return (
        <section
            style={{
                display: "flex",
                flexDirection: "row",
                gap: "6px",

                alignItems: "center",

                flexShrink: 1,
                minWidth: "0",

                padding: "2px 8px",

                borderRight: "1px solid rgba(255,255,255,0.06)",

                overflow: "hidden"
            }}
        >

            {zone.widgets.map(widget => (
                <RibbonWidget
                    key={widget.id}
                    widget={widget}
                />
            ))}

        </section>
    );
}
