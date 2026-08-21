import type { SVGProps } from 'react';

export default function Gemini({
  className,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1080 1080"
      fill="none"
      className={className}
      {...props}
    >
      <defs>
        <linearGradient
          id="gemini-gradient"
          x1="180"
          y1="850"
          x2="900"
          y2="180"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#00A86B" />
          <stop offset="0.28" stopColor="#00BFA5" />
          <stop offset="0.55" stopColor="#4285F4" />
          <stop offset="0.78" stopColor="#9B51E0" />
          <stop offset="1" stopColor="#FF3D3D" />
        </linearGradient>
      </defs>

      <path
        fill="url(#gemini-gradient)"
        d="M540 80c32 142 91 260 184 353 93 93 211 152 353 184-142 32-260 91-353 184-93 93-152 211-184 353-32-142-91-260-184-353-93-93-211-152-353-184 142-32 260-91 353-184C449 340 508 222 540 80Z"
      />
    </svg>
  );
}
