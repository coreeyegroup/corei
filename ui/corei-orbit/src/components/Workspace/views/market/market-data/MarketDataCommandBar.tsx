/**
 * COREI MARKET DATA
 * MD-01 — Command Bar
 *
 * Presentation-only command surface.
 *
 * Responsibilities:
 *   - Search instruments
 *   - Search Market Data capabilities
 *   - Clear search
 *   - Request refresh from parent
 *
 * This component does not:
 *   - fetch market data
 *   - create authority
 *   - execute trades
 *   - mutate backend state
 */

import React, {
  useCallback,
  useEffect,
  useRef,
} from 'react';

import {
  RefreshCw,
  Search,
  X,
} from 'lucide-react';


/* ============================================================================
   TYPES
   ============================================================================ */

export interface MarketDataCommandBarProps {
  searchQuery: string;

  onSearchChange: (value: string) => void;

  onRefresh?: () => void;

  loading?: boolean;

  resultCount?: number;

  placeholder?: string;

  disabled?: boolean;
}


/* ============================================================================
   COMPONENT
   ============================================================================ */

const MarketDataCommandBar: React.FC<MarketDataCommandBarProps> = ({
  searchQuery,
  onSearchChange,
  onRefresh,
  loading = false,
  resultCount,
  placeholder = 'Search instrument or capability...',
  disabled = false,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);


  /* --------------------------------------------------------------------------
     KEYBOARD COMMAND
     -------------------------------------------------------------------------- */

  const handleKeyboard = useCallback(
    (event: KeyboardEvent) => {
      const modifier = event.ctrlKey || event.metaKey;

      if (modifier && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }

      if (event.key === 'Escape') {
        if (document.activeElement === inputRef.current) {
          inputRef.current?.blur();
        }
      }
    },
    [],
  );


  useEffect(() => {
    window.addEventListener(
      'keydown',
      handleKeyboard,
    );

    return () => {
      window.removeEventListener(
        'keydown',
        handleKeyboard,
      );
    };
  }, [handleKeyboard]);


  /* --------------------------------------------------------------------------
     HANDLERS
     -------------------------------------------------------------------------- */

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    onSearchChange(event.target.value);
  };


  const handleClear = () => {
    onSearchChange('');
    inputRef.current?.focus();
  };


  const handleRefresh = () => {
    if (!loading && !disabled) {
      onRefresh?.();
    }
  };


  /* ==========================================================================
     RENDER
     ========================================================================== */

  return (
    <div className="mi-command-bar">
      <div className="mi-command-search">
        <Search
          size={14}
          strokeWidth={1.7}
          aria-hidden="true"
        />

        <input
          ref={inputRef}
          type="search"
          value={searchQuery}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          aria-label="Search Market Data"
          autoComplete="off"
          spellCheck={false}
        />

        {searchQuery.length > 0 && (
          <button
            type="button"
            className="mi-command-clear"
            onClick={handleClear}
            disabled={disabled}
            aria-label="Clear Market Data search"
            title="Clear search"
          >
            <X
              size={12}
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </button>
        )}

        <kbd>⌘K</kbd>
      </div>


      <div className="mi-command-meta">
        {typeof resultCount === 'number' && (
          <span className="mi-command-result-count">
            {resultCount} result{resultCount === 1 ? '' : 's'}
          </span>
        )}

        <span className="mi-command-readonly">
          READ ONLY
        </span>
      </div>


      <button
        type="button"
        className="mi-command-refresh"
        onClick={handleRefresh}
        disabled={disabled || loading || !onRefresh}
        aria-label="Refresh Market Data"
        title={
          loading
            ? 'Refreshing Market Data'
            : 'Refresh Market Data'
        }
      >
        <RefreshCw
          size={13}
          strokeWidth={1.7}
          className={
            loading
              ? 'mi-command-refresh-icon is-loading'
              : 'mi-command-refresh-icon'
          }
          aria-hidden="true"
        />

        <span>
          {loading ? 'REFRESHING' : 'REFRESH'}
        </span>
      </button>
    </div>
  );
};


export default MarketDataCommandBar;
