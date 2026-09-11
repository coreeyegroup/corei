// src/components/infrastructure/kubernetes/KubernetesTerminal.tsx
import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from '@xterm/addon-fit';
import { WebLinksAddon } from '@xterm/addon-web-links';
import { getKubernetesWebSocketUrl } from '../../../services/infrastructureService';
import 'xterm/css/xterm.css';

interface KubernetesTerminalProps {
  pod: string;
  namespace: string;
  container?: string;
  onClose?: () => void;
}

const KubernetesTerminal: React.FC<KubernetesTerminalProps> = ({
  pod,
  namespace,
  container = '',
  onClose,
}) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const termInstance = useRef<Terminal | null>(null);
  const wsInstance = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!terminalRef.current) return;

    const term = new Terminal({
      cursorBlink: true,
      fontSize: 14,
      fontFamily: 'monospace',
      theme: {
        background: '#1e1e1e',
        foreground: '#d4d4d4',
        cursor: '#ffffff',
      },
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.loadAddon(new WebLinksAddon());

    term.open(terminalRef.current);
    fitAddon.fit();

    termInstance.current = term;

    const wsUrl = getKubernetesWebSocketUrl({
      pod,
      namespace,
      container: container || undefined,
    });
    const socket = new WebSocket(wsUrl);

    socket.onopen = () => {
      term.writeln(`Connected to pod ${pod} in namespace ${namespace}\r\n`);
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.error) {
          term.writeln(`\r\n\x1b[31mError: ${data.error}\x1b[0m`);
          return;
        }
      } catch (_) {
        term.write(event.data);
      }
    };

    socket.onclose = () => {
      term.writeln('\r\n\x1b[33mConnection closed.\x1b[0m');
    };

    socket.onerror = (err) => {
      term.writeln(`\r\n\x1b[31mWebSocket error: ${err}\x1b[0m`);
    };

    wsInstance.current = socket;

    term.onData((data) => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(data);
      }
    });

    const resizeObserver = new ResizeObserver(() => {
      fitAddon.fit();
      if (socket.readyState === WebSocket.OPEN) {
        const { cols, rows } = term;
        socket.send(JSON.stringify({ type: 'resize', cols, rows }));
      }
    });
    resizeObserver.observe(terminalRef.current);

    return () => {
      resizeObserver.disconnect();
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
      term.dispose();
      termInstance.current = null;
      wsInstance.current = null;
    };
  }, [pod, namespace, container]);

  return (
    <div className="kubernetes-terminal" style={{ padding: '8px', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span>Terminal: {pod} ({namespace})</span>
        {onClose && <button onClick={onClose}>Close</button>}
      </div>
      <div ref={terminalRef} style={{ height: 'calc(100% - 30px)', width: '100%' }} />
    </div>
  );
};

export default KubernetesTerminal;
