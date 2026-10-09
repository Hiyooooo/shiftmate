"use client";

import React from "react";
import { RotateCcw, User, Layers, ArrowRight } from "lucide-react";
import { Eyebrow } from "../ui/ShiftChip";
import { Button } from "../ui/Button";
import { useDemo } from "../phone/DemoProvider";
import { AbsensiSection } from "./AbsensiSection";
import { PerizinanSection } from "./PerizinanSection";
import { GajiSection } from "./GajiSection";
import { ExamSection } from "./ExamSection";
import { LibrarySection } from "./LibrarySection";
import { site } from "@/lib/site";

export function ModulesHub() {
  const { employeeId, setEmployeeId, resetDemo } = useDemo();

  return (
    <div id="modul" className="relative">
      {/* Header Hub Section Modul */}
      <div className="py-16 bg-white border-b border-line">
        <div className="max-w-[1160px] mx-auto px-5 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <Eyebrow icon={Layers} className="mb-4">
                Lima Modul, Satu Aplikasi
              </Eyebrow>
              <h2 className="font-display text-3xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
                Semua urusan shift, di satu ponsel.
              </h2>
              <p className="text-base lg:text-lg text-ink-2 leading-relaxed">
                Persetujuan di Perizinan mengubah jadwal dan slip gaji secara langsung. Coba sendiri interaksi dinamis di bawah ini.
              </p>
            </div>

            {/* Kontrol Global: Pemilih Karyawan & Reset Demo */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Selector Karyawan */}
              <div
                className="inline-flex rounded-2xl bg-mist p-1.5 border border-line"
                role="radiogroup"
                aria-label="Pilih data simulasi profil karyawan"
              >
                <button
                  onClick={() => setEmployeeId("sari")}
                  role="radio"
                  aria-checked={employeeId === "sari"}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                    employeeId === "sari"
                      ? "bg-slate-900 text-white"
                      : "text-ink-2 hover:text-slate-900"
                  }`}
                >
                  <User size={13} />
                  <span>Sari (Barista)</span>
                </button>
                <button
                  onClick={() => setEmployeeId("rudi")}
                  role="radio"
                  aria-checked={employeeId === "rudi"}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                    employeeId === "rudi"
                      ? "bg-slate-900 text-white"
                      : "text-ink-2 hover:text-slate-900"
                  }`}
                >
                  <User size={13} />
                  <span>Rudi (Driver)</span>
                </button>
              </div>

              {/* Tombol Reset Demo */}
              <button
                onClick={resetDemo}
                className="h-11 px-4 rounded-xl border border-line-2 bg-white text-xs font-bold text-slate-900 hover:bg-cream transition-colors cursor-pointer flex items-center gap-1.5"
                title="Kembalikan semua form dan kalkulasi ke kondisi awal"
              >
                <RotateCcw size={13} />
                <span>Reset Demo</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Rangkaian 5 Modul Berurutan */}
      <AbsensiSection />
      <PerizinanSection />
      <GajiSection />
      <ExamSection />
      <LibrarySection />

      {/* CTA Transisi di Bawah Seluruh Modul */}
      <div className="py-12 bg-white text-center border-b border-line">
        <div className="max-w-[1160px] mx-auto px-5 lg:px-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="primary"
            href={`mailto:${site.email}?subject=Minta%20Demo%20ShiftMate`}
          >
            Minta Demo Sekarang
          </Button>
          <a
            href="#harga"
            className="inline-flex items-center gap-1 text-sm font-bold text-orange-700 hover:underline px-4 py-2"
          >
            <span>Lihat pilihan paket & harga</span>
            <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </div>
  );
}
