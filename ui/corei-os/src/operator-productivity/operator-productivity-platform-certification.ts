/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Operator Productivity Platform

File:
    operator-productivity-platform-certification.ts

Purpose:
    Institutional certification coordinator for the completed
    Operator Productivity Platform.

Stage:
    Stage-25

Phase:
    Phase-21

Step:
    Step-20 — Certification, Freeze & Consumption Handoff
===============================================================================
*/

import type {
    OperatorProductivityPlatformCertificationContract
} from "./operator-productivity-platform-certification-contract";

import {
    OperatorProductivityPlatformIntegration
} from "./operator-productivity-platform-integration";

export class OperatorProductivityPlatformCertification
implements OperatorProductivityPlatformCertificationContract {

    private readonly integration =
        new OperatorProductivityPlatformIntegration();

    private certified = false;

    private frozen = false;

    private handedOff = false;

    async certify(): Promise<boolean> {

        if (this.certified) {
            return true;
        }

        await this.integration.initialize();
        await this.integration.validate();

        this.certified = true;

        return true;
    }

    async freeze(): Promise<boolean> {

        if (!this.certified) {
            return false;
        }

        this.frozen = true;

        return true;
    }

    async handoff(): Promise<boolean> {

        if (!this.certified || !this.frozen) {
            return false;
        }

        this.handedOff = true;

        return true;
    }
}
