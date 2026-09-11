// src/ribbon/components/Row1.tsx
/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * TOP RIBBON — ROW 01
 *
 * Institutional Workbench Control Surface
 *
 * VISUAL STANDARD
 * - Reference visual language preserved.
 * - Compact 32px workbench row.
 * - Natural-width context controls.
 * - Elastic search region.
 * - Compact utility controls.
 * - Uniform dropdown surface.
 *
 * EXECUTION BOUNDARY
 * - Row 01 presentation/composition only.
 * - Existing ShellHeaderContextContract consumed.
 * - Existing identityService consumed.
 * - Existing workspaceRuntime consumed.
 * - Existing shell/layout ownership preserved.
 * - No infrastructure provider introduced.
 *
 ******************************************************************************/

import {
    Children,
    createElement,
    useEffect,
    useRef,
    useState,
    type KeyboardEvent,
    type ReactElement,
    type ReactNode
} from "react";

import {
    createPortal
} from "react-dom";

import "../styles/top-ribbon.css";

import {
    getShellHeaderContext
} from "../models/shell-header-context";

import {
    identityService
} from "../../identity-platform";

import {
    workspaceRuntime
} from "../../workbench/workspace/runtime/workspace-runtime";


/* ==========================================================================
 * TYPES
 * ========================================================================== */

type StatusTone =
    | "operational"
    | "attention"
    | "critical"
    | "neutral";

type PanelMode =
    | "left"
    | "bottom"
    | "right"
    | "full";

interface RibbonOption {
    readonly value: string;
    readonly label: string;
}

interface MenuPosition {
    readonly top: number;
    readonly left: number;
    readonly width: number;
}


/* ==========================================================================
 * STATUS
 * ========================================================================== */

interface StatusProps {
    readonly block: string;
    readonly label: string;
    readonly value: string;
    readonly tone?: StatusTone;
    readonly onClick?: () => void;
}

function Status({
    block,
    label,
    value,
    tone = "neutral",
    onClick
}: StatusProps): ReactElement {

    return (
        <button
            type="button"
            className="corei-ribbon-status"
            data-ribbon-block={block}
            data-status-tone={tone}
            onClick={onClick}
            disabled={!onClick}
            aria-label={`${label}: ${value}`}
        >
            <span className="corei-ribbon-status-label">
                {label}
            </span>

            <span className="corei-ribbon-status-value">
                {value}
            </span>
        </button>
    );
}


/* ==========================================================================
 * SELECTOR
 *
 * Dropdown is rendered through document.body.
 *
 * This prevents:
 * - clipping by ribbon containers
 * - dropdown appearing behind workspace
 * - dropdown moving with grid/flex compression
 * - ancestor overflow interference
 * ========================================================================== */

interface SelectorProps {
    readonly block: "org" | "workspace";
    readonly label: string;
    readonly value: string;
    readonly children: ReactNode;
    readonly onChange: (value: string) => void;
}

function RibbonSelector({
    block,
    label,
    value,
    children,
    onChange
}: SelectorProps): ReactElement {

    const [open, setOpen] =
        useState(false);

    const [position, setPosition] =
        useState<MenuPosition | null>(null);

    const rootRef =
        useRef<HTMLDivElement>(null);

    const triggerRef =
        useRef<HTMLButtonElement>(null);

    const options: RibbonOption[] =
        Children.toArray(children)
            .map((child) => {

                const option =
                    child as ReactElement<{
                        value?: string;
                        children?: ReactNode;
                    }>;

                return {
                    value:
                        String(
                            option.props.value ?? ""
                        ),

                    label:
                        String(
                            option.props.children ?? ""
                        )
                };
            })
            .filter(
                (option) =>
                    option.value.length > 0
            );

    const selected =
        options.find(
            (option) =>
                option.value === value
        );

    const updatePosition = () => {

        const trigger =
            triggerRef.current;

        if (!trigger) {
            return;
        }

        const rect =
            trigger.getBoundingClientRect();

        const viewportWidth =
            document.documentElement.clientWidth;

        const preferredWidth =
            block === "org"
                ? 230
                : 205;

        const width =
            Math.max(
                rect.width,
                preferredWidth
            );

        const left =
            Math.min(
                rect.left,
                Math.max(
                    8,
                    viewportWidth -
                        width -
                        8
                )
            );

        setPosition({
            top: rect.bottom + 2,
            left,
            width
        });
    };

    const openMenu = () => {

        updatePosition();
        setOpen(true);
    };

    const closeMenu = () => {
        setOpen(false);
    };

    useEffect(() => {

        if (!open) {
            return;
        }

        updatePosition();

        const handlePointerDown =
            (event: MouseEvent) => {

                const target =
                    event.target as Node;

                if (
                    rootRef.current?.contains(
                        target
                    )
                ) {
                    return;
                }

                const menu =
                    document.querySelector(
                        `[data-ribbon-menu="${block}"]`
                    );

                if (
                    menu?.contains(target)
                ) {
                    return;
                }

                closeMenu();
            };

        const handleKeyDown =
            (event: globalThis.KeyboardEvent) => {

                if (
                    event.key === "Escape"
                ) {
                    closeMenu();
                    triggerRef.current?.focus();
                }
            };

        const handleViewportChange =
            () => updatePosition();

        document.addEventListener(
            "mousedown",
            handlePointerDown
        );

        document.addEventListener(
            "keydown",
            handleKeyDown
        );

        window.addEventListener(
            "resize",
            handleViewportChange
        );

        window.addEventListener(
            "scroll",
            handleViewportChange,
            true
        );

        return () => {

            document.removeEventListener(
                "mousedown",
                handlePointerDown
            );

            document.removeEventListener(
                "keydown",
                handleKeyDown
            );

            window.removeEventListener(
                "resize",
                handleViewportChange
            );

            window.removeEventListener(
                "scroll",
                handleViewportChange,
                true
            );
        };

    }, [open, block]);

    const choose =
        (nextValue: string) => {

            onChange(nextValue);
            closeMenu();
        };

    const menu =
        open && position
            ? createPortal(
                <div
                    className="corei-ribbon-selector-menu"
                    data-ribbon-menu={block}
                    role="listbox"
                    aria-label={label}
                    style={{
                        top:
                            position.top,
                        left:
                            position.left,
                        width:
                            position.width
                    }}
                >
                    <div
                        className="corei-ribbon-menu-header"
                    >
                        {label}
                    </div>

                    <div
                        className="corei-ribbon-menu-options"
                    >
                        {options.map(
                            (option) => {

                                const active =
                                    option.value ===
                                    value;

                                return (
                                    <button
                                        key={
                                            option.value
                                        }
                                        type="button"
                                        role="option"
                                        aria-selected={
                                            active
                                        }
                                        className={
                                            "corei-ribbon-menu-option" +
                                            (
                                                active
                                                    ? " is-active"
                                                    : ""
                                            )
                                        }
                                        onClick={() =>
                                            choose(
                                                option.value
                                            )
                                        }
                                    >
                                        <span>
                                            {
                                                option.label
                                            }
                                        </span>

                                        {active && (
                                            <span
                                                className="corei-ribbon-menu-check"
                                                aria-hidden="true"
                                            >
                                                ✓
                                            </span>
                                        )}
                                    </button>
                                );
                            }
                        )}
                    </div>
                </div>,
                document.body
            )
            : null;

    return (
        <>
            <div
                ref={rootRef}
                className="corei-ribbon-selector"
                data-ribbon-block={block}
            >
                <button
                    ref={triggerRef}
                    type="button"
                    className="corei-ribbon-selector-trigger"
                    aria-haspopup="listbox"
                    aria-expanded={open}
                    onClick={() => {

                        if (open) {
                            closeMenu();
                        } else {
                            openMenu();
                        }
                    }}
                >
                    <span
                        className="corei-ribbon-selector-label"
                    >
                        {label}
                    </span>

                    <span
                        className="corei-ribbon-selector-value"
                        title={
                            selected?.label ??
                            value
                        }
                    >
                        {
                            selected?.label ??
                            value
                        }
                    </span>

                    <span
                        className="corei-ribbon-selector-chevron"
                        aria-hidden="true"
                    />
                </button>
            </div>

            {menu}
        </>
    );
}


/* ==========================================================================
 * SEARCH
 * ========================================================================== */

function SearchInput(): ReactElement {

    const [query, setQuery] =
        useState("");

    const inputRef =
        useRef<HTMLInputElement>(null);

    const openSearch = () => {

        window.dispatchEvent(
            new CustomEvent(
                "corei:search:open",
                {
                    detail: {
                        query
                    }
                }
            )
        );
    };

    const handleKeyDown =
        (
            event:
                KeyboardEvent<HTMLInputElement>
        ) => {

            if (
                event.key === "Enter"
            ) {
                openSearch();
                return;
            }

            if (
                event.key === "Escape"
            ) {
                inputRef.current?.blur();
            }
        };

    useEffect(() => {

        const handleShortcut =
            (
                event:
                    globalThis.KeyboardEvent
            ) => {

                if (
                    (event.metaKey ||
                        event.ctrlKey) &&
                    event.key.toLowerCase() ===
                        "f"
                ) {
                    event.preventDefault();

                    inputRef.current?.focus();
                }
            };

        window.addEventListener(
            "keydown",
            handleShortcut
        );

        return () =>
            window.removeEventListener(
                "keydown",
                handleShortcut
            );

    }, []);

    return (
        <div
            className="corei-ribbon-search"
            role="search"
        >
            <span
                className="corei-ribbon-search-icon"
                aria-hidden="true"
            />

            <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(event) =>
                    setQuery(
                        event.target.value
                    )
                }
                onKeyDown={handleKeyDown}
                className="corei-ribbon-search-input"
                placeholder="Find / Search..."
                aria-label="Find or search"
                autoComplete="off"
                spellCheck={false}
            />

            <span
                className="corei-ribbon-search-key"
                aria-hidden="true"
            >
                ⌘K
            </span>
        </div>
    );
}


/* ==========================================================================
 * CLOCK
 * ========================================================================== */

function Clock(): ReactElement {

    const [now, setNow] =
        useState(
            () => new Date()
        );

    const [open, setOpen] =
        useState(false);

    const rootRef =
        useRef<HTMLDivElement>(null);

    useEffect(() => {

        const timer =
            window.setInterval(
                () =>
                    setNow(
                        new Date()
                    ),
                1000
            );

        return () =>
            window.clearInterval(
                timer
            );

    }, []);

    useEffect(() => {

        if (!open) {
            return;
        }

        const handlePointerDown =
            (event: MouseEvent) => {

                if (
                    rootRef.current &&
                    !rootRef.current.contains(
                        event.target as Node
                    )
                ) {
                    setOpen(false);
                }
            };

        const handleKeyDown =
            (
                event:
                    globalThis.KeyboardEvent
            ) => {

                if (
                    event.key ===
                    "Escape"
                ) {
                    setOpen(false);
                }
            };

        document.addEventListener(
            "mousedown",
            handlePointerDown
        );

        document.addEventListener(
            "keydown",
            handleKeyDown
        );

        return () => {

            document.removeEventListener(
                "mousedown",
                handlePointerDown
            );

            document.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };

    }, [open]);

    const time =
        now.toLocaleTimeString(
            undefined,
            {
                hour12: false,
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            }
        );

    const utc =
        now
            .toISOString()
            .slice(11, 19);

    const date =
        now.toLocaleDateString();

    return (
        <div
            ref={rootRef}
            className="corei-ribbon-clock"
            data-ribbon-block="clock"
        >
            <button
                type="button"
                className="corei-ribbon-clock-trigger"
                aria-haspopup="dialog"
                aria-expanded={open}
                onClick={() =>
                    setOpen(
                        previous =>
                            !previous
                    )
                }
            >
                <span
                    className="corei-ribbon-clock-time"
                >
                    {time}
                </span>

                <span
                    className="corei-ribbon-clock-zone"
                >
                    IST
                </span>

                <span
                    className="corei-ribbon-clock-chevron"
                    aria-hidden="true"
                />
            </button>

            {open && (
                <div
                    className="corei-ribbon-clock-menu"
                    role="dialog"
                    aria-label="Time information"
                >
                    <div
                        className="corei-ribbon-popover-title"
                    >
                        TIME
                    </div>

                    <div
                        className="corei-ribbon-clock-row"
                    >
                        <span>
                            Local Time
                        </span>

                        <strong>
                            {time}
                        </strong>
                    </div>

                    <div
                        className="corei-ribbon-clock-row"
                    >
                        <span>
                            Timezone
                        </span>

                        <strong>
                            IST
                        </strong>
                    </div>

                    <div
                        className="corei-ribbon-clock-row"
                    >
                        <span>
                            UTC
                        </span>

                        <strong>
                            {utc}
                        </strong>
                    </div>

                    <div
                        className="corei-ribbon-clock-row"
                    >
                        <span>
                            Date
                        </span>

                        <strong>
                            {date}
                        </strong>
                    </div>

                    <div
                        className="corei-ribbon-popover-divider"
                    />

                    <button
                        type="button"
                        className="corei-ribbon-popover-action"
                        onClick={() => {

                            setOpen(false);

                            window.dispatchEvent(
                                new CustomEvent(
                                    "corei:settings:time"
                                )
                            );
                        }}
                    >
                        Time Settings
                    </button>
                </div>
            )}
        </div>
    );
}


/* ==========================================================================
 * PANEL MODE
 * ========================================================================== */

interface PanelModeButtonProps {
    readonly mode: PanelMode;
    readonly label: string;
    readonly active: boolean;
    readonly onClick: () => void;
}

function PanelModeButton({
    mode,
    label,
    active,
    onClick
}: PanelModeButtonProps): ReactElement {

    return (
        <button
            type="button"
            className="corei-ribbon-panel-mode-button"
            data-panel-mode={mode}
            data-active={active}
            aria-label={label}
            aria-pressed={active}
            title={label}
            onClick={onClick}
        >
            <span
                className="corei-panel-mode-glyph"
                aria-hidden="true"
            >
                <span />
                <span />
                <span />
            </span>
        </button>
    );
}


function PanelMode(): ReactElement {

    const [mode, setMode] =
        useState<PanelMode>(
            "left"
        );

    const changeMode =
        (nextMode: PanelMode) => {

            setMode(nextMode);

            window.dispatchEvent(
                new CustomEvent(
                    "corei:panel-mode:change",
                    {
                        detail: {
                            mode: nextMode
                        }
                    }
                )
            );
        };

    return (
        <div
            className="corei-ribbon-panel-mode"
            role="group"
            aria-label="Panel mode"
        >
            <PanelModeButton
                mode="left"
                label="Left panel"
                active={
                    mode === "left"
                }
                onClick={() =>
                    changeMode("left")
                }
            />

            <PanelModeButton
                mode="bottom"
                label="Bottom panel"
                active={
                    mode === "bottom"
                }
                onClick={() =>
                    changeMode("bottom")
                }
            />

            <PanelModeButton
                mode="right"
                label="Right panel"
                active={
                    mode === "right"
                }
                onClick={() =>
                    changeMode("right")
                }
            />

            <PanelModeButton
                mode="full"
                label="Full panel"
                active={
                    mode === "full"
                }
                onClick={() =>
                    changeMode("full")
                }
            />
        </div>
    );
}


/* ==========================================================================
 * ROW 01 COMPONENT
 * ========================================================================== */

export function Row1(): ReactElement {

    const context =
        getShellHeaderContext();

    const [organizationId, setOrganizationId] =
        useState(
            context.institution.name
        );

    const [workspaceId, setWorkspaceId] =
        useState(
            context.workspace.workspaceId
        );

    const workspaceOptions =
        workspaceRuntime
            .list()
            .map(
                (workspace) => ({
                    id:
                        workspace.id,
                    name:
                        workspace.name
                })
            );

    const runtimeReady =
        context.runtime.state ===
        "ready";

    const runtimeHealthy =
        context.runtime.health ===
        "healthy";

    const notificationTone:
        StatusTone =
            context.notifications.critical >
            0
                ? "critical"
                : context.notifications.unread >
                    0
                    ? "attention"
                    : "operational";

    const handleOrganizationChange =
        async (
            value: string
        ) => {

            if (
                value ===
                organizationId
            ) {
                return;
            }

            await identityService
                .switchOrganization(
                    value
                );

            setOrganizationId(
                value
            );
        };

    const handleWorkspaceChange =
        (
            value: string
        ) => {

            if (
                value ===
                workspaceId
            ) {
                return;
            }

            workspaceRuntime.open(
                value
            );

            setWorkspaceId(
                value
            );
        };

    const openCommandPalette =
        () => {

            window.dispatchEvent(
                new CustomEvent(
                    "corei:command-palette:open"
                )
            );
        };

    const openHelp =
        () => {

            window.dispatchEvent(
                new CustomEvent(
                    "corei:help:open"
                )
            );
        };

    const openSettings =
        () => {

            window.dispatchEvent(
                new CustomEvent(
                    "corei:settings:open"
                )
            );
        };

    const openAlerts =
        () => {

            window.dispatchEvent(
                new CustomEvent(
                    "corei:alerts:open"
                )
            );
        };

    return (
        <div className="corei-ribbon-primary-row">
            {/* ======================================================
             * 01 — COREI IDENTITY
             * ====================================================== */}

            <section
                className="corei-ribbon-identity"
                data-ribbon-block="identity"
            >
                <span className="corei-ribbon-product">
                    COREI OS
                </span>
            </section>

            {/* ======================================================
             * 02 — ORGANIZATION
             * ====================================================== */}

            <RibbonSelector
                block="org"
                label="ORG"
                value={organizationId}
                onChange={handleOrganizationChange}
            >
                <option value={organizationId}>
                    {context.institution.name}
                </option>
            </RibbonSelector>

            {/* ======================================================
             * 03 — WORKSPACE
             * ====================================================== */}

            <RibbonSelector
                block="workspace"
                label="WORKSPACE"
                value={workspaceId}
                onChange={handleWorkspaceChange}
            >
                {workspaceOptions.map((workspace) => (
                    <option key={workspace.id} value={workspace.id}>
                        {workspace.name}
                    </option>
                ))}
            </RibbonSelector>

            {/* ======================================================
             * 04 — ENVIRONMENT
             * ====================================================== */}

            <Status
                block="environment"
                label="ENV"
                value={context.environment.environment.toUpperCase()}
                tone={
                    context.environment.environment.toLowerCase() === "development"
                        ? "attention"
                        : "operational"
                }
            />

            {/* ======================================================
             * 05 — OPERATOR
             * ====================================================== */}

            <Status
                block="operator"
                label="OPERATOR"
                value={context.session.operatorLabel}
            />

            {/* ======================================================
             * 06 — RUNTIME
             * ====================================================== */}

            <Status
                block="runtime"
                label="RUNTIME"
                value={runtimeReady ? "READY" : "STARTING"}
                tone={runtimeHealthy ? "operational" : "critical"}
            />

            {/* ======================================================
             * 07 — ALERTS
             * ====================================================== */}

            <Status
                block="alerts"
                label="ALERTS"
                value={String(context.notifications.total)}
                tone={notificationTone}
                onClick={openAlerts}
            />

            {/* ======================================================
             * ELASTIC SPACE
             * ====================================================== */}

            <div className="corei-ribbon-primary-spacer" aria-hidden="true" />

            {/* ======================================================
             * 08 — SEARCH
             * ====================================================== */}

            <SearchInput />

            {/* ======================================================
             * 09 — COMMAND
             * ====================================================== */}

            <button
                type="button"
                className="corei-ribbon-command"
                onClick={openCommandPalette}
                aria-label="Open COREI command palette"
            >
                <span className="corei-ribbon-command-label">COMMAND</span>
                <span className="corei-ribbon-command-key" aria-hidden="true">⌘⇧P</span>
            </button>

            {/* ======================================================
             * 10 — CLOCK
             * ====================================================== */}

            <Clock />

            {/* ======================================================
             * 11 — PANEL MODE
             * ====================================================== */}

            <PanelMode />

            {/* ======================================================
             * 12 — HELP
             * ====================================================== */}

            <button
                type="button"
                className="corei-ribbon-icon-button"
                onClick={openHelp}
                aria-label="Help"
                title="Help"
            >
                ?
            </button>

            {/* ======================================================
             * 13 — SETTINGS
             * ====================================================== */}

            <button
                type="button"
                className="corei-ribbon-icon-button"
                onClick={openSettings}
                aria-label="Settings"
                title="Settings"
            >
                <span className="corei-settings-glyph" aria-hidden="true" />
            </button>
        </div>
    );
}

export default Row1;
