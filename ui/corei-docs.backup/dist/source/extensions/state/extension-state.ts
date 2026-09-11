/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-014
 * File       : extension-state.ts
 * Purpose    : Extension Runtime State
 * =============================================================================
 */

import { create } from "zustand";

import type {

    ExtensionModel

} from "../models/extension";

import {

    ExtensionRegistry

} from "../registry/extension-registry";

interface ExtensionState {

    readonly extensions: readonly ExtensionModel[];

    readonly activeExtension: string;

    activate(

        extensionId: string

    ): void;

}

export const useExtensionState = create<ExtensionState>()(

    (set) => ({

        extensions: ExtensionRegistry,

        activeExtension: "infrastructure",

        activate(

            extensionId

        ) {

            set({

                activeExtension: extensionId

            });

        }

    })

);
