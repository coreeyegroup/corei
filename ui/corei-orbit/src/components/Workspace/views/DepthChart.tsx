// src/components/Workspace/views/DepthChart.tsx
import React, { useEffect, useRef } from 'react';
import { useMarketStore } from '../../../services/marketDataService';

const DepthChart: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const instruments = useMarketStore((state) => state.instruments);
  const btcPrice = instruments['BTC/USD']?.price || 67000;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width = canvas.clientWidth || 400;
    const h = canvas.height = canvas.clientHeight || 200;
    ctx.clearRect(0, 0, w, h);

    const levels = 30;
    const spread = 0.02;
    const mid = btcPrice;
    const bidPrices: number[] = [];
    const askPrices: number[] = [];
    const bidVolumes: number[] = [];
    const askVolumes: number[] = [];

    for (let i = 0; i < levels; i++) {
      const bidPrice = mid * (1 - (i / levels) * spread);
      const askPrice = mid * (1 + (i / levels) * spread);
      bidPrices.push(bidPrice);
      askPrices.push(askPrice);
      bidVolumes.push(0.5 + Math.random() * 2);
      askVolumes.push(0.5 + Math.random() * 2);
    }

    const maxVol = Math.max(...bidVolumes, ...askVolumes);
    const padding = 20;
    const chartW = w - padding * 2;
    const chartH = h - padding * 2;

    // Bids
    ctx.fillStyle = '#00E5A0';
    bidPrices.forEach((_, i) => {
      const x = padding + (i / (levels - 1)) * chartW * 0.5;
      const barW = chartW * 0.5 / levels * 0.8;
      const barH = (bidVolumes[i] / maxVol) * chartH;
      ctx.fillRect(x, padding + chartH - barH, barW, barH);
    });

    // Asks
    ctx.fillStyle = '#FF4D4D';
    askPrices.forEach((_, i) => {
      const x = padding + chartW * 0.5 + (i / (levels - 1)) * chartW * 0.5;
      const barW = chartW * 0.5 / levels * 0.8;
      const barH = (askVolumes[i] / maxVol) * chartH;
      ctx.fillRect(x, padding + chartH - barH, barW, barH);
    });

    // Mid price line
    ctx.beginPath();
    ctx.moveTo(padding + chartW * 0.5, padding);
    ctx.lineTo(padding + chartW * 0.5, padding + chartH);
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 4]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Labels
    ctx.fillStyle = '#94A3B8';
    ctx.font = '9px Inter';
    ctx.textAlign = 'center';
    const totalBid = bidVolumes.reduce((a, b) => a + b, 0);
    const totalAsk = askVolumes.reduce((a, b) => a + b, 0);
    ctx.fillText(`Bids (${totalBid.toFixed(2)})`, padding + chartW * 0.25, h - 2);
    ctx.fillText(`Asks (${totalAsk.toFixed(2)})`, padding + chartW * 0.75, h - 2);
    ctx.fillText(`Mid: $${mid.toFixed(2)}`, padding + chartW * 0.5, padding - 4);
  }, [btcPrice]);

  return (
    <div className="view-container">
      <h2 className="view-title">📚 Order Book Depth Chart</h2>
      <div style={{ height: 'calc(100% - 40px)' }}>
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
  );
};

export default DepthChart;
