"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Sunrise,
  MapPin,
  CheckCircle2,
  ScanFace,
  ShieldCheck,
  RotateCcw,
  Camera,
  Smartphone,
  ChevronDown,
} from "lucide-react";
import { PhoneFrame } from "./PhoneFrame";
import { FloatBadge } from "./FloatBadge";
import { SelfieFace } from "../art/SelfieFace";
import { MiniMap } from "../art/MiniMap";

type HeroStep = "idle" | "selfie" | "matching" | "locating" | "success";

export function HeroPhone() {
  const [deviceVariant, setDeviceVariant] = useState<"ios" | "android">("ios");
  const [step, setStep] = useState<HeroStep>("idle");
  const [hasAutoPlayed, setHasAutoPlayed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Jam digital berjalan (DM Mono)
  const [currentTime, setCurrentTime] = useState("07:02 WIB");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      const s = String(now.getSeconds()).padStart(2, "0");
      setCurrentTime(`${h}:${m}:${s} WIB`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Jalankan autoplay simulasi sekali saat terlihat di viewport
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStep("success");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAutoPlayed) {
          setHasAutoPlayed(true);
          // Mulai urutan demo
          const t1 = setTimeout(() => setStep("selfie"), 1500);
          const t2 = setTimeout(() => setStep("matching"), 3500);
          const t3 = setTimeout(() => setStep("locating"), 5000);
          const t4 = setTimeout(() => setStep("success"), 6800);

          return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            clearTimeout(t4);
          };
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAutoPlayed]);

  const handleManualClockIn = () => {
    setStep("selfie");
  };

  const handleSnapPhoto = () => {
    setStep("matching");
    setTimeout(() => {
      setStep("locating");
      setTimeout(() => {
        setStep("success");
      }, 1600);
    }, 1400);
  };

  const handleReset = () => {
    setStep("idle");
  };

  return (
    <div ref={containerRef} className="relative flex flex-col items-center">
      {/* 4 FloatBadges mengelilingi ponsel */}
      <FloatBadge
        icon={Sunrise}
        title="Shift Pagi"
        description="07:00 – 15:00 WIB"
        positionClass="-top-4 -left-4 sm:-left-16"
        delayMs={150}
        iconColorClass="text-orange-700"
      />
      <FloatBadge
        icon={MapPin}
        title="12 m dari titik kerja"
        description="Di dalam radius 50 m"
        positionClass="top-24 -right-4 sm:-right-20"
        delayMs={300}
        iconColorClass="text-orange-700"
      />
      <FloatBadge
        icon={ScanFace}
        title="Wajah Cocok"
        description="Verifikasi foto referensi"
        positionClass="bottom-28 -left-4 sm:-left-20"
        delayMs={450}
        hideOnMobile
        iconColorClass="text-ok"
      />
      <FloatBadge
        icon={ShieldCheck}
        title="Lokasi Asli"
        description="Anti-fake GPS terverifikasi"
        positionClass="bottom-8 -right-4 sm:-right-16"
        delayMs={600}
        hideOnMobile
        iconColorClass="text-ok"
      />

      {/* Frame Ponsel */}
      <PhoneFrame
        variant={deviceVariant}
        label="Simulasi proses Clock-In ShiftMate"
        time="07:02 WIB"
        className="transition-all duration-300"
      >
        <div className="flex-1 flex flex-col p-4">
          {/* Header Aplikasi di dalam layar */}
          <div className="flex items-center justify-between pb-3 border-b border-line mb-3">
            <div>
              <div className="text-[11px] font-medium text-ink-3">Shift kerja aktif</div>
              <div className="text-xs font-bold text-slate-900">Halo, Sari Wulandari</div>
            </div>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-cream-2 text-[11px] font-bold text-orange-700">
              <Sunrise size={12} /> Pagi
            </div>
          </div>

          {/* Status 1: IDLE */}
          {step === "idle" && (
            <div className="flex-1 flex flex-col justify-between py-2">
              <div className="space-y-3">
                <div className="bg-cream rounded-2xl p-3 border border-cream-2 text-center">
                  <div className="text-[11px] font-semibold text-orange-700 uppercase tracking-wider mb-1">
                    Waktu Saat Ini
                  </div>
                  <div className="text-2xl font-mono font-bold text-slate-900 tabular-nums">
                    {currentTime}
                  </div>
                  <div className="text-[11px] text-ink-2 mt-1">Jadwal: 07:00 – 15:00 WIB</div>
                </div>

                <div className="bg-mist rounded-xl p-2.5 border border-line text-left flex items-start gap-2">
                  <MapPin size={16} className="text-orange-700 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Kopi Lereng Dago</div>
                    <div className="text-[11px] text-ink-2">Bandung · Radius kantor 50 meter</div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleManualClockIn}
                  className="w-full h-12 rounded-[14px] bg-orange text-slate-900 font-bold text-sm hover:bg-orange-600 transition-colors cursor-pointer flex items-center justify-center gap-2 active:translate-y-[1px]"
                >
                  <Camera size={16} />
                  <span>Clock In Sekarang</span>
                </button>
              </div>
            </div>
          )}

          {/* Status 2: SELFIE */}
          {step === "selfie" && (
            <div className="flex-1 flex flex-col justify-between py-1">
              <div className="text-center mb-2">
                <div className="text-xs font-bold text-slate-900">Verifikasi Wajah</div>
                <div className="text-[11px] text-ink-2">Posisikan wajah tepat di dalam bingkai</div>
              </div>

              <SelfieFace />

              <div className="pt-3">
                <button
                  onClick={handleSnapPhoto}
                  className="w-full h-12 rounded-[14px] bg-orange text-slate-900 font-bold text-sm hover:bg-orange-600 transition-colors cursor-pointer flex items-center justify-center gap-2 active:translate-y-[1px]"
                >
                  <Camera size={16} />
                  <span>Ambil Selfie</span>
                </button>
              </div>
            </div>
          )}

          {/* Status 3: MATCHING */}
          {step === "matching" && (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
              <div className="relative mb-4">
                <SelfieFace hasScanOverlay className="w-36 mx-auto opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-orange/20 border border-orange animate-spin" />
                </div>
              </div>
              <div className="text-xs font-bold text-slate-900 mb-1">Mencocokkan wajah…</div>
              <div className="text-[11px] text-ink-2">Memeriksa terhadap foto referensi HRD</div>
            </div>
          )}

          {/* Status 4: LOCATING */}
          {step === "locating" && (
            <div className="flex-1 flex flex-col justify-between py-1">
              <div className="text-center mb-1">
                <div className="text-xs font-bold text-slate-900">Pemeriksaan Lokasi GPS</div>
                <div className="text-[11px] text-ok font-semibold">Wajah cocok terverifikasi ✓</div>
              </div>

              <MiniMap variant="inside" />

              <div className="text-center py-2">
                <span className="text-xs font-bold text-slate-900 block">Memeriksa titik kerja…</span>
                <span className="text-[11px] text-ink-2">12 m dari titik · di dalam radius 50 m</span>
              </div>
            </div>
          )}

          {/* Status 5: SUCCESS */}
          {step === "success" && (
            <div className="flex-1 flex flex-col justify-between py-1">
              <div className="flex flex-col items-center text-center py-2">
                <div className="w-12 h-12 rounded-full bg-ok-bg flex items-center justify-center text-ok mb-2">
                  <CheckCircle2 size={28} strokeWidth={2.5} />
                </div>
                <div className="text-sm font-extrabold text-slate-900">Clock-in Berhasil</div>
                <div className="text-xs font-mono font-bold text-slate-800 mt-0.5">07:02 WIB</div>
              </div>

              <div className="bg-mist rounded-2xl p-3 border border-line space-y-2 text-left">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-900">
                  <CheckCircle2 size={14} className="text-ok shrink-0" />
                  <span>Wajah cocok (Biometrik 99,4%)</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-900">
                  <CheckCircle2 size={14} className="text-ok shrink-0" />
                  <span>Lokasi di dalam radius 50 m</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-900">
                  <CheckCircle2 size={14} className="text-ok shrink-0" />
                  <span>Lokasi asli terverifikasi</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  disabled
                  className="w-full h-11 rounded-[14px] bg-line text-ink-3 font-semibold text-xs cursor-not-allowed flex items-center justify-center"
                >
                  Clock Out (Aktif pukul 15:00 WIB)
                </button>
              </div>
            </div>
          )}
        </div>
      </PhoneFrame>

      {/* Kontrol di bawah ponsel: Toggle Perangkat & Ulangi Simulasi */}
      <div className="flex flex-col items-center gap-2.5 mt-5">
        <div className="flex items-center gap-3">
          {/* Segmented Control iPhone / Android */}
          <div
            className="inline-flex rounded-full bg-mist p-1 border border-line"
            role="radiogroup"
            aria-label="Pilih tampilan tipe ponsel"
          >
            <button
              onClick={() => setDeviceVariant("ios")}
              role="radio"
              aria-checked={deviceVariant === "ios"}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                deviceVariant === "ios"
                  ? "bg-slate-900 text-white"
                  : "text-ink-2 hover:text-slate-900"
              }`}
            >
              iPhone
            </button>
            <button
              onClick={() => setDeviceVariant("android")}
              role="radio"
              aria-checked={deviceVariant === "android"}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                deviceVariant === "android"
                  ? "bg-slate-900 text-white"
                  : "text-ink-2 hover:text-slate-900"
              }`}
            >
              Android
            </button>
          </div>

          {/* Tombol Ulangi Simulasi */}
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-white border border-slate-900 text-slate-900 hover:bg-cream transition-colors cursor-pointer"
          >
            <RotateCcw size={12} />
            <span>Ulangi simulasi</span>
          </button>
        </div>

        {/* Tautan Coba Simulasi Lokasi Palsu */}
        <a
          href="#modul-absensi"
          className="inline-flex items-center gap-1 text-xs font-bold text-orange-700 hover:underline pt-1"
        >
          <span>Coba simulasi lokasi palsu</span>
          <ChevronDown size={14} />
        </a>
      </div>
    </div>
  );
}
