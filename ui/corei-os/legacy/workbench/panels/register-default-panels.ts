/**
 * ============================================================================
 * STAGE-25
 * STEP-01
 * BUILD UNIT-13
 *
 * FILE
 * register-default-panels.ts
 *
 * PURPOSE
 * Register Default COREI Panels
 * ============================================================================
 */

import { panelRegistry } from "../registries";

import { TradingPanel } from "./TradingPanel";
import { TerminalPanel } from "./TerminalPanel";
import { StrategyPanel } from "./StrategyPanel";
import { AIPanel } from "./AIPanel";

export function registerDefaultPanels(): void {

    panelRegistry.register({

        id: "trading",

        title: "Trading",

        component: TradingPanel

    });

    panelRegistry.register({

        id: "terminal",

        title: "Terminal",

        component: TerminalPanel

    });

    panelRegistry.register({

        id: "strategy",

        title: "Strategy",

        component: StrategyPanel

    });

    panelRegistry.register({

        id: "ai",

        title: "AI",

        component: AIPanel

    });

}
