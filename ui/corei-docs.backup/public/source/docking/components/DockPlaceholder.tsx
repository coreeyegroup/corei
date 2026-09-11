import type { ReactNode } from 'react';

export interface DockPlaceholderProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  className?: string;
}

export function DockPlaceholder({
  title = 'Empty Dock',
  description = 'No content available.',
  icon,
  className,
}: DockPlaceholderProps) {
  return (
    <div
      className={[
        'corei-dock-placeholder',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {icon ? (
        <div className="corei-dock-placeholder__icon">
          {icon}
        </div>
      ) : null}

      <div className="corei-dock-placeholder__body">
        <div className="corei-dock-placeholder__title">
          {title}
        </div>

        <div className="corei-dock-placeholder__description">
          {description}
        </div>
      </div>
    </div>
  );
}

export default DockPlaceholder;
