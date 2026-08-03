/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage : 25
 * Phase : 03
 * Step  : 04
 * Build : 04.01
 *
 * File : navigation.ts
 * Purpose : Navigation Domain Model
 * =============================================================================
 */

export interface NavigationItem {

    readonly id: string;

    readonly label: string;

    readonly path: string;

    readonly children?: readonly NavigationItem[];

}

export interface NavigationModel {

    readonly items: readonly NavigationItem[];

}
