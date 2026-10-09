import React from "react";
import { Sunrise, Sun, Moon, CalendarOff, Check, AlertTriangle, XCircle, LucideIcon } from "lucide-react";
import { ShiftType } from "@/lib/shifts";

interface ShiftChipProps {
  type: ShiftType;
  showHours?: boolean;
  className?: string;
  size?: "sm" | "md";
}

export function ShiftChip({
  type,
  showHours = false,
  className = "",
  size = "md",
}: ShiftChipProps) {
  const configs: Record<
    ShiftType,
    {
      icon: LucideIcon;
      code: string;
      label: string;
      hours: string;
      style: string;
      iconColor: string;
    }
  > = {
    P: {
      icon: Sunrise,
      code: "P",
      label: "Pagi",
      hours: "07:00–15:00",
      style: "bg-cream-2 text-orange-700 border border-orange-700/20",
      iconColor: "text-orange-700",
    },
    S: {
      icon: Sun,
      code: "S",
      label: "Siang",
      hours: "15:00–23:00",
      style: "bg-warn-bg text-warn border border-warn/25",
      iconColor: "text-warn",
    },
    M: {
      icon: Moon,
      code: "M",
      label: "Malam",
      hours: "23:00–07:00",
      style: "bg-slate-800 text-white border border-slate-700",
      iconColor: "text-white",
    },
    L: {
      icon: CalendarOff,
      code: "L",
      label: "Libur",
      hours: "Off",
      style: "bg-mist text-ink-2 border border-line",
      iconColor: "text-ink-3",
    },
  };

  const cfg = configs[type];
  const Icon = cfg.icon;

  const sizeClasses =
    size === "sm"
      ? "h-7 px-2.5 text-xs gap-1.5"
      : "h-8 px-3 text-[13px] gap-2";

  return (
    <span
      className={`inline-flex items-center rounded-full font-semibold shrink-0 select-none ${sizeClasses} ${cfg.style} ${className}`}
    >
      <Icon size={size === "sm" ? 13 : 14} strokeWidth={1.75} className={cfg.iconColor} />
      <span>{cfg.label}</span>
      {showHours && <span className="opacity-75 text-xs font-mono">({cfg.hours})</span>}
    </span>
  );
}

interface StatusBadgeProps {
  status: "ok" | "warn" | "danger" | "neutral";
  text: string;
  icon?: LucideIcon;
  className?: string;
}

export function StatusBadge({ status, text, icon: CustomIcon, className = "" }: StatusBadgeProps) {
  const styles = {
    ok: "bg-ok-bg text-ok border-ok/20",
    warn: "bg-warn-bg text-warn border-warn/20",
    danger: "bg-danger-bg text-danger border-danger/20",
    neutral: "bg-mist text-ink-2 border-line",
  };

  const DefaultIcon =
    status === "ok" ? Check : status === "warn" ? AlertTriangle : status === "danger" ? XCircle : Check;
  const Icon = CustomIcon || DefaultIcon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 h-7 px-2.5 rounded-full text-xs font-semibold border ${styles[status]} ${className}`}
    >
      <Icon size={13} strokeWidth={1.75} />
      <span>{text}</span>
    </span>
  );
}

interface EyebrowProps {
  children: React.ReactNode;
  icon?: LucideIcon;
  isDark?: boolean;
  className?: string;
}

export function Eyebrow({ children, icon: Icon, isDark = false, className = "" }: EyebrowProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 h-7 px-3 rounded-full text-xs font-bold tracking-wide uppercase select-none ${
        isDark
          ? "bg-orange/15 text-orange border border-orange/30"
          : "bg-cream-2 text-orange-700 border border-orange-700/20"
      } ${className}`}
    >
      {Icon && <Icon size={14} strokeWidth={1.75} />}
      <span>{children}</span>
    </span>
  );
}
