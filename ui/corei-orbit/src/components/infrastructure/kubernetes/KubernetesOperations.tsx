import React, { useMemo, useState } from 'react';
import {
  executeOperation,
  type OperationResult,
} from '../../../services/infrastructureService';

type OperationKey =
  | 'scale-deployment'
  | 'restart-pod'
  | 'logs'
  | 'describe-pod'
  | 'cordon'
  | 'uncordon'
  | 'drain'
  | 'rollout-restart'
  | 'rollout-pause'
  | 'rollout-resume'
  | 'rollout-history'
  | 'rollout-undo'
  | 'delete-resource';

interface OperationDefinition {
  key: OperationKey;
  label: string;
  category: string;
  resource: string;
  method: 'GET' | 'POST';
  destructive?: boolean;
  fields: Array<{
    key: string;
    label: string;
    placeholder: string;
    required?: boolean;
    type?: 'text' | 'number';
  }>;
}

const OPERATIONS: OperationDefinition[] = [
  {
    key: 'scale-deployment',
    label: 'Scale Deployment',
    category: 'Workloads',
    resource: 'Deployment',
    method: 'POST',
    fields: [
      { key: 'deployment', label: 'Deployment', placeholder: 'deployment-name', required: true },
      { key: 'namespace', label: 'Namespace', placeholder: 'default', required: true },
      { key: 'replicas', label: 'Replicas', placeholder: '3', required: true, type: 'number' },
    ],
  },
  {
    key: 'restart-pod',
    label: 'Restart Pod',
    category: 'Workloads',
    resource: 'Pod',
    method: 'POST',
    destructive: true,
    fields: [
      { key: 'pod', label: 'Pod', placeholder: 'pod-name', required: true },
      { key: 'namespace', label: 'Namespace', placeholder: 'default', required: true },
    ],
  },
  {
    key: 'logs',
    label: 'Pod Logs',
    category: 'Diagnostics',
    resource: 'Pod',
    method: 'GET',
    fields: [
      { key: 'pod', label: 'Pod', placeholder: 'pod-name', required: true },
      { key: 'namespace', label: 'Namespace', placeholder: 'default', required: true },
      { key: 'container', label: 'Container', placeholder: 'container-name' },
    ],
  },
  {
    key: 'describe-pod',
    label: 'Describe Pod',
    category: 'Diagnostics',
    resource: 'Pod',
    method: 'GET',
    fields: [
      { key: 'pod', label: 'Pod', placeholder: 'pod-name', required: true },
      { key: 'namespace', label: 'Namespace', placeholder: 'default', required: true },
    ],
  },
  {
    key: 'cordon',
    label: 'Cordon Node',
    category: 'Nodes',
    resource: 'Node',
    method: 'POST',
    destructive: true,
    fields: [
      { key: 'node', label: 'Node', placeholder: 'node-name', required: true },
    ],
  },
  {
    key: 'uncordon',
    label: 'Uncordon Node',
    category: 'Nodes',
    resource: 'Node',
    method: 'POST',
    fields: [
      { key: 'node', label: 'Node', placeholder: 'node-name', required: true },
    ],
  },
  {
    key: 'drain',
    label: 'Drain Node',
    category: 'Nodes',
    resource: 'Node',
    method: 'POST',
    destructive: true,
    fields: [
      { key: 'node', label: 'Node', placeholder: 'node-name', required: true },
    ],
  },
  {
    key: 'rollout-restart',
    label: 'Rollout Restart',
    category: 'Rollout',
    resource: 'Deployment',
    method: 'POST',
    fields: [
      { key: 'deployment', label: 'Deployment', placeholder: 'deployment-name', required: true },
      { key: 'namespace', label: 'Namespace', placeholder: 'default', required: true },
    ],
  },
  {
    key: 'rollout-pause',
    label: 'Rollout Pause',
    category: 'Rollout',
    resource: 'Deployment',
    method: 'POST',
    fields: [
      { key: 'deployment', label: 'Deployment', placeholder: 'deployment-name', required: true },
      { key: 'namespace', label: 'Namespace', placeholder: 'default', required: true },
    ],
  },
  {
    key: 'rollout-resume',
    label: 'Rollout Resume',
    category: 'Rollout',
    resource: 'Deployment',
    method: 'POST',
    fields: [
      { key: 'deployment', label: 'Deployment', placeholder: 'deployment-name', required: true },
      { key: 'namespace', label: 'Namespace', placeholder: 'default', required: true },
    ],
  },
  {
    key: 'rollout-history',
    label: 'Rollout History',
    category: 'Rollout',
    resource: 'Deployment',
    method: 'GET',
    fields: [
      { key: 'deployment', label: 'Deployment', placeholder: 'deployment-name', required: true },
      { key: 'namespace', label: 'Namespace', placeholder: 'default', required: true },
    ],
  },
  {
    key: 'rollout-undo',
    label: 'Rollback Deployment',
    category: 'Rollout',
    resource: 'Deployment',
    method: 'POST',
    destructive: true,
    fields: [
      { key: 'deployment', label: 'Deployment', placeholder: 'deployment-name', required: true },
      { key: 'namespace', label: 'Namespace', placeholder: 'default', required: true },
      { key: 'revision', label: 'Revision', placeholder: '1', required: true, type: 'number' },
    ],
  },
  {
    key: 'delete-resource',
    label: 'Delete Resource',
    category: 'Resource Control',
    resource: 'Kubernetes Resource',
    method: 'POST',
    destructive: true,
    fields: [
      { key: 'resource_type', label: 'Resource Type', placeholder: 'deployment', required: true },
      { key: 'name', label: 'Resource Name', placeholder: 'resource-name', required: true },
      { key: 'namespace', label: 'Namespace', placeholder: 'default' },
    ],
  },
];

const KubernetesOperations: React.FC = () => {
  const [selectedKey, setSelectedKey] =
    useState<OperationKey>('scale-deployment');
  const [values, setValues] = useState<Record<string, string>>({});
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<OperationResult | null>(null);
  const [startedAt, setStartedAt] = useState<string | null>(null);

  const operation = useMemo(
    () => OPERATIONS.find((item) => item.key === selectedKey) || OPERATIONS[0],
    [selectedKey],
  );

  const groupedOperations = useMemo(() => {
    return OPERATIONS.reduce<Record<string, OperationDefinition[]>>(
      (groups, item) => {
        if (!groups[item.category]) groups[item.category] = [];
        groups[item.category].push(item);
        return groups;
      },
      {},
    );
  }, []);

  const selectOperation = (key: OperationKey) => {
    setSelectedKey(key);
    setValues({});
    setResult(null);
    setStartedAt(null);
  };

  const execute = async () => {
    const missing = operation.fields
      .filter((field) => field.required)
      .find((field) => !String(values[field.key] || '').trim());

    if (missing) {
      setResult({
        success: false,
        message: `${missing.label} is required`,
      });
      return;
    }

    if (operation.destructive) {
      const confirmed = window.confirm(
        `Confirm ${operation.label}? This operation can change cluster state.`,
      );

      if (!confirmed) return;
    }

    const params: Record<string, string | number> = {};

    operation.fields.forEach((field) => {
      const value = String(values[field.key] || '').trim();

      if (!value) return;

      params[field.key] =
        field.type === 'number' ? Number(value) : value;
    });

    setRunning(true);
    setResult(null);
    setStartedAt(new Date().toISOString());

    try {
      const response = await executeOperation(
        'kubernetes',
        operation.key,
        params,
      );

      setResult(response);
    } catch (error) {
      setResult({
        success: false,
        message: error instanceof Error ? error.message : String(error),
      });
    } finally {
      setRunning(false);
    }
  };

  return (
    <div className="kubernetes-operations">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(220px, 280px) minmax(0, 1fr)',
          gap: '12px',
          minHeight: '520px',
        }}
      >
        <section
          style={{
            border: '1px solid var(--border-subtle, #2a2a2a)',
            borderRadius: '6px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '10px 12px',
              borderBottom: '1px solid var(--border-subtle, #2a2a2a)',
              fontWeight: 600,
              fontSize: '12px',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            Operation Catalog
          </div>

          <div style={{ padding: '8px' }}>
            {Object.entries(groupedOperations).map(
              ([category, items]) => (
                <div key={category} style={{ marginBottom: '12px' }}>
                  <div
                    style={{
                      padding: '5px 7px',
                      color: 'var(--text-muted, #888)',
                      fontSize: '10px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {category}
                  </div>

                  {items.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => selectOperation(item.key)}
                      style={{
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '7px 8px',
                        marginBottom: '2px',
                        border: 0,
                        borderRadius: '4px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        background:
                          selectedKey === item.key
                            ? 'var(--bg-active, #252525)'
                            : 'transparent',
                        color: 'var(--text-primary, #ddd)',
                      }}
                    >
                      <span>{item.label}</span>
                      {item.destructive && (
                        <span
                          title="State-changing operation"
                          aria-label="State-changing operation"
                        >
                          !
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              ),
            )}
          </div>
        </section>

        <section
          style={{
            border: '1px solid var(--border-subtle, #2a2a2a)',
            borderRadius: '6px',
            padding: '14px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '12px',
              marginBottom: '16px',
            }}
          >
            <div>
              <div style={{ fontSize: '16px', fontWeight: 650 }}>
                {operation.label}
              </div>
              <div
                style={{
                  marginTop: '4px',
                  color: 'var(--text-muted, #888)',
                  fontSize: '11px',
                }}
              >
                {operation.category} · {operation.resource} ·{' '}
                {operation.method}
              </div>
            </div>

            {operation.destructive && (
              <span
                style={{
                  padding: '3px 7px',
                  border: '1px solid var(--border-warning, #665522)',
                  borderRadius: '3px',
                  fontSize: '10px',
                  textTransform: 'uppercase',
                }}
              >
                State changing
              </span>
            )}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '10px',
            }}
          >
            {operation.fields.map((field) => (
              <label
                key={field.key}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '5px',
                  fontSize: '11px',
                }}
              >
                <span>
                  {field.label}
                  {field.required ? ' *' : ''}
                </span>

                <input
                  type={field.type || 'text'}
                  value={values[field.key] || ''}
                  placeholder={field.placeholder}
                  onChange={(event) =>
                    setValues((current) => ({
                      ...current,
                      [field.key]: event.target.value,
                    }))
                  }
                  style={{
                    minHeight: '30px',
                    padding: '5px 8px',
                    border:
                      '1px solid var(--border-subtle, #333)',
                    borderRadius: '4px',
                    background:
                      'var(--bg-input, #111)',
                    color:
                      'var(--text-primary, #ddd)',
                  }}
                />
              </label>
            ))}
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: '16px',
              paddingTop: '12px',
              borderTop:
                '1px solid var(--border-subtle, #2a2a2a)',
            }}
          >
            <button
              type="button"
              onClick={execute}
              disabled={running}
              style={{
                minWidth: '130px',
                minHeight: '32px',
                padding: '6px 12px',
                border: '1px solid var(--border-control, #444)',
                borderRadius: '4px',
                cursor: running ? 'wait' : 'pointer',
                background: 'var(--bg-control, #202020)',
                color: 'var(--text-primary, #eee)',
              }}
            >
              {running ? 'Executing…' : 'Execute Operation'}
            </button>

            {startedAt && (
              <span
                style={{
                  color: 'var(--text-muted, #888)',
                  fontSize: '10px',
                }}
              >
                Requested {new Date(startedAt).toLocaleTimeString()}
              </span>
            )}
          </div>

          <div
            style={{
              marginTop: '16px',
              border:
                '1px solid var(--border-subtle, #2a2a2a)',
              borderRadius: '5px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                padding: '8px 10px',
                borderBottom:
                  '1px solid var(--border-subtle, #2a2a2a)',
                fontSize: '11px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Operation Result
            </div>

            {!result ? (
              <div
                style={{
                  padding: '20px',
                  color: 'var(--text-muted, #777)',
                  fontSize: '12px',
                }}
              >
                No operation executed in this session.
              </div>
            ) : (
              <div style={{ padding: '10px' }}>
                <div
                  style={{
                    display: 'flex',
                    gap: '12px',
                    marginBottom: '8px',
                    fontSize: '11px',
                  }}
                >
                  <strong>
                    {result.success ? 'SUCCEEDED' : 'FAILED'}
                  </strong>
                  <span>{result.message || 'No message'}</span>
                </div>

                {result.data !== undefined && (
                  <pre
                    style={{
                      margin: 0,
                      maxHeight: '280px',
                      overflow: 'auto',
                      padding: '10px',
                      background: 'var(--bg-code, #0c0c0c)',
                      fontSize: '11px',
                      lineHeight: 1.45,
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                    }}
                  >
                    {typeof result.data === 'string'
                      ? result.data
                      : JSON.stringify(result.data, null, 2)}
                  </pre>
                )}

                {result.logs && result.logs.length > 0 && (
                  <pre
                    style={{
                      marginTop: '8px',
                      maxHeight: '220px',
                      overflow: 'auto',
                      padding: '10px',
                      background: 'var(--bg-code, #0c0c0c)',
                      fontSize: '11px',
                      lineHeight: 1.45,
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {result.logs.join('\n')}
                  </pre>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default KubernetesOperations;
