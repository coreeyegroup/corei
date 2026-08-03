import { RibbonWidgets } from "../widgets";

export const continuityZone = {

    id: "continuity",

    order: 9,

    title: "Continuity",

    description:
        "Institutional operational continuity.",

    widgets: [

        RibbonWidgets.BACKUP_STATUS,

        RibbonWidgets.RECOVERY_STATUS,

        RibbonWidgets.REDUNDANCY_STATUS,

        RibbonWidgets.CONTINUITY_HEALTH

    ]

} as const;
