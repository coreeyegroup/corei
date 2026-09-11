/**
 * ============================================================================
 * STAGE-25
 * STEP-02
 * BUILD UNIT-23
 *
 * FILE
 * panel-descriptor.ts
 *
 * PURPOSE
 * Authoritative COREI Panel Descriptor
 * ============================================================================
 */

import type {

    ComponentType

} from "react";

import type {

    PanelCategory

} from "./panel-category";

import type {

    PanelLocation

} from "./panel-location";

export interface PanelDescriptor {

    id: string;

    title: string;

    component: ComponentType;

    category: PanelCategory;

    defaultLocation: PanelLocation;

    singleton: boolean;

    closable: boolean;

    persistence: boolean;

    minimumWidth: number;

    minimumHeight: number;

    permissions: string[];

    workspaceVisibility: string[];

    icon?: string;

}
