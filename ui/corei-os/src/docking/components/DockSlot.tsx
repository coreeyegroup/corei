/*
------------------------------------------------------------
COREI
Stage 25
Phase 19
Step 06

Component:
DockSlot

Purpose:
Institutional Dock Slot

Responsibilities

- Visual content host
- Future window host
- Future tab host

Non Responsibilities

- Window Runtime
- Dock Runtime
- Split Runtime
- Persistence
------------------------------------------------------------
*/

import { PropsWithChildren } from "react";

import "../styles/dock-slot.css";

export interface DockSlotProps extends PropsWithChildren {

    className?: string;

}

export function DockSlot({

    className,

    children,

}: DockSlotProps): React.JSX.Element {

    return (

        <div

            className={[
                "corei-dock-slot",
                className,
            ]
                .filter(Boolean)
                .join(" ")}

        >

            {children}

        </div>

    );

}

export default DockSlot;
