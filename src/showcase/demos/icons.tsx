import type { SVGProps } from 'react';

// A few line icons for the demos (24px grid, 1.7px stroke, currentColor).
// Bring your own set; the components size any <svg> you put in them.

type IconProps = SVGProps<SVGSVGElement>;

const icon = (d: string) => {
  const Icon = (props: IconProps) => (
    <svg
      width="1.25em"
      height="1.25em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d={d} />
    </svg>
  );
  return Icon;
};

export const SearchIcon = icon('M21 21l-4.3-4.3M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14');
export const CloseIcon = icon('M6 6l12 12M18 6L6 18');
export const CheckIcon = icon('M5 12.5l4.5 4.5L19 7');
export const PlusIcon = icon('M12 5v14M5 12h14');
export const ChevronDownIcon = icon('M6 9l6 6 6-6');
export const ChevronRightIcon = icon('M9 6l6 6-6 6');
export const ArrowRightIcon = icon('M5 12h14M13 6l6 6-6 6');
export const ExternalIcon = icon('M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5');
export const BellIcon = icon('M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0');
export const SunIcon = icon('M12 3v2M12 19v2M5 12H3M21 12h-2M6.3 6.3l1.4 1.4M16.3 16.3l1.4 1.4M6.3 17.7l1.4-1.4M16.3 7.7l1.4-1.4M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8');
export const MoonIcon = icon('M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5');
export const LockIcon = icon('M7 11V7a5 5 0 0 1 10 0v4M5 11h14v10H5z');
export const UserIcon = icon('M20 21a8 8 0 0 0-16 0M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10');
export const MailIcon = icon('M3 6h18v12H3zM3 7l9 6 9-6');
export const FileIcon = icon('M14 3H6v18h12V7zM14 3v4h4');
export const BranchIcon = icon('M6 3v12M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6M18 9a9 9 0 0 1-9 9');
export const StarIcon = icon('M12 3l2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z');
export const PlayIcon = icon('M7 4v16l13-8z');
export const PauseIcon = icon('M8 4v16M16 4v16');
export const PrevIcon = icon('M19 20L9 12l10-8zM5 4v16');
export const NextIcon = icon('M5 4l10 8-10 8zM19 4v16');
export const SettingsIcon = icon('M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1');
export const CopyIcon = icon('M9 9h11v11H9zM5 15H4V4h11v1');
export const TrashIcon = icon('M4 7h16M10 11v6M14 11v6M5 7l1 13h12l1-13M9 7V4h6v3');
export const EditIcon = icon('M4 20h4L19 9l-4-4L4 16zM13.5 6.5l4 4');
export const MenuIcon = icon('M4 7h16M4 12h16M4 17h16');
export const LogoutIcon = icon('M15 4h4v16h-4M10 17l5-5-5-5M15 12H3');
export const CodeIcon = icon('M8 7l-5 5 5 5M16 7l5 5-5 5');
export const LayersIcon = icon('M12 3l9 5-9 5-9-5zM3 13l9 5 9-5');
export const SlidersIcon = icon('M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0M16 4v4M10 10v4M18 16v4');
export const GlobeIcon = icon('M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18');
export const HeartIcon = icon('M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10');
export const GithubIcon = icon('M9 19c-4 1.3-4-2-6-2.5M15 21v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21');
