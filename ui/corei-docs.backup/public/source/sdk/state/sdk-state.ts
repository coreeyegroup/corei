/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-017
 * File       : sdk-state.ts
 * Purpose    : SDK Runtime State
 * =============================================================================
 */

import { create } from "zustand";

import type {

    TerminalModel

} from "../models/terminal";

import {

    SDKRegistry

} from "../registry/sdk-registry";

interface SDKState {

    readonly terminals: readonly TerminalModel[];

    readonly activeTerminal: string;

    activate(

        terminalId: string

    ): void;

}

export const useSDKState = create<SDKState>()(

    (set) => ({

        terminals: SDKRegistry,

        activeTerminal: "infrastructure-terminal",

        activate(

            terminalId

        ) {

            set({

                activeTerminal: terminalId

            });

        }

    })

);
