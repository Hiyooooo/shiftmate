import React from "react";
import {
  MapPin,
  LogIn,
  ScanFace,
  ShieldAlert,
  RefreshCw,
  Users,
} from "lucide-react";
import { Eyebrow } from "../ui/ShiftChip";
import { AbsensiPhones } from "./AbsensiPhones";
import { SunDisc } from "../art/SunDisc";

export function AbsensiSection() {
  const features = [
    {
      icon: LogIn,
      title: "Clock-in/out Instan",
      desc: "Satu ketukan, waktu WIB akurat dan tercatat langsung.",
    },
    {
      icon: ScanFace,
      title: "Biometrik Selfie",
      desc: "Wajah dicocokkan dengan foto referensi karyawan.",
    },
    {
      icon: MapPin,
      title: "GPS Geofencing",
      desc: "Presensi hanya sah di dalam radius titik outlet kerja.",
    },
    {
      icon: ShieldAlert,
      title: "Deteksi Anti-Fake GPS",
      desc: "Mock location dan lompatan posisi ditandai ke atasan.",
    },
    {
      icon: RefreshCw,
      title: "Shift Rolling Dinamis",
      desc: "Pola rotasi pagi, siang, malam tersusun otomatis.",
    },
    {
      icon: Users,
      title: "Rekap Real-Time Tim",
      desc: "Siapa hadir, terlambat, atau di luar radius terlihat langsung.",
    },
  ];

  return (
    <section
      id="modul-absensi"
      className="relative bg-slate-900 py-16 lg:py-24 overflow-hidden border-y border-line-dark"
      aria-labelledby="absensi-heading"
    >
      {/* SunDisc kecil di sudut pita gelap sebagai penanda ritme */}
      <div className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 opacity-30 pointer-events-none">
        <SunDisc size={320} clipped={false} />
      </div>

      <div className="max-w-[1160px] mx-auto px-5 lg:px-8 relative z-10">
        {/* Header Modul */}
        <div className="max-w-2xl mb-12">
          <Eyebrow icon={MapPin} isDark className="mb-4">
            Modul 01 · Absensi (Bintang)
          </Eyebrow>
          <h3
            id="absensi-heading"
            className="font-display text-2xl lg:text-4xl font-bold text-white tracking-tight mb-3"
          >
            Absen yang tidak bisa dititipkan.
          </h3>
          <p className="text-base text-on-dark-2 leading-relaxed">
            Selfie mencocokkan wajah, GPS memeriksa radius, dan shift berotasi otomatis pagi, siang, malam.
          </p>
        </div>

        {/* Showcase Dua Ponsel Bersebelahan */}
        <div className="my-10">
          <AbsensiPhones />
        </div>

        {/* 6 Sub-fitur Wajib Absensi (Grid 2 Kolom di Desktop) */}
        <div className="mt-14 pt-10 border-t border-line-dark">
          <div className="text-xs font-mono font-bold text-orange uppercase tracking-wider mb-6">
            Sub-Fitur Wajib Presensi Lapangan:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="bg-slate-800/80 rounded-2xl p-4 border border-line-dark flex items-start gap-3.5"
                >
                  <div className="w-9 h-9 rounded-xl bg-orange/15 text-orange flex items-center justify-center shrink-0 border border-orange/20">
                    <Icon size={18} strokeWidth={1.75} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">{f.title}</h4>
                    <p className="text-xs text-on-dark-3 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* KLAIM: konfirmasi dengan engineering */}
        {/* Catatan batas kemampuan teknis anti-fake dan biometrik dicatat transparan */}
      </div>
    </section>
  );
}
