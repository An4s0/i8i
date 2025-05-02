export default function Error404({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      stroke="currentColor"
      className={className}
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      height={size}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3 7v4a1 1 0 0 0 1 1h3"></path>
      <path d="M7 7v10"></path>
      <path d="M10 8v8a1 1 0 0 0 1 1h2a1 1 0 0 0 1 -1v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1z"></path>
      <path d="M17 7v4a1 1 0 0 0 1 1h3"></path>
      <path d="M21 7v10"></path>
    </svg>
  );
}
