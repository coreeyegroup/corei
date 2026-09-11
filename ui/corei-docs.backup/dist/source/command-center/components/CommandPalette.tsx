/**
 * COREI – Command Palette
 * Stage-25 / Phase-21
 *
 * Displays a searchable list of commands.
 */
import React, { useState } from 'react';
import { useCommand } from '../hooks/use-command';

export function CommandPalette() {
  const [query, setQuery] = useState('');
  // For now, use a static list; later we can consume the registry.
  const commands = [
    { id: 'welcome', title: 'Welcome Panel' },
    { id: 'charts', title: 'Charts Panel' },
    { id: 'orders', title: 'Orders Panel' },
    { id: 'terminal', title: 'Terminal Panel' },
    { id: 'editor', title: 'Editor Panel' },
  ];

  const filtered = commands.filter(cmd =>
    cmd.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ padding: '16px' }}>
      <input
        type="text"
        placeholder="Type a command..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: '100%',
          padding: '10px 12px',
          fontSize: '16px',
          background: '#2a2f38',
          border: '1px solid #3b4048',
          borderRadius: '4px',
          color: '#d7dce2',
          outline: 'none',
        }}
        autoFocus
      />
      <div style={{ marginTop: '12px' }}>
        {filtered.map(cmd => (
          <div
            key={cmd.id}
            style={{
              padding: '8px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
              color: '#d7dce2',
              fontSize: '14px',
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#2a2f38'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            {cmd.title}
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ color: '#6a7280', padding: '8px 12px' }}>
            No commands found
          </div>
        )}
      </div>
    </div>
  );
}
