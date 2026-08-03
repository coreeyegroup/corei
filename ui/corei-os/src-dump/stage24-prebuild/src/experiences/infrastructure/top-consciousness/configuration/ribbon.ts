/**
 * ============================================================================
 * COREI Operating System
 * Infrastructure Experience
 * Top Consciousness Ribbon Configuration
 * ============================================================================
 *
 * Purpose
 * -------
 * Assembles the Infrastructure Top Consciousness Ribbon from the nine
 * institutional cognitive zones.
 *
 * This file represents the authoritative ribbon configuration consumed by
 * the Top Consciousness framework.
 * ============================================================================
 */

import type { InfrastructureRibbonWidget } from "./widgets";

import {
    authorityZone,
    contextZone,
    continuityZone,
    existenceZone,
    identityZone,
    missionZone,
    readinessZone,
    realityZone,
    riskZone
} from "./zones";

/**
 * ============================================================================
 * Infrastructure Ribbon Zone
 * ============================================================================
 */

export interface InfrastructureRibbonZone {

    readonly id: string;

    readonly order: number;

    readonly title: string;

    readonly description: string;

    readonly widgets: readonly InfrastructureRibbonWidget[];

}

/**
 * ============================================================================
 * Infrastructure Ribbon
 * ============================================================================
 */

export interface InfrastructureRibbon {

    readonly id: string;

    readonly title: string;

    readonly description: string;

    readonly zones: readonly InfrastructureRibbonZone[];

}

/**
 * ============================================================================
 * Infrastructure Top Ribbon
 * ============================================================================
 */

export const InfrastructureTopRibbon: InfrastructureRibbon = {

    id: "infrastructure-top-consciousness",

    title: "Infrastructure Top Consciousness",

    description:
        "Institutional operational awareness for Infrastructure.",

    zones: [

        existenceZone,

        identityZone,

        realityZone,

        contextZone,

        authorityZone,

        readinessZone,

        missionZone,

        riskZone,

        continuityZone

    ]

};
