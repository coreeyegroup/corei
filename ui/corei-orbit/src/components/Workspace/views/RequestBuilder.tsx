// src/components/Workspace/views/RequestBuilder.tsx
import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { log } from '../../../services/loggerService';

// ─── Types ────────────────────────────────────────────────────────────────
interface FormData {
  workflow: {
    id: string;
    name: string;
    version: string;
    schema: string;
    executionMode: 'LIVE' | 'PAPER' | 'BACKTEST' | 'REPLAY';
  };
  runtime: {
    executionId: string;
    environment: 'PRODUCTION' | 'STAGING' | 'DEVELOPMENT';
    timeout_ms: number;
    retry_enabled: boolean;
    retry_count: number;
  };
  market: {
    exchange: string;
    segment: string;
    asset_class: string;
    primary_instrument_key: string;
    secondary_instrument_key: string;
    volatility_instrument_key: string;
    timezone: string;
  };
  provider: {
    provider_name: string;
    provider_version: string;
    provider_environment: 'PRODUCTION' | 'STAGING';
    base_url_v2: string;
    base_url_v3: string;
    http_method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    auth_type: 'Bearer' | 'API Key' | 'OAuth' | 'None';
  };
  request: {
    request_id: string;
    request_type: string;
    request_mode: 'LIVE' | 'HISTORICAL';
    request_source: string;
    priority: 'HIGH' | 'NORMAL' | 'LOW';
    requested_by: string;
    schema_version: string;
    historical_interval: string;
    from_date: string;
    to_date: string;
  };
  collection: {
    parallel: boolean;
    batch_size: number;
    max_concurrent: number;
    throttle_ms: number;
  };
  cache: {
    enabled: boolean;
    duration_sec: number;
    force_refresh: boolean;
  };
  responseFormat: 'RAW' | 'NORMALIZED' | 'RAW_AND_NORMALIZED';
  trigger: {
    type: 'MANUAL' | 'SCHEDULE' | 'INTERNAL';
    scheduleName?: string;
  };
}

interface Template {
  id: string;
  template_name: string;
  workflow: any;
  request: any;
  market: any;
  provider: any;
  runtime: any;
  collection: any;
  cache: any;
  responseFormat: any;
  trigger: any;
  formData: FormData;
}

const DEFAULT_FORM: FormData = {
  workflow: {
    id: 'WF001',
    name: 'MARKET_REQUEST_ENGINE',
    version: '1.0.0',
    schema: 'market_request_v1',
    executionMode: 'LIVE',
  },
  runtime: {
    executionId: '',
    environment: 'PRODUCTION',
    timeout_ms: 30000,
    retry_enabled: true,
    retry_count: 3,
  },
  market: {
    exchange: 'NSE',
    segment: 'INDEX',
    asset_class: 'INDEX',
    primary_instrument_key: 'NSE_INDEX|Nifty 50',
    secondary_instrument_key: 'NSE_INDEX|Nifty Bank',
    volatility_instrument_key: 'NSE_INDEX|India VIX',
    timezone: 'Asia/Kolkata',
  },
  provider: {
    provider_name: 'UPSTOX',
    provider_version: 'v2',
    provider_environment: 'PRODUCTION',
    base_url_v2: 'https://api.upstox.com/v2',
    base_url_v3: 'https://api.upstox.com/v3',
    http_method: 'GET',
    auth_type: 'None',
  },
  request: {
    request_id: '',
    request_type: 'MARKET_REQUEST',
    request_mode: 'LIVE',
    request_source: 'WORKFLOW',
    priority: 'NORMAL',
    requested_by: 'SYSTEM',
    schema_version: 'market_request_v1',
    historical_interval: 'day',
    from_date: '2026-02-02',
    to_date: '2026-08-02',
  },
  collection: {
    parallel: true,
    batch_size: 20,
    max_concurrent: 5,
    throttle_ms: 200,
  },
  cache: {
    enabled: true,
    duration_sec: 10,
    force_refresh: false,
  },
  responseFormat: 'RAW',
  trigger: {
    type: 'MANUAL',
    scheduleName: 'Every Minute',
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────
const generateExecutionId = (wfId: string) => {
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
  const seq = String(Math.floor(Math.random() * 1000000)).padStart(6, '0');
  return `${wfId}-${dateStr}-${seq}`;
};

const generateRequestId = () => {
  return `REQ-${String(Math.floor(Math.random() * 1000000000)).padStart(9, '0')}`;
};

// ─── Component ────────────────────────────────────────────────────────────
const RequestBuilder: React.FC = () => {
  const [webhookPath, setWebhookPath] = useState('/webhook/request');
  const [formData, setFormData] = useState<FormData>(DEFAULT_FORM);
  const [response, setResponse] = useState<{ status: number; latency: number; records?: number; body: any } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'json' | 'headers' | 'query' | 'url'>('json');
  const [showLoadDropdown, setShowLoadDropdown] = useState(false);
  const [templates, setTemplates] = useState<Template[]>([]);
  const loadDropdownRef = useRef<HTMLDivElement>(null);
  const [previewFontSize, setPreviewFontSize] = useState(() => {
    const saved = localStorage.getItem('requestPreviewFontSize');
    return saved ? parseFloat(saved) : 0.9; // increased from 0.75
  });

  useEffect(() => {
    localStorage.setItem('requestPreviewFontSize', String(previewFontSize));
  }, [previewFontSize]);

  useEffect(() => {
    const saved = localStorage.getItem('requestFormData');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!parsed.trigger) {
          parsed.trigger = { type: 'MANUAL', scheduleName: 'Every Minute' };
        }
        if (!parsed.runtime.executionId) {
          parsed.runtime.executionId = generateExecutionId(parsed.workflow.id || 'WF001');
        }
        if (!parsed.request.request_id) {
          parsed.request.request_id = generateRequestId();
        }
        setFormData(parsed);
      } catch (e) {}
    } else {
      const initial = { ...DEFAULT_FORM };
      initial.runtime.executionId = generateExecutionId(initial.workflow.id);
      initial.request.request_id = generateRequestId();
      setFormData(initial);
    }
    const savedPath = localStorage.getItem('requestBuilderPath');
    if (savedPath) setWebhookPath(savedPath);

    const storedTemplates = localStorage.getItem('requestTemplates');
    if (storedTemplates) {
      try {
        setTemplates(JSON.parse(storedTemplates));
      } catch (e) {}
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (loadDropdownRef.current && !loadDropdownRef.current.contains(e.target as Node)) {
        setShowLoadDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    localStorage.setItem('requestFormData', JSON.stringify(formData));
  }, [formData]);

  const updateForm = (section: keyof FormData, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: Object.assign({}, prev[section], { [field]: value }),
    }));
  };

  const buildPayload = () => {
    const now = new Date().toISOString();
    const isHistorical = formData.request.request_mode === 'HISTORICAL';
    return {
      workflow: formData.workflow,
      runtime: {
        ...formData.runtime,
        executionId: formData.runtime.executionId,
      },
      market: formData.market,
      provider: { ...formData.provider },
      request: {
        ...formData.request,
        historical: isHistorical
          ? {
              enabled: true,
              interval: formData.request.historical_interval,
              from_date: formData.request.from_date,
              to_date: formData.request.to_date,
            }
          : undefined,
      },
      collection: formData.collection,
      cache: formData.cache,
      responseFormat: formData.responseFormat,
      trigger: formData.trigger,
      validation: {
        status: 'PASS',
        validated: true,
        validation_version: '1.0.0',
        validation_timestamp: now,
        checks: {
          workflow: true,
          runtime: true,
          market: true,
          provider: true,
          request: true,
          collection: true,
          cache: true,
          trigger: true,
        },
        errors: [],
        warnings: [],
      },
      audit: {
        audit_version: '1.0.0',
        workflow_id: formData.workflow.id,
        workflow_name: formData.workflow.name,
        event: 'MARKET_REQUEST_CREATED',
        status: 'SUCCESS',
        trace_enabled: true,
        logging_enabled: true,
        created_at: now,
      },
      handoff: {
        source_workflow: formData.workflow.id,
        source_workflow_name: formData.workflow.name,
        source_node: `${formData.workflow.id}_204_HANDOFF_DATA_COLLECTION`,
        target_workflow: 'WF002_DATA_COLLECTION',
        target_entry_node: 'WF002_001_REQUEST_ROUTER',
        handoff_status: 'READY',
        payload_version: '1.0.0',
        handoff_timestamp: now,
        correlation_id: `${formData.workflow.id}-${Date.now()}`,
      },
    };
  };

  const validate = () => {
    const errors: string[] = [];
    if (!formData.workflow.id) errors.push('Workflow ID is required');
    if (!formData.market.exchange) errors.push('Exchange is required');
    if (!formData.provider.provider_name) errors.push('Provider name is required');
    if (formData.request.request_mode === 'HISTORICAL') {
      if (!formData.request.from_date || !formData.request.to_date) {
        errors.push('Historical dates are required');
      }
    }
    return errors;
  };

  // ─── API calls ──────────────────────────────────────────────────────────
  const saveTemplate = async (templateName: string) => {
    try {
      const existingTemplates = JSON.parse(localStorage.getItem('requestTemplates') || '[]');
      const newTemplate: Template = {
        id: `tpl-${Date.now()}`,
        template_name: templateName,
        workflow: formData.workflow,
        request: formData.request,
        market: formData.market,
        provider: formData.provider,
        runtime: formData.runtime,
        collection: formData.collection,
        cache: formData.cache,
        responseFormat: formData.responseFormat,
        trigger: formData.trigger,
        formData: formData,
      };
      const updated = [...existingTemplates, newTemplate];
      localStorage.setItem('requestTemplates', JSON.stringify(updated));
      setTemplates(updated);
      toast.success(`Template "${templateName}" saved`);
      log('info', `📁 Template saved: ${templateName}`);
    } catch (err: any) {
      toast.error(`Save failed: ${err.message}`);
    }
  };

  const loadTemplate = (template: Template) => {
    setFormData(template.formData);
    localStorage.setItem('requestFormData', JSON.stringify(template.formData));
    toast.success(`Template "${template.template_name}" loaded`);
    setShowLoadDropdown(false);
    log('info', `📂 Template loaded: ${template.template_name}`);
  };

  // ─── Send ───────────────────────────────────────────────────────────────
  const handleSend = async () => {
    const errors = validate();
    if (errors.length > 0) {
      toast.error(`Validation failed: ${errors.join(', ')}`);
      return;
    }

    setLoading(true);
    setError(null);
    setResponse(null);
    const startTime = performance.now();
    try {
      const payload = buildPayload();
      const jsonPayload = JSON.stringify(payload, null, 2);

      const res = await fetch(`/api/n8n${webhookPath}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: jsonPayload,
      });

      const latency = Math.round(performance.now() - startTime);
      const responseBody = await res.text();
      let parsedBody;
      try { parsedBody = JSON.parse(responseBody); } catch { parsedBody = responseBody; }

      let records = undefined;
      if (parsedBody && typeof parsedBody === 'object' && parsedBody.records !== undefined) {
        records = parsedBody.records;
      } else if (Array.isArray(parsedBody)) {
        records = parsedBody.length;
      }

      setResponse({ status: res.status, latency, records, body: parsedBody });

      if (res.ok) {
        toast.success(`Request sent (${res.status}) • ${latency}ms`);
        log('info', `📨 Request to ${webhookPath} succeeded (${res.status})`);
      } else {
        toast.error(`Request failed (${res.status})`);
        log('error', `❌ Request to ${webhookPath} failed (${res.status})`);
      }
    } catch (err: any) {
      setError(err.message);
      toast.error(`Network error: ${err.message}`);
      log('error', `❌ Request error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // ─── Copy helper ──────────────────────────────────────────────────────
  const copyToClipboard = (text: string, label: string = 'Content') => {
    if (!text || text.trim() === '') {
      toast.warning('Nothing to copy');
      return;
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .then(() => {
          toast.success(`${label} copied to clipboard`);
          log('info', `📋 ${label} copied to clipboard`);
        })
        .catch(() => {
          fallbackCopy(text, label);
        });
    } else {
      fallbackCopy(text, label);
    }
  };

  const fallbackCopy = (text: string, label: string) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      toast.success(`${label} copied to clipboard`);
      log('info', `📋 ${label} copied to clipboard (fallback)`);
    } catch (err) {
      toast.error('Failed to copy');
    }
    document.body.removeChild(textarea);
  };

  // ─── Render helpers ────────────────────────────────────────────────────
  const renderSection = (
    title: string,
    section: keyof FormData,
    fields: { key: string; label: string; type?: string; options?: string[]; readonly?: boolean }[]
  ) => {
    const styles = {
      section: { marginBottom: '0.8rem' },
      header: {
        fontSize: '0.75rem',
        fontWeight: 600,
        color: 'var(--accent-teal, #00E5A0)',
        letterSpacing: '0.4px',
        textTransform: 'uppercase' as const,
        borderBottom: '1px solid var(--border-color, #1F2937)',
        paddingBottom: '0.25rem',
        marginBottom: '0.3rem',
      },
      grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '0.3rem 0.8rem',
      },
      field: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.3rem',
      },
      label: {
        fontSize: '0.8rem',
        color: 'var(--text-muted, #94A3B8)',
        whiteSpace: 'nowrap' as const,
        minWidth: '8ch',
        textAlign: 'right' as const,
      },
      input: {
        flex: 1,
        background: 'var(--bg-input, #1A2330)',
        border: '1px solid var(--border-color, #1F2937)',
        color: 'var(--text-primary, #E2E8F0)',
        padding: '2px 6px',
        borderRadius: 2,
        fontSize: '0.8rem',
        height: '1.6rem',
        fontFamily: 'monospace',
        minWidth: 0,
      },
      select: {
        flex: 1,
        background: 'var(--bg-input, #1A2330)',
        border: '1px solid var(--border-color, #1F2937)',
        color: 'var(--text-primary, #E2E8F0)',
        padding: '2px 6px',
        borderRadius: 2,
        fontSize: '0.8rem',
        height: '1.6rem',
        fontFamily: 'inherit',
        minWidth: 0,
      },
      checkbox: {
        accentColor: 'var(--accent-teal, #00E5A0)',
        margin: 0,
        width: '1rem',
        height: '1rem',
        flexShrink: 0,
      },
      readonly: {
        flex: 1,
        fontSize: '0.8rem',
        color: 'var(--text-primary, #E2E8F0)',
        fontFamily: 'monospace',
        padding: '2px 6px',
        background: 'var(--bg-secondary, #0F151E)',
        borderRadius: 2,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap' as const,
      },
    };

    return (
      <div style={styles.section}>
        <div style={styles.header}>{title}</div>
        <div style={styles.grid}>
          {fields.map((field) => {
            const value = (formData[section] as any)[field.key];
            return (
              <div key={field.key} style={styles.field}>
                <label style={styles.label}>{field.label}</label>
                {field.readonly ? (
                  <span style={styles.readonly}>{value}</span>
                ) : field.options ? (
                  <select
                    value={value}
                    onChange={(e) => updateForm(section, field.key, e.target.value)}
                    style={styles.select}
                  >
                    {field.options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : field.type === 'checkbox' ? (
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => updateForm(section, field.key, e.target.checked)}
                    style={styles.checkbox}
                  />
                ) : (
                  <input
                    type={field.type || 'text'}
                    value={value}
                    onChange={(e) => updateForm(section, field.key, e.target.value)}
                    style={styles.input}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // ─── Render ─────────────────────────────────────────────────────────────
  const isSendDisabled = loading || formData.trigger.type !== 'MANUAL';

  const increasePreviewFont = () => {
    setPreviewFontSize(Math.min(previewFontSize + 0.05, 1.4));
  };
  const decreasePreviewFont = () => {
    setPreviewFontSize(Math.max(previewFontSize - 0.05, 0.6));
  };

  const getPreviewContent = () => {
    switch (activeTab) {
      case 'json':
        return JSON.stringify(buildPayload(), null, 2);
      case 'headers':
        return `Content-Type: application/json\nX-Request-Id: ${formData.request.request_id}`;
      case 'query':
        return `mode=${formData.request.request_mode}&exchange=${formData.market.exchange}`;
      case 'url':
        return `/api/n8n${webhookPath}`;
      default:
        return '';
    }
  };

  const getResponseContent = () => {
    if (error) return `Error: ${error}`;
    if (!response) return '';
    let bodyStr = typeof response.body === 'object' ? JSON.stringify(response.body, null, 2) : String(response.body);
    let recordStr = response.records !== undefined ? `\nRecords: ${response.records}` : '';
    return `Status: ${response.status}\nLatency: ${response.latency}ms${recordStr}\n\n${bodyStr}`;
  };

  return (
    <div
      className="view-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: '0.6rem 0.8rem',
        overflow: 'hidden',
        fontSize: '1rem',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          marginBottom: '0.6rem',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontSize: '1.3rem',
            fontWeight: 600,
            color: 'var(--text-primary, #E2E8F0)',
          }}
        >
          📨 Request Builder
        </span>
      </div>

      {/* Toolbar */}
      <div
        style={{
          display: 'flex',
          gap: '0.4rem',
          marginBottom: '0.6rem',
          alignItems: 'center',
          flexShrink: 0,
          flexWrap: 'wrap',
        }}
      >
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted, #94A3B8)', whiteSpace: 'nowrap' }}>
          Webhook:
        </span>
        <input
          type="text"
          value={webhookPath}
          onChange={(e) => setWebhookPath(e.target.value)}
          style={{
            flex: 1,
            minWidth: '14ch',
            background: 'var(--bg-input, #1A2330)',
            border: '1px solid var(--border-color, #1F2937)',
            color: 'var(--text-primary, #E2E8F0)',
            padding: '2px 8px',
            borderRadius: 2,
            fontSize: '0.8rem',
            fontFamily: 'monospace',
            height: '1.8rem',
          }}
        />
        <button
          onClick={() => {
            const errors = validate();
            if (errors.length > 0) {
              toast.warning(`Validation issues: ${errors.join(', ')}`);
            } else {
              toast.success('Validation passed');
            }
          }}
          style={{
            padding: '0 0.8rem',
            borderRadius: 2,
            height: '1.8rem',
            fontSize: '0.75rem',
            background: 'var(--bg-input, #1A2330)',
            border: '1px solid var(--border-color, #1F2937)',
            color: 'var(--text-muted, #94A3B8)',
            cursor: 'pointer',
          }}
        >
          Validate
        </button>
        <button
          onClick={() => {
            const name = prompt('Enter template name:', 'NIFTY_LIVE');
            if (name) saveTemplate(name);
          }}
          style={{
            padding: '0 0.8rem',
            borderRadius: 2,
            height: '1.8rem',
            fontSize: '0.75rem',
            background: 'var(--bg-input, #1A2330)',
            border: '1px solid var(--border-color, #1F2937)',
            color: 'var(--text-muted, #94A3B8)',
            cursor: 'pointer',
          }}
        >
          Save
        </button>
        <div ref={loadDropdownRef} style={{ position: 'relative', display: 'inline-block' }}>
          <button
            onClick={() => setShowLoadDropdown(!showLoadDropdown)}
            style={{
              padding: '0 0.8rem',
              borderRadius: 2,
              height: '1.8rem',
              fontSize: '0.75rem',
              background: 'var(--bg-input, #1A2330)',
              border: '1px solid var(--border-color, #1F2937)',
              color: 'var(--text-muted, #94A3B8)',
              cursor: 'pointer',
            }}
          >
            Load
          </button>
          {showLoadDropdown && (
            <div
              style={{
                position: 'absolute',
                top: '2rem',
                left: 0,
                background: 'var(--bg-secondary, #0F151E)',
                border: '1px solid var(--border-color, #1F2937)',
                borderRadius: 3,
                padding: '4px 0',
                minWidth: '16ch',
                maxHeight: '200px',
                overflowY: 'auto',
                zIndex: 100,
              }}
            >
              {templates.length === 0 ? (
                <div style={{ padding: '4px 12px', fontSize: '0.75rem', color: 'var(--text-muted, #94A3B8)' }}>
                  No templates
                </div>
              ) : (
                templates.map((tpl) => (
                  <div
                    key={tpl.id}
                    onClick={() => loadTemplate(tpl)}
                    style={{
                      padding: '4px 12px',
                      fontSize: '0.75rem',
                      color: 'var(--text-primary, #E2E8F0)',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-hover, #1A2330)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    {tpl.template_name}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
        <button
          onClick={handleSend}
          disabled={isSendDisabled}
          style={{
            padding: '0 1rem',
            borderRadius: 2,
            height: '1.8rem',
            fontSize: '0.75rem',
            fontWeight: 600,
            border: 'none',
            background: isSendDisabled ? 'var(--border-color, #1F2937)' : 'var(--accent-teal, #00E5A0)',
            color: isSendDisabled ? 'var(--text-muted, #94A3B8)' : '#0B0E14',
            cursor: isSendDisabled ? 'not-allowed' : 'pointer',
            opacity: isSendDisabled ? 0.5 : 1,
          }}
        >
          {loading ? '⏳' : '▶ Send'}
        </button>
        <button
          onClick={() => setActiveTab(activeTab === 'json' ? 'headers' : 'json')}
          style={{
            padding: '0 0.8rem',
            borderRadius: 2,
            height: '1.8rem',
            fontSize: '0.75rem',
            background: 'var(--bg-input, #1A2330)',
            border: '1px solid var(--border-color, #1F2937)',
            color: 'var(--text-muted, #94A3B8)',
            cursor: 'pointer',
          }}
        >
          {activeTab === 'json' ? 'Show Headers' : 'Show JSON'}
        </button>

        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginLeft: '0.2rem' }}>Zoom:</span>
        <button
          onClick={decreasePreviewFont}
          style={{
            padding: '0 0.4rem',
            borderRadius: 2,
            height: '1.6rem',
            fontSize: '0.7rem',
            background: 'var(--bg-input)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-muted)',
            cursor: 'pointer',
          }}
        >
          A-
        </button>
        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', minWidth: '3ch', textAlign: 'center' }}>
          {Math.round(previewFontSize * 100)}%
        </span>
        <button
          onClick={increasePreviewFont}
          style={{
            padding: '0 0.4rem',
            borderRadius: 2,
            height: '1.6rem',
            fontSize: '0.7rem',
            background: 'var(--bg-input)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-muted)',
            cursor: 'pointer',
          }}
        >
          A+
        </button>
      </div>

      {/* Main: Form + Preview/Response */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          gap: '0.8rem',
          minHeight: 0,
          overflow: 'hidden',
        }}
      >
        {/* Left: Form (70%) */}
        <div
          style={{
            flex: 7,
            overflow: 'auto',
            paddingRight: '0.6rem',
          }}
        >
          {renderSection('Workflow', 'workflow', [
            { key: 'id', label: 'ID' },
            { key: 'name', label: 'Name' },
            { key: 'version', label: 'Version' },
            { key: 'schema', label: 'Schema' },
            { key: 'executionMode', label: 'Mode', options: ['LIVE', 'PAPER', 'BACKTEST', 'REPLAY'] },
          ])}
          {renderSection('Runtime', 'runtime', [
            { key: 'executionId', label: 'Exec ID', readonly: true },
            { key: 'environment', label: 'Env', options: ['PRODUCTION', 'STAGING', 'DEVELOPMENT'] },
            { key: 'timeout_ms', label: 'Timeout (ms)', type: 'number' },
            { key: 'retry_enabled', label: 'Retry', type: 'checkbox' },
            { key: 'retry_count', label: 'Retry Count', type: 'number' },
          ])}
          {renderSection('Market', 'market', [
            { key: 'exchange', label: 'Exchange' },
            { key: 'segment', label: 'Segment' },
            { key: 'asset_class', label: 'Asset Class' },
            { key: 'primary_instrument_key', label: 'Primary' },
            { key: 'secondary_instrument_key', label: 'Secondary' },
            { key: 'volatility_instrument_key', label: 'Volatility' },
            { key: 'timezone', label: 'Timezone', options: ['Asia/Kolkata', 'UTC', 'America/New_York'] },
          ])}
          {renderSection('Provider', 'provider', [
            { key: 'provider_name', label: 'Name' },
            { key: 'provider_version', label: 'Version' },
            { key: 'provider_environment', label: 'Env', options: ['PRODUCTION', 'STAGING'] },
            { key: 'base_url_v2', label: 'URL v2' },
            { key: 'base_url_v3', label: 'URL v3' },
            { key: 'http_method', label: 'Method', options: ['GET', 'POST', 'PUT', 'DELETE'] },
            { key: 'auth_type', label: 'Auth', options: ['Bearer', 'API Key', 'OAuth', 'None'] },
          ])}
          {renderSection('Request', 'request', [
            { key: 'request_id', label: 'Request ID', readonly: true },
            { key: 'request_type', label: 'Type' },
            { key: 'request_mode', label: 'Mode', options: ['LIVE', 'HISTORICAL'] },
            { key: 'request_source', label: 'Source' },
            { key: 'priority', label: 'Priority', options: ['HIGH', 'NORMAL', 'LOW'] },
            { key: 'requested_by', label: 'Requested By' },
            { key: 'schema_version', label: 'Schema Ver.' },
          ])}
          {formData.request.request_mode === 'HISTORICAL' && (
            <div
              style={{
                marginTop: '-0.2rem',
                marginBottom: '0.6rem',
                paddingLeft: '1.5rem',
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: '0.3rem 0.8rem',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                  }}
                >
                  <label
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--text-muted, #94A3B8)',
                      minWidth: '8ch',
                      textAlign: 'right',
                    }}
                  >
                    Interval
                  </label>
                  <input
                    type="text"
                    value={formData.request.historical_interval}
                    onChange={(e) => updateForm('request', 'historical_interval', e.target.value)}
                    style={{
                      flex: 1,
                      background: 'var(--bg-input, #1A2330)',
                      border: '1px solid var(--border-color, #1F2937)',
                      color: 'var(--text-primary, #E2E8F0)',
                      padding: '2px 6px',
                      borderRadius: 2,
                      fontSize: '0.75rem',
                      height: '1.5rem',
                      fontFamily: 'monospace',
                    }}
                  />
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                  }}
                >
                  <label
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--text-muted, #94A3B8)',
                      minWidth: '8ch',
                      textAlign: 'right',
                    }}
                  >
                    From
                  </label>
                  <input
                    type="date"
                    value={formData.request.from_date}
                    onChange={(e) => updateForm('request', 'from_date', e.target.value)}
                    style={{
                      flex: 1,
                      background: 'var(--bg-input, #1A2330)',
                      border: '1px solid var(--border-color, #1F2937)',
                      color: 'var(--text-primary, #E2E8F0)',
                      padding: '2px 6px',
                      borderRadius: 2,
                      fontSize: '0.75rem',
                      height: '1.5rem',
                      fontFamily: 'monospace',
                    }}
                  />
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                  }}
                >
                  <label
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--text-muted, #94A3B8)',
                      minWidth: '8ch',
                      textAlign: 'right',
                    }}
                  >
                    To
                  </label>
                  <input
                    type="date"
                    value={formData.request.to_date}
                    onChange={(e) => updateForm('request', 'to_date', e.target.value)}
                    style={{
                      flex: 1,
                      background: 'var(--bg-input, #1A2330)',
                      border: '1px solid var(--border-color, #1F2937)',
                      color: 'var(--text-primary, #E2E8F0)',
                      padding: '2px 6px',
                      borderRadius: 2,
                      fontSize: '0.75rem',
                      height: '1.5rem',
                      fontFamily: 'monospace',
                    }}
                  />
                </div>
              </div>
            </div>
          )}
          {renderSection('Collection', 'collection', [
            { key: 'parallel', label: 'Parallel', type: 'checkbox' },
            { key: 'batch_size', label: 'Batch Size', type: 'number' },
            { key: 'max_concurrent', label: 'Max Concurrent', type: 'number' },
            { key: 'throttle_ms', label: 'Throttle (ms)', type: 'number' },
          ])}
          {renderSection('Cache', 'cache', [
            { key: 'enabled', label: 'Use Cache', type: 'checkbox' },
            { key: 'duration_sec', label: 'Duration (sec)', type: 'number' },
            { key: 'force_refresh', label: 'Force Refresh', type: 'checkbox' },
          ])}
          {renderSection('Trigger', 'trigger', [
            { key: 'type', label: 'Type', options: ['MANUAL', 'SCHEDULE', 'INTERNAL'] },
          ])}
          {formData.trigger.type === 'SCHEDULE' && (
            <div
              style={{
                marginTop: '-0.2rem',
                marginBottom: '0.6rem',
                paddingLeft: '1.5rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                }}
              >
                <label
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-muted, #94A3B8)',
                    minWidth: '8ch',
                    textAlign: 'right',
                  }}
                >
                  Schedule
                </label>
                <select
                  value={formData.trigger.scheduleName || 'Every Minute'}
                  onChange={(e) => updateForm('trigger', 'scheduleName', e.target.value)}
                  style={{
                    flex: 1,
                    background: 'var(--bg-input, #1A2330)',
                    border: '1px solid var(--border-color, #1F2937)',
                    color: 'var(--text-primary, #E2E8F0)',
                    padding: '2px 6px',
                    borderRadius: 2,
                    fontSize: '0.75rem',
                    height: '1.5rem',
                  }}
                >
                  <option>Every Minute</option>
                  <option>Every 5 Minutes</option>
                  <option>Every Hour</option>
                </select>
              </div>
            </div>
          )}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.6rem',
            }}
          >
            <label
              style={{
                fontSize: '0.75rem',
                color: 'var(--text-muted, #94A3B8)',
                minWidth: '8ch',
                textAlign: 'right',
              }}
            >
              Format
            </label>
            <select
              value={formData.responseFormat}
              onChange={(e) =>
                setFormData({ ...formData, responseFormat: e.target.value as any })
              }
              style={{
                flex: 1,
                background: 'var(--bg-input, #1A2330)',
                border: '1px solid var(--border-color, #1F2937)',
                color: 'var(--text-primary, #E2E8F0)',
                padding: '2px 6px',
                borderRadius: 2,
                fontSize: '0.75rem',
                height: '1.5rem',
              }}
            >
              <option value="RAW">Raw</option>
              <option value="NORMALIZED">Normalized</option>
              <option value="RAW_AND_NORMALIZED">Raw + Normalized</option>
            </select>
          </div>
        </div>

        {/* Right: Preview & Response (30%) */}
        <div
          style={{
            flex: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.6rem',
            minWidth: 0,
          }}
        >
          {/* Preview tabs */}
          <div
            style={{
              display: 'flex',
              gap: 0,
              borderBottom: '1px solid var(--border-color, #1F2937)',
              paddingBottom: 0,
              marginBottom: '0.2rem',
            }}
          >
            {(['json', 'headers', 'query', 'url'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  borderBottom:
                    activeTab === tab
                      ? '2px solid var(--accent-teal, #00E5A0)'
                      : '2px solid transparent',
                  color: activeTab === tab ? 'var(--text-primary, #E2E8F0)' : 'var(--text-muted, #94A3B8)',
                  fontSize: '0.75rem',
                  padding: '0.3rem 0.8rem',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontWeight: activeTab === tab ? 600 : 400,
                  transition: 'all 0.15s',
                  textTransform: 'uppercase',
                  letterSpacing: '0.3px',
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== tab)
                    e.currentTarget.style.color = 'var(--text-primary, #E2E8F0)';
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== tab)
                    e.currentTarget.style.color = 'var(--text-muted, #94A3B8)';
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Preview Panel with Copy Button */}
          <div
            style={{
              flex: 1,
              position: 'relative',
              background: 'var(--bg-input, #1A2330)',
              border: '1px solid var(--border-color, #1F2937)',
              borderRadius: 2,
              padding: '0.3rem',
              overflow: 'auto',
              fontSize: `${previewFontSize}rem`,
            }}
          >
            <button
              onClick={() => copyToClipboard(getPreviewContent(), 'Preview')}
              style={{
                position: 'absolute',
                top: '0.2rem',
                right: '0.2rem',
                background: 'var(--bg-secondary, #0F151E)',
                border: '1px solid var(--border-color, #1F2937)',
                borderRadius: 2,
                padding: '0.1rem 0.3rem',
                fontSize: '0.7rem',
                color: 'var(--text-muted, #94A3B8)',
                cursor: 'pointer',
                zIndex: 10,
              }}
              title="Copy content"
            >
              📋
            </button>
            {activeTab === 'json' && (
              <pre
                style={{
                  fontSize: 'inherit',
                  fontFamily: 'monospace',
                  color: 'var(--text-primary, #E2E8F0)',
                  margin: 0,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {JSON.stringify(buildPayload(), null, 2)}
              </pre>
            )}
            {activeTab === 'headers' && (
              <pre
                style={{
                  fontSize: 'inherit',
                  fontFamily: 'monospace',
                  color: 'var(--text-primary, #E2E8F0)',
                  margin: 0,
                }}
              >
                {`Content-Type: application/json\nX-Request-Id: ${formData.request.request_id}`}
              </pre>
            )}
            {activeTab === 'query' && (
              <pre
                style={{
                  fontSize: 'inherit',
                  fontFamily: 'monospace',
                  color: 'var(--text-primary, #E2E8F0)',
                  margin: 0,
                }}
              >
                {`mode=${formData.request.request_mode}&exchange=${formData.market.exchange}`}
              </pre>
            )}
            {activeTab === 'url' && (
              <pre
                style={{
                  fontSize: 'inherit',
                  fontFamily: 'monospace',
                  color: 'var(--text-primary, #E2E8F0)',
                  margin: 0,
                }}
              >
                {`/api/n8n${webhookPath}`}
              </pre>
            )}
          </div>

          {/* Response Panel – Copy button always visible */}
          <div
            style={{
              flex: 1,
              minHeight: '4rem',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                color: 'var(--text-muted, #94A3B8)',
                letterSpacing: '0.3px',
                marginBottom: '0.2rem',
              }}
            >
              Response
            </div>
            <div
              style={{
                flex: 1,
                position: 'relative',
                background: 'var(--bg-input, #1A2330)',
                border: '1px solid var(--border-color, #1F2937)',
                borderRadius: 2,
                padding: '0.3rem',
                fontSize: `${previewFontSize}rem`,
                fontFamily: 'monospace',
                color: 'var(--text-primary, #E2E8F0)',
                whiteSpace: 'pre-wrap',
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.3rem',
              }}
            >
              {/* Copy button always rendered */}
              <button
                onClick={() => copyToClipboard(getResponseContent(), 'Response')}
                style={{
                  position: 'absolute',
                  top: '0.2rem',
                  right: '0.2rem',
                  background: 'var(--bg-secondary, #0F151E)',
                  border: '1px solid var(--border-color, #1F2937)',
                  borderRadius: 2,
                  padding: '0.1rem 0.3rem',
                  fontSize: '0.7rem',
                  color: 'var(--text-muted, #94A3B8)',
                  cursor: 'pointer',
                  zIndex: 10,
                }}
                title="Copy response"
              >
                📋
              </button>
              {error ? (
                <span style={{ color: 'var(--danger-red, #FF4D4D)' }}>❌ {error}</span>
              ) : response ? (
                <>
                  <div
                    style={{
                      display: 'flex',
                      gap: '0.8rem',
                      fontSize: 'inherit',
                    }}
                  >
                    <span
                      style={{
                        color:
                          response.status < 400
                            ? 'var(--accent-teal, #00E5A0)'
                            : 'var(--danger-red, #FF4D4D)',
                      }}
                    >
                      Status: {response.status}
                    </span>
                    <span>Latency: {response.latency}ms</span>
                    {response.records !== undefined && (
                      <span>Records: {response.records}</span>
                    )}
                  </div>
                  <div
                    style={{
                      marginTop: '0.2rem',
                      overflow: 'auto',
                      fontSize: 'inherit',
                    }}
                  >
                    {typeof response.body === 'object'
                      ? JSON.stringify(response.body, null, 2)
                      : String(response.body)}
                  </div>
                </>
              ) : (
                <span style={{ color: 'var(--text-muted, #94A3B8)', fontSize: 'inherit' }}>
                  {loading ? '⏳ Sending...' : 'Response will appear here'}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestBuilder;
