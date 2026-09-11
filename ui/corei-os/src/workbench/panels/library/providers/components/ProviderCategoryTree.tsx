/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 03
 * Component   : Provider Explorer
 * File        : ProviderCategoryTree.tsx
 * =============================================================================
 */

import React from "react";

export interface ProviderCategoryTreeProps {
  total: number;
}

export function ProviderCategoryTree({ total }: ProviderCategoryTreeProps) {
  return (
    <div className="p-2 text-sm text-gray-500">
      {total} providers available
    </div>
  );
}
