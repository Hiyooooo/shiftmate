import React from "react";
import { MessageSquareOff, ArrowRight, CheckCircle2, XCircle, ChevronDown } from "lucide-react";
import { Eyebrow } from "../ui/ShiftChip";
import { ChatChaos } from "../art/ChatChaos";
import { PhoneFrame } from "../phone/PhoneFrame";
import { ShiftChip } from "../ui/ShiftChip";

export function ProblemSection() {
  const comparisons = [
    {
      before: "Titip absen lewat foto teman",
      after: "Selfie biometrik + radius GPS asli per clock-in",
    },
    {
      before: "Jadwal difoto dan dikirim berulang di grup chat",
      after: "Rotasi shift pagi/siang/malam tersusun otomatis di aplikasi",
    },
    {
      before: "Lembur dan uang hadir dihitung manual di Excel",
      after: "Tersinkron otomatis ke rincian slip gaji mobile",
    },
  ];

  return (
    <section
      className="py-16 lg:py-24 bg-cream border-b border-cream-2"
      aria-labelledby="problem-heading"
    >
      <div className="max-w-[1160px] mx-auto px-5 lg:px-8">
        <div className="max-w-2xl mb-12">
          <Eyebrow icon={MessageSquareOff} className="mb-4">
            Sebelum dan Sesudah
          </Eyebrow>
          <h2
            id="problem-heading"
            className="font-display text-3xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4"
          >
            Jadwal shift tidak seharusnya hidup di grup chat.
          </h2>
          <p className="text-base lg:text-lg text-ink-2 leading-relaxed">
            Menghilangkan kesalahpahaman tukar jadwal, surat dokter tercecer, dan lembur yang tidak tercatat.
          </p>
        </div>

        {/* Komparasi Visual 2 Kolom */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12">
          {/* Sisi Kiri: ChatChaos (Sebelum) */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-danger" />
              <span className="text-xs font-bold uppercase tracking-wider text-danger">
                Kondisi Lama: Grup Chat Semrawut
              </span>
            </div>
            <ChatChaos />
            <span className="text-xs text-ink-3 mt-3 text-center">
              Pesan tenggelam, atasan lupa mencatat perubahan shift, kru salah hari masuk kerja.
            </span>
          </div>

          {/* Sisi Kanan: Jadwal Rapi di Ponsel (Sesudah) */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-3 w-full">
              <span className="w-2.5 h-2.5 rounded-full bg-ok" />
              <span className="text-xs font-bold uppercase tracking-wider text-ok">
                Dengan ShiftMate: Tercatat & Terverifikasi
              </span>
            </div>

            <PhoneFrame
              variant="ios"
              label="Contoh Jadwal Terstruktur di Aplikasi"
              time="07:02 WIB"
              decorative
              className="w-[260px] lg:w-[280px]"
            >
              <div className="p-3 bg-white flex flex-col justify-between h-full text-xs">
                <div>
                  <div className="text-[11px] font-bold text-slate-900 mb-2 pb-1.5 border-b border-line">
                    Jadwal Shift Minggu Ini
                  </div>
                  <div className="space-y-1.5">
                    <div className="p-2 rounded-xl bg-cream-2/70 border border-orange-700/20 flex items-center justify-between">
                      <span className="font-bold text-slate-900">Rabu, 14 Okt (Hari Ini)</span>
                      <ShiftChip type="P" size="sm" />
                    </div>
                    <div className="p-2 rounded-xl bg-mist border border-line flex items-center justify-between text-ink-2">
                      <span>Kamis, 15 Okt</span>
                      <ShiftChip type="S" size="sm" />
                    </div>
                    <div className="p-2 rounded-xl bg-mist border border-line flex items-center justify-between text-ink-2">
                      <span>Jumat, 16 Okt</span>
                      <ShiftChip type="M" size="sm" />
                    </div>
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-ok-bg text-ok text-[11px] font-bold text-center mt-3">
                  Tukar shift disetujui atasan ✓
                </div>
              </div>
            </PhoneFrame>
          </div>
        </div>

        {/* 3 Baris Komparasi Sebelum -> Sesudah */}
        <div className="bg-white rounded-2xl p-6 border border-cream-2 mb-8">
          <div className="space-y-4">
            {comparisons.map((c, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-line last:border-0 last:pb-0 text-xs sm:text-sm"
              >
                <div className="flex items-center gap-2 text-danger font-medium flex-1">
                  <XCircle size={16} className="shrink-0" />
                  <span>{c.before}</span>
                </div>
                <div className="hidden sm:block text-ink-3">
                  <ArrowRight size={16} />
                </div>
                <div className="flex items-center gap-2 text-slate-900 font-bold flex-1">
                  <CheckCircle2 size={16} className="text-ok shrink-0" />
                  <span>{c.after}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tautan ke Modul */}
        <div className="text-center">
          <a
            href="#modul"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-orange-700 hover:underline cursor-pointer"
          >
            <span>Lihat bagaimana aplikasinya bekerja di bawah</span>
            <ChevronDown size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
