// src/components/Workspace/views/DomainWorkspace.tsx

import React from 'react';
import { useAppStore } from '../../../store/appStore';
import { DOMAIN_CONFIGS } from '../../../components/LeftSidebar/LeftSidebar';
import { useInfrastructureStore } from '../../../store/infrastructureStore';
import {
  StatPanel,
  StatusGridPanel,
  TickerPanel,
  TablePanel,
} from './panels';
import type { HealthStatus } from '../../../store/infrastructureStore';
import TradingTerminal from './trading/TradingTerminal';

interface DomainWorkspaceProps {
  domainId: string;
}

type PanelData =
  | {
      type: 'stat';
      label: string;
      value: string | number;
      unit?: string;
      color?:
        | 'green'
        | 'red'
        | 'amber'
        | 'blue';
    }
  | {
      type: 'status-grid';
      services: Array<{
        name: string;
        status: HealthStatus;
      }>;
    }
  | {
      type: 'ticker';
      tickers: Array<{
        symbol: string;
        price: string;
        change: string;
      }>;
    }
  | {
      type: 'table';
      title?: string;
      columns: Array<{
        key: string;
        label: string;
      }>;
      data: Array<Record<string, unknown>>;
    };

const DomainWorkspace: React.FC<
  DomainWorkspaceProps
> = ({ domainId }) => {
  const { openTab } = useAppStore();
  const infraStore =
    useInfrastructureStore();

  const config =
    DOMAIN_CONFIGS[domainId];

  if (domainId === 'trading') {
    return <TradingTerminal />;
  }

  if (!config) {
    return (
      <div className="view-placeholder">
        Domain not found
      </div>
    );
  }

  const getPanelData = (
    panelDef: {
      type: string;
      source: string;
      title?: string;
    },
  ): PanelData | null => {
    const {
      type,
      source,
    } = panelDef;

    switch (domainId) {
      case 'infrastructure': {
        const services =
          infraStore.services;

        switch (type) {
          case 'status-grid':
            return {
              type: 'status-grid',
              services: services.map(
                (service) => ({
                  name: service.name,
                  status: service.status,
                }),
              ),
            };

          case 'stat': {
            const service =
              services.find(
                (item) =>
                  item.name ===
                  source.toUpperCase(),
              );

            return {
              type: 'stat',
              label: source,
              value:
                service?.status ??
                'UNKNOWN',
              color:
                service?.status ===
                'HEALTHY'
                  ? 'green'
                  : 'amber',
            };
          }

          default:
            return null;
        }
      }

      default:
        return null;
    }
  };

  const layout =
    config.dashboardLayout || [];

  if (layout.length === 0) {
    return (
      <div className="domain-workspace">
        <div className="workspace-header">
          <h2>
            {config.title} Workspace
          </h2>

          <span className="workspace-subtitle">
            Institutional Overview
          </span>
        </div>

        <div className="section-grid">
          {config.sections.map(
            (section) => (
              <div
                key={section.label}
                className="section-card"
                onClick={() => {
                  const sanitized =
                    section.label
                      .toLowerCase()
                      .replace(
                        /[^a-z0-9]+/g,
                        '-',
                      );

                  const tabId =
                    `section-${domainId}-${sanitized}`;

                  openTab(
                    tabId,
                    section.label,
                    '📂',
                  );
                }}
              >
                <span className="section-card-title">
                  {section.label}
                </span>

                <span className="section-card-count">
                  {section.items.length} items
                </span>
              </div>
            ),
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="domain-workspace">
      <div className="workspace-header">
        <h2>
          {config.title} Workspace
        </h2>

        <span className="workspace-subtitle">
          Operational Dashboard
        </span>
      </div>

      <div className="dashboard-grid">
        {layout.map(
          (
            panelDef: {
              type: string;
              source: string;
              title?: string;
            },
            index: number,
          ) => {
            const data =
              getPanelData(panelDef);

            if (!data) {
              return null;
            }

            switch (data.type) {
              case 'stat':
                return (
                  <StatPanel
                    key={index}
                    label={data.label}
                    value={data.value}
                    unit={data.unit}
                    color={data.color}
                  />
                );

              case 'status-grid':
                return (
                  <StatusGridPanel
                    key={index}
                    title={
                      panelDef.title
                    }
                    services={
                      data.services
                    }
                  />
                );

              case 'ticker':
                return (
                  <TickerPanel
                    key={index}
                    tickers={
                      data.tickers
                    }
                  />
                );

              case 'table':
                return (
                  <TablePanel
                    key={index}
                    title={data.title}
                    columns={
                      data.columns
                    }
                    data={data.data}
                  />
                );

              default:
                return null;
            }
          },
        )}
      </div>
    </div>
  );
};

export default DomainWorkspace;
