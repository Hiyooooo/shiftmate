import React from "react";
import { LucideIcon } from "lucide-react";

export interface FloatBadgeProps {
  icon: LucideIcon;
  title: string;
  description: string;
  positionClass: string;
  delayMs?: number;
  className?: string;
  hideOnMobile?: boolean;
  iconColorClass?: string;
}

export function FloatBadge({
  icon: Icon,
  title,
  description,
  positionClass,
  delayMs = 0,
  className = "",
  hideOnMobile = false,
  iconColorClass = "text-orange-700",
}: FloatBadgeProps) {
  return (
    <div
      style={{ animationDelay: `${delayMs}ms` }}
      className={`absolute z-30 bg-white/95 border border-line-2 rounded-[14px] p-2.5 px-3.5 shadow-float items-center gap-3 select-none transition-all duration-300 pointer-events-none ${
        hideOnMobile ? "hidden sm:flex" : "flex"
      } ${positionClass} ${className}`}
      aria-hidden="true"
    >
      <div className="w-8 h-8 rounded-lg bg-cream flex items-center justify-center shrink-0 border border-cream-2">
        <Icon size={18} strokeWidth={1.75} className={iconColorClass} />
      </div>
      <div className="flex flex-col text-left">
        <span className="text-[13px] font-bold text-slate-900 leading-tight">
          {title}
        </span>
        <span className="text-[12px] font-medium text-ink-2 leading-tight">
          {description}
        </span>
      </div>
    </div>
  );
}
