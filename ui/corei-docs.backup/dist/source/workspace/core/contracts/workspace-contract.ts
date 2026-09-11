/*
===============================================================================
COREI OPERATING SYSTEM
===============================================================================

Stage      : Stage-25
Phase      : Phase-05
Step       : Step-01

Module     : Workspace Runtime Platform
Component  : Workspace Contract

===============================================================================
*/

export interface WorkspaceContract {

    readonly id: string;

    readonly name: string;

    readonly version: string;

    initialize(): Promise<void>;

    shutdown(): Promise<void>;

}
