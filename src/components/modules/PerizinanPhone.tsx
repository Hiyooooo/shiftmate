"use client";

import React, { useState } from "react";
import {
  ArrowLeftRight,
  Camera,
  GitPullRequest,
  Clock,
  CalendarRange,
  CheckCircle2,
  XCircle,
  FileCheck,
  ChevronRight,
} from "lucide-react";
import { PhoneFrame } from "../phone/PhoneFrame";
import { SuratDokter } from "../art/SuratDokter";
import { useDemo, RequestId } from "../phone/DemoProvider";
import { rupiah } from "@/lib/format";

export function PerizinanPhone() {
  const {
    employee,
    requests,
    advanceRequest,
    rejectRequest,
    effectiveSisaCuti,
  } = useDemo();

  const [activeTab, setActiveTab] = useState<RequestId>("tukar");
  const [showSuratModal, setShowSuratModal] = useState(false);

  const status = requests[activeTab];

  // Hitungan lembur 2 jam untuk teks estimasi
  const estimasiLembur = employee.id === "sari" ? 84_000 : 98_000;

  return (
    <div className="flex flex-col items-center">
      <PhoneFrame
        variant="ios"
        label="Simulasi Pengajuan Perizinan dan Tukar Shift"
        time="07:02 WIB"
      >
        <div className="flex-1 flex flex-col justify-between p-4 bg-white">
          <div>
            {/* Header Pengajuan */}
            <div className="flex items-center justify-between pb-2 border-b border-line mb-3">
              <div>
                <span className="text-[10px] text-ink-3">Pusat Izin Kru</span>
                <div className="text-xs font-bold text-slate-900">{employee.name}</div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-cream-2 text-[10px] font-bold text-orange-700">
                Tersinkron ke Gaji ✓
              </span>
            </div>

            {/* TAB 1: TUKAR SHIFT */}
            {activeTab === "tukar" && (
              <div className="space-y-3">
                <div className="bg-cream rounded-2xl p-3 border border-cream-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 mb-1">
                    <ArrowLeftRight size={14} className="text-orange-700" />
                    <span>Tukar Shift Antar-Rekan</span>
                  </div>
                  <div className="text-[11px] text-ink-2 mb-2">
                    {employee.id === "sari"
                      ? "Rabu, 14 Okt: kamu Malam ⇄ Dimas Pagi"
                      : "Kamis, 15 Okt: kamu Malam ⇄ Agus Siang"}
                  </div>

                  {/* Stepper Approval 3 Langkah */}
                  <div className="pt-2 border-t border-cream-2 text-[10px]">
                    <div className="flex items-center justify-between font-bold text-ink-2 mb-1">
                      <span className={status !== "idle" ? "text-ok" : "text-ink-3"}>
                        1. Diajukan
                      </span>
                      <span
                        className={
                          status === "menunggu-atasan" || status === "disetujui"
                            ? "text-ok"
                            : "text-ink-3"
                        }
                      >
                        2. Rekan
                      </span>
                      <span className={status === "disetujui" ? "text-ok" : "text-ink-3"}>
                        3. Atasan
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status Baris Dampak */}
                {status === "disetujui" && (
                  <div className="p-2.5 rounded-xl bg-ok-bg border border-ok/20 text-xs font-semibold text-ok flex items-center gap-2">
                    <CheckCircle2 size={16} />
                    <span>Disetujui! Tunjangan shift malam −Rp 20.000</span>
                  </div>
                )}
                {status === "ditolak" && (
                  <div className="p-2.5 rounded-xl bg-danger-bg border border-danger/20 text-xs font-semibold text-danger flex items-center gap-2">
                    <XCircle size={16} />
                    <span>Permintaan tukar shift ditolak.</span>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: IZIN SAKIT */}
            {activeTab === "sakit" && (
              <div className="space-y-3">
                <div className="bg-mist rounded-2xl p-3 border border-line">
                  <div className="text-xs font-bold text-slate-900 mb-1">
                    Izin Sakit (Demam) · 8 Jam
                  </div>
                  <div className="text-[11px] text-ink-2 mb-3">
                    {employee.id === "sari" ? "Kamis, 15 Okt 2026" : "Senin, 19 Okt 2026"}
                  </div>

                  {/* Tombol / Pratinjau Surat Dokter */}
                  {showSuratModal ? (
                    <div className="p-2 bg-white rounded-xl border border-line space-y-2">
                      <div className="text-[10px] font-bold text-ok flex items-center gap-1">
                        <FileCheck size={13} />
                        <span>surat-dokter.jpg terlampir (Sah)</span>
                      </div>
                      <div className="w-28 mx-auto">
                        <SuratDokter />
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowSuratModal(true)}
                      className="w-full py-2 px-3 rounded-xl bg-white border border-line-2 text-xs font-bold text-slate-900 flex items-center justify-center gap-1.5 hover:bg-cream transition-colors cursor-pointer"
                    >
                      <Camera size={14} className="text-orange-700" />
                      <span>Lampirkan Foto Surat Dokter</span>
                    </button>
                  )}
                </div>

                {status === "disetujui" && (
                  <div className="p-2.5 rounded-xl bg-ok-bg border border-ok/20 text-xs font-semibold text-ok flex items-center gap-2">
                    <CheckCircle2 size={16} />
                    <span>Disetujui! +8 jam dibayar penuh ke upah</span>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: LEMBUR */}
            {activeTab === "lembur" && (
              <div className="space-y-3">
                <div className="bg-cream rounded-2xl p-3 border border-cream-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-900 mb-1">
                    <span>Pengajuan Lembur 2 Jam</span>
                    <span className="text-orange-700 font-mono font-bold">
                      +{rupiah(estimasiLembur)}
                    </span>
                  </div>
                  <div className="text-[11px] text-ink-2 mb-2">
                    Jumat, 16 Okt 2026 · 17:00 – 19:00 WIB
                  </div>
                  <div className="text-[10px] text-ink-3">
                    Tarif lembur otomatis: Jam ke-1 (1,5x), jam ke-2 (2x).
                  </div>
                </div>

                {status === "disetujui" && (
                  <div className="p-2.5 rounded-xl bg-ok-bg border border-ok/20 text-xs font-semibold text-ok flex items-center gap-2">
                    <CheckCircle2 size={16} />
                    <span>Disetujui! Lembur +2 jam masuk ke slip gaji</span>
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: CUTI */}
            {activeTab === "cuti" && (
              <div className="space-y-3">
                <div className="bg-mist rounded-2xl p-3 border border-line">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-900 mb-1">
                    <span>Cuti Tahunan (2 Hari)</span>
                    <span className="text-xs font-mono font-bold text-ink">
                      Sisa: {effectiveSisaCuti} hari
                    </span>
                  </div>
                  <div className="text-[11px] text-ink-2 mb-2">
                    20 – 21 Oktober 2026 (2 hari kerja)
                  </div>

                  {/* Progress bar sisa cuti */}
                  <div className="w-full bg-line rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-orange h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${(effectiveSisaCuti / employee.totalCuti) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                {status === "disetujui" && (
                  <div className="p-2.5 rounded-xl bg-ok-bg border border-ok/20 text-xs font-semibold text-ok flex items-center gap-2">
                    <CheckCircle2 size={16} />
                    <span>Disetujui! Saldo cuti terpotong 2 hari</span>
                  </div>
                )}
              </div>
            )}

            {/* Tombol Aksi Alur Persetujuan (Workflow) */}
            <div className="mt-4 pt-3 border-t border-line space-y-2">
              {status === "idle" && (
                <button
                  onClick={() => advanceRequest(activeTab)}
                  className="w-full h-11 rounded-[14px] bg-orange text-slate-900 font-bold text-xs hover:bg-orange-600 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Ajukan {activeTab.toUpperCase()}</span>
                  <ChevronRight size={15} />
                </button>
              )}

              {status === "menunggu-rekan" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => advanceRequest(activeTab)}
                    className="flex-1 h-11 rounded-[14px] bg-ok-bg border border-ok/30 text-ok font-bold text-xs hover:bg-ok-bg/80 transition-colors cursor-pointer"
                  >
                    Rekan Menyetujui ✓
                  </button>
                  <button
                    onClick={() => rejectRequest(activeTab)}
                    className="px-3 h-11 rounded-[14px] bg-danger-bg border border-danger/30 text-danger font-bold text-xs hover:bg-danger-bg/80 transition-colors cursor-pointer"
                  >
                    Tolak
                  </button>
                </div>
              )}

              {status === "menunggu-atasan" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => advanceRequest(activeTab)}
                    className="flex-1 h-11 rounded-[14px] bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Atasan Menyetujui ✓
                  </button>
                  <button
                    onClick={() => rejectRequest(activeTab)}
                    className="px-3 h-11 rounded-[14px] bg-danger-bg border border-danger/30 text-danger font-bold text-xs hover:bg-danger-bg/80 transition-colors cursor-pointer"
                  >
                    Tolak
                  </button>
                </div>
              )}

              {status === "disetujui" && (
                <div className="text-center py-1">
                  <span className="text-[11px] font-bold text-ok">
                    Alur Selesai · Data Tersinkron
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Tab Bar Bawah Ponsel (4 Tab ≥ 44px) */}
          <div className="grid grid-cols-4 gap-1 pt-2 border-t border-line text-center">
            {[
              { id: "tukar", label: "Tukar", icon: ArrowLeftRight },
              { id: "sakit", label: "Sakit", icon: Camera },
              { id: "lembur", label: "Lembur", icon: Clock },
              { id: "cuti", label: "Cuti", icon: CalendarRange },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as RequestId)}
                  className={`h-11 flex flex-col items-center justify-center rounded-xl transition-colors cursor-pointer ${
                    isActive
                      ? "text-orange-700 bg-cream-2/70 font-bold"
                      : "text-ink-3 hover:text-slate-900 hover:bg-mist"
                  }`}
                >
                  <Icon size={16} strokeWidth={isActive ? 2.2 : 1.75} />
                  <span className="text-[10px] mt-0.5">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </PhoneFrame>

      {/* Strip Dampak di Bawah Ponsel */}
      <div className="mt-4 px-4 py-2 rounded-full bg-cream border border-cream-2 text-xs font-semibold text-ink-2 flex items-center gap-2">
        <GitPullRequest size={14} className="text-orange-700" />
        <span>Perubahan terkirim ke: Absensi · Gaji</span>
      </div>
    </div>
  );
}
