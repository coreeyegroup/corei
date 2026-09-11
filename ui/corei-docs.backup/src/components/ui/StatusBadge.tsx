import { cn } from '@/lib/utils';

interface Props {
  status: string;
  size?: 'sm' | 'md';
}

export default function StatusBadge({ status, size = 'md' }: Props) {
  const statusMap: Record<string, string> = {
    FROZEN: 'badge-frozen',
    COMPLETE: 'badge-complete',
    CERTIFIED: 'badge-certified',
    IN_PROGRESS: 'badge-in-progress',
    PENDING: 'badge-pending',
  };
  const sizeClasses = {
    sm: 'text-[0.6rem] px-1.5 py-0.5',
    md: 'text-xs px-2 py-0.5',
  };
  return (
    <span className={cn('badge', statusMap[status] || 'badge-pending', sizeClasses[size])}>
      {status}
    </span>
  );
}
