/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 02
 * Step        : 05.04
 *
 * File        : logging-manager.ts
 * Purpose     : Generic Platform Logging Manager.
 * =============================================================================
 */

import type { LoggingContract } from "../contracts/logging-contract";
import type { LogContext } from "../context/log-context";
import { LogLevel } from "../state/log-level";

/**
 * ============================================================================
 * Platform Logging Manager
 * ============================================================================
 */
export class LoggingManager
implements LoggingContract {

    private readonly context: LogContext;

    constructor(

        id: string,

        source: string

    ) {

        this.context = {

            id,

            source,

            level: LogLevel.INFO,

            timestamp: new Date()

        };

    }

    /**
     * Writes a log message.
     */
    private write(

        level: LogLevel,

        message: string

    ): void {

        this.context.level = level;

        this.context.timestamp = new Date();

        console.log(

            `[${level}] [${this.context.source}] ${message}`

        );

    }

    public trace(

        message: string

    ): void {

        this.write(

            LogLevel.TRACE,

            message

        );

    }

    public debug(

        message: string

    ): void {

        this.write(

            LogLevel.DEBUG,

            message

        );

    }

    public info(

        message: string

    ): void {

        this.write(

            LogLevel.INFO,

            message

        );

    }

    public warn(

        message: string

    ): void {

        this.write(

            LogLevel.WARN,

            message

        );

    }

    public error(

        message: string

    ): void {

        this.write(

            LogLevel.ERROR,

            message

        );

    }

    public fatal(

        message: string

    ): void {

        this.write(

            LogLevel.FATAL,

            message

        );

    }

    public getContext(): LogContext {

        return this.context;

    }

}
