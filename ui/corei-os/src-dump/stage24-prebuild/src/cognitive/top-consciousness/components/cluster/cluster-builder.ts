import type { RibbonLayoutModel } from "../../layout/models";
import type { RibbonCluster } from "./types";

function find(layout: RibbonLayoutModel, ids: string[]) {
    return layout.zones.flatMap(z =>
        z.widgets.filter(w => ids.includes(w.id))
    );
}

export function buildRibbonClusters(
    layout: RibbonLayoutModel
): RibbonCluster[] {

    return [

        // 01 IDENTITY
        {
            id: "identity",
            title: "Identity",
            widgets: find(layout, [
                "corei-identity",
                "operator",
                "role",
                "organization"
            ])
        },

        // 02 ENVIRONMENT
        {
            id: "environment",
            title: "Environment",
            widgets: find(layout, [
                "environment",
                "platform",
                "terminal"
            ])
        },

        // 03 CONTEXT
        {
            id: "context",
            title: "Context",
            widgets: find(layout, [
                "cluster",
                "region",
                "namespace",
                "workspace",
                "active-workspace",
                "session"
            ])
        },

        // 04 EXECUTION (includes Mission)
        {
            id: "execution",
            title: "Execution",
            widgets: find(layout, [
                "mission",
                "objective",
                "status",
                "execution-mode"
            ])
        },

        // 05 ASSURANCE (includes Health + Risk)
        {
            id: "assurance",
            title: "Assurance",
            widgets: find(layout, [
                "platform-health",
                "cluster-health",
                "service-health",
                "security-risk",
                "platform-risk",
                "operational-risk",
                "approval",
                "permissions"
            ])
        }

    ];
}
