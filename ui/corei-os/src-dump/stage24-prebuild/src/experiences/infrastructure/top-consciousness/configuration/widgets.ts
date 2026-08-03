/**
 * ============================================================================
 * COREI Operating System
 * Infrastructure Experience
 * Top Consciousness
 * Widget Registry
 * ============================================================================
 */

export type WidgetPriority =
    | "critical"
    | "high"
    | "normal"
    | "low";

export interface InfrastructureRibbonWidget {

    readonly id: string;

    readonly title: string;

    readonly description: string;

    readonly priority: WidgetPriority;

    readonly enabled: boolean;

}

const widget = (
    id: string,
    title: string,
    description: string,
    priority: WidgetPriority = "normal"
): InfrastructureRibbonWidget => ({

    id,

    title,

    description,

    priority,

    enabled: true

});

export const RibbonWidgets = {

    COREI_IDENTITY: widget(
        "corei-identity",
        "COREI",
        "COREI Operating System",
        "critical"
    ),

    ENVIRONMENT: widget(
        "environment",
        "Environment",
        "Runtime Environment",
        "high"
    ),

    PLATFORM: widget(
        "platform",
        "Platform",
        "Current Platform",
        "high"
    ),

    WORKSPACE: widget(
        "workspace",
        "Workspace",
        "Current Workspace"
    ),

    OPERATOR: widget(
        "operator",
        "Operator",
        "Current Operator"
    ),

    ROLE: widget(
        "role",
        "Role",
        "Operator Role"
    ),

    ORGANIZATION: widget(
        "organization",
        "Organization",
        "Organization"
    ),

    SESSION: widget(
        "session",
        "Session",
        "Current Session"
    ),

    TERMINAL: widget(
        "terminal",
        "Terminal",
        "Current Terminal"
    ),

    CLUSTER: widget(
        "cluster",
        "Cluster",
        "Current Cluster"
    ),

    REGION: widget(
        "region",
        "Region",
        "Current Region"
    ),

    SCOPE: widget(
        "scope",
        "Scope",
        "Operational Scope"
    ),

    ACTIVE_WORKSPACE: widget(
        "active-workspace",
        "Active Workspace",
        "Current Workspace"
    ),

    ACTIVE_INVESTIGATION: widget(
        "active-investigation",
        "Investigation",
        "Current Investigation"
    ),

    CURRENT_DOMAIN: widget(
        "current-domain",
        "Domain",
        "Current Domain"
    ),

    SELECTED_RESOURCE: widget(
        "selected-resource",
        "Resource",
        "Selected Resource"
    ),

    OPERATOR_ROLE: widget(
        "operator-role",
        "Operator Role",
        "Authority Role"
    ),

    PERMISSION_LEVEL: widget(
        "permission-level",
        "Permissions",
        "Permission Level"
    ),

    APPROVAL_MODE: widget(
        "approval-mode",
        "Approval",
        "Approval Mode"
    ),

    EXECUTION_AUTHORITY: widget(
        "execution-authority",
        "Execution",
        "Execution Authority"
    ),

    PLATFORM_HEALTH: widget(
        "platform-health",
        "Platform Health",
        "Platform Health",
        "critical"
    ),

    CLUSTER_HEALTH: widget(
        "cluster-health",
        "Cluster Health",
        "Cluster Health",
        "critical"
    ),

    SERVICE_HEALTH: widget(
        "service-health",
        "Service Health",
        "Service Health",
        "critical"
    ),

    SECURITY_STATUS: widget(
        "security-status",
        "Security",
        "Security Status",
        "critical"
    ),

    ALERT_STATE: widget(
        "alert-state",
        "Alerts",
        "Alert Status",
        "critical"
    ),

    ACTIVE_MISSION: widget(
        "active-mission",
        "Mission",
        "Current Mission"
    ),

    CURRENT_OBJECTIVE: widget(
        "current-objective",
        "Objective",
        "Current Objective"
    ),

    EXECUTION_MODE: widget(
        "execution-mode",
        "Execution",
        "Execution Mode"
    ),

    OPERATIONAL_STATUS: widget(
        "operational-status",
        "Status",
        "Operational Status"
    ),

    PLATFORM_RISK: widget(
        "platform-risk",
        "Platform Risk",
        "Platform Risk"
    ),

    SECURITY_RISK: widget(
        "security-risk",
        "Security Risk",
        "Security Risk"
    ),

    OPERATIONAL_RISK: widget(
        "operational-risk",
        "Operational Risk",
        "Operational Risk"
    ),

    COMPLIANCE_RISK: widget(
        "compliance-risk",
        "Compliance Risk",
        "Compliance Risk"
    ),

    BACKUP_STATUS: widget(
        "backup-status",
        "Backup",
        "Backup Status"
    ),

    RECOVERY_STATUS: widget(
        "recovery-status",
        "Recovery",
        "Recovery Status"
    ),

    REDUNDANCY_STATUS: widget(
        "redundancy-status",
        "Redundancy",
        "Redundancy Status"
    ),

    CONTINUITY_HEALTH: widget(
        "continuity-health",
        "Continuity",
        "Continuity Health"
    )

} as const;
