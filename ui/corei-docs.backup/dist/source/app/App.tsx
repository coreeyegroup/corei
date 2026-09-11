/**
 * COREI – Application Root
 * Stage-25 / Phase-21
 */
import React from 'react';
import Shell from '../shell/components/Shell';
import { ShellBoundary } from '../shell/components/ShellBoundary';
import { connectShellKernel } from '../shell/runtime/connect-shell-kernel';
import { CommandPaletteOverlay } from '../workbench/command-palette/CommandPaletteOverlay';

const SHELL_KERNEL = connectShellKernel();

export function App() {
  return (
    <ShellBoundary>
      <Shell kernel={SHELL_KERNEL} />
      <CommandPaletteOverlay />
    </ShellBoundary>
  );
}

export default App;
