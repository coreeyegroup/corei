/**
 * ============================================================================
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 *
 * FILE:
 * WorkbenchTabs.tsx
 *
 * PURPOSE:
 * COREI Workspace Tab Surface
 *
 * RUNTIME:
 * Existing tab runtime preserved
 * ============================================================================
 */

import { X } from "lucide-react";

import {
    useTabState
} from "../state/tab-state";

import {
    tabRuntime
} from "../runtime/tab-runtime";

import "../../styles/workspace-tabs.css";


export function WorkbenchTabs(): React.JSX.Element {

    const {
        tabs,
        activeTab
    } = useTabState();


    return (

        <div className="corei-workbench-tabs">

            {
                tabs.map(tab => (

                    <button

                        key={tab.id}

                        type="button"

                        className={
                            activeTab === tab.id
                                ? "corei-workbench-tab active"
                                : "corei-workbench-tab"
                        }

                        onClick={() =>
                            tabRuntime.activate(tab.id)
                        }

                    >

                        <span className="corei-workbench-tab-title">

                            {tab.title}

                        </span>


                        {
                            tab.closable && (

                                <X

                                    className="corei-workbench-tab-close"

                                    size={14}

                                    onClick={(event) => {

                                        event.stopPropagation();

                                        tabRuntime.close(tab.id);

                                    }}

                                />

                            )
                        }

                    </button>

                ))
            }

        </div>

    );

}


export default WorkbenchTabs;
