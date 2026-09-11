import React from 'react';
import { Files, Search, Layers, ShieldCheck, CheckCircle, RefreshCcw, LifeBuoy, Settings } from 'lucide-react';

const ActivityBar: React.FC = () => {
  const items = [
    { icon: <Files size={20} />, label: 'Explorer', active: true },
    { icon: <Search size={20} />, label: 'Search' },
    { icon: <Layers size={20} />, label: 'Structure' },
    { icon: <ShieldCheck size={20} />, label: 'Governance' },
    { icon: <CheckCircle size={20} />, label: 'Validation' },
    { icon: <RefreshCcw size={20} />, label: 'Operations' },
    { icon: <LifeBuoy size={20} />, label: 'Recovery' },
  ];

  return (
    <div className="corei-left">
      {items.map((item) => (
        <div key={item.label} className={`activity-item ${item.active ? 'active' : ''}`} title={item.label}>
          {item.icon}
        </div>
      ))}
      <div className="activity-util">
        <div className="activity-item" title="Settings"><Settings size={20} /></div>
      </div>
    </div>
  );
};

export default ActivityBar;
