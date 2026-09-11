/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-01
 *
 * FILE:
 * layout-context.ts
 *
 * PURPOSE:
 * Institutional Shell Layout Context
 *
 * AUTHOR:
 * COREI Architecture
 *
 ******************************************************************************/

import { createContext } from "react";

import type { LayoutModel } from "../models/layout";

export interface LayoutContextValue {

    readonly layout: LayoutModel | null;

}

export const LayoutContext =
    createContext<LayoutContextValue>({

        layout: null

    });
