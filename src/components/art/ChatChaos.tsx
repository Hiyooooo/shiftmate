import React from "react";
import { MessageSquare, AlertCircle } from "lucide-react";

interface ChatChaosProps {
  className?: string;
}

export function ChatChaos({ className = "" }: ChatChaosProps) {
  return (
    <div
      className={`relative w-full aspect-[4/3] rounded-[20px] bg-mist/80 border border-line-2 p-5 flex flex-col justify-center gap-3 overflow-hidden select-none ${className}`}
      role="img"
      aria-label="Ilustrasi kekacauan jadwal shift di grup chat WhatsApp"
    >
      {/* Header bar grup chat kacau */}
      <div className="flex items-center justify-between pb-2 border-b border-line text-xs font-semibold text-ink-2">
        <div className="flex items-center gap-2">
          <MessageSquare size={16} className="text-control" />
          <span>Grup Shift & Operasional (38)</span>
        </div>
        <span className="flex items-center gap-1 text-[11px] text-danger bg-danger-bg px-2 py-0.5 rounded-full font-bold">
          <AlertCircle size={12} /> 14 pesan belum dibaca
        </span>
      </div>

      {/* Bubble Chat 1: Left */}
      <div className="self-start max-w-[85%] bg-white rounded-2xl rounded-tl-sm p-3 border border-line rotate-[-1deg]">
        <div className="text-[11px] font-bold text-orange-700 mb-0.5">Andi (Driver)</div>
        <p className="text-xs text-ink">Besok siapa yang jaga malam? Jadwal minggu lalu mana ya?</p>
        <span className="text-[10px] text-ink-3 block text-right mt-1">21:14</span>
      </div>

      {/* Bubble Chat 2: Right */}
      <div className="self-end max-w-[85%] bg-cream rounded-2xl rounded-tr-sm p-3 border border-cream-2 rotate-[1deg]">
        <div className="text-[11px] font-bold text-slate-900 mb-0.5">Sari (Barista)</div>
        <p className="text-xs text-ink">Aku tukar sama Dimas ya, tapi atasan belum respon di chat pribadi.</p>
        <span className="text-[10px] text-ink-3 block text-right mt-1">21:20</span>
      </div>

      {/* Bubble Chat 3: Left */}
      <div className="self-start max-w-[85%] bg-white rounded-2xl rounded-tl-sm p-3 border border-line rotate-[-0.5deg]">
        <div className="text-[11px] font-bold text-slate-800 mb-0.5">Budi (Kitchen)</div>
        <p className="text-xs text-ink">Foto surat dokter menyusul besok pagi ya pak, masih di klinik.</p>
        <span className="text-[10px] text-ink-3 block text-right mt-1">21:28</span>
      </div>

      {/* Bubble Chat 4: Right */}
      <div className="self-end max-w-[85%] bg-cream rounded-2xl rounded-tr-sm p-3 border border-cream-2 rotate-[0.5deg]">
        <div className="text-[11px] font-bold text-slate-900 mb-0.5">Manager Shift</div>
        <p className="text-xs text-ink">Jangan chat numpuk! Siapa yang lembur kemarin tolong rekap manual lagi.</p>
        <span className="text-[10px] text-ink-3 block text-right mt-1">21:35</span>
      </div>
    </div>
  );
}
