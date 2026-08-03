/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 03
 * Step        : 09
 *
 * File        : certification-manager.ts
 * Purpose     : Architecture Certification Manager
 * =============================================================================
 */

import type {

    CertificationModel

} from "./certification-model";

import {

    CertificationRegistry

} from "./certification-registry";

export class CertificationManager {

    public getAll(): readonly CertificationModel[] {

        return CertificationRegistry;

    }

    public find(

        id: string

    ): CertificationModel | undefined {

        return CertificationRegistry.find(

            certification => certification.id === id

        );

    }

}
