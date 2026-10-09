import React from "react";
import {
  ClipboardCheck,
  Hand,
  Megaphone,
  BadgeCheck,
  UserPlus,
  TrendingUp,
  ScanFace,
} from "lucide-react";
import { Eyebrow } from "../ui/ShiftChip";
import { ExamPhone } from "./ExamPhone";

export function ExamSection() {
  const subFeatures = [
    {
      icon: Hand,
      title: "Checklist Higienitas Outlet",
      desc: "Kru wajib memeriksa sanitasi, seragam, dan area kerja sebelum absen.",
    },
    {
      icon: Megaphone,
      title: "Briefing SOP Harian",
      desc: "Kuis 2-3 menit dengan timer untuk memastikan pemahaman instruksi hari ini.",
    },
    {
      icon: BadgeCheck,
      title: "Uji Kompetensi Berkala",
      desc: "Evaluasi keahlian teknis (standar racik, penanganan kargo, SOP medis).",
    },
    {
      icon: UserPlus,
      title: "Assessment Rekrutmen",
      desc: "Tes situasional calon staf langsung dari ponsel pelamar kerja.",
    },
    {
      icon: TrendingUp,
      title: "Evaluasi Kinerja Shift",
      desc: "Pemberian nilai ketepatan waktu, kebersihan, dan layanan per shift.",
    },
    {
      icon: ScanFace,
      title: "Proctoring Anti-Kecurangan",
      desc: "Deteksi pindah aplikasi dan verifikasi kamera acak saat pengerjaan kuis.",
    },
  ];

  return (
    <section
      id="modul-exam"
      className="py-16 lg:py-24 bg-white border-b border-line"
      aria-labelledby="exam-heading"
    >
      <div className="max-w-[1160px] mx-auto px-5 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Kolom Kiri: Mockup Ponsel Interaktif Exam (5 Kolom di Desktop) */}
          <div className="lg:col-span-5 flex justify-center">
            <ExamPhone />
          </div>

          {/* Kolom Kanan: Manfaat & 6 Sub-Fitur Wajib (7 Kolom di Desktop) */}
          <div className="lg:col-span-7">
            <Eyebrow icon={ClipboardCheck} className="mb-4">
              Modul 04 · Exam & Kesiapan
            </Eyebrow>
            <h3
              id="exam-heading"
              className="font-display text-2xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-4"
            >
              Siap sebelum shift: higienitas dan briefing.
            </h3>
            <p className="text-base text-ink-2 leading-relaxed mb-8">
              Kuis checklist higienitas dan briefing SOP harian wajib selesai sebelum staf memulai shift.
            </p>

            {/* 6 Sub-fitur Wajib */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-6 border-t border-line">
              {subFeatures.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.title} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-cream-2 text-orange-700 flex items-center justify-center shrink-0 border border-orange-700/20 mt-0.5">
                      <Icon size={16} strokeWidth={1.75} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 mb-0.5">{f.title}</h4>
                      <p className="text-xs text-ink-2 leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
