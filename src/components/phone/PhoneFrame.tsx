import React from "react";
import { Wifi, SignalHigh, BatteryFull } from "lucide-react";

export interface PhoneFrameProps {
  variant?: "ios" | "android";
  label?: string;
  decorative?: boolean;
  time?: string;
  children: React.ReactNode;
  className?: string;
  screenClassName?: string;
  footerBar?: React.ReactNode;
}

export function PhoneFrame({
  variant = "ios",
  label = "Layar simulasi aplikasi mobile ShiftMate",
  decorative = false,
  time = "07:02 WIB",
  children,
  className = "",
  screenClassName = "",
  footerBar,
}: PhoneFrameProps) {
  const isIos = variant === "ios";

  return (
    <div
      className={`relative w-[272px] lg:w-[300px] aspect-[9/19] rounded-[44px] p-2.5 bg-slate-900 shadow-float shrink-0 select-none ${className}`}
      {...(decorative
        ? { "aria-hidden": "true" }
        : { role: "group", "aria-label": label })}
    >
      {/* Tombol samping hardware fisik ponsel (dekoratif) */}
      <div className="absolute -left-[3px] top-[105px] w-[3px] h-[28px] bg-slate-800 rounded-l-xs" />
      <div className="absolute -left-[3px] top-[142px] w-[3px] h-[36px] bg-slate-800 rounded-l-xs" />
      <div className="absolute -right-[3px] top-[125px] w-[3px] h-[48px] bg-slate-800 rounded-r-xs" />

      {/* Layar Dalam Ponsel */}
      <div
        className={`relative w-full h-full rounded-[34px] bg-white overflow-hidden flex flex-col ${screenClassName}`}
      >
        {/* Status Bar */}
        <div className="h-10 px-5 pt-1.5 flex items-center justify-between text-[11px] font-mono font-medium text-slate-900 shrink-0 z-20">
          <span className="tabular-nums tracking-tight">{time}</span>

          {/* Notch / Dynamic Island / Punch Hole */}
          {isIos ? (
            <div className="w-[84px] h-[20px] bg-slate-900 rounded-full flex items-center justify-center -mt-1">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-950/80 mr-auto ml-2" />
            </div>
          ) : (
            <div className="w-2.5 h-2.5 bg-slate-900 rounded-full -mt-0.5" />
          )}

          <div className="flex items-center gap-1.5 text-slate-800">
            <SignalHigh size={12} strokeWidth={2} />
            <Wifi size={12} strokeWidth={2} />
            <BatteryFull size={13} strokeWidth={2} />
          </div>
        </div>

        {/* Konten Layar (Scrollable) */}
        <div
          className="flex-1 overflow-y-auto no-scrollbar flex flex-col"
          tabIndex={decorative ? -1 : 0}
          aria-label={label}
        >
          {children}
        </div>

        {/* Custom footer bar jika ada */}
        {footerBar}

        {/* Home Indicator / Navigation Bar */}
        <div className="h-5 flex items-center justify-center shrink-0 z-20 bg-inherit pointer-events-none">
          {isIos ? (
            <div className="w-24 h-1 bg-slate-900/40 rounded-full" />
          ) : (
            <div className="w-16 h-1 bg-slate-900/30 rounded-full" />
          )}
        </div>
      </div>
    </div>
  );
}
