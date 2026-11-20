const PATHS = {
  network: (
    <>
      <circle cx="12" cy="5" r="2.6" />
      <circle cx="5" cy="19" r="2.6" />
      <circle cx="19" cy="19" r="2.6" />
      <path d="M12 7.6v4.4m0 0L6.4 16.6M12 12l5.6 4.6" />
    </>
  ),
  wrench: (
    <>
      <path d="M15.5 4.5a4.5 4.5 0 1 0 4 7.6L20 20h-2l-7.9-7.9a4.5 4.5 0 0 1-5.4-6.2l2.9 2.9 2.1-2.1-2.9-2.9a4.5 4.5 0 0 1 4.7.7z" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v6c0 4.2-2.9 7.6-7 9-4.1-1.4-7-4.8-7-9V6z" />
      <path d="M9 12l2.2 2.2L15.5 10" />
    </>
  ),
  retention: (
    <>
      <path d="M20 12a8 8 0 1 1-2.6-5.9" />
      <path d="M20 4v4h-4" />
      <circle cx="12" cy="12" r="2.4" />
    </>
  ),
  team: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
      <path d="M16 6.2a3 3 0 0 1 0 5.6M17.5 20a5.6 5.6 0 0 0-2-4.3" />
    </>
  ),
  programme: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
      <path d="M3.5 10h17M8 3.5v3M16 3.5v3" />
      <path d="M8.5 14.5l2 2 4-4" />
    </>
  ),
  systems: (
    <>
      <rect x="3" y="4" width="18" height="12.5" rx="2" />
      <path d="M8 20.5h8M12 16.5v4M7 9h4M7 12h7" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M3.8 7l8.2 6 8.2-6" />
    </>
  ),
  phone: (
    <>
      <path d="M6.5 3.5h3l1.5 4-2 1.5a11 11 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2z" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  download: (
    <>
      <path d="M12 3.5v11m0 0l4-4m-4 4l-4-4" />
      <path d="M4.5 17.5v1a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-1" />
    </>
  ),
  arrow: (
    <>
      <path d="M5 12h13m0 0l-5-5m5 5l-5 5" />
    </>
  ),
  up: (
    <>
      <path d="M12 19V5m0 0l-6 6m6-6l6 6" />
    </>
  ),
  check: (
    <>
      <path d="M4.5 12.5l4.5 4.5L19.5 6.5" />
    </>
  ),
  cap: (
    <>
      <path d="M12 4l9 4.5-9 4.5-9-4.5z" />
      <path d="M7 11v4.2c0 1.6 2.4 2.8 5 2.8s5-1.2 5-2.8V11" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.4 2.3 3.6 5.2 3.6 8.5S14.4 18.2 12 20.5c-2.4-2.3-3.6-5.2-3.6-8.5S9.6 5.8 12 3.5z" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6" />
    </>
  ),
  moon: (
    <>
      <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" />
    </>
  ),
  menu: (
    <>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </>
  ),
  close: (
    <>
      <path d="M6 6l12 12M18 6L6 18" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3l1.9 5.4L19 10l-5.1 1.6L12 17l-1.9-5.4L5 10l5.1-1.6z" />
    </>
  ),
};

export default function Icon({ name, size = 20, strokeWidth = 1.6, ...rest }) {
  const path = PATHS[name];
  if (!path) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {path}
    </svg>
  );
}
