// src/components/TopRibbon/DropdownMenu.tsx
import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface DropdownMenuProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: 'left' | 'right';
  className?: string;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  trigger,
  children,
  align = 'left',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const toggle = () => setIsOpen((v) => !v);

  const triggerElement = (
    <div ref={triggerRef} onClick={toggle} className={`dropdown-trigger ${className}`}>
      {trigger}
    </div>
  );

  if (!isOpen) return triggerElement;

  const rect = triggerRef.current?.getBoundingClientRect();
  if (!rect) return triggerElement;

  const menuStyle: React.CSSProperties = {
    position: 'fixed',
    top: rect.bottom + 4,
    left: align === 'left' ? rect.left : undefined,
    right: align === 'right' ? window.innerWidth - rect.right : undefined,
    minWidth: Math.max(rect.width, 180),
    zIndex: 9999,
  };

  return (
    <>
      {triggerElement}
      {createPortal(
        <div ref={menuRef} className="topribbon-dropdown-menu" style={menuStyle}>
          {children}
        </div>,
        document.body
      )}
    </>
  );
};
