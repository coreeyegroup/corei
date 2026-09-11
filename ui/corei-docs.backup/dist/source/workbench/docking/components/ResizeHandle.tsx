/**
 * ============================================================================
 * STAGE-25
 * STEP-02
 * BUILD UNIT-06
 *
 * FILE
 * ResizeHandle.tsx
 * ============================================================================
 */

import { dockRuntime } from "../runtime";

interface ResizeHandleProps {

    direction:

        | "left"
        | "right"
        | "bottom";

}

export function ResizeHandle(

    props: ResizeHandleProps

): React.JSX.Element {

    function onMouseDown(

        event: React.MouseEvent

    ): void {

        event.preventDefault();

        const startX = event.clientX;

        const startY = event.clientY;

        function onMove(

            moveEvent: MouseEvent

        ): void {

            switch (

                props.direction

            ) {

                case "left":

                    dockRuntime.resizeLeft(

                        Math.max(

                            180,

                            moveEvent.clientX - 52

                        )

                    );

                    break;

                case "right":

                    dockRuntime.resizeRight(

                        Math.max(

                            180,

                            window.innerWidth -

                            moveEvent.clientX

                        )

                    );

                    break;

                case "bottom":

                    dockRuntime.resizeBottom(

                        Math.max(

                            160,

                            window.innerHeight -

                            moveEvent.clientY - 24

                        )

                    );

                    break;

            }

        }

        function onUp(): void {

            window.removeEventListener(

                "mousemove",

                onMove

            );

            window.removeEventListener(

                "mouseup",

                onUp

            );

        }

        window.addEventListener(

            "mousemove",

            onMove

        );

        window.addEventListener(

            "mouseup",

            onUp

        );

    }

    return (

        <div

            onMouseDown={onMouseDown}

            style={{

                position: "absolute",

                zIndex: 1000,

                background: "transparent",

                cursor:

                    props.direction === "bottom"

                        ? "row-resize"

                        : "col-resize",

                ...(props.direction === "left" && {

                    top: 0,

                    right: -2,

                    width: 4,

                    height: "100%"

                }),

                ...(props.direction === "right" && {

                    top: 0,

                    left: -2,

                    width: 4,

                    height: "100%"

                }),

                ...(props.direction === "bottom" && {

                    top: -2,

                    left: 0,

                    width: "100%",

                    height: 4

                })

            }}

        />

    );

}
