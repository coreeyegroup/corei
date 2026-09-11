import React from 'react';

interface OperationButtonProps {
  label: string;
  icon?: string;
  onClick: () => void;
  confirm?: boolean;
  loading?: boolean;
  disabled?: boolean;
}

export const OperationButton: React.FC<OperationButtonProps> = ({
  label,
  icon,
  onClick,
  confirm,
  loading,
  disabled,
}) => {
  const handleClick = () => {
    if (confirm && !window.confirm(`Are you sure you want to ${label}?`)) return;
    onClick();
  };

  return (
    <button
      className="op-btn"
      onClick={handleClick}
      disabled={disabled || loading}
      style={{
        background: 'transparent',
        border: '1px solid #444',
        padding: '4px 12px',
        borderRadius: '4px',
        cursor: 'pointer',
        color: '#ccc',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '0.85rem',
      }}
    >
      {icon && <span>{icon}</span>}
      {label}
      {loading && <span>⟳</span>}
    </button>
  );
};
