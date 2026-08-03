import { RibbonWidgets } from "../widgets";

export const missionZone = {

    id: "mission",

    order: 7,

    title: "Mission",

    description:
        "Current institutional mission.",

    widgets: [

        RibbonWidgets.ACTIVE_MISSION,

        RibbonWidgets.CURRENT_OBJECTIVE,

        RibbonWidgets.EXECUTION_MODE,

        RibbonWidgets.OPERATIONAL_STATUS

    ]

} as const;
