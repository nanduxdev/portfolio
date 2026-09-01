'use client';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

import { MermaidChart } from './MermaidChart';

interface BlogDiagramClientProps {
  caption?: string;
  chart: string;
  className?: string;
}

function DiagramFrame({
  chart,
  className,
  expanded = false,
}: {
  chart: string;
  className?: string;
  expanded?: boolean;
}) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl bg-gray-50/50 p-4 dark:bg-gray-800/25',
        className,
      )}
    >
      <MermaidChart
        chart={chart}
        className={expanded ? '[&_svg]:max-h-none' : '[&_svg]:max-h-96'}
      />
    </div>
  );
}

export function BlogDiagramClient({
  caption,
  chart,
  className,
}: BlogDiagramClientProps) {
  const label = caption || 'Diagram';

  return (
    <div
      className={cn(
        'not-prose my-8 flex flex-col items-center gap-2',
        className,
      )}
    >
      <Dialog>
        <DialogTrigger asChild>
          <button
            type="button"
            className="group relative w-full cursor-zoom-in rounded-2xl border border-black/5 p-4 text-left transition-colors hover:bg-gray-50/80 dark:border-white/5 dark:hover:bg-gray-800/40"
            aria-label={`Expand diagram: ${label}`}
          >
            <DiagramFrame chart={chart} />
            <span className="pointer-events-none absolute inset-0 rounded-2xl border border-black/5 dark:border-white/5" />
          </button>
        </DialogTrigger>
        <DialogContent
          className="max-h-[90vh] max-w-[95vw] overflow-auto sm:max-w-5xl"
          showCloseButton
        >
          <DialogTitle className="sr-only">{label}</DialogTitle>
          <DiagramFrame
            chart={chart}
            expanded
            className="border-0 bg-transparent p-2"
          />
        </DialogContent>
      </Dialog>

      {caption ? (
        <p className="text-muted-foreground max-w-2xl text-center text-sm italic">
          {caption}
        </p>
      ) : null}
    </div>
  );
}
