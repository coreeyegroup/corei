/**
 * ============================================================================
 * STAGE-25
 * PHASE-19
 * STEP-05
 *
 * Foundation Dockview Adapter
 * ============================================================================
 */

import { DockviewReact } from "dockview-react";
import "dockview/dist/styles/dockview.css";

import type {
    ReactElement,
    FunctionComponent
} from "react";

import type {
    IDockviewPanelProps
} from "dockview";

import {
    panelCatalog
} from "../../../workbench/panels/catalog";

import {
    setDockviewApi
} from "../dockview";

import {
    workbenchRuntime
} from "../../../workbench/runtime/workbench-runtime";

const components: Record<
    string,
    FunctionComponent<IDockviewPanelProps>
> = {};

for (const panel of panelCatalog) {

    components[panel.id] = () => (

        <panel.component />

    );

}

export function DockviewAdapter(): ReactElement {

    return (

        <div
            style={{
                width: "100%",
                height: "100%"
            }}
        >

            <DockviewReact

                components={components}

                onReady={(event) => {

                    setDockviewApi(event.api);

                    workbenchRuntime.initialize();

                    workbenchRuntime.start();

                }}

            />

        </div>

    );

}
