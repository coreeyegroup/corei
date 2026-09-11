import React, { useState } from 'react';
import {
  executeOperation,
  type OperationResult,
} from '../../../services/infrastructureService';

interface KubernetesLogsProps {
  pods: any[];
}

const KubernetesLogs: React.FC<KubernetesLogsProps> = ({ pods }) => {
  const [pod, setPod] = useState('');
  const [namespace, setNamespace] = useState('default');
  const [container, setContainer] = useState('');
  const [result, setResult] = useState<OperationResult | null>(null);
  const [loading, setLoading] = useState(false);

  const loadLogs = async () => {
    if (!pod.trim() || !namespace.trim()) {
      setResult({
        success: false,
        message: 'Pod and namespace are required',
      });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await executeOperation(
        'kubernetes',
        'logs',
        {
          pod: pod.trim(),
          namespace: namespace.trim(),
          ...(container.trim()
            ? { container: container.trim() }
            : {}),
        },
      );

      setResult(response);
    } catch (error) {
      setResult({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : String(error),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="kubernetes-logs"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        minHeight: '520px',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'minmax(180px, 1fr) minmax(130px, 180px) minmax(160px, 1fr) auto',
          gap: '8px',
          alignItems: 'end',
          padding: '10px',
          border:
            '1px solid var(--border-subtle, #2a2a2a)',
          borderRadius: '5px',
        }}
      >
        <label
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            fontSize: '11px',
          }}
        >
          Pod
          <input
            list="kubernetes-log-pods"
            value={pod}
            onChange={(event) => setPod(event.target.value)}
            placeholder="pod-name"
          />
          <datalist id="kubernetes-log-pods">
            {pods.map((item, index) => (
              <option
                key={`${item.name || 'pod'}-${index}`}
                value={item.name}
              >
                {item.namespace || ''}
              </option>
            ))}
          </datalist>
        </label>

        <label
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            fontSize: '11px',
          }}
        >
          Namespace
          <input
            value={namespace}
            onChange={(event) =>
              setNamespace(event.target.value)
            }
            placeholder="default"
          />
        </label>

        <label
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            fontSize: '11px',
          }}
        >
          Container
          <input
            value={container}
            onChange={(event) =>
              setContainer(event.target.value)
            }
            placeholder="optional"
          />
        </label>

        <button
          type="button"
          onClick={loadLogs}
          disabled={loading}
          style={{
            minHeight: '32px',
            padding: '6px 12px',
          }}
        >
          {loading ? 'Loading…' : 'Load Logs'}
        </button>
      </div>

      <div
        style={{
          flex: 1,
          minHeight: '440px',
          border:
            '1px solid var(--border-subtle, #2a2a2a)',
          borderRadius: '5px',
          overflow: 'hidden',
          background:
            'var(--bg-code, #0b0b0b)',
        }}
      >
        {!result ? (
          <div
            style={{
              padding: '16px',
              color: 'var(--text-muted, #777)',
              fontSize: '12px',
            }}
          >
            Select a pod and load its logs.
          </div>
        ) : !result.success ? (
          <div
            style={{
              padding: '16px',
              color: 'var(--text-primary, #ddd)',
              fontSize: '12px',
            }}
          >
            <strong>LOG REQUEST FAILED</strong>
            <div style={{ marginTop: '6px' }}>
              {result.message || 'Unknown error'}
            </div>
          </div>
        ) : (
          <pre
            style={{
              margin: 0,
              padding: '12px',
              height: '100%',
              overflow: 'auto',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              fontFamily:
                'var(--font-mono, monospace)',
              fontSize: '11px',
              lineHeight: 1.45,
            }}
          >
            {typeof result.data === 'string'
              ? result.data
              : result.logs?.join('\n') ||
                JSON.stringify(
                  result.data,
                  null,
                  2,
                ) ||
                'No log output returned.'}
          </pre>
        )}
      </div>
    </div>
  );
};

export default KubernetesLogs;
