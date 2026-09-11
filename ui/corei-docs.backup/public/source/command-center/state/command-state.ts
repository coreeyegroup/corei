/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-011
 * File       : command-state.ts
 * Purpose    : Command Runtime State
 * =============================================================================
 */

import { create } from "zustand";

import type {

    CommandModel

} from "../models/command";

import {

    CommandRegistry

} from "../registry/command-registry";

interface CommandState {

    readonly commands: readonly CommandModel[];

    readonly activeCommand: string | null;

    activate(

        commandId: string

    ): void;

}

export const useCommandState = create<CommandState>()(

    (set) => ({

        commands: CommandRegistry,

        activeCommand: null,

        activate(

            commandId

        ) {

            set({

                activeCommand: commandId

            });

        }

    })

);
