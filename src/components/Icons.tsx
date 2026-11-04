type IconProps = {
  className?: string;
};

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

export function IconHome({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d='M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4.5v-5.5h-5V21H5a1 1 0 0 1-1-1v-9.5Z' />
    </svg>
  );
}

export function IconHanger({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d='M12 5a2 2 0 1 0-2-2M12 5v3m0 0L4 14.5A1.5 1.5 0 0 0 5 17h14a1.5 1.5 0 0 0 1-2.5L12 8Z' />
    </svg>
  );
}

export function IconBag({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d='M6 8h12l-1 12H7L6 8Z' />
      <path d='M9 9V6a3 3 0 0 1 6 0v3' />
    </svg>
  );
}

export function IconChat({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d='M21 12a8.5 8.5 0 0 1-12.4 7.5L4 21l1.5-4.6A8.5 8.5 0 1 1 21 12Z' />
      <path d='M8.5 12h.01M12 12h.01M15.5 12h.01' />
    </svg>
  );
}

export function IconWhatsApp({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} fill='currentColor' stroke='none' className={className}>
      <path d='M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43-.14 0-.31-.01-.47-.01-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29Z' />
    </svg>
  );
}

export function IconSparkles({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d='M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Z' />
      <path d='M19 14l.7 2.3L22 17l-2.3.7L19 20l-.7-2.3L16 17l2.3-.7L19 14Z' />
    </svg>
  );
}

export function IconDress({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d='M9 4h6l1 4-2 13H10L8 8l1-4Z' />
      <path d='M9 4l3 2 3-2M8 8h8' />
    </svg>
  );
}

export function IconBlouse({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d='M8 4l4 2 4-2 4 3-2 3-2-1v11H8V9L6 10 4 7l4-3Z' />
      <path d='M10 6c0 1.1.9 2 2 2s2-.9 2-2' />
    </svg>
  );
}

export function IconSkirt({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d='M8 4h8l1 5-2 11H9L7 9l1-5Z' />
      <path d='M7 9h10M12 9v11' />
    </svg>
  );
}

export function IconPants({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d='M8 3h8l1 18h-4l-1-9-1 9H7L8 3Z' />
      <path d='M8 7h8' />
    </svg>
  );
}

export function IconMan({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx='12' cy='8' r='4' />
      <path d='M4 21a8 8 0 0 1 16 0' />
    </svg>
  );
}

export function IconKids({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx='12' cy='9' r='3' />
      <path d='M6 21a6 6 0 0 1 12 0M9 6.2 7 4.5M15 6.2 17 4.5' />
    </svg>
  );
}

export function IconGrid({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x='4' y='4' width='6' height='6' rx='1' />
      <rect x='14' y='4' width='6' height='6' rx='1' />
      <rect x='4' y='14' width='6' height='6' rx='1' />
      <rect x='14' y='14' width='6' height='6' rx='1' />
    </svg>
  );
}

export function IconHeart({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d='M12 20s-7-4.35-7-9a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4.65-7 9-7 9Z' />
    </svg>
  );
}

export function IconStar({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} fill='currentColor' stroke='none' className={className}>
      <path d='M12 3.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L12 16.77l-5.2 2.74.99-5.79-4.21-4.1 5.82-.85L12 3.5Z' />
    </svg>
  );
}

export function IconRuler({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d='M4 14 14 4l6 6L10 20l-6-6Z' />
      <path d='m8 10 2 2M11 7l2 2M5 13l2 2' />
    </svg>
  );
}

export function IconShare({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d='M12 16V4m0 0L8 8m4-4 4 4M5 14v6h14v-6' />
    </svg>
  );
}

export function IconTrash({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d='M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6' />
    </svg>
  );
}

export function IconArrowRight({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d='M5 12h14m-5-5 5 5-5 5' />
    </svg>
  );
}

export function IconArrowLeft({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d='M19 12H5m5 5-5-5 5-5' />
    </svg>
  );
}

export function IconCheck({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d='m5 12 4 4L19 6' />
    </svg>
  );
}

export function IconTruck({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d='M3 7h11v10H3V7ZM14 10h4l3 3v4h-7v-7Z' />
      <circle cx='7' cy='18' r='1.5' />
      <circle cx='17.5' cy='18' r='1.5' />
    </svg>
  );
}

export function IconMapPin({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d='M12 21s-6-5.2-6-10a6 6 0 1 1 12 0c0 4.8-6 10-6 10Z' />
      <circle cx='12' cy='11' r='2.2' />
    </svg>
  );
}

export function IconMinus({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d='M5 12h14' />
    </svg>
  );
}

export function IconPlus({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d='M12 5v14M5 12h14' />
    </svg>
  );
}

export function IconMenu({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d='M4 7h16M4 12h16M4 17h16' />
    </svg>
  );
}

export function IconClose({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d='M6 6l12 12M18 6 6 18' />
    </svg>
  );
}

export function IconoCategoria({
  id,
  className,
}: {
  id: string;
  className?: string;
}) {
  switch (id) {
    case "vestidos":
    case "vestidos-ajustados":
    case "trajes-de-bano":
      return <IconDress className={className} />;
    case "destacados":
      return <IconStar className={className} />;
    case "blusas-tops":
      return <IconBlouse className={className} />;
    case "faldas-shorts":
      return <IconSkirt className={className} />;
    case "conjuntos":
    case "conjuntos-mujer":
      return <IconHanger className={className} />;
    case "pantalones":
      return <IconPants className={className} />;
    case "ropa-deportiva-mujer":
    case "ropa-deportiva-hombre":
    case "hombre":
      return <IconMan className={className} />;
    case "ninos":
    case "peques":
      return <IconKids className={className} />;
    default:
      return <IconGrid className={className} />;
  }
}
