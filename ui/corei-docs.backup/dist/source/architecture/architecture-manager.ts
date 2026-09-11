/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 03
 * Step        : 10
 *
 * File        : architecture-manager.ts
 * Purpose     : Architecture Domain Manager
 * =============================================================================
 */

import { ArchitectureBaseline } from "./architecture-baseline";

import { RepositoryManager } from "./repository";

import { CertificationManager } from "./certification";

export class ArchitectureManager {

    private readonly repository =

        new RepositoryManager();

    private readonly certification =

        new CertificationManager();

    public getBaseline() {

        return ArchitectureBaseline;

    }

    public getRepository() {

        return this.repository.getRepository();

    }

    public getCertifications() {

        return this.certification.getAll();

    }

}
