/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 04
 * Step        : 03
 *
 * File        : ui-provider-runtime.ts
 * Purpose     : UI Provider Runtime
 * =============================================================================
 */

import {

    DefaultUIProviderLifecycle

} from "../lifecycle/ui-provider-lifecycle";

export interface UIProviderRuntime {

    readonly lifecycle: typeof DefaultUIProviderLifecycle;

}

export const DefaultUIProviderRuntime: UIProviderRuntime = {

    lifecycle: DefaultUIProviderLifecycle

};
