/**
 * ============================================================================
 * COREI Operating System
 * Visualization
 * Color Token Contract
 * ============================================================================
 */

import type { DesignToken } from "./design-token";

export interface ColorToken extends DesignToken {

    readonly value: string;

}
