/**
 * =============================================================================
 * COREI Operating System
 * Foundation
 * Theme Engine
 * =============================================================================
 */

export interface ThemeEngine {

    readonly theme: string;

}

export const DefaultThemeEngine: ThemeEngine = {

    theme: "dark"

};
