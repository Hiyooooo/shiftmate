import React from "react";
import { site } from "@/lib/site";
import { WhatsAppIcon } from "../ui/WhatsAppIcon";

interface WhatsAppButtonProps {
  whatsappUrl?: string;
}

export function WhatsAppButton({ whatsappUrl }: WhatsAppButtonProps = {}) {
  const defaultMessage = encodeURIComponent(
    "Halo ShiftMate, saya ingin konsultasi sistem absensi shift dan jadwal untuk tim kami."
  );
  const href =
    whatsappUrl || `https://wa.me/${site.whatsapp}?text=${defaultMessage}`;

  return (
    <aside
      aria-label="Kontak Cepat WhatsApp"
      className="fixed right-5 bottom-5 z-50 print:hidden"
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Hubungi sales ShiftMate melalui WhatsApp (buka di tab baru)"
        className="flex h-[52px] items-center gap-3 rounded-full bg-slate-900 pl-3.5 pr-5 text-sm font-bold text-white border border-line-dark shadow-float hover:bg-slate-800 transition-colors duration-150 focus-visible:outline-3 focus-visible:outline-orange focus-visible:outline-offset-2 select-none"
      >
        <WhatsAppIcon className="w-6 h-6 shrink-0" />
        <span className="whitespace-nowrap tracking-tight">Chat WhatsApp</span>
      </a>
    </aside>
  );
}
