/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 01
 * Step        : 03.06
 *
 * File        : notification-service.ts
 * Purpose     : Authoritative platform notification service.
 * =============================================================================
 */

import type { PlatformService } from "../contracts/platform-service";

export interface NotificationMessage {

    id: string;

    title: string;

    message: string;

    timestamp: Date;

}

export class NotificationService implements PlatformService {

    public readonly id = "notification-service";

    private readonly notifications: NotificationMessage[] = [];

    public initialize(): void {

        console.info("[COREI] Notification Service Initialized");

    }

    public dispose(): void {

        this.notifications.length = 0;

        console.info("[COREI] Notification Service Disposed");

    }

    public notify(

        title: string,
        message: string

    ): void {

        this.notifications.push({

            id: `notification-${Date.now()}`,

            title,

            message,

            timestamp: new Date()

        });

    }

    public list(): readonly NotificationMessage[] {

        return this.notifications;

    }

}

export const notificationService =
    new NotificationService();
