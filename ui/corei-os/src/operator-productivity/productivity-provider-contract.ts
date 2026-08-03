/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Operator Productivity Platform

File:
    productivity-provider-contract.ts

Purpose:
    Institutional Productivity Provider contract.

Stage:
    Stage-25

Phase:
    Phase-21

Step:
    Step-13 — Productivity Provider & Capability Integration

Owner:
    COREI Platform Architecture

Dependencies:
    Platform Kernel
    Capability Provider Platform
    xterm Integration

Remarks:
    Contract only.
    Consumes existing Capability Provider Platform.
===============================================================================
*/

export interface ProductivityProviderContract {

    initialize(): Promise<void>;

    connect(providerId: string): Promise<void>;

    disconnect(providerId: string): Promise<void>;

    isConnected(providerId: string): boolean;

    shutdown(): Promise<void>;
}
