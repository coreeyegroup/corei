import {
    InfrastructureTopRibbon,
    type InfrastructureRibbonZone
} from "../top-consciousness";

import type {
    InfrastructureRibbonWidget
} from "../top-consciousness/configuration/widgets";

import type {
    RibbonModel,
    ZoneModel,
    WidgetModel
} from "../../../cognitive/top-consciousness";

function mapWidget(widget: InfrastructureRibbonWidget): WidgetModel {

    return {
        id: widget.id,

        name: widget.id,

        description: widget.description,

        label: widget.id.slice(0, 4).toUpperCase(),

        // FIX: use ONLY available schema field
        value: widget.title ?? widget.id,

        subtitle: widget.description,

        status: "normal",

        priority: widget.priority,

        visibility: "visible",

        interaction: "none",

        enabled: widget.enabled
    };
}

function mapZone(zone: InfrastructureRibbonZone): ZoneModel {

    return {
        id: zone.id,
        name: zone.title,
        description: zone.description,
        order: zone.order,
        alignment: "left",
        priority: "normal",
        visibility: "visible",

        widgets: zone.widgets.map(mapWidget)
    };
}

export function createInfrastructureRibbon(): RibbonModel {

    return {
        id: InfrastructureTopRibbon.id,
        name: InfrastructureTopRibbon.title,
        description: InfrastructureTopRibbon.description,

        layout: "fixed",
        density: "compact",
        visibility: "visible",

        zones: InfrastructureTopRibbon.zones.map(mapZone)
    };
}
