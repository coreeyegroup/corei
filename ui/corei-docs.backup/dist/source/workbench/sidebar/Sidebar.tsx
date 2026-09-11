/**
 * ============================================================================
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 *
 * FILE:
 * Sidebar.tsx
 *
 * PURPOSE:
 * COREI Workspace Navigation Surface
 * ============================================================================
 */

import { Explorer } from "./Explorer";

import {
    useSidebarState
} from "./state/sidebar-state";


export function Sidebar(): React.JSX.Element {

    const visible = useSidebarState(
        state => state.visible
    );


    if (!visible) {

        return <></>;

    }


    return (

        <aside className="corei-sidebar">

            <Explorer />

        </aside>

    );

}


export default Sidebar;
