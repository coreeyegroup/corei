/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 14
 * Component   : Search & Context
 * File        : SearchInput.tsx
 * =============================================================================
 */

import React, { useRef, useEffect } from "react";

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Search capabilities, providers, bindings, diagnostics...",
  autoFocus = true,
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        className="w-full rounded-md border border-gray-300 bg-white px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {!value && (
        <span className="absolute right-3 top-3 text-gray-400">🔍</span>
      )}
    </div>
  );
}
