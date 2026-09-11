/**
 * ============================================================================
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 *
 * FILE:
 * Sidebar.tsx
 *
 * PURPOSE:
 * COREI Workspace Navigation Surface
 *
 * EXISTING CAPABILITIES CONSUMED:
 * - Sidebar visibility state
 * - Sidebar width state
 * - Sidebar runtime resize capability
 * - Explorer
 *
 * EXECUTION BOUNDARY:
 * - Existing sidebar runtime preserved.
 * - Existing sidebar state preserved.
 * - Existing Explorer preserved.
 * - Resize interaction only.
 * ============================================================================
 */

import {
    useEffect,
    useRef,
    useState
} from "react";

import { Explorer } from "./Explorer";

import {
    useSidebarState
} from "./state/sidebar-state";

import {
    sidebarRuntime
} from "./runtime/sidebar-runtime";


const SIDEBAR_MIN_WIDTH = 20;

const SIDEBAR_MAX_WIDTH = 480;


export function Sidebar(): React.JSX.Element {

    const visible =
        useSidebarState(
            state => state.visible
        );


    const width =
        useSidebarState(
            state => state.width
        );


    const [
        resizing,
        setResizing
    ] = useState(false);


    const startX =
        useRef(0);


    const startWidth =
        useRef(width);


    useEffect(() => {

        if (!resizing) {

            return;

        }


        const handlePointerMove = (
            event: PointerEvent
        ): void => {

            const delta =
                event.clientX -
                startX.current;


            const nextWidth =
                Math.min(
                    SIDEBAR_MAX_WIDTH,
                    Math.max(
                        SIDEBAR_MIN_WIDTH,
                        startWidth.current +
                        delta
                    )
                );


            sidebarRuntime.resize(
                nextWidth
            );

        };


        const handlePointerUp = (): void => {

            setResizing(false);

        };


        document.addEventListener(
            "pointermove",
            handlePointerMove
        );


        document.addEventListener(
            "pointerup",
            handlePointerUp
        );


        document.body.classList.add(
            "corei-sidebar-resizing"
        );


        return () => {

            document.removeEventListener(
                "pointermove",
                handlePointerMove
            );


            document.removeEventListener(
                "pointerup",
                handlePointerUp
            );


            document.body.classList.remove(
                "corei-sidebar-resizing"
            );

        };

    }, [resizing]);


    const handleResizeStart = (
        event: React.PointerEvent<HTMLDivElement>
    ): void => {

        event.preventDefault();

        startX.current =
            event.clientX;

        startWidth.current =
            width;

        setResizing(true);

    };


    if (!visible) {

        return <></>;

    }


    return (

        <aside
            className="corei-sidebar"
            style={{
                width: `${width}px`
            }}
            data-sidebar-width={width}
        >

            <Explorer />


            <div
                className={
                    resizing
                        ? "corei-sidebar-resize-handle active"
                        : "corei-sidebar-resize-handle"
                }
                role="separator"
                aria-orientation="vertical"
                aria-label="Resize Explorer"
                title="Resize Explorer"
                onPointerDown={
                    handleResizeStart
                }
            />

        </aside>

    );

}


export default Sidebar;
