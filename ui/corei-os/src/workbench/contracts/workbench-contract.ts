/**
 * ============================================================================
 * STAGE-25
 * STEP-01
 * BUILD UNIT-10
 *
 * FILE
 * workbench-contract.ts
 *
 * PURPOSE
 * COREI Workbench Architecture Contract
 * ============================================================================
 */

export interface WorkbenchContract {

    shell: ShellContract;

    layout: LayoutContract;

    navigation: NavigationContract;

    explorer: ExplorerContract;

    workspace: WorkspaceContract;

    panels: PanelContract;

}

export interface ShellContract {

    topRibbon: boolean;

    activityBar: boolean;

    explorer: boolean;

    workspace: boolean;

    intelligence: boolean;

    bottomPanel: boolean;

    statusBar: boolean;

}

export interface LayoutContract {

    movable: boolean;

    resizable: boolean;

    dockable: boolean;

    persistent: boolean;

}

export interface NavigationContract {

    activitySwitching: boolean;

    commandPalette: boolean;

    globalSearch: boolean;

}

export interface ExplorerContract {

    dynamic: boolean;

    collapsible: boolean;

    searchable: boolean;

}

export interface WorkspaceContract {

    registryDriven: boolean;

    dockview: boolean;

    layouts: boolean;

}

export interface PanelContract {

    registryDriven: boolean;

    closable: boolean;

    movable: boolean;

    pinnable: boolean;

}
