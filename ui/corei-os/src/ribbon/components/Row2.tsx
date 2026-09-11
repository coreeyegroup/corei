// src/ribbon/components/Row2.tsx
/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * TOP RIBBON — ROW 02
 *
 * Institutional Operations & Infrastructure Status Surface
 *
 * VISUAL STANDARD
 * - Split layout with OPERATIONS and INFRASTRUCTURE columns.
 * - Draggable, scrollable item lists.
 * - Status dots for infrastructure health.
 * - Uniform styling aligned with Row 01.
 *
 * EXECUTION BOUNDARY
 * - Row 02 presentation/composition only.
 * - Uses local state (like Row 01) – no global store.
 * - Dispatches custom events for item clicks.
 * - No infrastructure provider introduced.
 *
 ******************************************************************************/

import React, { useRef, useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// ─── Types ──────────────────────────────────────────────────────────────
type Priority = 'must' | 'high' | 'nice' | 'optional';
type HealthStatus = 'HEALTHY' | 'DEGRADED' | 'OFFLINE' | 'UNKNOWN';

interface BaseItem {
  id: string;
  label: string;
  priority: Priority;
}

interface OpsItem extends BaseItem {
  section: 'operations';
  value: string;
}

interface InfraItem extends BaseItem {
  section: 'infrastructure';
  value: string;
  status?: HealthStatus;
}

type RibbonItem = OpsItem | InfraItem;

// ─── Initial Data (Static, like Row 1's context-derived initial values) ──
const INITIAL_ITEMS: RibbonItem[] = [
  // OPERATIONS
  { id: 'market', section: 'operations', label: 'MARKET', value: 'OPEN', priority: 'must' },
  { id: 'trading', section: 'operations', label: 'TRADING', value: 'PAPER', priority: 'must' },
  { id: 'broker', section: 'operations', label: 'BROKER', value: 'CONNECTED', priority: 'must' },
  { id: 'pnl', section: 'operations', label: 'P&L', value: '+2.3%', priority: 'high' },
  { id: 'risk', section: 'operations', label: 'RISK', value: '45%', priority: 'high' },
  { id: 'datafeed', section: 'operations', label: 'DATA FEED', value: 'LIVE', priority: 'nice' },
  { id: 'region', section: 'operations', label: 'REGION', value: 'INDIA', priority: 'nice' },
  { id: 'strategies', section: 'operations', label: 'STRATEGIES', value: '4', priority: 'optional' },

  // INFRASTRUCTURE
  { id: 'kafka', section: 'infrastructure', label: 'KAFKA', value: 'HEALTHY', priority: 'must', status: 'HEALTHY' },
  { id: 'redis', section: 'infrastructure', label: 'REDIS', value: 'HEALTHY', priority: 'must', status: 'HEALTHY' },
  { id: 'postgres', section: 'infrastructure', label: 'POSTGRES', value: 'HEALTHY', priority: 'must', status: 'HEALTHY' },
  { id: 'websocket', section: 'infrastructure', label: 'WEBSOCKET', value: 'CONNECTED', priority: 'high', status: 'HEALTHY' },
  { id: 'api', section: 'infrastructure', label: 'API', value: 'HEALTHY', priority: 'high', status: 'HEALTHY' },
  { id: 'cpu', section: 'infrastructure', label: 'CPU', value: '32%', priority: 'nice' },
  { id: 'memory', section: 'infrastructure', label: 'MEMORY', value: '58%', priority: 'nice' },
  { id: 'eps', section: 'infrastructure', label: 'EPS', value: '1.2K', priority: 'optional' },
];

// ─── Sortable Item ──────────────────────────────────────────────────────
interface SortableItemProps {
  item: RibbonItem;
}

const SortableItem: React.FC<SortableItemProps> = ({ item }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  // Status dot for infrastructure items
  const statusDot = (() => {
    if (item.section !== 'infrastructure') return null;
    const status = (item as InfraItem).status;
    if (!status) return null;
    const cls =
      status === 'HEALTHY' ? 'healthy'
        : status === 'DEGRADED' ? 'degraded'
        : status === 'OFFLINE' ? 'offline'
        : 'unknown';
    return <span className={`status-dot ${cls}`} />;
  })();

  // Click handler dispatches a custom event (exactly like Row 1's alerts)
  const handleClick = () => {
    window.dispatchEvent(
      new CustomEvent('corei:ribbon:item:click', {
        detail: { id: item.id, section: item.section, label: item.label },
      })
    );
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`domain-item ${isDragging ? 'dragging' : ''}`}
      {...attributes}
      {...listeners}
      onClick={handleClick}
    >
      <span className="item-label">{item.label}</span>
      <strong className="item-value">{(item as any).value}</strong>
      {statusDot}
    </div>
  );
};

// ─── Column ──────────────────────────────────────────────────────────────
interface ColumnProps {
  label: string;
  items: RibbonItem[];
  onItemsReorder: (items: RibbonItem[]) => void;
}

const Column: React.FC<ColumnProps> = ({ label, items, onItemsReorder }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftBtn, setShowLeftBtn] = useState(false);
  const [showRightBtn, setShowRightBtn] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollAmount = container.clientWidth * 0.6;
    container.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  };

  const checkScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    setShowLeftBtn(container.scrollLeft > 10);
    setShowRightBtn(container.scrollLeft < container.scrollWidth - container.clientWidth - 10);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    container.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
    setTimeout(checkScroll, 50);
    return () => {
      container.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [items]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;
    onItemsReorder(arrayMove(items, oldIndex, newIndex));
  };

  return (
    <div className="column">
      <span className="column-label">{label}</span>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((i) => i.id)} strategy={horizontalListSortingStrategy}>
          <div className="scroll-container" ref={scrollRef}>
            <div className="items-wrapper">
              {items.map((item) => (
                <SortableItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        </SortableContext>
      </DndContext>
      <div className="scroll-btn-group">
        {showLeftBtn && <button className="scroll-btn" onClick={() => scroll('left')} title="Scroll left">◄</button>}
        {showRightBtn && <button className="scroll-btn" onClick={() => scroll('right')} title="Scroll right">►</button>}
      </div>
    </div>
  );
};

// ─── Main Row02 ──────────────────────────────────────────────────────────
const Row02: React.FC = () => {
  // Local state for items – identical to how Row 1 uses useState for org/workspace
  const [items, setItems] = useState<RibbonItem[]>(INITIAL_ITEMS);

  const opsItems = items.filter((i) => i.section === 'operations');
  const infraItems = items.filter((i) => i.section === 'infrastructure');

  return (
    <div className="row-02 split-layout">
      <Column
        label="OPERATIONS"
        items={opsItems}
        onItemsReorder={(newItems) => {
          const rest = items.filter((i) => i.section !== 'operations');
          setItems([...newItems, ...rest]);
        }}
      />
      <div className="column-divider" />
      <Column
        label="INFRASTRUCTURE"
        items={infraItems}
        onItemsReorder={(newItems) => {
          const rest = items.filter((i) => i.section !== 'infrastructure');
          setItems([...rest, ...newItems]);
        }}
      />
    </div>
  );
};

export default Row02;
