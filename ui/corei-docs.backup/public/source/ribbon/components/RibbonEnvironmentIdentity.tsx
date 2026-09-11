/**
 * COREI – Ribbon Environment Identity Component
 * Displays the current environment.
 */
import React from 'react';
import { identityService } from '../../identity-platform';

export function RibbonEnvironmentIdentity() {
    const env = identityService.getCurrentEnvironment();
    if (!env) {
        return <span className="corei-ribbon-env">Unknown</span>;
    }
    return (
        <span className={`corei-ribbon-env corei-ribbon-env-${env.type}`}>
            {env.name}
        </span>
    );
}
