/**
 * ============================================================================
 * COREI Operating System
 * Top Consciousness
 * Widget Data Source Specification
 * ============================================================================
 */

export interface WidgetDataSourceSpec {
    readonly widgetId: string;
    readonly widgetTitle: string;
    readonly purpose: string;
    readonly primarySource: string;
    readonly fallbackValue: string;
    readonly owner: string;
    readonly refreshPolicy: "session" | "realtime" | "on-demand" | "static";
    readonly status: "implemented" | "partial" | "pending";
}

/**
 * ============================================================================
 * FULL RIBBON COVERAGE MAP
 * ============================================================================
 */

export const WidgetDataSourceSpecs: Record<string, WidgetDataSourceSpec> = {

    // =========================
    // CORE IDENTITY ZONE
    // =========================
    COREI_IDENTITY: {
        widgetId: "corei-identity",
        widgetTitle: "COREI",
        purpose: "System identity",
        primarySource: "application.metadata.identity",
        fallbackValue: "COREI Operating System",
        owner: "platform-shell",
        refreshPolicy: "static",
        status: "implemented"
    },

    ENVIRONMENT: {
        widgetId: "environment",
        widgetTitle: "Environment",
        purpose: "Runtime environment",
        primarySource: "runtime.environment",
        fallbackValue: "Production",
        owner: "runtime",
        refreshPolicy: "session",
        status: "implemented"
    },

    PLATFORM: {
        widgetId: "platform",
        widgetTitle: "Platform",
        purpose: "Execution platform",
        primarySource: "platform.name",
        fallbackValue: "COREI OS",
        owner: "platform",
        refreshPolicy: "static",
        status: "implemented"
    },

    WORKSPACE: {
        widgetId: "workspace",
        widgetTitle: "Workspace",
        purpose: "Active workspace",
        primarySource: "workspace.current",
        fallbackValue: "Default Workspace",
        owner: "workspace-engine",
        refreshPolicy: "realtime",
        status: "partial"
    },

    // =========================
    // IDENTITY ZONE
    // =========================
    OPERATOR: {
        widgetId: "operator",
        widgetTitle: "Operator",
        purpose: "Current user",
        primarySource: "identity.user",
        fallbackValue: "System Operator",
        owner: "identity",
        refreshPolicy: "session",
        status: "implemented"
    },

    ROLE: {
        widgetId: "role",
        widgetTitle: "Role",
        purpose: "Access role",
        primarySource: "identity.role",
        fallbackValue: "Administrator",
        owner: "identity",
        refreshPolicy: "session",
        status: "implemented"
    },

    ORGANIZATION: {
        widgetId: "organization",
        widgetTitle: "Organization",
        purpose: "Org context",
        primarySource: "org.name",
        fallbackValue: "COREI",
        owner: "org",
        refreshPolicy: "static",
        status: "pending"
    },

    SESSION: {
        widgetId: "session",
        widgetTitle: "Session",
        purpose: "Active session",
        primarySource: "session.current",
        fallbackValue: "Active Session",
        owner: "session",
        refreshPolicy: "realtime",
        status: "implemented"
    },

    // =========================
    // REALITY ZONE
    // =========================
    TERMINAL: {
        widgetId: "terminal",
        widgetTitle: "Terminal",
        purpose: "Current terminal",
        primarySource: "runtime.terminal",
        fallbackValue: "Infrastructure",
        owner: "runtime",
        refreshPolicy: "session",
        status: "implemented"
    },

    CLUSTER: {
        widgetId: "cluster",
        widgetTitle: "Cluster",
        purpose: "Kubernetes cluster",
        primarySource: "kubernetes.cluster",
        fallbackValue: "core-prod-01",
        owner: "infra",
        refreshPolicy: "static",
        status: "implemented"
    },

    REGION: {
        widgetId: "region",
        widgetTitle: "Region",
        purpose: "Deployment region",
        primarySource: "infra.region",
        fallbackValue: "Bengaluru",
        owner: "infra",
        refreshPolicy: "static",
        status: "implemented"
    },

    SCOPE: {
        widgetId: "scope",
        widgetTitle: "Scope",
        purpose: "Operational scope",
        primarySource: "runtime.scope",
        fallbackValue: "System",
        owner: "runtime",
        refreshPolicy: "session",
        status: "partial"
    },

    // =========================
    // CONTEXT ZONE
    // =========================
    ACTIVE_WORKSPACE: {
        widgetId: "active-workspace",
        widgetTitle: "Active Workspace",
        purpose: "Current workspace",
        primarySource: "workspace.active",
        fallbackValue: "Default Workspace",
        owner: "workspace",
        refreshPolicy: "realtime",
        status: "implemented"
    },

    ACTIVE_INVESTIGATION: {
        widgetId: "active-investigation",
        widgetTitle: "Investigation",
        purpose: "Current investigation",
        primarySource: "investigation.active",
        fallbackValue: "None",
        owner: "investigation",
        refreshPolicy: "realtime",
        status: "pending"
    },

    CURRENT_DOMAIN: {
        widgetId: "current-domain",
        widgetTitle: "Domain",
        purpose: "Active domain",
        primarySource: "domain.current",
        fallbackValue: "Infrastructure",
        owner: "domain",
        refreshPolicy: "session",
        status: "partial"
    },

    SELECTED_RESOURCE: {
        widgetId: "selected-resource",
        widgetTitle: "Resource",
        purpose: "Selected resource",
        primarySource: "resource.selected",
        fallbackValue: "None",
        owner: "resource",
        refreshPolicy: "on-demand",
        status: "pending"
    },

    // =========================
    // AUTHORITY ZONE
    // =========================
    APPROVAL_MODE: {
        widgetId: "approval-mode",
        widgetTitle: "Approval",
        purpose: "Approval mode",
        primarySource: "policy.approval",
        fallbackValue: "Auto",
        owner: "policy",
        refreshPolicy: "session",
        status: "pending"
    },

    EXECUTION_AUTHORITY: {
        widgetId: "execution-authority",
        widgetTitle: "Execution",
        purpose: "Execution authority",
        primarySource: "policy.execution",
        fallbackValue: "Full",
        owner: "policy",
        refreshPolicy: "session",
        status: "pending"
    },

    // =========================
    // HEALTH ZONE
    // =========================
    PLATFORM_HEALTH: {
        widgetId: "platform-health",
        widgetTitle: "Platform Health",
        purpose: "System health",
        primarySource: "observability.platform.health",
        fallbackValue: "Healthy",
        owner: "observability",
        refreshPolicy: "realtime",
        status: "implemented"
    },

    CLUSTER_HEALTH: {
        widgetId: "cluster-health",
        widgetTitle: "Cluster Health",
        purpose: "Cluster health",
        primarySource: "observability.cluster.health",
        fallbackValue: "Unknown",
        owner: "observability",
        refreshPolicy: "realtime",
        status: "pending"
    },

    SERVICE_HEALTH: {
        widgetId: "service-health",
        widgetTitle: "Service Health",
        purpose: "Service health",
        primarySource: "observability.service.health",
        fallbackValue: "Unknown",
        owner: "observability",
        refreshPolicy: "realtime",
        status: "pending"
    },

    SECURITY_STATUS: {
        widgetId: "security-status",
        widgetTitle: "Security",
        purpose: "Security status",
        primarySource: "security.status",
        fallbackValue: "Unknown",
        owner: "security",
        refreshPolicy: "realtime",
        status: "pending"
    },

    ALERT_STATE: {
        widgetId: "alert-state",
        widgetTitle: "Alerts",
        purpose: "Alert state",
        primarySource: "alerts.state",
        fallbackValue: "None",
        owner: "alerts",
        refreshPolicy: "realtime",
        status: "pending"
    }

};
