import { useCallback, useEffect, useMemo, useState } from "react";
import {
    getBrokerAccounts,
    getBrokerProviders,
    type BrokerAccount,
    type BrokerProvider,
} from "../api/brokerIntelligenceApi";
import "./BrokerIntelligence.css";

type View =
    | "overview"
    | "providers"
    | "accounts"
    | "connectivity"
    | "sessions"
    | "health"
    | "controls"
    | "audit";

export default function BrokerIntelligence() {
    const [providers, setProviders] = useState<BrokerProvider[]>([]);
    const [accounts, setAccounts] = useState<BrokerAccount[]>([]);
    const [view, setView] = useState<View>("overview");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const load = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const [providerData, accountData] =
                await Promise.all([
                    getBrokerProviders(),
                    getBrokerAccounts(),
                ]);

            setProviders(providerData);
            setAccounts(accountData);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Broker intelligence unavailable"
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void load();
    }, [load]);

    const connectedAccounts = useMemo(
        () => accounts.filter((account) => account.connected),
        [accounts]
    );

    const enabledProviders = useMemo(
        () => providers.filter((provider) => provider.enabled),
        [providers]
    );

    const liveAccounts = useMemo(
        () =>
            accounts.filter(
                (account) =>
                    account.environment.toUpperCase() === "LIVE"
            ),
        [accounts]
    );

    return (
        <section className="broker-intelligence">
            <header className="broker-intelligence__header">
                <div>
                    <div className="broker-intelligence__eyebrow">
                        TRADING / BROKER INTELLIGENCE
                    </div>

                    <h1>Broker Intelligence</h1>

                    <p>
                        Institutional broker connectivity,
                        account control and operational intelligence.
                    </p>
                </div>

                <div className="broker-intelligence__actions">
                    <button
                        type="button"
                        onClick={() => void load()}
                        disabled={loading}
                    >
                        {loading ? "REFRESHING" : "REFRESH"}
                    </button>
                </div>
            </header>

            <nav className="broker-intelligence__nav">
                {(
                    [
                        ["overview", "Overview"],
                        ["providers", "Providers"],
                        ["accounts", "Accounts"],
                        ["connectivity", "Connectivity"],
                        ["sessions", "Sessions"],
                        ["health", "Health"],
                        ["controls", "Controls"],
                        ["audit", "Audit"],
                    ] as const
                ).map(([key, label]) => (
                    <button
                        key={key}
                        type="button"
                        className={
                            view === key
                                ? "is-active"
                                : ""
                        }
                        onClick={() => setView(key)}
                    >
                        {label}
                    </button>
                ))}
            </nav>

            {error && (
                <div className="broker-intelligence__error">
                    <strong>BROKER RUNTIME ERROR</strong>
                    <span>{error}</span>
                </div>
            )}

            <div className="broker-intelligence__metrics">
                <Metric
                    label="PROVIDERS"
                    value={enabledProviders.length}
                />
                <Metric
                    label="ACCOUNTS"
                    value={accounts.length}
                />
                <Metric
                    label="CONNECTED"
                    value={connectedAccounts.length}
                />
                <Metric
                    label="LIVE ACCOUNTS"
                    value={liveAccounts.length}
                />
            </div>

            {view === "overview" && (
                <Overview
                    providers={providers}
                    accounts={accounts}
                />
            )}

            {view === "providers" && (
                <Providers providers={providers} />
            )}

            {view === "accounts" && (
                <Accounts accounts={accounts} />
            )}

            {view === "connectivity" && (
                <Connectivity accounts={accounts} />
            )}

            {view === "sessions" && (
                <Sessions accounts={accounts} />
            )}

            {view === "health" && (
                <Health
                    providers={providers}
                    accounts={accounts}
                />
            )}

            {view === "controls" && <Controls />}

            {view === "audit" && <Audit />}
        </section>
    );
}

function Metric({
    label,
    value,
}: {
    label: string;
    value: number;
}) {
    return (
        <div className="broker-metric">
            <span>{label}</span>
            <strong>{value}</strong>
        </div>
    );
}

function Overview({
    providers,
    accounts,
}: {
    providers: BrokerProvider[];
    accounts: BrokerAccount[];
}) {
    return (
        <div className="broker-grid">
            <Panel title="BROKER PROVIDERS">
                {providers.map((provider) => (
                    <div
                        className="broker-row"
                        key={provider.broker_id}
                    >
                        <div>
                            <strong>
                                {provider.display_name}
                            </strong>
                            <span>
                                {provider.adapter_name}
                            </span>
                        </div>
                        <Status
                            active={provider.enabled}
                            label={
                                provider.enabled
                                    ? "ENABLED"
                                    : "DISABLED"
                            }
                        />
                    </div>
                ))}
            </Panel>

            <Panel title="BROKER ACCOUNTS">
                {accounts.length === 0 ? (
                    <Empty text="No broker accounts provisioned." />
                ) : (
                    accounts.map((account) => (
                        <div
                            className="broker-row"
                            key={account.account_id}
                        >
                            <div>
                                <strong>
                                    {account.display_name}
                                </strong>
                                <span>
                                    {account.account_id}
                                </span>
                            </div>
                            <Status
                                active={account.connected}
                                label={
                                    account.connected
                                        ? "CONNECTED"
                                        : "DISCONNECTED"
                                }
                            />
                        </div>
                    ))
                )}
            </Panel>
        </div>
    );
}

function Providers({
    providers,
}: {
    providers: BrokerProvider[];
}) {
    return (
        <Panel title="REGISTERED BROKER PROVIDERS">
            {providers.map((provider) => (
                <div
                    className="broker-detail-row"
                    key={provider.broker_id}
                >
                    <span>{provider.broker_id}</span>
                    <strong>{provider.display_name}</strong>
                    <span>{provider.adapter_name}</span>
                    <Status
                        active={provider.enabled}
                        label={
                            provider.enabled
                                ? "ENABLED"
                                : "DISABLED"
                        }
                    />
                </div>
            ))}
        </Panel>
    );
}

function Accounts({
    accounts,
}: {
    accounts: BrokerAccount[];
}) {
    return (
        <Panel title="BROKER ACCOUNT CONTROL">
            {accounts.length === 0 ? (
                <Empty text="No broker accounts provisioned." />
            ) : (
                accounts.map((account) => (
                    <div
                        className="broker-detail-row"
                        key={account.account_id}
                    >
                        <span>{account.account_id}</span>
                        <strong>{account.display_name}</strong>
                        <span>{account.broker}</span>
                        <span>{account.environment}</span>
                        <Status
                            active={account.enabled}
                            label={
                                account.enabled
                                    ? "ENABLED"
                                    : "DISABLED"
                            }
                        />
                    </div>
                ))
            )}
        </Panel>
    );
}

function Connectivity({
    accounts,
}: {
    accounts: BrokerAccount[];
}) {
    return (
        <Panel title="CONNECTIVITY CONTROL">
            {accounts.map((account) => (
                <div
                    className="broker-detail-row"
                    key={account.account_id}
                >
                    <strong>{account.display_name}</strong>
                    <span>{account.broker}</span>
                    <Status
                        active={account.connected}
                        label={
                            account.connected
                                ? "CONNECTED"
                                : "DISCONNECTED"
                        }
                    />
                </div>
            ))}

            {accounts.length === 0 && (
                <Empty text="No accounts available for connectivity control." />
            )}
        </Panel>
    );
}

function Sessions({
    accounts,
}: {
    accounts: BrokerAccount[];
}) {
    return (
        <Panel title="SESSION INTELLIGENCE">
            {accounts.map((account) => (
                <div
                    className="broker-detail-row"
                    key={account.account_id}
                >
                    <strong>{account.display_name}</strong>
                    <span>
                        {account.session_id ?? "NO ACTIVE SESSION"}
                    </span>
                    <Status
                        active={account.connected}
                        label={
                            account.connected
                                ? "ACTIVE"
                                : "INACTIVE"
                        }
                    />
                </div>
            ))}

            {accounts.length === 0 && (
                <Empty text="No broker sessions available." />
            )}
        </Panel>
    );
}

function Health({
    providers,
    accounts,
}: {
    providers: BrokerProvider[];
    accounts: BrokerAccount[];
}) {
    return (
        <div className="broker-grid">
            <Panel title="PROVIDER HEALTH">
                {providers.map((provider) => (
                    <div
                        className="broker-detail-row"
                        key={provider.broker_id}
                    >
                        <strong>{provider.display_name}</strong>
                        <Status
                            active={provider.enabled}
                            label={
                                provider.enabled
                                    ? "AVAILABLE"
                                    : "DISABLED"
                            }
                        />
                    </div>
                ))}
            </Panel>

            <Panel title="ACCOUNT HEALTH">
                {accounts.map((account) => (
                    <div
                        className="broker-detail-row"
                        key={account.account_id}
                    >
                        <strong>{account.display_name}</strong>
                        <Status
                            active={account.connected}
                            label={
                                account.connected
                                    ? "CONNECTED"
                                    : "OFFLINE"
                            }
                        />
                    </div>
                ))}
            </Panel>
        </div>
    );
}

function Controls() {
    return (
        <Panel title="CONTROL PLANE">
            <div className="broker-control-grid">
                <Control label="CONNECT ACCOUNT" />
                <Control label="DISCONNECT ACCOUNT" />
                <Control label="ENABLE PROVIDER" />
                <Control label="DISABLE PROVIDER" />
                <Control label="REFRESH SESSION" />
                <Control label="REVALIDATE CONNECTION" />
                <Control label="ROTATE CREDENTIAL" />
                <Control label="OPEN DIAGNOSTICS" />
            </div>

            <div className="broker-control-note">
                Control actions remain disabled until their
                corresponding backend capability is exposed.
            </div>
        </Panel>
    );
}

function Audit() {
    return (
        <Panel title="AUDIT / OPERATIONS">
            <Empty text="Audit event provider is not exposed by the current broker adapter API." />
        </Panel>
    );
}

function Control({ label }: { label: string }) {
    return (
        <button
            type="button"
            disabled
            className="broker-control"
        >
            {label}
        </button>
    );
}

function Panel({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <section className="broker-panel">
            <header>{title}</header>
            <div>{children}</div>
        </section>
    );
}

function Status({
    active,
    label,
}: {
    active: boolean;
    label: string;
}) {
    return (
        <span
            className={`broker-status ${
                active ? "is-active" : "is-inactive"
            }`}
        >
            {label}
        </span>
    );
}

function Empty({ text }: { text: string }) {
    return (
        <div className="broker-empty">
            {text}
        </div>
    );
}
