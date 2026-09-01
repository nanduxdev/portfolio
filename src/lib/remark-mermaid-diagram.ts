import type { Root } from 'mdast';
import type { MdxJsxFlowElement } from 'mdast-util-mdx';
import { visit } from 'unist-util-visit';

function createStringAttribute(name: string, value: string) {
  return {
    type: 'mdxJsxAttribute' as const,
    name,
    value,
  };
}

export function remarkMermaidDiagram() {
  return (tree: Root) => {
    visit(tree, 'code', (node, index, parent) => {
      if (node.lang !== 'mermaid' || index === undefined || !parent) {
        return;
      }

      let caption: string | undefined;
      let chart = node.value;

      const lines = chart.split('\n');
      if (lines[0]?.startsWith('%% ')) {
        caption = lines[0].slice(3).trim();
        chart = lines.slice(1).join('\n').trim();
      }

      const attributes = [createStringAttribute('chart', chart)];

      if (caption) {
        attributes.unshift(createStringAttribute('caption', caption));
      }

      const diagramNode: MdxJsxFlowElement = {
        type: 'mdxJsxFlowElement',
        name: 'BlogDiagram',
        attributes,
        children: [],
      };

      parent.children[index] = diagramNode;
    });
  };
}
