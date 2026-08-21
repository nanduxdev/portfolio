import type { SVGProps } from 'react';

export default function GoogleDrive({
  className,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      {...props}
    >
      <path fill="#0F9D58" d="M16.1 6h9.8l14.7 25.5-4.9 8.5h-9.8L16.1 6Z" />
      <path fill="#FFCD40" d="M16.1 6 3.4 28h9.8L26 6h-9.9Z" />
      <path fill="#4285F4" d="M3.4 28 8.3 40h27.4l4.9-8.5H13.2L3.4 28Z" />
      <path
        fill="#F1F3F4"
        d="M13.2 31.5h27.4L35.7 40H8.3l4.9-8.5Z"
        opacity=".15"
      />
    </svg>
  );
}
