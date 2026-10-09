import React from "react";
import Link from "next/link";

export type ButtonVariant = "primary" | "dark" | "secondary" | "secondary-dark" | "ghost";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  children: React.ReactNode;
  className?: string;
}

type ButtonAsButton = ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonBaseProps & {
  href: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 h-12 px-6 rounded-[14px] text-base font-bold transition-colors cursor-pointer select-none active:translate-y-[1px] disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-3 focus-visible:outline-offset-2";

  const variantStyles: Record<ButtonVariant, string> = {
    // ATURAN KERAS WCAG: Teks di atas oranye WAJIB slate-900 (kontras 6.37:1), DILARANG putih!
    primary:
      "bg-orange text-slate-900 hover:bg-orange-600 focus-visible:outline-slate-900",
    dark:
      "bg-slate-900 text-white hover:bg-slate-800 focus-visible:outline-slate-900",
    secondary:
      "bg-white border-[1.5px] border-slate-900 text-slate-900 hover:bg-cream focus-visible:outline-slate-900",
    "secondary-dark":
      "bg-transparent border-[1.5px] border-on-dark-2 text-white hover:bg-slate-800/60 focus-visible:outline-orange",
    ghost:
      "bg-transparent text-slate-900 hover:bg-mist focus-visible:outline-slate-900",
  };

  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if ("href" in props && props.href) {
    const isExternal = props.href.startsWith("mailto:") || props.href.startsWith("http");
    if (isExternal) {
      return (
        <a className={combinedStyles} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
          {children}
        </a>
      );
    }
    return (
      <Link className={combinedStyles} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)} href={props.href}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedStyles} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
