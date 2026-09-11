import { workspaceRuntime } from "./workspace-runtime";

workspaceRuntime.register({
    id: "trading",
    name: "Trading",
    panels: [
        { id: "welcome", title: "Welcome", component: "welcome", closable: false },
        { id: "watchlist", title: "Watchlist", component: "watchlist", closable: true },
        { id: "orders", title: "Orders", component: "orders", closable: true },
        { id: "positions", title: "Positions", component: "positions", closable: true },
        { id: "charts", title: "Charts", component: "charts", closable: true },
        { id: "news", title: "News", component: "news", closable: true },
        { id: "scanner", title: "Scanner", component: "scanner", closable: true },
        { id: "risk", title: "Risk", component: "risk", closable: true },
        { id: "calendar", title: "Calendar", component: "calendar", closable: true },
        { id: "logs", title: "Logs", component: "logs", closable: true },
        { id: "diagnostics", title: "Diagnostics", component: "diagnostics", closable: true },
        { id: "monaco", title: "Editor", component: "monaco", closable: true },
        { id: "terminal", title: "Terminal", component: "terminal", closable: true },
        { id: "intelligence", title: "Intelligence", component: "intelligence", closable: true }
    ]
});

workspaceRuntime.register({
    id: "research",
    name: "Research",
    panels: [
        { id: "welcome", title: "Welcome", component: "welcome", closable: false },
        { id: "charts", title: "Charts", component: "charts", closable: true },
        { id: "scanner", title: "Scanner", component: "scanner", closable: true },
        { id: "logs", title: "Logs", component: "logs", closable: true },
        { id: "monaco", title: "Editor", component: "monaco", closable: true },
        { id: "terminal", title: "Terminal", component: "terminal", closable: true },
        { id: "intelligence", title: "Intelligence", component: "intelligence", closable: true }
    ]
});
