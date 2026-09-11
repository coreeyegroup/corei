/*
===============================================================================
COREI OPERATING SYSTEM
===============================================================================

Module          : Capability Platform
Component       : Capability Model
File            : capability-model.ts

Stage           : Stage-25
Phase           : Phase-05
Step            : Step-01

Purpose
-------
Defines the institutional data model representing a registered capability.

The model is consumed by the Capability Registry, Manager and Runtime.

===============================================================================
*/

export interface CapabilityModel {

    id: string;

    name: string;

    version: string;

}
