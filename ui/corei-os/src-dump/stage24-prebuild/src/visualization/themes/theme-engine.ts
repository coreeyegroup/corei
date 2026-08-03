/**
 * ============================================================================
 * COREI Operating System
 * Visualization
 * Theme Engine
 * ============================================================================
 */

import { InstitutionalDarkTheme } from "./institutional-dark";

export class ThemeEngine {

    private activeTheme =
        InstitutionalDarkTheme;

    public getTheme() {

        return this.activeTheme;

    }

    public setTheme(theme: typeof InstitutionalDarkTheme) {

        this.activeTheme = theme;

    }

}

export const themeEngine =
    new ThemeEngine();
