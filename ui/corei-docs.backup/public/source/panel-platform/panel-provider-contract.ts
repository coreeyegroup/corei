/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Panel Platform

File:
    panel-provider-contract.ts

Purpose:
    Institutional Panel Provider contract.

Stage:
    Stage-25

Phase:
    Phase-20

Step:
    Step-13 — Panel Provider & Capability Integration

Owner:
    COREI Platform Architecture

Dependencies:
    Platform Kernel
    Capability Provider Platform
    Panel Persistence

Remarks:
    Contract only.
    Consumes existing Provider Platform.
===============================================================================
*/

export interface PanelProviderContract {

    initialize(): Promise<void>;

    connect(providerId: string): Promise<void>;

    disconnect(providerId: string): Promise<void>;

    isConnected(providerId: string): boolean;

    shutdown(): Promise<void>;
}
