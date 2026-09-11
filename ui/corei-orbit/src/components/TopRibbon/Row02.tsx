// src/components/TopRibbon/Row02.tsx
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
import { useInfrastructureStore } from '../../store/infrastructureStore';
import type { HealthStatus } from '../../store/infrastructureStore';
import { fetchTradingStatus } from '../../services/tradingService';

// ─── Types ──────────────────────────────────────────────────────────────
type Priority = 'must' | 'high' | 'nice' | 'optional';

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

// ─── Initial Data ──────────────────────────────────────────────────────
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

// ─── Sortable Item Component ──────────────────────────────────────────
interface SortableItemProps {
  item: RibbonItem;
  getValue: (item: RibbonItem) => { value: string; statusDot: React.ReactNode };
}

const SortableItem: React.FC<SortableItemProps> = ({ item, getValue }) => {
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

  const { value, statusDot } = getValue(item);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`domain-item ${isDragging ? 'dragging' : ''}`}
      {...attributes}
      {...listeners}
    >
      <span className="item-label">{item.label}</span>
      <strong className="item-value">{value}</strong>
      {statusDot}
    </div>
  );
};

// ─── Column Component ──────────────────────────────────────────────────
interface ColumnProps {
  label: string;
  items: RibbonItem[];
  onItemsReorder: (items: RibbonItem[]) => void;
  getValue: (item: RibbonItem) => { value: string; statusDot: React.ReactNode };
}

const Column: React.FC<ColumnProps> = ({ label, items, onItemsReorder, getValue }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftBtn, setShowLeftBtn] = useState(false);
  const [showRightBtn, setShowRightBtn] = useState(true);

  // ─── Scroll Navigation ──────────────────────────────────────────────
  const scroll = (direction: 'left' | 'right') => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollAmount = container.clientWidth * 0.6;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
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
    // Initial check after mount
    setTimeout(checkScroll, 50);
    return () => {
      container.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [items]);

  // ─── DnD ─────────────────────────────────────────────────────────────
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const newItems = arrayMove(items, oldIndex, newIndex);
    onItemsReorder(newItems);
  };

  return (
    <div className="column">
      <span className="column-label">{label}</span>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map((item) => item.id)}
          strategy={horizontalListSortingStrategy}
        >
          <div className="scroll-container" ref={scrollRef}>
            <div className="items-wrapper">
              {items.map((item) => (
                <SortableItem
                  key={item.id}
                  item={item}
                  getValue={getValue}
                />
              ))}
            </div>
          </div>
        </SortableContext>
      </DndContext>

      <div className="scroll-btn-group">
        {showLeftBtn && (
          <button className="scroll-btn" onClick={() => scroll('left')} title="Scroll left">
            ◄
          </button>
        )}
        {showRightBtn && (
          <button className="scroll-btn" onClick={() => scroll('right')} title="Scroll right">
            ►
          </button>
        )}
      </div>
    </div>
  );
};

// ─── Main Row02 Component ──────────────────────────────────────────────
const Row02: React.FC = () => {
  const [items, setItems] = useState<RibbonItem[]>(INITIAL_ITEMS);
  const { services } = useInfrastructureStore();

  // ─── Fetch trading status and update operation items ────────────────
  useEffect(() => {
    const updateTradingStatus = async () => {
      try {
        const status = await fetchTradingStatus();
        setItems((prevItems) =>
          prevItems.map((item) => {
            if (item.section === 'operations' && status[item.id]) {
              return { ...item, value: status[item.id].value };
            }
            return item;
          })
        );
      } catch (e) {
        // Silently fall back to static values
      }
    };

    updateTradingStatus();
    const interval = setInterval(updateTradingStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  // ─── Helpers ──────────────────────────────────────────────────────────
  const getStatusDot = (status?: HealthStatus) => {
    if (!status) return null;
    const cls =
      status === 'HEALTHY'
        ? 'healthy'
        : status === 'DEGRADED'
          ? 'degraded'
          : status === 'OFFLINE'
            ? 'offline'
            : 'unknown';
    return <span className={`status-dot ${cls}`} />;
  };

  const getValue = (item: RibbonItem): { value: string; statusDot: React.ReactNode } => {
    if (item.section === 'infrastructure') {
      const infraItem = item as InfraItem;
      const serviceStatus = services.find((s) => s.name === item.label);
      if (serviceStatus) {
        return {
          value: serviceStatus.status,
          statusDot: getStatusDot(serviceStatus.status),
        };
      }
      return {
        value: infraItem.value,
        statusDot: getStatusDot(infraItem.status),
      };
    }
    return { value: (item as OpsItem).value, statusDot: null };
  };

  const opsItems = items.filter((item) => item.section === 'operations');
  const infraItems = items.filter((item) => item.section === 'infrastructure');

  return (
    <div className="row-02 split-layout">
      <Column
        label="OPERATIONS"
        items={opsItems}
        onItemsReorder={(newItems) => {
          const rest = items.filter((i) => i.section !== 'operations');
          setItems([...newItems, ...rest]);
        }}
        getValue={getValue}
      />

      <div className="column-divider" />

      <Column
        label="INFRASTRUCTURE"
        items={infraItems}
        onItemsReorder={(newItems) => {
          const rest = items.filter((i) => i.section !== 'infrastructure');
          setItems([...rest, ...newItems]);
        }}
        getValue={getValue}
      />
    </div>
  );
};

export default Row02;
