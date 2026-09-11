/**
 * COREI – Ribbon User Component
 * Displays the current user's identity.
 */
import React from 'react';
import { identityService } from '../../identity-platform';

export function RibbonUser() {
    const user = identityService.getCurrentUser();
    if (!user) {
        return <span className="corei-ribbon-user">Not signed in</span>;
    }
    return (
        <span className="corei-ribbon-user">
            <span className="corei-ribbon-user-icon">👤</span>
            <span className="corei-ribbon-user-name">{user.name}</span>
            <span className="corei-ribbon-user-role">{user.roles.join(', ')}</span>
        </span>
    );
}
