/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 07
 * Step        : 09
 *
 * File        : runtime-graph-node.ts
 * Purpose     : Experience Runtime Graph Node
 * =============================================================================
 */

export interface RuntimeGraphNode {

    readonly id: string;

    readonly type: string;

    readonly dependencies:
        readonly string[];

}
