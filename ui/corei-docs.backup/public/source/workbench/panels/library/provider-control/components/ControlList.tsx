/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 13
 * Component   : Provider Control Surface
 * File        : ControlList.tsx
 * =============================================================================
 */

import React from "react";
import type { ProviderControlItem } from "../services/provider-control-adapter";
import { ControlStatusBadge } from "./ControlStatusBadge";
import { ControlActions } from "./ControlActions";

export interface ControlListProps {
  items: readonly ProviderControlItem[];
  selected?: ProviderControlItem;
  onSelect: (item: ProviderControlItem) => void;
  onInitialize: (id: string) => void;
  onActivate: (id: string) => void;
  onDeactivate: (id: string) => void;
  onRefresh: (id: string) => void;
  onReconnect: (id: string) => void;
}

export function ControlList({
  items,
  selected,
  onSelect,
  onInitialize,
  onActivate,
  onDeactivate,
  onRefresh,
  onReconnect,
}: ControlListProps) {
  return (
    <div className="flex flex-col overflow-auto">
      {items.map(item => (
        <button
          key={item.id}
          type="button"
          onClick={() => onSelect(item)}
          className={`
            w-full border-b px-3 py-2 text-left hover:bg-gray-100
            ${selected?.id === item.id ? "bg-blue-50" : ""}
          `}
        >
          <div className="flex items-center justify-between">
            <div className="font-medium">{item.name}</div>
            <ControlStatusBadge enabled={item.enabled} />
          </div>
          <div className="text-xs text-gray-500">{item.type}</div>
          <ControlActions
            providerId={item.id}
            onInitialize={onInitialize}
            onActivate={onActivate}
            onDeactivate={onDeactivate}
            onRefresh={onRefresh}
            onReconnect={onReconnect}
            canInitialize={item.canInitialize}
            canActivate={item.canActivate}
            canDeactivate={item.canDeactivate}
            canRefresh={item.canRefresh}
            canReconnect={item.canReconnect}
          />
        </button>
      ))}
    </div>
  );
}
