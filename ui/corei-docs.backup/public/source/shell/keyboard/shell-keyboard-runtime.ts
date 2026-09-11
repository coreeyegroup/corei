/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-21
 *
 * FILE:
 * shell-keyboard-runtime.ts
 *
 * PURPOSE:
 * Browser keyboard lifecycle boundary for Institutional Shell commands.
 *
 ******************************************************************************/

import {
    shellCommandRouter
} from "../commands/shell-command-router";

import {
    resolveShellShortcut
} from "./shell-shortcut-resolver";

function isEditableTarget(
    target: EventTarget | null
): boolean {

    if (
        !(target instanceof HTMLElement)
    ) {

        return false;

    }

    const tagName =
        target.tagName.toLowerCase();

    return (
        tagName === "input" ||
        tagName === "textarea" ||
        tagName === "select" ||
        target.isContentEditable
    );

}

export class ShellKeyboardRuntime {

    private initialized = false;

    private readonly handleKeyDown =
        (
            event: KeyboardEvent
        ): void => {

            if (
                event.defaultPrevented ||
                event.repeat ||
                isEditableTarget(
                    event.target
                )
            ) {

                return;

            }

            const commandId =
                resolveShellShortcut({

                    code:
                        event.code,

                    ctrlKey:
                        event.ctrlKey,

                    altKey:
                        event.altKey,

                    shiftKey:
                        event.shiftKey,

                    metaKey:
                        event.metaKey

                });

            if (
                commandId === null
            ) {

                return;

            }

            event.preventDefault();

            shellCommandRouter
                .route(
                    commandId
                );

        };

    public initialize(): void {

        if (
            this.initialized
        ) {

            return;

        }

        if (
            typeof window === "undefined"
        ) {

            return;

        }

        window.addEventListener(
            "keydown",
            this.handleKeyDown
        );

        this.initialized = true;

    }

    public dispose(): void {

        if (
            !this.initialized
        ) {

            return;

        }

        if (
            typeof window !== "undefined"
        ) {

            window.removeEventListener(
                "keydown",
                this.handleKeyDown
            );

        }

        this.initialized = false;

    }

    public isInitialized(): boolean {

        return this.initialized;

    }

}

export const shellKeyboardRuntime =
    new ShellKeyboardRuntime();
