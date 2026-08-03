import type { WidgetLayoutModel } from "../layout/models";
import { resolveWidgetData } from "../../../experiences/infrastructure/top-consciousness/specification/widget-resolver";

export interface WidgetViewModel {
    identity: string;
    value: string;
    visible: boolean;
}

export function toWidgetViewModel(widget: WidgetLayoutModel): WidgetViewModel {

    const resolved = resolveWidgetData(widget as any);

    return {
        identity: resolved.label,
        value: resolved.value,
        visible: resolved.visible
    };
}
