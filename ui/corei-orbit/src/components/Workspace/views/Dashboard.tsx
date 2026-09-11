// src/components/Workspace/views/Dashboard.tsx

import React, {
  useEffect,
  useRef,
} from 'react';
import { useMarketStore } from '../../../services/marketDataService';
import { useTradeStore } from '../../../services/tradeService';
import { useN8nStore } from '../../../services/n8nService';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const instruments = useMarketStore(
    (state) => state.instruments,
  );

  const portfolio = useTradeStore(
    (state) => state.portfolio,
  );

  const n8nState = useN8nStore(
    (state) => state.state,
  );

  const canvasRefs = {
    btc: useRef<HTMLCanvasElement>(null),
    nifty: useRef<HTMLCanvasElement>(null),
    gold: useRef<HTMLCanvasElement>(null),
  };

  const drawSparkline = (
    canvas: HTMLCanvasElement | null,
    data: number[],
    color: string,
  ) => {
    if (!canvas || data.length < 2) {
      return;
    }

    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return;
    }

    const width =
      canvas.clientWidth || 120;

    const height =
      canvas.clientHeight || 40;

    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(
      0,
      0,
      width,
      height,
    );

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const pad = 2;

    const points = data.map((value, index) => ({
      x:
        pad +
        (index / (data.length - 1)) *
          (width - pad * 2),

      y:
        pad +
        (1 - (value - min) / range) *
          (height - pad * 2),
    }));

    ctx.beginPath();
    ctx.moveTo(
      points[0].x,
      points[0].y,
    );

    for (let i = 1; i < points.length; i += 1) {
      const previous = points[i - 1];
      const current = points[i];

      const controlX =
        (previous.x + current.x) / 2;

      ctx.bezierCurveTo(
        controlX,
        previous.y,
        controlX,
        current.y,
        current.x,
        current.y,
      );
    }

    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    const last =
      points[points.length - 1];

    ctx.beginPath();
    ctx.arc(
      last.x,
      last.y,
      2,
      0,
      Math.PI * 2,
    );

    ctx.fillStyle = color;
    ctx.fill();
  };

  useEffect(() => {
    drawSparkline(
      canvasRefs.btc.current,
      instruments['BTC/USD']?.history || [],
      '#00E5A0',
    );

    drawSparkline(
      canvasRefs.nifty.current,
      instruments['NIFTY 50']?.history || [],
      '#3B82F6',
    );

    drawSparkline(
      canvasRefs.gold.current,
      instruments['XAU/USD']?.history || [],
      '#F59E0B',
    );
  }, [instruments]);

  const pnl = portfolio?.pnl ?? 0;
  const totalTrades =
    portfolio?.totalTrades ?? 0;
  const wins = portfolio?.wins ?? 0;
  const exposure =
    portfolio?.allocated ?? 0;

  const winRate =
    portfolio?.winRate ??
    (totalTrades > 0
      ? (wins / totalTrades) * 100
      : 0);

  const btcPrice =
    instruments['BTC/USD']?.price?.toFixed(0) ||
    '--';

  const niftyPrice =
    instruments['NIFTY 50']?.price?.toFixed(0) ||
    '--';

  const goldPrice =
    instruments['XAU/USD']?.price?.toFixed(2) ||
    '--';

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2 className="dashboard-title">
          Trading Dashboard
        </h2>

        <span
          className={`dashboard-status ${n8nState}`}
        >
          {n8nState.toUpperCase()}
        </span>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">
            Daily P&amp;L
          </span>

          <span
            className={`stat-value ${
              pnl >= 0
                ? 'positive'
                : 'negative'
            }`}
          >
            {pnl >= 0 ? '+' : ''}
            {pnl.toFixed(2)}
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-label">
            Win Rate
          </span>

          <span className="stat-value">
            {winRate.toFixed(1)}%
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-label">
            Trades Today
          </span>

          <span className="stat-value">
            {totalTrades}
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-label">
            Allocated Capital
          </span>

          <span className="stat-value">
            {exposure.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="spark-grid">
        <div className="spark-card">
          <div className="spark-header">
            <span className="spark-symbol">
              BTC/USD
            </span>

            <span
              className="spark-price"
              style={{ color: '#00E5A0' }}
            >
              ${btcPrice}
            </span>
          </div>

          <canvas
            ref={canvasRefs.btc}
            className="spark-canvas"
          />
        </div>

        <div className="spark-card">
          <div className="spark-header">
            <span className="spark-symbol">
              NIFTY 50
            </span>

            <span
              className="spark-price"
              style={{ color: '#3B82F6' }}
            >
              {niftyPrice}
            </span>
          </div>

          <canvas
            ref={canvasRefs.nifty}
            className="spark-canvas"
          />
        </div>

        <div className="spark-card">
          <div className="spark-header">
            <span className="spark-symbol">
              XAU/USD
            </span>

            <span
              className="spark-price"
              style={{ color: '#F59E0B' }}
            >
              ${goldPrice}
            </span>
          </div>

          <canvas
            ref={canvasRefs.gold}
            className="spark-canvas"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
