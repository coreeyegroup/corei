import type {

    WorkspaceComposition

} from "./workspace-composition";

export const defaultTradingWorkspace: WorkspaceComposition = {

    id: "trading",

    title: "Trading Workspace",

    panels: [

        {
            panelId: "charts",
            location: "center"
        },

        {
            panelId: "watchlist",
            location: "left"
        },

        {
            panelId: "scanner",
            location: "left"
        },

        {
            panelId: "portfolio",
            location: "right"
        },

        {
            panelId: "risk",
            location: "right"
        },

        {
            panelId: "news",
            location: "right"
        },

        {
            panelId: "orders",
            location: "bottom"
        },

        {
            panelId: "positions",
            location: "bottom"
        },

        {
            panelId: "execution",
            location: "bottom"
        },

        {
            panelId: "logs",
            location: "bottom"
        }

    ]

};
