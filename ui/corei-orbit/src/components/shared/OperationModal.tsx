import React, { useState } from 'react';

interface OperationParam {
  name: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'boolean';
  required?: boolean;
  options?: string[];
  default?: any;
}

interface OperationModalProps {
  operation: { id: string; label: string; params?: OperationParam[] };
  onSubmit: (params: Record<string, any>) => void;
  onCancel: () => void;
  loading?: boolean;
}

export const OperationModal: React.FC<OperationModalProps> = ({
  operation,
  onSubmit,
  onCancel,
  loading,
}) => {
  const [params, setParams] = useState<Record<string, any>>(() => {
    const defaults: Record<string, any> = {};
    operation.params?.forEach((p) => {
      defaults[p.name] = p.default || '';
    });
    return defaults;
  });

  const handleChange = (name: string, value: any) => {
    setParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const missing = operation.params?.filter(p => p.required && !params[p.name]);
    if (missing && missing.length > 0) {
      alert(`Missing required fields: ${missing.map(p => p.label).join(', ')}`);
      return;
    }
    onSubmit(params);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }} onClick={onCancel}>
      <div style={{
        background: '#1e1e1e',
        padding: '24px',
        borderRadius: '8px',
        minWidth: '400px',
        maxWidth: '600px',
      }} onClick={e => e.stopPropagation()}>
        <h3 style={{ marginTop: 0 }}>{operation.label}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {operation.params?.map((param) => (
            <div key={param.name}>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem' }}>
                {param.label}
              </label>
              {param.type === 'select' ? (
                <select
                  value={params[param.name] || ''}
                  onChange={(e) => handleChange(param.name, e.target.value)}
                  style={{ width: '100%', padding: '6px', background: '#2a2a2a', color: '#fff', border: '1px solid #444' }}
                >
                  {param.options?.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : param.type === 'boolean' ? (
                <input
                  type="checkbox"
                  checked={params[param.name] || false}
                  onChange={(e) => handleChange(param.name, e.target.checked)}
                />
              ) : (
                <input
                  type={param.type}
                  value={params[param.name] || ''}
                  onChange={(e) => handleChange(param.name, e.target.value)}
                  style={{ width: '100%', padding: '6px', background: '#2a2a2a', color: '#fff', border: '1px solid #444' }}
                  placeholder={param.default ? `Default: ${param.default}` : ''}
                />
              )}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '16px' }}>
          <button onClick={onCancel} disabled={loading} style={{ padding: '6px 16px', background: 'transparent', border: '1px solid #666', color: '#ccc', borderRadius: '4px', cursor: 'pointer' }}>
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={loading} style={{ padding: '6px 16px', background: '#3b82f6', border: 'none', color: '#fff', borderRadius: '4px', cursor: 'pointer' }}>
            {loading ? 'Executing...' : 'Execute'}
          </button>
        </div>
      </div>
    </div>
  );
};
