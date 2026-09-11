import { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface Props {
  items: TocItem[];
}

export default function TableOfContents({ items }: Props) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -80% 0px' }
    );

    const elements = items.map(item => document.getElementById(item.id)).filter(Boolean);
    elements.forEach(el => observer.observe(el!));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <div className="sticky top-4">
      <h4 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">On this page</h4>
      <ul className="space-y-1">
        {items.map(item => (
          <li key={item.id} style={{ paddingLeft: (item.level - 1) * 12 }}>
            <a
              href={`#${item.id}`}
              className={`text-sm hover:text-gold transition-colors ${
                activeId === item.id ? 'text-gold' : 'text-text-muted'
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
