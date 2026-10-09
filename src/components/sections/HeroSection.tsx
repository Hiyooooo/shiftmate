import React from "react";
import { Sunrise, ScanFace, MapPin, RefreshCw, CheckCircle2 } from "lucide-react";
import { Eyebrow } from "../ui/ShiftChip";
import { Button } from "../ui/Button";
import { HeroPhone } from "../phone/HeroPhone";
import { SunDisc } from "../art/SunDisc";
import { site } from "@/lib/site";

export function HeroSection() {
  return (
    <section
      id="simulasi"
      className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 bg-white overflow-hidden border-b border-line"
      aria-label="Pengenalan Produk ShiftMate"
    >
      <div className="max-w-[1160px] mx-auto px-5 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Kolom Kiri: Copywriting & CTA (6 Kolom di Desktop) */}
          <div className="lg:col-span-6 flex flex-col items-start text-left z-10">
            <Eyebrow icon={Sunrise} className="mb-5">
              Absensi shift untuk tim lapangan
            </Eyebrow>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-slate-900 tracking-tight leading-[1.05] mb-5">
              Absen shift dari ponsel. Tanpa titip absen.
            </h1>

            <p className="text-base sm:text-lg text-ink-2 leading-relaxed mb-8 max-w-xl">
              Selfie memastikan orangnya, GPS memastikan tempatnya. Rotasi pagi, siang, dan malam tersusun otomatis, jam kerjanya langsung masuk ke slip gaji.
            </p>

            {/* Tombol CTA */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-4">
              <Button
                variant="primary"
                href={`mailto:${site.email}?subject=Minta%20Demo%20ShiftMate`}
                className="w-full sm:w-auto"
              >
                Minta Demo
              </Button>
              <Button variant="secondary" href="#modul" className="w-full sm:w-auto">
                Lihat Fitur
              </Button>
            </div>

            {/* Catatan Mikro */}
            <div className="text-xs text-ink-3 mb-8">
              Cocok untuk 10 sampai 1.000 karyawan · Pilot satu outlet dulu
            </div>

            {/* Tiga Butir Kunci (14px) */}
            <div className="w-full pt-6 border-t border-line space-y-2.5">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-900">
                <CheckCircle2 size={16} className="text-orange-700 shrink-0" />
                <span>Selfie biometrik pencegah kecurangan</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-900">
                <CheckCircle2 size={16} className="text-orange-700 shrink-0" />
                <span>Radius GPS 50m + deteksi aplikasi lokasi palsu</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-900">
                <CheckCircle2 size={16} className="text-orange-700 shrink-0" />
                <span>Shift rolling dinamis pagi, siang, dan malam</span>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Panggung Ponsel & SunDisc (6 Kolom di Desktop) */}
          <div className="lg:col-span-6 flex justify-center relative mt-6 lg:mt-0">
            {/* SunDisc Datar Oranye di Belakang Ponsel */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
              <SunDisc
                size={480}
                clipped={false}
                className="max-w-[320px] sm:max-w-[440px] opacity-80"
              />
            </div>

            {/* Komponen Ponsel Interaktif */}
            <div className="relative z-10">
              <HeroPhone />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
