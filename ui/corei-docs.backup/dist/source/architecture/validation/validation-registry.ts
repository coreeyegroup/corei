/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 03
 * Step        : 08
 *
 * File        : validation-registry.ts
 * Purpose     : Architecture Validation Registry
 * =============================================================================
 */

import type {

    ValidationModel

} from "./validation-model";

export const ValidationRegistry: readonly ValidationModel[] = [

    {
        id: "typescript",
        category: "Build",
        command: "pnpm exec tsc --noEmit",
        expected: "PASS"
    },

    {
        id: "madge",
        category: "Dependency",
        command: "pnpm exec madge --circular src",
        expected: "No circular dependency found!"
    },

    {
        id: "repository",
        category: "Repository",
        command: "tree src",
        expected: "Repository visible"
    },

    {
        id: "architecture",
        category: "Architecture",
        command: "tree src/architecture",
        expected: "Architecture complete"
    }

];
