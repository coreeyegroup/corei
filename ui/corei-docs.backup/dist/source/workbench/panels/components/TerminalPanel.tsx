/**
 * Terminal Panel
 */
import React from 'react';
import { Terminal } from '../../../foundation/terminal/components/Terminal';

export function TerminalPanel() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#1e1e1e' }}>
      <Terminal />
    </div>
  );
}
