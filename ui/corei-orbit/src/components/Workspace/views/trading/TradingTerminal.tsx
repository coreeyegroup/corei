import React, { useState } from 'react';
import Navigation from './Navigation';
import InstrumentHeader from './InstrumentHeader';
import Watchlist from './Watchlist';
import ChartSurface from './ChartSurface';
import DepthPanel from './DepthPanel';
import OrderEntry from './OrderEntry';
import PositionsPanel from './PositionsPanel';
import ExecutionsPanel from './ExecutionsPanel';
import PortfolioPanel from './PortfolioPanel';
import RiskPanel from './RiskPanel';
import { BrokerIntelligence } from './BrokerIntelligence';
import StrategyIntelligence from './StrategyIntelligence';
import GovernancePanel from './GovernancePanel';
import DiagnosticsPanel from './DiagnosticsPanel';
import OrdersPanel from './OrdersPanel';
import './TradingTerminal.css';

type TradingView =
  | 'terminal'
  | 'market'
  | 'instruments'
  | 'orders'
  | 'execution'
  | 'positions'
  | 'portfolio'
  | 'risk'
  | 'broker'
  | 'strategy'
  | 'governance'
  | 'diagnostics';

const TradingTerminal: React.FC = () => {
  const [activeView, setActiveView] =
    useState<TradingView>('terminal');

  const renderMainContent = () => {
    switch (activeView) {
      case 'terminal':
        return (
          <div className="terminal-layout">

            <aside className="terminal-left">
              <div className="terminal-panel terminal-watchlist">
                <Watchlist />
              </div>
            </aside>

            <main className="terminal-centre">

              <section className="terminal-panel terminal-chart">
                <ChartSurface />
              </section>

              <section className="terminal-panel terminal-depth">
                <DepthPanel />
              </section>

              <section className="terminal-panel terminal-orders">
                <OrdersPanel />
              </section>

            </main>

            <aside className="terminal-right">

              <section className="terminal-panel terminal-order-entry">
                <OrderEntry />
              </section>

              <div className="terminal-right-grid">

                <section className="terminal-panel">
                  <PortfolioPanel compact />
                </section>

                <section className="terminal-panel">
                  <RiskPanel compact />
                </section>

              </div>

            </aside>

          </div>
        );

      case 'market':
        return (
          <div className="trading-view-page">
            <div className="view-page-header">
              <span className="view-kicker">MARKET</span>
              <h2>Market Intelligence</h2>
              <span>Market structure, breadth, liquidity and conditions</span>
            </div>
          </div>
        );

      case 'instruments':
        return (
          <div className="trading-view-page">
            <div className="view-page-header">
              <span className="view-kicker">INSTRUMENTS</span>
              <h2>Instrument Universe</h2>
              <span>Search, classify and manage trading instruments</span>
            </div>

            <div className="full-panel">
              <Watchlist />
            </div>
          </div>
        );

      case 'orders':
        return <OrdersPanel />;

      case 'execution':
        return <ExecutionsPanel />;

      case 'positions':
        return <PositionsPanel />;

      case 'portfolio':
        return <PortfolioPanel />;

      case 'risk':
        return <RiskPanel />;

      case 'broker':
        return <BrokerIntelligence />;

      case 'strategy':
        return <StrategyIntelligence />;

      case 'governance':
        return <GovernancePanel />;

      case 'diagnostics':
        return <DiagnosticsPanel />;

      default:
        return null;
    }
  };

  return (
    <section className="trading-terminal">

      <header className="trading-instrument-region">
        <InstrumentHeader />
      </header>

      <div className="trading-command-region">
        <Navigation
          activeView={activeView}
          onViewChange={(view) =>
            setActiveView(view as TradingView)
          }
        />
      </div>

      <div className="terminal-body">
        <div className="terminal-content">
          {renderMainContent()}
        </div>
      </div>

      <footer className="terminal-footer">

        <div className="footer-status-group">

          <span className="footer-status">
            <i className="status-indicator operational" />
            TRADING
          </span>

          <span className="footer-status">
            <i className="status-indicator operational" />
            MARKET DATA
          </span>

          <span className="footer-status">
            <i className="status-indicator neutral" />
            BROKER
          </span>

          <span className="footer-status">
            <i className="status-indicator operational" />
            RISK
          </span>

        </div>

        <div className="footer-meta">
          COREI TRADING CONTROL SURFACE
        </div>

      </footer>

    </section>
  );
};

export default TradingTerminal;
