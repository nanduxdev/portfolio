import type { SVGProps } from 'react';

export function MarkdownIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      {...props}
    >
      <rect
        width="21"
        height="15"
        x="1.5"
        y="4.5"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.75"
        d="M5 15V9l3 3 3-3v6m3-6v6m0 0 2-2m-2 2-2-2"
      />
    </svg>
  );
}
