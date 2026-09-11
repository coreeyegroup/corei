/**
 * COREI – Institutional Shell
 * Stage-25 / Phase-17
 * The authoritative Shell component used by the application.
 * Wraps the ShellFrame with the IntelligenceProvider and starts real-time simulation.
 */
import React, { useEffect, useRef } from 'react';
import { ShellProvider } from '../providers/shell-provider';
import { ShellFrame } from './ShellFrame';
import { IntelligenceProvider } from '../../intelligence';
import { useIntelligenceRuntime } from '../hooks/useIntelligenceRuntime';
import { useInfrastructureRuntime } from '../hooks/useInfrastructureRuntime';
import { MockDataService } from '../../services/MockDataService';

export interface ShellProps {
  kernel: any;
}

export const Shell: React.FC<ShellProps> = ({ kernel }) => {
  const intelligenceRuntime = useIntelligenceRuntime();
  const infrastructureRuntime = useInfrastructureRuntime();
  const mockServiceRef = useRef<MockDataService | null>(null);

  // Start the real-time data simulation once runtimes are ready
  useEffect(() => {
    if (intelligenceRuntime && infrastructureRuntime) {
      if (!mockServiceRef.current) {
        mockServiceRef.current = new MockDataService(
          intelligenceRuntime,
          infrastructureRuntime
        );
        mockServiceRef.current.start();
      }
      return () => {
        if (mockServiceRef.current) {
          mockServiceRef.current.stop();
          mockServiceRef.current = null;
        }
      };
    }
  }, [intelligenceRuntime, infrastructureRuntime]);

  return (
    <ShellProvider kernel={kernel}>
      <IntelligenceProvider runtime={intelligenceRuntime}>
        <ShellFrame />
      </IntelligenceProvider>
    </ShellProvider>
  );
};

export default Shell;
