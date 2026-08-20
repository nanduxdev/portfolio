import React from 'react';

type DrizzleProps = {
  className?: string;
};

export default function Drizzle({ className }: DrizzleProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      className={className}
      role="img"
      aria-label="Drizzle ORM"
    >
      <g fill="none" stroke="#C5F432" strokeWidth="22" strokeLinecap="round">
        <path d="M67 143 91 96" />
        <path d="M124 105 148 58" />
        <path d="M153 143 177 96" />
        <path d="M209 105 233 58" />
      </g>
    </svg>
  );
}
