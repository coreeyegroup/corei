/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-06-D
 *
 * FILE:
 * WorkbenchLayout.tsx
 *
 * PURPOSE:
 * Institutional Workspace UX Foundation
 *
 * DESCRIPTION:
 * Provides the visual workspace shell boundary.
 *
 * Consumes existing workspace capabilities.
 * Does not own workspace runtime,
 * state management,
 * lifecycle,
 * or persistence.
 *
 ******************************************************************************/

import "./styles/workspace-surface.css";

import {
    WorkspaceRoot,
    WorkbenchSurface,
} from "../components";


export function WorkbenchLayout(): React.JSX.Element {

    return (

        <main
            className="corei-workspace-surface"
            data-corei-surface="workspace"
        >

            <header
                className="corei-workspace-context"
                data-workspace-surface="context"
            >

                <span>
                    ACTIVE WORKSPACE
                </span>

            </header>


            <nav
                className="corei-workspace-switcher"
                data-workspace-surface="switching"
            >

                <button
                    className="corei-workspace-switch active"
                    type="button"
                >
                    TRADING
                </button>

                <button
                    className="corei-workspace-switch"
                    type="button"
                >
                    RESEARCH
                </button>

                <button
                    className="corei-workspace-switch"
                    type="button"
                >
                    INFRASTRUCTURE
                </button>

            </nav>


            <section
    className="corei-workspace-container"
    data-workspace-surface="container"
>
    <WorkspaceRoot>

        <WorkbenchSurface />

    </WorkspaceRoot>

    <section
            className="corei-window-host"
            data-window-host="workspace"
        >

            <article
                className="corei-window corei-window--active"
                data-window-id="market"
            >

                <header className="corei-window-header">

                    <div className="corei-window-title">
                        MARKET
                    </div>

                    <div className="corei-window-actions">

                        <button type="button">−</button>

                        <button type="button">□</button>

                        <button type="button">×</button>

                    </div>

                </header>

                <section
                    className="corei-window-body"
                >

                    <section
                        className="corei-panel-host"
                        data-panel-host="market"
                    >

                        <section
                            className="corei-panel corei-panel--active"
                        >

                            <header
                                className="corei-panel-header"
                            >

                                <span
                                    className="corei-panel-title"
                                >
                                    MARKET PANEL
                                </span>

                            </header>

                            <section
                                className="corei-panel-surface"
                            >

                                <section
                                    className="corei-workbench"
                                >

                                    <header
                                        className="corei-command-surface"
                                    >

                                        <button
                                            className="corei-command-palette"
                                            type="button"
                                        >

                                            <span>
                                                ⌘
                                            </span>

                                            <span>
                                                Search commands…
                                            </span>

                                            <kbd>
                                                Ctrl+Shift+P
                                            </kbd>

                                        </button>

                                    </header>

                                    <nav
                                        className="corei-editor-tabs"
                                    >

                                        <button
                                            className="corei-editor-tab corei-editor-tab--active"
                                            type="button"
                                        >
                                            MARKET
                                        </button>

                                    </nav>

                                    <section
                                        className="corei-keyboard-surface"
                                    >

                                        <span>

                                            Keyboard Ready

                                        </span>

                                    </section>


                                    <main
                                        className="corei-editor-area"
                                    >

                                        EDITOR AREA

                                    </main>

                                    <footer
                                        className="corei-bottom-panel"
                                    >

                                        <section
                                            className="corei-productivity-status"
                                        >

                                            READY

                                        </section>

                                        <section
                                            className="corei-operator-feedback"
                                        >

                                            No operational events

                                        </section>

                                    </footer>

                                </section>

                            </section>

                        </section>

                    </section>

                </section>

            </article>

        </section>

    </section>


            <footer
                className="corei-workspace-state"
                data-workspace-surface="state"
            >

                <span
                    className="corei-workspace-state__label"
                >
                    STATE
                </span>


                <span
                    className="corei-workspace-state__value"
                >
                    READY
                </span>


                <span
                    className="corei-workspace-state__separator"
                >
                    |
                </span>


                <span
                    className="corei-workspace-state__value"
                >
                    AVAILABLE
                </span>


            </footer>


        </main>

    );

}


export default WorkbenchLayout;
