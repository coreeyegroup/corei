type WidgetLayoutModel = any;

/**
 * CORE SOURCE OF TRUTH RESOLVER
 */

export interface ResolvedWidget {
    id: string;
    label: string;
    value: string;
    status: string;
    priority: string;
    visible: boolean;
}

const VALUE_MAP: Record<string, string> = {
    "corei-identity": "corei-identity",
    "operator": "operator",
    "role": "role",
    "organization": "organization",
    "environment": "environment",
    "platform": "platform",
    "terminal": "terminal",
    "workspace": "workspace",
    "session": "session",
    "cluster": "cluster",
    "region": "region"
};

export function resolveWidgetData(widget: WidgetLayoutModel): ResolvedWidget {

    const key = (widget as any).id;

    return {
        id: key,
        label: key.slice(0, 4).toUpperCase(),
        value: VALUE_MAP[key] ?? "",
        status: (widget as any).status ?? "Unknown",
        priority: (widget as any).priority ?? "normal",
        visible: (widget as any).visible ?? true
    };
}
