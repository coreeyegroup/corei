import { RibbonWidgets } from "../widgets";

export const riskZone = {

    id: "risk",

    order: 8,

    title: "Risk Awareness",

    description:
        "Current institutional operational risk.",

    widgets: [

        RibbonWidgets.PLATFORM_RISK,

        RibbonWidgets.SECURITY_RISK,

        RibbonWidgets.OPERATIONAL_RISK,

        RibbonWidgets.COMPLIANCE_RISK

    ]

} as const;
