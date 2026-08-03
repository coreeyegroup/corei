import { useRibbon } from "../hooks";
import { topConsciousnessLayoutEngine } from "../layout";
import { RibbonWidget } from "./RibbonWidget";

export function Ribbon() {

    const { state } = useRibbon();

    if (!state.ribbon) return null;

    const layout =
        topConsciousnessLayoutEngine.build(state.ribbon, 1920);

    const clusters =
        layout.zones.flatMap(z => z.widgets);

    // SPLIT INTO TWO ROWS (PURE VISUAL LOGIC)
    const midpoint = Math.ceil(clusters.length / 2);

    const row1 = clusters.slice(0, midpoint);
    const row2 = clusters.slice(midpoint);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "2px",
                padding: "2px 4px",
                background: "rgba(0,0,0,0.96)"
            }}
        >

            {/* ROW 1 */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "3px",
                    overflowX: "auto",
                    whiteSpace: "nowrap"
                }}
            >
                {row1.map(widget => (
                    <RibbonWidget
                        key={widget.id}
                        widget={widget}
                    />
                ))}
            </div>

            {/* ROW 2 */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "3px",
                    overflowX: "auto",
                    whiteSpace: "nowrap"
                }}
            >
                {row2.map(widget => (
                    <RibbonWidget
                        key={widget.id}
                        widget={widget}
                    />
                ))}
            </div>

        </div>
    );
}
