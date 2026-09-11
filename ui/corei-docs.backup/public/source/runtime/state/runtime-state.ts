/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-015
 * File       : runtime-state.ts
 * Purpose    : Runtime State
 * =============================================================================
 */

import { create } from "zustand";

import type {

    RuntimeModel

} from "../models/runtime";

import {

    RuntimeRegistry

} from "../registry/runtime-registry";

interface RuntimeState {

    readonly runtimes: readonly RuntimeModel[];

    readonly activeRuntime: string;

    activate(

        runtimeId: string

    ): void;

}

export const useRuntimeState = create<RuntimeState>()(

    (set) => ({

        runtimes: RuntimeRegistry,

        activeRuntime: "corei-runtime",

        activate(

            runtimeId

        ) {

            set({

                activeRuntime: runtimeId

            });

        }

    })

);
