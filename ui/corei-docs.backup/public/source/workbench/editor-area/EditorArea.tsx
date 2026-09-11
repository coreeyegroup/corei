/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 *
 * FILE:
 * EditorArea.tsx
 *
 * PURPOSE:
 * Institutional Workspace Surface Container
 *
 ******************************************************************************/

import { WorkbenchTabs } from "../tabs/components/WorkbenchTabs";


export function EditorArea(): React.JSX.Element {

    return (

        <section
            className="corei-editor-area"
            data-corei-surface="editor"
        >

            <div className="corei-surface-header">

                <WorkbenchTabs />

            </div>


            <div
                className="corei-surface-content"
                data-corei-canvas="workspace"
            />


        </section>

    );

}


export default EditorArea;
