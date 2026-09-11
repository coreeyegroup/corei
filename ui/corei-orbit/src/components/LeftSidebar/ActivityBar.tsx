// src/components/LeftSidebar/ActivityBar.tsx
import React from 'react';
import { usePreferencesStore, type DomainId } from '../../store/preferencesStore';
import { DOMAINS } from './domains';

interface ActivityBarProps {
  className?: string;
}

const ActivityBar: React.FC<ActivityBarProps> = ({ className = '' }) => {
  const { activeDomain, setActiveDomain } = usePreferencesStore();

  const handleDomainClick = (id: DomainId) => {
    if (activeDomain !== id) {
      setActiveDomain(id);
    }
  };

  return (
    <div className={`activity-bar ${className}`}>
      {DOMAINS.map((domain) => {
        const isActive = activeDomain === domain.id;
        const IconComponent = domain.icon;

        return (
          <button
            key={domain.id}
            className={`activity-item ${isActive ? 'active' : ''}`}
            onClick={() => handleDomainClick(domain.id)}
            title={domain.label}
          >
            <IconComponent size={20} />
            <span className="activity-tooltip">{domain.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ActivityBar;
