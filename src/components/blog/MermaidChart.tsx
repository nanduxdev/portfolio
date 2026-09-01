'use client';

import mermaid from 'mermaid';
import { useTheme } from 'next-themes';
import { useEffect, useId, useState } from 'react';

interface MermaidChartProps {
  chart: string;
  className?: string;
}

let initializedTheme: 'dark' | 'light' | null = null;

function initializeMermaid(theme: 'dark' | 'light') {
  if (initializedTheme === theme) {
    return;
  }

  mermaid.initialize({
    startOnLoad: false,
    theme: theme === 'dark' ? 'dark' : 'default',
    securityLevel: 'strict',
    fontFamily: 'inherit',
  });

  initializedTheme = theme;
}

export function MermaidChart({ chart, className = '' }: MermaidChartProps) {
  const id = useId().replace(/:/g, '');
  const { resolvedTheme } = useTheme();
  const [svg, setSvg] = useState('');
  const [error, setError] = useState<string | null>(null);
  const chartSource = typeof chart === 'string' ? chart.trim() : '';

  useEffect(() => {
    if (!chartSource) {
      setError('Diagram source is empty.');
      setSvg('');
      return;
    }

    const theme = resolvedTheme === 'dark' ? 'dark' : 'light';
    initializeMermaid(theme);

    let cancelled = false;

    const renderChart = async () => {
      try {
        const { svg: renderedSvg } = await mermaid.render(
          `mermaid-${id}-${Date.now()}`,
          chartSource,
        );

        if (!cancelled) {
          setSvg(renderedSvg);
          setError(null);
        }
      } catch (renderError) {
        if (!cancelled) {
          setError(
            renderError instanceof Error
              ? renderError.message
              : 'Failed to render diagram',
          );
          setSvg('');
        }
      }
    };

    void renderChart();

    return () => {
      cancelled = true;
    };
  }, [chartSource, id, resolvedTheme]);

  if (error) {
    return (
      <pre className="text-destructive overflow-x-auto rounded-lg border p-4 text-xs">
        {error}
      </pre>
    );
  }

  if (!svg) {
    return (
      <div className="bg-muted/40 h-48 animate-pulse rounded-lg" aria-hidden />
    );
  }

  return (
    <div
      className={`[&_svg]:mx-auto [&_svg]:block [&_svg]:h-auto [&_svg]:w-full [&_svg]:max-w-full ${className}`}
      role="img"
      aria-label="Diagram"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
