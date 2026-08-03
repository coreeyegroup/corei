/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 03
 * Step        : 04
 *
 * File        : repository-manager.ts
 * Purpose     : Repository Governance Manager
 * =============================================================================
 */

import {

    OwnershipManager

} from "../ownership";

import {

    LayerManager

} from "../layers";

import {

    RepositoryRegistry

} from "./repository-registry";

export class RepositoryManager {

    private readonly ownership =

        new OwnershipManager();

    private readonly layers =

        new LayerManager();

    public getRepository() {

        return RepositoryRegistry;

    }

    public getOwnership() {

        return this.ownership.getAll();

    }

    public getLayers() {

        return this.layers.getAll();

    }

}
