/*
------------------------------------------------------------
COREI
Stage 25
Phase 19
Step 07

Component:
WorkbenchSurface
------------------------------------------------------------
*/

import { WorkspaceCanvas } from "../workspace-canvas/WorkspaceCanvas";
import { EmptyWorkspace } from "../empty-workspace/EmptyWorkspace";

import {
    DockContent,
    DockLayout,
    DockRegion,
    DockSlot,
    DockSurface,
    DockViewport,
} from "@/docking";

import {
    WindowComposition,
} from "@/window";

export function WorkbenchSurface(): React.JSX.Element {

    return (

        <WorkspaceCanvas>

            <DockLayout>

                <DockSurface>

                    <DockRegion position="center">

                        <DockSlot>

                            <DockContent>

                                <DockViewport>

                                    <WindowComposition>

                                        <EmptyWorkspace />

                                    </WindowComposition>

                                </DockViewport>

                            </DockContent>

                        </DockSlot>

                    </DockRegion>

                </DockSurface>

            </DockLayout>

        </WorkspaceCanvas>

    );

}
