/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-05-B
 *
 * FILE:
 * RibbonNotifications.tsx
 *
 * PURPOSE:
 * Notification Context Surface
 *
 ******************************************************************************/

import type {
    ReactElement
} from "react";

import type {
    ShellNotificationContext
} from "../contracts/shell-header-context-contract";


export interface RibbonNotificationsProps {

    readonly notifications: ShellNotificationContext;

}


export function RibbonNotifications({
    notifications
}: RibbonNotificationsProps): ReactElement {

    return (

        <div
            className="corei-ribbon-notifications"
            data-critical={notifications.critical}
        >

            Alerts:
            {" "}
            {notifications.unread}

        </div>

    );

}


export default RibbonNotifications;
