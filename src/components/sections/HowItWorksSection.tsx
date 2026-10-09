import React from "react";
import { CheckCheck } from "lucide-react";
import { Eyebrow } from "../ui/ShiftChip";
import { StepArt1 } from "../art/StepArt1";
import { StepArt2 } from "../art/StepArt2";
import { StepArt3 } from "../art/StepArt3";

export function HowItWorksSection() {
  const steps = [
    {
      num: "01",
      title: "Impor Tim dan Lokasi",
      desc: "Unggah daftar karyawan via file spreadsheet atau CSV, tentukan titik koordinat GPS dan radius tiap outlet.",
      art: <StepArt1 />,
    },
    {
      num: "02",
      title: "Susun Pola Shift Kerja",
      desc: "Pilih pola rotasi (2-2-2-2 atau 5-2), atur jeda istirahat minimum, dan tetapkan tarif upah per jam serta uang hadir.",
      art: <StepArt2 />,
    },
    {
      num: "03",
      title: "Staf Absen dari Ponsel",
      desc: "Karyawan mengunduh aplikasi, merekam foto referensi sekali, lalu langsung absen dengan selfie dan GPS di lokasi kerja.",
      art: <StepArt3 />,
    },
  ];

  return (
    <section
      id="cara-kerja"
      className="py-16 lg:py-24 bg-cream border-b border-cream-2"
      aria-labelledby="how-it-works-heading"
    >
      <div className="max-w-[1160px] mx-auto px-5 lg:px-8">
        <div className="max-w-2xl mb-14">
          <Eyebrow icon={CheckCheck} className="mb-4">
            Mulai Cepat
          </Eyebrow>
          <h2
            id="how-it-works-heading"
            className="font-display text-3xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4"
          >
            Dari daftar karyawan ke absen pertama dalam tiga langkah.
          </h2>
          <p className="text-base lg:text-lg text-ink-2 leading-relaxed">
            Tidak butuh perangkat fingerprint mahal yang rawan rusak. Semua berjalan dari ponsel karyawan.
          </p>
        </div>

        {/* 3 Langkah Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div
              key={s.num}
              className="bg-white rounded-2xl p-5 border border-line-2 flex flex-col justify-between"
            >
              {/* Ilustrasi Visual Langkah */}
              <div className="mb-5">{s.art}</div>

              <div>
                <div className="font-mono text-xl font-extrabold text-orange-700 mb-2">
                  {s.num}
                </div>
                <h3 className="font-display text-lg font-bold text-slate-900 mb-2">
                  {s.title}
                </h3>
                <p className="text-xs text-ink-2 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Catatan Migrasi */}
        <div className="text-xs text-ink-3 text-center mt-10">
          Migrasi dari absensi lama dapat dijalankan paralel selama satu siklus gaji untuk memastikan data 100% cocok.
        </div>
      </div>
    </section>
  );
}
