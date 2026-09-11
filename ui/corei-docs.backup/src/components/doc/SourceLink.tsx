import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import CodeViewer from './CodeViewer';

interface SourceLinkProps {
  path: string;
  label?: string;
}

export default function SourceLink({ path, label }: SourceLinkProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-bg-tertiary border border-border-color hover:border-gold transition-colors text-sm font-mono text-text-secondary cursor-pointer"
        >
          <span className="text-text-muted">📁</span>
          {label || path.split('/').pop()}
          <span className="text-text-muted text-xs">↗</span>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-4xl max-h-[90vh] bg-bg-primary border border-border-color rounded-lg shadow-2xl z-50 flex flex-col">
          <CodeViewer path={path} onClose={() => setOpen(false)} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
