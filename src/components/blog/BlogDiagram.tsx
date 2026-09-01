import React from 'react';

import { BlogDiagramClient } from './BlogDiagramClient';

interface BlogDiagramProps {
  caption?: string;
  chart?: string;
  children?: React.ReactNode;
  className?: string;
}

function extractText(node: React.ReactNode): string {
  if (typeof node === 'string') {
    return node;
  }

  if (typeof node === 'number') {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(extractText).join('');
  }

  if (
    React.isValidElement(node) &&
    node.props &&
    typeof node.props === 'object'
  ) {
    return extractText((node.props as { children?: React.ReactNode }).children);
  }

  return '';
}

function resolveChart(chart?: string, children?: React.ReactNode): string {
  if (typeof chart === 'string' && chart.trim()) {
    return chart.trim();
  }

  const childText = extractText(children).trim();
  if (childText) {
    return childText;
  }

  return '';
}

export function BlogDiagram({
  caption,
  chart,
  children,
  className,
}: BlogDiagramProps) {
  const chartSource = resolveChart(chart, children);

  if (!chartSource) {
    return (
      <div className="not-prose my-8">
        <pre className="text-destructive overflow-x-auto rounded-lg border p-4 text-xs">
          Diagram source is missing. Pass a Mermaid chart via the chart prop or
          use a ```mermaid code block.
        </pre>
      </div>
    );
  }

  return (
    <BlogDiagramClient
      caption={caption}
      chart={chartSource}
      className={className}
    />
  );
}
