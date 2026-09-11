export type DockSplitterOrientation =
  | 'horizontal'
  | 'vertical';

export interface DockSplitterProps {
  orientation: DockSplitterOrientation;
  className?: string;
}

export function DockSplitter({
  orientation,
  className,
}: DockSplitterProps) {
  return (
    <div
      className={[
        'corei-dock-splitter',
        `corei-dock-splitter--${orientation}`,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      data-orientation={orientation}
      aria-hidden="true"
    />
  );
}

export default DockSplitter;
