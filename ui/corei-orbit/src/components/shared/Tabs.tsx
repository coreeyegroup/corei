// src/components/shared/Tabs.tsx
import React from 'react';
import './Tabs.css';

interface TabsProps {
  activeTab: string;
  onChange: (tab: string) => void;
  children: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({ activeTab, onChange, children }) => {
  return (
    <div className="tabs">
      {React.Children.map(children, (child) => {
        if (React.isValidElement<TabProps>(child) && child.type === Tab) {
          const tabValue = child.props.value || child.props.label;
          return React.cloneElement(child, {
            active: activeTab === tabValue,
            onClick: () => onChange(tabValue),
          });
        }
        return child;
      })}
    </div>
  );
};

interface TabProps {
  label: string;
  value?: string;
  active?: boolean;
  onClick?: () => void;
}

export const Tab: React.FC<TabProps> = ({ label, active, onClick }) => {
  return (
    <button className={`tab ${active ? 'active' : ''}`} onClick={onClick}>
      {label}
    </button>
  );
};
