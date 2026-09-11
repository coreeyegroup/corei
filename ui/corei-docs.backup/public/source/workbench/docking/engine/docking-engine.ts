/**
 * ============================================================================
 * STAGE-25
 * PHASE-19
 * STEP-07
 *
 * FILE
 * docking-engine.ts
 *
 * PURPOSE
 * Docking Engine
 *
 * RESPONSIBILITIES
 * - Owns Dock Tree operations
 * - Owns Split operations
 * - Owns Group operations
 * - Owns Node movement
 *
 * DOES NOT
 * - Render panels
 * - Interact with Dockview
 * - Manage tab lifecycle
 * ============================================================================
 */

import type {

    DockTree

} from "../models/dock-tree";

import type {

    DockNode

} from "../contracts/dock-node";

class DockingEngine {

    create(): DockTree {

        return {

            nodes: []

        };

    }

    add(

        tree: DockTree,

        node: DockNode

    ): DockTree {

        return {

            nodes: [

                ...tree.nodes,

                node

            ]

        };

    }

    remove(

        tree: DockTree,

        id: string

    ): DockTree {

        return {

            nodes:

                tree.nodes.filter(

                    node => node.id !== id

                )

        };

    }

    split(

        tree: DockTree,

        targetId: string,

        node: DockNode

    ): DockTree {

        return {

            nodes: [

                ...tree.nodes,

                {

                    ...node,

                    parent: targetId

                }

            ]

        };

    }

    group(

        tree: DockTree,

        groupId: string,

        nodeId: string

    ): DockTree {

        return {

            nodes:

                tree.nodes.map(

                    node =>

                        node.id === nodeId

                            ? {

                                ...node,

                                group: groupId

                            }

                            : node

                )

        };

    }

    move(

        tree: DockTree,

        nodeId: string,

        parentId: string

    ): DockTree {

        return {

            nodes:

                tree.nodes.map(

                    node =>

                        node.id === nodeId

                            ? {

                                ...node,

                                parent: parentId

                            }

                            : node

                )

        };

    }

}

export const dockingEngine =

new DockingEngine();
