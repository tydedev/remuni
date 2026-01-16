import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface Props {
  className?: string;
  isLink?: boolean;
  href?: string;
  size?: "sm" | "md" | "lg";
  hasText?: boolean;
}

const sizes = {
  sm: { icon: 24, text: "text-base" },
  md: { icon: 32, text: "text-2xl" },
  lg: { icon: 40, text: "text-3xl" },
};

export const Logo = ({
  className,
  isLink,
  href = "/",
  size = "md",
  hasText = false,
}: Props) => {
  const { icon, text } = sizes[size];

  const content = (
    <div className="flex items-center justify-center gap-2">
      <Image
        src="/images/logo.svg"
        alt="Sprinta Logo"
        width={icon}
        height={icon}
      />
      {hasText && <span className={cn("font-semibold", text)}>Remuni</span>}
    </div>
  );

  return (
    <div className={cn("inline-flex", className)}>
      {isLink ? <Link href={href}>{content}</Link> : content}
    </div>
  );
};
