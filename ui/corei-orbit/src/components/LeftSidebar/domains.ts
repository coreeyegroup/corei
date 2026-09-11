// src/components/LeftSidebar/domains.ts
import {
  FolderTree,
  Activity,
  Server,
  Shield,
  Database,
  Brain,
  Settings,
} from 'lucide-react';
import type { DomainId } from '../../store/preferencesStore';

export interface Domain {
  id: DomainId;
  label: string;
  icon: React.FC<{ size?: number; className?: string }>;
  description: string;
}

export const DOMAINS: Domain[] = [
  {
    id: 'workspace',
    label: 'Workspace',
    icon: FolderTree,
    description: 'Files, editors, and project structure',
  },
  {
    id: 'operations',
    label: 'Operations',
    icon: Activity,
    description: 'Order management, positions, and executions',
  },
  {
    id: 'infrastructure',
    label: 'Infrastructure',
    icon: Server,
    description: 'System health, services, and connectivity',
  },
  {
    id: 'risk',
    label: 'Risk',
    icon: Shield,
    description: 'Risk metrics, limits, and exposure',
  },
  {
    id: 'data',
    label: 'Data',
    icon: Database,
    description: 'Market data, instruments, and historical data',
  },
  {
    id: 'ai',
    label: 'AI',
    icon: Brain,
    description: 'Models, signals, and predictions',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    description: 'System configuration and preferences',
  },
];

export function getDomain(id: DomainId): Domain | undefined {
  return DOMAINS.find((d) => d.id === id);
}
