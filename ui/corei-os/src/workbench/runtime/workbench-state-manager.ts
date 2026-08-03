/**
 * ============================================================================
 * STAGE-25
 * STEP-02
 * BUILD UNIT-01
 *
 * FILE
 * workbench-state-manager.ts
 *
 * PURPOSE
 * Single write authority for Workbench State.
 * ============================================================================
 */

import {

    useWorkbenchState,
    type ActivityType

} from "../state/workbench-state";

class WorkbenchStateManager {

    setActivity(

        activity: ActivityType

    ): void {

        useWorkbenchState.setState({

            activity

        });

    }

    setWorkspace(

        workspace: string

    ): void {

        useWorkbenchState.setState({

            workspace

        });

    }

    setSidebarVisible(

        visible: boolean

    ): void {

        useWorkbenchState.setState({

            sidebarVisible: visible

        });

    }

    setRightVisible(

        visible: boolean

    ): void {

        useWorkbenchState.setState({

            rightVisible: visible

        });

    }

    setBottomVisible(

        visible: boolean

    ): void {

        useWorkbenchState.setState({

            bottomVisible: visible

        });

    }

    toggleSidebar(): void {

        const {

            sidebarVisible

        } = useWorkbenchState.getState();

        useWorkbenchState.setState({

            sidebarVisible: !sidebarVisible

        });

    }

    toggleRight(): void {

        const {

            rightVisible

        } = useWorkbenchState.getState();

        useWorkbenchState.setState({

            rightVisible: !rightVisible

        });

    }

    toggleBottom(): void {

        const {

            bottomVisible

        } = useWorkbenchState.getState();

        useWorkbenchState.setState({

            bottomVisible: !bottomVisible

        });

    }

    getActivity(): ActivityType {

        return useWorkbenchState.getState().activity;

    }

    getWorkspace(): string {

        return useWorkbenchState.getState().workspace;

    }

    isSidebarVisible(): boolean {

        return useWorkbenchState
            .getState()
            .sidebarVisible;

    }

    isRightVisible(): boolean {

        return useWorkbenchState
            .getState()
            .rightVisible;

    }

    isBottomVisible(): boolean {

        return useWorkbenchState
            .getState()
            .bottomVisible;

    }

}

export const workbenchStateManager =

    new WorkbenchStateManager();
