// src/components/Workspace/views/Dashboard.tsx
import React, { useEffect, useRef } from 'react';
import { useMarketStore } from '../../../services/marketDataService';
import { useTradeStore } from '../../../services/tradeService';
import { useN8nStore } from '../../../services/n8nService';

const Dashboard: React.FC = () => {
  const instruments = useMarketStore((state) => state.instruments);
  const { pnl, totalTrades, wins, exposure } = useTradeStore();
  const n8nState = useN8nStore((state) => state.state);

  const winRate = totalTrades === 0 ? 0 : (wins / totalTrades) * 100;

  // Sparklines using canvas
  const canvasRefs = {
    btc: useRef<HTMLCanvasElement>(null),
    nifty: useRef<HTMLCanvasElement>(null),
    gold: useRef<HTMLCanvasElement>(null),
  };

  const drawSparkline = (canvas: HTMLCanvasElement | null, data: number[], color: string) => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx || data.length < 2) return;
    const rect = canvas.parentElement?.getBoundingClientRect();
    const w = canvas.width = canvas.clientWidth || 120;
    const h = canvas.height = canvas.clientHeight || 40;
    ctx.clearRect(0, 0, w, h);

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const pad = 2;

    const points = data.map((v, i) => ({
      x: pad + (i / (data.length - 1)) * (w - pad * 2),
      y: pad + (1 - (v - min) / range) * (h - pad * 2),
    }));

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      const p0 = points[i - 1];
      const p1 = points[i];
      const cpX = (p0.x + p1.x) / 2;
      ctx.bezierCurveTo(cpX, p0.y, cpX, p1.y, p1.x, p1.y);
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Glow effect
    ctx.shadowColor = color;
    ctx.shadowBlur = 6;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Dot at end
    const last = points[points.length - 1];
    ctx.beginPath();
    ctx.arc(last.x, last.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  };

  useEffect(() => {
    const btcData = instruments['BTC/USD']?.history || [];
    const niftyData = instruments['NIFTY 50']?.history || [];
    const goldData = instruments['XAU/USD']?.history || [];

    drawSparkline(canvasRefs.btc.current, btcData, '#00E5A0');
    drawSparkline(canvasRefs.nifty.current, niftyData, '#3B82F6');
    drawSparkline(canvasRefs.gold.current, goldData, '#F59E0B');
  }, [instruments]);

  const btcPrice = instruments['BTC/USD']?.price?.toFixed(0) || '--';
  const niftyPrice = instruments['NIFTY 50']?.price?.toFixed(0) || '--';
  const goldPrice = instruments['XAU/USD']?.price?.toFixed(2) || '--';

  return (
    <div className="view-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h2 className="view-title">📊 Dashboard</h2>
        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
          Status: {n8nState.toUpperCase()}
        </span>
      </div>

      <div className="view-grid">
        <div className="stat-card">
          <span>Daily P&L</span>
          <span className="value green">+${pnl.toFixed(2)}</span>
        </div>
        <div className="stat-card">
          <span>Win Rate</span>
          <span className="value blue">{winRate.toFixed(1)}%</span>
        </div>
        <div className="stat-card">
          <span>Trades Today</span>
          <span className="value">{totalTrades}</span>
        </div>
        <div className="stat-card">
          <span>Exposure</span>
          <span className="value amber">{exposure.toFixed(2)} lots</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 16 }}>
        <div className="spark-card">
          <div><span style={{ fontSize: 10, color: 'var(--text-muted)' }}>BTC/USD</span><br />
            <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--accent-teal)' }}>${btcPrice}</span>
          </div>
          <canvas ref={canvasRefs.btc} style={{ width: '100%', height: 40 }} />
        </div>
        <div className="spark-card">
          <div><span style={{ fontSize: 10, color: 'var(--text-muted)' }}>NIFTY 50</span><br />
            <span style={{ fontSize: 16, fontWeight: 700, color: '#3B82F6' }}>{niftyPrice}</span>
          </div>
          <canvas ref={canvasRefs.nifty} style={{ width: '100%', height: 40 }} />
        </div>
        <div className="spark-card">
          <div><span style={{ fontSize: 10, color: 'var(--text-muted)' }}>XAU/USD</span><br />
            <span style={{ fontSize: 16, fontWeight: 700, color: '#F59E0B' }}>${goldPrice}</span>
          </div>
          <canvas ref={canvasRefs.gold} style={{ width: '100%', height: 40 }} />
        </div>
      </div>

      <div className="view-placeholder" style={{ padding: 20 }}>
        Advanced analytics and order book coming soon
      </div>
    </div>
  );
};

export default Dashboard;