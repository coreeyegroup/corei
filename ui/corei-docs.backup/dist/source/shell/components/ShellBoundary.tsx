/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-13
 *
 * FILE:
 * ShellBoundary.tsx
 *
 * PURPOSE:
 * Institutional Shell Resilience and Failure Boundary
 *
 * DESCRIPTION:
 * Defines the authoritative React failure containment boundary for the
 * Institutional Shell.
 *
 * The boundary contains uncaught rendering and lifecycle failures originating
 * from the Shell subtree and replaces the failed subtree with a deterministic
 * recovery surface.
 *
 * The boundary does not:
 *
 * - implement Platform Kernel recovery,
 * - modify Platform Kernel state,
 * - restart subsystem runtimes,
 * - implement observability infrastructure,
 * - consume Workbench internals,
 * - create a second application runtime,
 * - create a second event system.
 *
 * RECOVERY MODEL:
 *
 * Shell subtree failure
 *      ↓
 * ShellBoundary
 *      ↓
 * Deterministic failure state
 *      ↓
 * Retry Shell OR Reload Application
 *
 * OWNERSHIP:
 * Institutional Shell
 *
 ******************************************************************************/

/*=============================================================================
    IMPORTS
=============================================================================*/

import {
    Component
} from "react";

import type {
    ErrorInfo,
    PropsWithChildren,
    ReactNode
} from "react";

import {
    shellInstrumentationRuntime
} from "../instrumentation";

/*=============================================================================
    CONTRACTS
=============================================================================*/

export interface ShellBoundaryProps
    extends PropsWithChildren {}

interface ShellBoundaryState {

    readonly failed: boolean;

    readonly recoveryAttempt: number;

}

/*=============================================================================
    INITIAL STATE
=============================================================================*/

const INITIAL_SHELL_BOUNDARY_STATE: ShellBoundaryState = {

    failed: false,

    recoveryAttempt: 0

};

/*=============================================================================
    SHELL BOUNDARY
=============================================================================*/

export class ShellBoundary
    extends Component<
        ShellBoundaryProps,
        ShellBoundaryState
    > {

    public state: ShellBoundaryState =
        INITIAL_SHELL_BOUNDARY_STATE;

    /*=========================================================================
        FAILURE CAPTURE
    =========================================================================*/

    public static getDerivedStateFromError(): Partial<ShellBoundaryState> {

        return {

            failed: true

        };

    }

    /*=========================================================================
        FAILURE REPORTING BOUNDARY
    =========================================================================*/

    public componentDidCatch(
        error: Error,
        errorInfo: ErrorInfo
    ): void {

        /*
         * Step-23 routes Shell failure visibility through the authoritative
         * Shell instrumentation boundary.
         *
         * Failure containment and recovery remain locally owned by the
         * Institutional Shell.
         *
         * Platform Foundation retains logging and diagnostics implementation
         * ownership.
         */

        shellInstrumentationRuntime.error(
            `[COREI][SHELL_BOUNDARY] Institutional Shell failure: ${error.name}: ${error.message}; componentStack=${errorInfo.componentStack ?? "unavailable"}`
        );

    }

    /*=========================================================================
        SHELL RETRY
    =========================================================================*/

    private readonly retryShell = (): void => {

        this.setState((currentState) => ({

            failed: false,

            recoveryAttempt:
                currentState.recoveryAttempt + 1

        }));

    };

    /*=========================================================================
        APPLICATION RELOAD
    =========================================================================*/

    private readonly reloadApplication = (): void => {

        window.location.reload();

    };

    /*=========================================================================
        RENDER
    =========================================================================*/

    public render(): ReactNode {

        if (this.state.failed) {

            return (

                <main
                    className="corei-shell-failure-boundary"
                    data-shell-boundary="failed"
                    data-shell-recovery="available"
                    role="alert"
                    aria-live="assertive"
                >

                    <section
                        className="corei-shell-failure-surface"
                        aria-labelledby="corei-shell-failure-title"
                    >

                        <p
                            className="corei-shell-failure-eyebrow"
                        >
                            COREI OPERATING SYSTEM
                        </p>

                        <h1
                            id="corei-shell-failure-title"
                            className="corei-shell-failure-title"
                        >
                            Institutional Shell Unavailable
                        </h1>

                        <p
                            className="corei-shell-failure-description"
                        >
                            The operating shell encountered an unexpected
                            presentation failure. The failure has been contained
                            and the application recovery controls remain
                            available.
                        </p>

                        <div
                            className="corei-shell-failure-actions"
                        >

                            <button
                                type="button"
                                className="corei-shell-failure-action"
                                onClick={this.retryShell}
                            >
                                Retry Shell
                            </button>

                            <button
                                type="button"
                                className="corei-shell-failure-action"
                                onClick={this.reloadApplication}
                            >
                                Reload Application
                            </button>

                        </div>

                    </section>

                </main>

            );

        }

        return (

            <div
                key={this.state.recoveryAttempt}
                data-shell-boundary="operational"
            >

                {this.props.children}

            </div>

        );

    }

}

export default ShellBoundary;
