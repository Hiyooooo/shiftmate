import React from "react";
import { Sparkles } from "lucide-react";
import { Eyebrow } from "../ui/ShiftChip";
import { Button } from "../ui/Button";
import { PhoneFrame } from "../phone/PhoneFrame";
import { SunDisc } from "../art/SunDisc";
import { site } from "@/lib/site";

interface FinalCtaProps {
  whatsappUrl?: string;
  email?: string;
  siteName?: string;
}

export function FinalCtaSection({
  whatsappUrl,
  email,
  siteName = "ShiftMate",
}: FinalCtaProps = {}) {
  const primaryHref =
    whatsappUrl ||
    `mailto:${email || site.email}?subject=Minta%20Demo%20${encodeURIComponent(
      siteName
    )}`;

  return (
    <section
      className="relative bg-slate-800 py-16 lg:py-28 overflow-hidden text-white"
      aria-labelledby="final-cta-heading"
    >
      {/* SunDisc Latar Datar Besar */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/4 pointer-events-none opacity-20">
        <SunDisc size={560} clipped={false} />
      </div>

      <div className="max-w-[1160px] mx-auto px-5 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Kolom Kiri: Teks & Aksi CTA (7 Kolom di Desktop) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <Eyebrow icon={Sparkles} isDark className="mb-5">
              Mulai Uji Coba Lapangan
            </Eyebrow>

            <h2
              id="final-cta-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-5 leading-tight"
            >
              Coba lihat shift tim Anda di ponsel.
            </h2>

            <p className="text-base lg:text-lg text-on-dark-2 leading-relaxed mb-8 max-w-xl">
              Minta demo sekarang. Tim kami akan menyiapkan satu outlet atau gudang contoh yang disesuaikan persis dengan pola rotasi shift Anda.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <Button
                variant="primary"
                href={primaryHref}
              >
                Minta Demo {siteName}
              </Button>
              <Button variant="secondary-dark" href="#harga">
                Lihat Pilihan Harga
              </Button>
            </div>

            <div className="text-xs text-on-dark-3 mt-6">
              Tanpa komitmen jangka panjang. Cukup pilot 1 lokasi selama 14 hari.
            </div>
          </div>

          {/* Kolom Kanan: Ponsel Kecil Menampilkan Layar Sukses (5 Kolom di Desktop) */}
          <div className="hidden lg:flex lg:col-span-5 justify-center">
            <PhoneFrame
              variant="ios"
              label="Mockup demo penutup aplikasi ShiftMate"
              time="07:02 WIB"
              decorative
              className="w-[260px]"
            >
              <div className="p-4 bg-white flex flex-col justify-between h-full text-center text-xs">
                <div>
                  <div className="text-[11px] font-bold text-slate-900 mb-4 pb-1 border-b border-line">
                    Shift Siap Dijalankan
                  </div>
                  <div className="w-12 h-12 rounded-full bg-cream-2 text-orange-700 flex items-center justify-center mx-auto mb-2 font-bold">
                    SM
                  </div>
                  <div className="text-sm font-bold text-slate-900">1 Outlet Aktif</div>
                  <div className="text-[11px] text-ink-3">Kopi Lereng Dago, Bandung</div>
                </div>

                <div className="p-2.5 rounded-xl bg-ok-bg text-ok text-[11px] font-bold">
                  Sistem Presensi Aktif ✓
                </div>
              </div>
            </PhoneFrame>
          </div>
        </div>
      </div>
    </section>
  );
}
