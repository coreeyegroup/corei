// src/ribbon/components/TopRibbon.tsx
/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * TOP RIBBON – CONTAINER
 *
 * Institutional Workbench Control Surface
 *
 * This component composes Row 1 and Row 2 into a single header.
 * It does not contain any logic itself – all logic is in the rows.
 *
 ******************************************************************************/

import React, { type ReactElement } from 'react';
import Row1 from './Row1';
import Row2 from './Row2';

export function TopRibbon(): ReactElement {
  return (
    <header
      className="corei-top-ribbon"
      data-ribbon-surface="institutional-operational"
    >
      <Row1 />
      <Row2 />
    </header>
  );
}

export default TopRibbon;
