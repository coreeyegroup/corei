/**
 * COREI – Ribbon Institution Identity Component
 * Displays the current organization.
 */
import React from 'react';
import { identityService } from '../../identity-platform';

export function RibbonInstitutionIdentity() {
    const org = identityService.getCurrentOrganization();
    if (!org) {
        return <span className="corei-ribbon-org">Unknown</span>;
    }
    return (
        <span className="corei-ribbon-org">
            {org.name}
        </span>
    );
}
