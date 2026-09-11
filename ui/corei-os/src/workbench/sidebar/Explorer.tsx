/**
 * ============================================================================
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 *
 * FILE
 * Explorer.tsx
 *
 * PURPOSE
 * Runtime Driven Explorer
 *
 * EXISTING CAPABILITIES CONSUMED
 * - Workbench activity state
 * - ExplorerSection
 * - ExplorerItem
 * - Explorer runtime
 * - Existing domain capabilities
 *
 * EXECUTION BOUNDARY
 * - Existing Explorer architecture preserved.
 * - Existing activity state consumed.
 * - Existing section runtime consumed.
 * - Existing item runtime consumed.
 * - No new navigation provider.
 * - No new runtime.
 * - No new state model.
 *
 * Search is presentation-level Explorer interaction.
 *
 * Infrastructure catalogue:
 * - Institutional Infrastructure taxonomy.
 * - Presentation/catalogue mapping only.
 * - Existing infrastructure ownership remains unchanged.
 * ============================================================================
 */

import {
    useState
} from "react";

import {
    Plus,
    MoreHorizontal,
    Search,
    X
} from "lucide-react";

import {
    ExplorerItem
} from "./ExplorerItem";

import {
    ExplorerSection
} from "./ExplorerSection";

import {
    useWorkbenchState
} from "../state";


/* ==========================================================================
 * SEARCH
 * ========================================================================== */

function matchesSearch(
    query: string,
    value: string
): boolean {

    if (!query.trim()) {
        return true;
    }

    return value
        .toLowerCase()
        .includes(
            query.trim().toLowerCase()
        );
}


/* ==========================================================================
 * EXPLORER
 * ========================================================================== */

export function Explorer(): React.JSX.Element {

    const activity =
        useWorkbenchState(
            state => state.activity
        );


    const [
        searchQuery,
        setSearchQuery
    ] = useState("");


    // Helper to check if any item in a section matches the search
    const sectionHasMatch = (items: Array<{ label: string }>): boolean => {
        if (!searchQuery.trim()) return true;
        return items.some(item => matchesSearch(searchQuery, item.label));
    };


    return (

        <div className="corei-explorer">

            {/* =================================================================
             * EXPLORER HEADER
             * ================================================================= */}

            <div
                className="corei-explorer-header"
            >

                <span
                    className="corei-explorer-title"
                >
                    {activity.toUpperCase()}
                </span>

                <div
                    className="corei-explorer-actions"
                >

                    <button
                        type="button"
                        className="corei-explorer-action"
                        aria-label="More Explorer actions"
                        title="More Explorer actions"
                    >

                        <MoreHorizontal
                            size={14}
                            strokeWidth={1.7}
                        />

                    </button>

                </div>

            </div>


            {/* =================================================================
             * EXPLORER SEARCH (always visible)
             * ================================================================= */}

            <div
                className="corei-explorer-search"
            >

                <Search
                    size={13}
                    strokeWidth={1.7}
                    aria-hidden="true"
                />

                <input
                    type="search"
                    value={searchQuery}
                    placeholder="Filter items..."
                    aria-label="Search Explorer"
                    onChange={
                        event =>
                            setSearchQuery(
                                event.target.value
                            )
                    }
                />

                {
                    searchQuery && (
                        <button
                            type="button"
                            className="corei-explorer-search-close"
                            aria-label="Clear search"
                            title="Clear search"
                            onClick={() =>
                                setSearchQuery("")
                            }
                        >

                            <X
                                size={13}
                                strokeWidth={1.7}
                            />

                        </button>
                    )
                }

            </div>


            {/* =================================================================
             * EXPLORER CONTENT
             * ================================================================= */}

            <div
                className="corei-explorer-content"
            >

                {/* =============================================================
                 * TRADING
                 * ============================================================= */}

                {
                    activity === "trading" && (

                        <>

                            {/* =================================================
                             * MARKET INTELLIGENCE
                             * ================================================= */}

                            {(() => {
                                const items = [
                                    { id: "trading-market-data", label: "Market Data" },
                                    { id: "trading-market-health", label: "Market Health" },
                                    { id: "trading-technical-indicators", label: "Technical Indicators" },
                                    { id: "trading-market-structure", label: "Market Structure" },
                                    { id: "trading-trend-analysis", label: "Trend Analysis" },
                                    { id: "trading-volatility-analysis", label: "Volatility Analysis" },
                                    { id: "trading-momentum-analysis", label: "Momentum Analysis" },
                                    { id: "trading-market-regime", label: "Market Regime" },
                                ];
                                const visibleItems = items.filter(item => matchesSearch(searchQuery, item.label));
                                if (visibleItems.length === 0) return null;
                                return (
                                    <ExplorerSection
                                        id="trading-market-intelligence"
                                        title="MARKET INTELLIGENCE"
                                        badge={visibleItems.length}
                                    >
                                        {visibleItems.map((item) => (
                                            <ExplorerItem
                                                key={item.id}
                                                id={item.id}
                                                label={item.label}
                                            />
                                        ))}
                                    </ExplorerSection>
                                );
                            })()}


                            {/* =================================================
                             * SIGNAL INTELLIGENCE
                             * ================================================= */}

                            {(() => {
                                const items = [
                                    { id: "trading-signal-generation", label: "Signal Generation" },
                                    { id: "trading-signal-processing", label: "Signal Processing" },
                                    { id: "trading-signal-validation", label: "Signal Validation" },
                                    { id: "trading-signal-quality", label: "Signal Quality" },
                                ];
                                const visibleItems = items.filter(item => matchesSearch(searchQuery, item.label));
                                if (visibleItems.length === 0) return null;
                                return (
                                    <ExplorerSection
                                        id="trading-signal-intelligence"
                                        title="SIGNAL INTELLIGENCE"
                                        badge={visibleItems.length}
                                    >
                                        {visibleItems.map((item) => (
                                            <ExplorerItem
                                                key={item.id}
                                                id={item.id}
                                                label={item.label}
                                            />
                                        ))}
                                    </ExplorerSection>
                                );
                            })()}


                            {/* =================================================
                             * DECISION INTELLIGENCE
                             * ================================================= */}

                            {(() => {
                                const items = [
                                    { id: "trading-decision-engine", label: "Decision Engine" },
                                    { id: "trading-decision-processing", label: "Decision Processing" },
                                    { id: "trading-trade-intent", label: "Trade Intent" },
                                    { id: "trading-decision-validation", label: "Decision Validation" },
                                ];
                                const visibleItems = items.filter(item => matchesSearch(searchQuery, item.label));
                                if (visibleItems.length === 0) return null;
                                return (
                                    <ExplorerSection
                                        id="trading-decision-intelligence"
                                        title="DECISION INTELLIGENCE"
                                        badge={visibleItems.length}
                                    >
                                        {visibleItems.map((item) => (
                                            <ExplorerItem
                                                key={item.id}
                                                id={item.id}
                                                label={item.label}
                                            />
                                        ))}
                                    </ExplorerSection>
                                );
                            })()}


                            {/* =================================================
                             * RISK INTELLIGENCE
                             * ================================================= */}

                            {(() => {
                                const items = [
                                    { id: "trading-risk-engine", label: "Risk Engine" },
                                    { id: "trading-exposure", label: "Exposure" },
                                    { id: "trading-risk-limits", label: "Risk Limits" },
                                    { id: "trading-drawdown", label: "Drawdown" },
                                    { id: "trading-concentration", label: "Concentration" },
                                ];
                                const visibleItems = items.filter(item => matchesSearch(searchQuery, item.label));
                                if (visibleItems.length === 0) return null;
                                return (
                                    <ExplorerSection
                                        id="trading-risk-intelligence"
                                        title="RISK INTELLIGENCE"
                                        badge={visibleItems.length}
                                    >
                                        {visibleItems.map((item) => (
                                            <ExplorerItem
                                                key={item.id}
                                                id={item.id}
                                                label={item.label}
                                            />
                                        ))}
                                    </ExplorerSection>
                                );
                            })()}


                            {/* =================================================
                             * PORTFOLIO INTELLIGENCE
                             * ================================================= */}

                            {(() => {
                                const items = [
                                    { id: "trading-portfolio", label: "Portfolio" },
                                    { id: "trading-allocation", label: "Allocation" },
                                    { id: "trading-portfolio-exposure", label: "Exposure" },
                                    { id: "trading-capital", label: "Capital" },
                                ];
                                const visibleItems = items.filter(item => matchesSearch(searchQuery, item.label));
                                if (visibleItems.length === 0) return null;
                                return (
                                    <ExplorerSection
                                        id="trading-portfolio-intelligence"
                                        title="PORTFOLIO INTELLIGENCE"
                                        badge={visibleItems.length}
                                    >
                                        {visibleItems.map((item) => (
                                            <ExplorerItem
                                                key={item.id}
                                                id={item.id}
                                                label={item.label}
                                            />
                                        ))}
                                    </ExplorerSection>
                                );
                            })()}


                            {/* =================================================
                             * EXECUTION INTELLIGENCE
                             * ================================================= */}

                            {(() => {
                                const items = [
                                    { id: "trading-execution", label: "Execution" },
                                    { id: "trading-orders", label: "Orders" },
                                    { id: "trading-order-routing", label: "Order Routing" },
                                    { id: "trading-fill-management", label: "Fill Management" },
                                    { id: "trading-execution-quality", label: "Execution Quality" },
                                ];
                                const visibleItems = items.filter(item => matchesSearch(searchQuery, item.label));
                                if (visibleItems.length === 0) return null;
                                return (
                                    <ExplorerSection
                                        id="trading-execution-intelligence"
                                        title="EXECUTION INTELLIGENCE"
                                        badge={visibleItems.length}
                                    >
                                        {visibleItems.map((item) => (
                                            <ExplorerItem
                                                key={item.id}
                                                id={item.id}
                                                label={item.label}
                                            />
                                        ))}
                                    </ExplorerSection>
                                );
                            })()}


                            {/* =================================================
                             * POSITION INTELLIGENCE
                             * ================================================= */}

                            {(() => {
                                const items = [
                                    { id: "trading-positions", label: "Positions" },
                                    { id: "trading-position-lifecycle", label: "Position Lifecycle" },
                                    { id: "trading-position-state", label: "Position State" },
                                ];
                                const visibleItems = items.filter(item => matchesSearch(searchQuery, item.label));
                                if (visibleItems.length === 0) return null;
                                return (
                                    <ExplorerSection
                                        id="trading-position-intelligence"
                                        title="POSITION INTELLIGENCE"
                                        badge={visibleItems.length}
                                    >
                                        {visibleItems.map((item) => (
                                            <ExplorerItem
                                                key={item.id}
                                                id={item.id}
                                                label={item.label}
                                            />
                                        ))}
                                    </ExplorerSection>
                                );
                            })()}


                            {/* =================================================
                             * PERFORMANCE INTELLIGENCE
                             * ================================================= */}

                            {(() => {
                                const items = [
                                    { id: "trading-performance", label: "Performance" },
                                    { id: "trading-pnl", label: "P&L" },
                                    { id: "trading-returns", label: "Returns" },
                                    { id: "trading-attribution", label: "Attribution" },
                                ];
                                const visibleItems = items.filter(item => matchesSearch(searchQuery, item.label));
                                if (visibleItems.length === 0) return null;
                                return (
                                    <ExplorerSection
                                        id="trading-performance-intelligence"
                                        title="PERFORMANCE INTELLIGENCE"
                                        badge={visibleItems.length}
                                    >
                                        {visibleItems.map((item) => (
                                            <ExplorerItem
                                                key={item.id}
                                                id={item.id}
                                                label={item.label}
                                            />
                                        ))}
                                    </ExplorerSection>
                                );
                            })()}


                            {/* =================================================
                             * SYSTEM INTELLIGENCE
                             * ================================================= */}

                            {(() => {
                                const items = [
                                    { id: "trading-runtime", label: "Trading Runtime" },
                                    { id: "trading-workflow-state", label: "Workflow State" },
                                    { id: "trading-engine-state", label: "Engine State" },
                                    { id: "trading-automation-state", label: "Automation State" },
                                ];
                                const visibleItems = items.filter(item => matchesSearch(searchQuery, item.label));
                                if (visibleItems.length === 0) return null;
                                return (
                                    <ExplorerSection
                                        id="trading-system-intelligence"
                                        title="SYSTEM INTELLIGENCE"
                                        badge={visibleItems.length}
                                    >
                                        {visibleItems.map((item) => (
                                            <ExplorerItem
                                                key={item.id}
                                                id={item.id}
                                                label={item.label}
                                            />
                                        ))}
                                    </ExplorerSection>
                                );
                            })()}


                            {/* =================================================
                             * CAPITAL INTELLIGENCE
                             * ================================================= */}

                            {(() => {
                                const items = [
                                    { id: "trading-capital-management", label: "Capital Management" },
                                    { id: "trading-capital-allocation", label: "Capital Allocation" },
                                    { id: "trading-capital-reservation", label: "Capital Reservation" },
                                ];
                                const visibleItems = items.filter(item => matchesSearch(searchQuery, item.label));
                                if (visibleItems.length === 0) return null;
                                return (
                                    <ExplorerSection
                                        id="trading-capital-intelligence"
                                        title="CAPITAL INTELLIGENCE"
                                        badge={visibleItems.length}
                                    >
                                        {visibleItems.map((item) => (
                                            <ExplorerItem
                                                key={item.id}
                                                id={item.id}
                                                label={item.label}
                                            />
                                        ))}
                                    </ExplorerSection>
                                );
                            })()}


                            {/* =================================================
                             * BROKER INTELLIGENCE
                             * ================================================= */}

                            {(() => {
                                const items = [
                                    { id: "trading-broker-connectivity", label: "Broker Connectivity" },
                                    { id: "trading-broker-accounts", label: "Broker Accounts" },
                                    { id: "trading-broker-state", label: "Broker State" },
                                    { id: "trading-market-access", label: "Market Access" },
                                ];
                                const visibleItems = items.filter(item => matchesSearch(searchQuery, item.label));
                                if (visibleItems.length === 0) return null;
                                return (
                                    <ExplorerSection
                                        id="trading-broker-intelligence"
                                        title="BROKER INTELLIGENCE"
                                        badge={visibleItems.length}
                                    >
                                        {visibleItems.map((item) => (
                                            <ExplorerItem
                                                key={item.id}
                                                id={item.id}
                                                label={item.label}
                                            />
                                        ))}
                                    </ExplorerSection>
                                );
                            })()}


                            {/* =================================================
                             * STRATEGY INTELLIGENCE
                             * ================================================= */}

                            {(() => {
                                const items = [
                                    { id: "trading-strategy-engine", label: "Strategy Engine" },
                                    { id: "trading-strategy-registry", label: "Strategy Registry" },
                                    { id: "trading-strategy-runtime", label: "Strategy Runtime" },
                                    { id: "trading-strategy-configuration", label: "Strategy Configuration" },
                                ];
                                const visibleItems = items.filter(item => matchesSearch(searchQuery, item.label));
                                if (visibleItems.length === 0) return null;
                                return (
                                    <ExplorerSection
                                        id="trading-strategy-intelligence"
                                        title="STRATEGY INTELLIGENCE"
                                        badge={visibleItems.length}
                                    >
                                        {visibleItems.map((item) => (
                                            <ExplorerItem
                                                key={item.id}
                                                id={item.id}
                                                label={item.label}
                                            />
                                        ))}
                                    </ExplorerSection>
                                );
                            })()}


                            {/* =================================================
                             * GOVERNANCE
                             * ================================================= */}

                            {(() => {
                                const items = [
                                    { id: "trading-policies", label: "Trading Policies" },
                                    { id: "trading-approvals", label: "Approvals" },
                                    { id: "trading-overrides", label: "Overrides" },
                                    { id: "trading-exceptions", label: "Exceptions" },
                                    { id: "trading-audit", label: "Audit" },
                                ];
                                const visibleItems = items.filter(item => matchesSearch(searchQuery, item.label));
                                if (visibleItems.length === 0) return null;
                                return (
                                    <ExplorerSection
                                        id="trading-governance"
                                        title="GOVERNANCE"
                                        badge={visibleItems.length}
                                    >
                                        {visibleItems.map((item) => (
                                            <ExplorerItem
                                                key={item.id}
                                                id={item.id}
                                                label={item.label}
                                            />
                                        ))}
                                    </ExplorerSection>
                                );
                            })()}

                        </>

                    )
                }


                {/* =============================================================
                 * INFRASTRUCTURE
                 *
                 * Frozen institutional infrastructure taxonomy.
                 * Existing capability ownership is preserved.
                 * ============================================================= */}

                {
                    activity === "infrastructure" && (

                        <>

                            {/* -------------------------------------------------
                             * 01 — COMPUTE & HOST
                             * ------------------------------------------------- */}

                            {(() => {
                                const items = [
                                    { id: "infrastructure-ubuntu-server", label: "Ubuntu Server" },
                                    { id: "infrastructure-container-runtime", label: "Container Runtime" },
                                    { id: "infrastructure-nodes-hosts", label: "Nodes / Hosts" },
                                ];
                                const visibleItems = items.filter(item => matchesSearch(searchQuery, item.label));
                                if (visibleItems.length === 0) return null;
                                return (
                                    <ExplorerSection
                                        id="infrastructure-compute-host"
                                        title="COMPUTE & HOST"
                                        badge={visibleItems.length}
                                    >
                                        {visibleItems.map((item) => (
                                            <ExplorerItem
                                                key={item.id}
                                                id={item.id}
                                                label={item.label}
                                            />
                                        ))}
                                    </ExplorerSection>
                                );
                            })()}


                            {/* -------------------------------------------------
                             * 02 — CONTAINER & ORCHESTRATION
                             * ------------------------------------------------- */}

                            {(() => {
                                const items = [
                                    { id: "infrastructure-docker", label: "Docker Engine" },
                                    { id: "infrastructure-kubernetes", label: "Kubernetes" },
                                    { id: "infrastructure-k3s", label: "k3s" },
                                    { id: "infrastructure-kubeadm", label: "kubeadm" },
                                    { id: "infrastructure-helm", label: "Helm" },
                                ];
                                const visibleItems = items.filter(item => matchesSearch(searchQuery, item.label));
                                if (visibleItems.length === 0) return null;
                                return (
                                    <ExplorerSection
                                        id="infrastructure-container-orchestration"
                                        title="CONTAINER & ORCHESTRATION"
                                        badge={visibleItems.length}
                                    >
                                        {visibleItems.map((item) => (
                                            <ExplorerItem
                                                key={item.id}
                                                id={item.id}
                                                label={item.label}
                                            />
                                        ))}
                                    </ExplorerSection>
                                );
                            })()}


                            {/* -------------------------------------------------
                             * 03 — NETWORK & TRAFFIC
                             * ------------------------------------------------- */}

                            {(() => {
                                const items = [
                                    { id: "infrastructure-calico", label: "Calico" },
                                    { id: "infrastructure-metallb", label: "MetalLB" },
                                    { id: "infrastructure-nginx-ingress", label: "NGINX Ingress" },
                                    { id: "infrastructure-cert-manager", label: "cert-manager" },
                                    { id: "infrastructure-istio", label: "Istio" },
                                    { id: "infrastructure-kong", label: "Kong API Gateway" },
                                    { id: "infrastructure-wireguard", label: "WireGuard" },
                                ];
                                const visibleItems = items.filter(item => matchesSearch(searchQuery, item.label));
                                if (visibleItems.length === 0) return null;
                                return (
                                    <ExplorerSection
                                        id="infrastructure-network-traffic"
                                        title="NETWORK & TRAFFIC"
                                        badge={visibleItems.length}
                                    >
                                        {visibleItems.map((item) => (
                                            <ExplorerItem
                                                key={item.id}
                                                id={item.id}
                                                label={item.label}
                                            />
                                        ))}
                                    </ExplorerSection>
                                );
                            })()}


                            {/* -------------------------------------------------
                             * 04 — STORAGE & BACKUP
                             * ------------------------------------------------- */}

                            {(() => {
                                const items = [
                                    { id: "infrastructure-longhorn", label: "Longhorn" },
                                    { id: "infrastructure-ceph", label: "Ceph" },
                                    { id: "infrastructure-velero", label: "Velero" },
                                    { id: "infrastructure-backup-restore", label: "Backup / Restore" },
                                ];
                                const visibleItems = items.filter(item => matchesSearch(searchQuery, item.label));
                                if (visibleItems.length === 0) return null;
                                return (
                                    <ExplorerSection
                                        id="infrastructure-storage-backup"
                                        title="STORAGE & BACKUP"
                                        badge={visibleItems.length}
                                    >
                                        {visibleItems.map((item) => (
                                            <ExplorerItem
                                                key={item.id}
                                                id={item.id}
                                                label={item.label}
                                            />
                                        ))}
                                    </ExplorerSection>
                                );
                            })()}


                            {/* -------------------------------------------------
                             * 05 — EVENT & MESSAGE PLATFORM
                             * ------------------------------------------------- */}

                            {(() => {
                                const items = [
                                    { id: "infrastructure-kafka", label: "Apache Kafka" },
                                    { id: "infrastructure-kraft", label: "KRaft" },
                                    { id: "infrastructure-schema-registry", label: "Schema Registry" },
                                    { id: "infrastructure-kafka-connect", label: "Kafka Connect" },
                                    { id: "infrastructure-kafka-ui", label: "Kafka UI" },
                                ];
                                const visibleItems = items.filter(item => matchesSearch(searchQuery, item.label));
                                if (visibleItems.length === 0) return null;
                                return (
                                    <ExplorerSection
                                        id="infrastructure-event-message"
                                        title="EVENT & MESSAGE PLATFORM"
                                        badge={visibleItems.length}
                                    >
                                        {visibleItems.map((item) => (
                                            <ExplorerItem
                                                key={item.id}
                                                id={item.id}
                                                label={item.label}
                                            />
                                        ))}
                                    </ExplorerSection>
                                );
                            })()}


                            {/* -------------------------------------------------
                             * 06 — DATABASE PLATFORM
                             * ------------------------------------------------- */}

                            {(() => {
                                const items = [
                                    { id: "infrastructure-postgresql", label: "PostgreSQL" },
                                    { id: "infrastructure-timescaledb", label: "TimescaleDB" },
                                    { id: "infrastructure-pgbouncer", label: "PgBouncer" },
                                    { id: "infrastructure-redis", label: "Redis Cluster" },
                                    { id: "infrastructure-clickhouse", label: "ClickHouse" },
                                ];
                                const visibleItems = items.filter(item => matchesSearch(searchQuery, item.label));
                                if (visibleItems.length === 0) return null;
                                return (
                                    <ExplorerSection
                                        id="infrastructure-database"
                                        title="DATABASE PLATFORM"
                                        badge={visibleItems.length}
                                    >
                                        {visibleItems.map((item) => (
                                            <ExplorerItem
                                                key={item.id}
                                                id={item.id}
                                                label={item.label}
                                            />
                                        ))}
                                    </ExplorerSection>
                                );
                            })()}


                            {/* -------------------------------------------------
                             * 07 — OBSERVABILITY
                             * ------------------------------------------------- */}

                            {(() => {
                                const items = [
                                    { id: "infrastructure-prometheus", label: "Prometheus" },
                                    { id: "infrastructure-grafana", label: "Grafana" },
                                    { id: "infrastructure-loki", label: "Loki" },
                                    { id: "infrastructure-promtail", label: "Promtail" },
                                    { id: "infrastructure-jaeger", label: "Jaeger" },
                                    { id: "infrastructure-opentelemetry", label: "OpenTelemetry" },
                                    { id: "infrastructure-alertmanager", label: "Alertmanager" },
                                    { id: "infrastructure-monitoring", label: "Infrastructure Monitoring" },
                                ];
                                const visibleItems = items.filter(item => matchesSearch(searchQuery, item.label));
                                if (visibleItems.length === 0) return null;
                                return (
                                    <ExplorerSection
                                        id="infrastructure-observability"
                                        title="OBSERVABILITY"
                                        badge={visibleItems.length}
                                    >
                                        {visibleItems.map((item) => (
                                            <ExplorerItem
                                                key={item.id}
                                                id={item.id}
                                                label={item.label}
                                            />
                                        ))}
                                    </ExplorerSection>
                                );
                            })()}


                            {/* -------------------------------------------------
                             * 08 — IDENTITY & SECURITY
                             * ------------------------------------------------- */}

                            {(() => {
                                const items = [
                                    { id: "infrastructure-keycloak", label: "Keycloak" },
                                    { id: "infrastructure-vault", label: "Vault" },
                                    { id: "infrastructure-secrets", label: "Secrets" },
                                    { id: "infrastructure-rbac", label: "RBAC / Identity" },
                                    { id: "infrastructure-trivy", label: "Trivy" },
                                ];
                                const visibleItems = items.filter(item => matchesSearch(searchQuery, item.label));
                                if (visibleItems.length === 0) return null;
                                return (
                                    <ExplorerSection
                                        id="infrastructure-identity-security"
                                        title="IDENTITY & SECURITY"
                                        badge={visibleItems.length}
                                    >
                                        {visibleItems.map((item) => (
                                            <ExplorerItem
                                                key={item.id}
                                                id={item.id}
                                                label={item.label}
                                            />
                                        ))}
                                    </ExplorerSection>
                                );
                            })()}


                            {/* -------------------------------------------------
                             * 09 — REGISTRY & DELIVERY
                             * ------------------------------------------------- */}

                            {(() => {
                                const items = [
                                    { id: "infrastructure-harbor", label: "Harbor" },
                                    { id: "infrastructure-github-actions", label: "GitHub Actions" },
                                    { id: "infrastructure-argocd", label: "ArgoCD" },
                                    { id: "infrastructure-kaniko", label: "Kaniko" },
                                    { id: "infrastructure-buildah", label: "Buildah" },
                                ];
                                const visibleItems = items.filter(item => matchesSearch(searchQuery, item.label));
                                if (visibleItems.length === 0) return null;
                                return (
                                    <ExplorerSection
                                        id="infrastructure-registry-delivery"
                                        title="REGISTRY & DELIVERY"
                                        badge={visibleItems.length}
                                    >
                                        {visibleItems.map((item) => (
                                            <ExplorerItem
                                                key={item.id}
                                                id={item.id}
                                                label={item.label}
                                            />
                                        ))}
                                    </ExplorerSection>
                                );
                            })()}


                            {/* -------------------------------------------------
                             * 10 — INFRASTRUCTURE AS CODE
                             * ------------------------------------------------- */}

                            {(() => {
                                const items = [
                                    { id: "infrastructure-terraform", label: "Terraform" },
                                ];
                                const visibleItems = items.filter(item => matchesSearch(searchQuery, item.label));
                                if (visibleItems.length === 0) return null;
                                return (
                                    <ExplorerSection
                                        id="infrastructure-as-code"
                                        title="INFRASTRUCTURE AS CODE"
                                        badge={visibleItems.length}
                                    >
                                        {visibleItems.map((item) => (
                                            <ExplorerItem
                                                key={item.id}
                                                id={item.id}
                                                label={item.label}
                                            />
                                        ))}
                                    </ExplorerSection>
                                );
                            })()}


                            {/* -------------------------------------------------
                             * 11 — AUTOMATION & WORKFLOW
                             * ------------------------------------------------- */}

                            {(() => {
                                const items = [
                                    { id: "infrastructure-n8n", label: "n8n" },
                                ];
                                const visibleItems = items.filter(item => matchesSearch(searchQuery, item.label));
                                if (visibleItems.length === 0) return null;
                                return (
                                    <ExplorerSection
                                        id="infrastructure-automation"
                                        title="AUTOMATION & WORKFLOW"
                                        badge={visibleItems.length}
                                    >
                                        {visibleItems.map((item) => (
                                            <ExplorerItem
                                                key={item.id}
                                                id={item.id}
                                                label={item.label}
                                            />
                                        ))}
                                    </ExplorerSection>
                                );
                            })()}


                            {/* -------------------------------------------------
                             * 12 — PLATFORM OPERATIONS
                             * ------------------------------------------------- */}

                            {(() => {
                                const items = [
                                    { id: "infrastructure-cluster-operations", label: "Cluster Operations" },
                                    { id: "infrastructure-node-operations", label: "Node Operations" },
                                    { id: "infrastructure-service-operations", label: "Service Operations" },
                                    { id: "infrastructure-deployment-operations", label: "Deployment Operations" },
                                    { id: "infrastructure-runtime-health", label: "Runtime Health" },
                                    { id: "infrastructure-diagnostics", label: "Diagnostics" },
                                    { id: "infrastructure-operational-workflows", label: "Operational Workflows" },
                                ];
                                const visibleItems = items.filter(item => matchesSearch(searchQuery, item.label));
                                if (visibleItems.length === 0) return null;
                                return (
                                    <ExplorerSection
                                        id="infrastructure-platform-operations"
                                        title="PLATFORM OPERATIONS"
                                        badge={visibleItems.length}
                                    >
                                        {visibleItems.map((item) => (
                                            <ExplorerItem
                                                key={item.id}
                                                id={item.id}
                                                label={item.label}
                                            />
                                        ))}
                                    </ExplorerSection>
                                );
                            })()}


                            {/* -------------------------------------------------
                             * 13 — DISASTER RECOVERY
                             * ------------------------------------------------- */}

                            {(() => {
                                const items = [
                                    { id: "infrastructure-high-availability", label: "High Availability" },
                                    { id: "infrastructure-cross-dc-replication", label: "Cross-DC Replication" },
                                    { id: "infrastructure-failover", label: "Failover" },
                                    { id: "infrastructure-recovery", label: "Recovery" },
                                    { id: "infrastructure-rpo-rto", label: "RPO / RTO" },
                                    { id: "infrastructure-site-recovery", label: "Site Recovery" },
                                ];
                                const visibleItems = items.filter(item => matchesSearch(searchQuery, item.label));
                                if (visibleItems.length === 0) return null;
                                return (
                                    <ExplorerSection
                                        id="infrastructure-disaster-recovery"
                                        title="DISASTER RECOVERY"
                                        badge={visibleItems.length}
                                    >
                                        {visibleItems.map((item) => (
                                            <ExplorerItem
                                                key={item.id}
                                                id={item.id}
                                                label={item.label}
                                            />
                                        ))}
                                    </ExplorerSection>
                                );
                            })()}


                            {/* -------------------------------------------------
                             * 14 — INTEGRATION PLATFORM
                             * ------------------------------------------------- */}

                            {(() => {
                                const items = [
                                    { id: "infrastructure-integrations", label: "Integrations" },
                                    { id: "infrastructure-connectors", label: "Connectors" },
                                    { id: "infrastructure-adapters", label: "Adapters" },
                                    { id: "infrastructure-integration-health", label: "Integration Health" },
                                    { id: "infrastructure-integration-diagnostics", label: "Diagnostics" },
                                    { id: "infrastructure-integration-runtime", label: "Integration Runtime" },
                                ];
                                const visibleItems = items.filter(item => matchesSearch(searchQuery, item.label));
                                if (visibleItems.length === 0) return null;
                                return (
                                    <ExplorerSection
                                        id="infrastructure-integration-platform"
                                        title="INTEGRATION PLATFORM"
                                        badge={visibleItems.length}
                                    >
                                        {visibleItems.map((item) => (
                                            <ExplorerItem
                                                key={item.id}
                                                id={item.id}
                                                label={item.label}
                                            />
                                        ))}
                                    </ExplorerSection>
                                );
                            })()}

                        </>

                    )
                }


                {/* =============================================================
                 * RESEARCH
                 * ============================================================= */}

                {
                    activity === "research" && (

                        (() => {
                            const items = [
                                { id: "charts", label: "Charts" },
                                { id: "scanner", label: "Scanner" },
                                { id: "logs", label: "Logs" },
                                { id: "editor", label: "Editor" },
                                { id: "terminal", label: "Terminal" },
                                { id: "intelligence", label: "Intelligence" },
                            ];
                            const visibleItems = items.filter(item => matchesSearch(searchQuery, item.label));
                            if (visibleItems.length === 0) return null;
                            return (
                                <ExplorerSection
                                    id="research"
                                    title="RESEARCH"
                                    badge={visibleItems.length}
                                >
                                    {visibleItems.map((item) => (
                                        <ExplorerItem
                                            key={item.id}
                                            id={item.id}
                                            label={item.label}
                                        />
                                    ))}
                                </ExplorerSection>
                            );
                        })()

                    )
                }


                {/* =============================================================
                 * RISK
                 * ============================================================= */}

                {
                    activity === "risk" && (

                        (() => {
                            const items = [
                                { id: "risk-overview", label: "Overview" },
                                { id: "risk-exposure", label: "Exposure" },
                                { id: "risk-limits", label: "Limits" },
                                { id: "risk-monitoring", label: "Monitoring" },
                            ];
                            const visibleItems = items.filter(item => matchesSearch(searchQuery, item.label));
                            if (visibleItems.length === 0) return null;
                            return (
                                <ExplorerSection
                                    id="risk"
                                    title="RISK"
                                    badge={visibleItems.length}
                                >
                                    {visibleItems.map((item) => (
                                        <ExplorerItem
                                            key={item.id}
                                            id={item.id}
                                            label={item.label}
                                        />
                                    ))}
                                </ExplorerSection>
                            );
                        })()

                    )
                }


                {/* =============================================================
                 * AI
                 * ============================================================= */}

                {
                    activity === "ai" && (

                        (() => {
                            const items = [
                                { id: "agents", label: "Agents" },
                                { id: "prompts", label: "Prompts" },
                                { id: "models", label: "Models" },
                            ];
                            const visibleItems = items.filter(item => matchesSearch(searchQuery, item.label));
                            if (visibleItems.length === 0) return null;
                            return (
                                <ExplorerSection
                                    id="ai"
                                    title="AI"
                                    badge={visibleItems.length}
                                >
                                    {visibleItems.map((item) => (
                                        <ExplorerItem
                                            key={item.id}
                                            id={item.id}
                                            label={item.label}
                                        />
                                    ))}
                                </ExplorerSection>
                            );
                        })()

                    )
                }

            </div>

        </div>

    );

}


export default Explorer;
