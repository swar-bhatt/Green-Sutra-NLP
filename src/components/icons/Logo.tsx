import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 22c-2 0-3-1-3-3 0-1.66 1.34-3 3-3s3 1.34 3 3c0 2-1 3-3 3z" />
      <path d="M12 16c-5 0-7-2-7-7 0-4 2.5-6.5 7-6.5s7 2.5 7 6.5c0 5-2 7-7 7z" />
      <path d="M12 16V2.5" />
    </svg>
  );
}
