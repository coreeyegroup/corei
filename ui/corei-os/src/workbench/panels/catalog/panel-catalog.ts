/**
 * ============================================================================
 * STAGE-25
 * STEP-02
 * BUILD UNIT-24
 *
 * FILE
 * panel-catalog.ts
 *
 * PURPOSE
 * Authoritative Institutional Panel Catalog
 * ============================================================================
 */

import type {
    PanelDescriptor
} from "../metadata";

import {
    WelcomePanel
} from "../components/WelcomePanel";

import {
    ChartsPanel
} from "../library/charts";

import {
    WatchlistPanel
} from "../library/watchlist";

import {
    OrdersPanel
} from "../library/orders";

import {
    PositionsPanel
} from "../library/positions";

import {
    PortfolioPanel
} from "../library/portfolio";

import {
    ExecutionPanel
} from "../library/execution";

import {
    NewsPanel
} from "../library/news";

import {
    ScannerPanel
} from "../library/scanner";

import {
    RiskPanel
} from "../library/risk";

import {
    CalendarPanel
} from "../library/calendar";

import {
    LogsPanel
} from "../library/logs";

import {
    CapabilityExplorerPanel
} from "../library/capabilities";

import {
    ProviderExplorerPanel
} from "../library/providers";

import {
    RelationshipExplorerPanel
} from "../library/capability-provider-relationships";

import {
    ProviderBindingInspectorPanel
} from "../library/provider-binding-inspector";

import {
    ResolutionMonitorPanel
} from "../library/resolution-monitor";

import {
    LifecycleMonitorPanel
} from "@/workbench/panels/library/lifecycle-monitor";

import {
    RuntimeMonitorPanel
} from "@/workbench/panels/library/runtime-monitor";

export const panelCatalog: PanelDescriptor[] = [

    {
        id: "welcome",
        title: "Welcome",
        component: WelcomePanel,
        category: "system",
        defaultLocation: "center",
        singleton: true,
        closable: false,
        persistence: true,
        minimumWidth: 500,
        minimumHeight: 320,
        permissions: ["workspace.read"],
        workspaceVisibility: ["trading", "infrastructure"],
        icon: "home"
    },

    {
        id: "capabilities",
        title: "Capabilities",
        component: CapabilityExplorerPanel,
        category: "system",
        defaultLocation: "left",
        singleton: true,
        closable: true,
        persistence: true,
        minimumWidth: 340,
        minimumHeight: 320,
        permissions: [
            "workspace.read"
        ],
        workspaceVisibility: [
            "trading",
            "infrastructure"
        ],
        icon: "capability"
    },

    {
        id: "providers",
        title: "Providers",
        component: ProviderExplorerPanel,
        category: "system",
        defaultLocation: "left",
        singleton: true,
        closable: true,
        persistence: true,
        minimumWidth: 340,
        minimumHeight: 320,
        permissions: [
            "workspace.read"
        ],
        workspaceVisibility: [
            "trading",
            "infrastructure"
        ],
        icon: "provider"
    },

    {
        id: "capability-provider-relationships",
        title: "Capability Relationships",
        component: RelationshipExplorerPanel,
        category: "system",
        defaultLocation: "left",
        singleton: true,
        closable: true,
        persistence: true,
        minimumWidth: 360,
        minimumHeight: 320,
        permissions: [
            "workspace.read"
        ],
        workspaceVisibility: [
            "trading",
            "infrastructure"
        ],
        icon: "relationship"
    },

    {
        id: "provider-binding-inspector",
        title: "Provider Binding Inspector",
        component: ProviderBindingInspectorPanel,
        category: "system",
        defaultLocation: "left",
        singleton: true,
        closable: true,
        persistence: true,
        minimumWidth: 360,
        minimumHeight: 320,
        permissions: [
            "workspace.read"
        ],
        workspaceVisibility: [
            "trading",
            "infrastructure"
        ],
        icon: "binding"
    },

    {
        id: "resolution-monitor",
        title: "Resolution Monitor",
        component: ResolutionMonitorPanel,
        category: "system",
        defaultLocation: "left",
        singleton: true,
        closable: true,
        persistence: true,
        minimumWidth: 360,
        minimumHeight: 320,
        permissions: [
            "workspace.read"
        ],
        workspaceVisibility: [
            "trading",
            "infrastructure"
        ],
        icon: "radar"
    },

    {
        id: "lifecycle-monitor",
        title: "Lifecycle Monitor",
        component: LifecycleMonitorPanel,
        category: "system",
        defaultLocation: "left",
        singleton: true,
        closable: true,
        persistence: true,
        minimumWidth: 360,
        minimumHeight: 320,
        permissions: [
            "workspace.read"
        ],
        workspaceVisibility: [
            "trading",
            "infrastructure"
        ],
        icon: "lifecycle"
    },

    {
        id: "charts",
        title: "Charts",
        component: ChartsPanel,
        category: "market",
        defaultLocation: "center",
        singleton: false,
        closable: true,
        persistence: true,
        minimumWidth: 500,
        minimumHeight: 350,
        permissions: ["market.read"],
        workspaceVisibility: ["trading"],
        icon: "chart"
    },

    {
        id: "watchlist",
        title: "Watchlist",
        component: WatchlistPanel,
        category: "market",
        defaultLocation: "left",
        singleton: true,
        closable: true,
        persistence: true,
        minimumWidth: 300,
        minimumHeight: 300,
        permissions: ["market.read"],
        workspaceVisibility: ["trading"],
        icon: "list"
    },

    {
        id: "orders",
        title: "Orders",
        component: OrdersPanel,
        category: "trading",
        defaultLocation: "bottom",
        singleton: false,
        closable: true,
        persistence: true,
        minimumWidth: 450,
        minimumHeight: 250,
        permissions: ["trading.read"],
        workspaceVisibility: ["trading"],
        icon: "orders"
    },

    {
        id: "positions",
        title: "Positions",
        component: PositionsPanel,
        category: "trading",
        defaultLocation: "bottom",
        singleton: true,
        closable: true,
        persistence: true,
        minimumWidth: 450,
        minimumHeight: 250,
        permissions: ["trading.read"],
        workspaceVisibility: ["trading"],
        icon: "positions"
    },

    {
        id: "portfolio",
        title: "Portfolio",
        component: PortfolioPanel,
        category: "portfolio",
        defaultLocation: "right",
        singleton: true,
        closable: true,
        persistence: true,
        minimumWidth: 350,
        minimumHeight: 300,
        permissions: ["portfolio.read"],
        workspaceVisibility: ["trading"],
        icon: "portfolio"
    },

    {
        id: "execution",
        title: "Execution",
        component: ExecutionPanel,
        category: "trading",
        defaultLocation: "bottom",
        singleton: true,
        closable: true,
        persistence: true,
        minimumWidth: 500,
        minimumHeight: 300,
        permissions: ["execution.read"],
        workspaceVisibility: ["trading"],
        icon: "execution"
    },

    {
        id: "news",
        title: "News",
        component: NewsPanel,
        category: "market",
        defaultLocation: "right",
        singleton: true,
        closable: true,
        persistence: true,
        minimumWidth: 350,
        minimumHeight: 300,
        permissions: ["news.read"],
        workspaceVisibility: ["trading"],
        icon: "news"
    },

    {
        id: "scanner",
        title: "Scanner",
        component: ScannerPanel,
        category: "market",
        defaultLocation: "left",
        singleton: true,
        closable: true,
        persistence: true,
        minimumWidth: 320,
        minimumHeight: 300,
        permissions: ["scanner.read"],
        workspaceVisibility: ["trading"],
        icon: "scanner"
    },

    {
        id: "risk",
        title: "Risk",
        component: RiskPanel,
        category: "risk",
        defaultLocation: "right",
        singleton: true,
        closable: true,
        persistence: true,
        minimumWidth: 350,
        minimumHeight: 300,
        permissions: ["risk.read"],
        workspaceVisibility: ["trading"],
        icon: "risk"
    },

    {
        id: "calendar",
        title: "Calendar",
        component: CalendarPanel,
        category: "market",
        defaultLocation: "right",
        singleton: true,
        closable: true,
        persistence: true,
        minimumWidth: 350,
        minimumHeight: 300,
        permissions: ["calendar.read"],
        workspaceVisibility: ["trading"],
        icon: "calendar"
    },

    {
        id: "logs",
        title: "Logs",
        component: LogsPanel,
        category: "system",
        defaultLocation: "bottom",
        singleton: true,
        closable: true,
        persistence: true,
        minimumWidth: 500,
        minimumHeight: 250,
        permissions: ["system.read"],
        workspaceVisibility: ["trading", "infrastructure"],
        icon: "logs"
    }

];