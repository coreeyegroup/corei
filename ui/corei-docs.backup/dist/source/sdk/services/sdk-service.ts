/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-017
 * File       : sdk-service.ts
 * Purpose    : Institutional SDK Service
 * =============================================================================
 */

import {

    SDKRegistry

} from "../registry/sdk-registry";

export function getRegisteredTerminals() {

    return SDKRegistry;

}
