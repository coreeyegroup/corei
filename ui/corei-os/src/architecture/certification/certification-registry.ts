/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 03
 * Step        : 09
 *
 * File        : certification-registry.ts
 * Purpose     : Architecture Certification Registry
 * =============================================================================
 */

import type {

    CertificationModel

} from "./certification-model";

export const CertificationRegistry: readonly CertificationModel[] = [

    {
        id: "ownership",
        name: "Repository Ownership",
        status: "CERTIFIED",
        description: "Repository ownership governance certified."
    },

    {
        id: "layers",
        name: "Platform Layers",
        status: "CERTIFIED",
        description: "Platform layer governance certified."
    },

    {
        id: "repository",
        name: "Repository Governance",
        status: "CERTIFIED",
        description: "Repository governance certified."
    },

    {
        id: "dependency",
        name: "Dependency Governance",
        status: "CERTIFIED",
        description: "Dependency governance certified."
    },

    {
        id: "lifecycle",
        name: "Lifecycle Governance",
        status: "CERTIFIED",
        description: "Lifecycle governance certified."
    },

    {
        id: "standards",
        name: "Engineering Standards",
        status: "CERTIFIED",
        description: "Engineering standards certified."
    },

    {
        id: "validation",
        name: "Validation Governance",
        status: "CERTIFIED",
        description: "Validation governance certified."
    }

];
