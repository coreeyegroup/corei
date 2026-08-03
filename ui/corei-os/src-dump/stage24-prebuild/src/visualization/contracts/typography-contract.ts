/**
 * ============================================================================
 * COREI Operating System
 * Visualization
 * Typography Contract
 * ============================================================================
 */

import type { DesignToken } from "./design-token";

export interface TypographyToken extends DesignToken {

    readonly fontFamily: string;

    readonly fontSize: number;

    readonly fontWeight: number;

    readonly lineHeight: number;

}
