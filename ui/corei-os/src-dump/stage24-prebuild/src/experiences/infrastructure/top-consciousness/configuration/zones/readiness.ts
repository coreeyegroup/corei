import { RibbonWidgets } from "../widgets";

export const readinessZone = {

    id: "readiness",

    order: 6,

    title: "Operational Readiness",

    description:
        "Current platform readiness.",

    widgets: [

        RibbonWidgets.PLATFORM_HEALTH,

        RibbonWidgets.CLUSTER_HEALTH,

        RibbonWidgets.SERVICE_HEALTH,

        RibbonWidgets.SECURITY_STATUS,

        RibbonWidgets.ALERT_STATE

    ]

} as const;
