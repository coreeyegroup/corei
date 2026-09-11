import type { NavigationModel } from "../models/navigation";

export const NavigationRegistry: NavigationModel = {
    items: [
        {
            id: "workspace",
            label: "Workspace",
            path: "/workspace"
        },
        {
            id: "trading",
            label: "Trading",
            path: "/trading"
        },
        {
            id: "infrastructure",
            label: "Infrastructure",
            path: "/infra"
        }
    ]
};
