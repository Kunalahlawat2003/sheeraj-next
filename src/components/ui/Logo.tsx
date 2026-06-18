import Image from "next/image";
import { company } from "@/data/site";

const LOGO_SRC = {
  /** Gold seal on a transparent background. */
  mark: "/logo/logo1.png",
  /** Gold seal on a solid black disc — reads on any background, both themes. */
  seal: "/logo/sheeraj-logo.png",
} as const;

/** Sheeraj seal logo. `variant` picks the asset; `size` is the rendered px (square). */
export default function Logo({
  variant = "mark",
  size = 44,
  priority,
  className = "",
}: {
  variant?: keyof typeof LOGO_SRC;
  size?: number;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={LOGO_SRC[variant]}
      alt={`${company.legalName} logo`}
      width={size}
      height={size}
      priority={priority ?? variant === "mark"}
      sizes={`${size}px`}
      className={`select-none object-contain ${className}`}
    />
  );
}
