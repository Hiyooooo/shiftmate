"use client";

import React, { useState } from "react";
import {
  ClipboardCheck,
  CheckCircle2,
  AlertTriangle,
  ScanFace,
  Timer,
  Check,
  Smartphone,
  ShieldAlert,
} from "lucide-react";
import { PhoneFrame } from "../phone/PhoneFrame";
import { HYGIENE_CHECKLIST, EXAM_QUIZZES } from "@/lib/data";

type ExamTab = "higienitas" | "briefing" | "kompetensi" | "kinerja";

export function ExamPhone() {
  const [activeTab, setActiveTab] = useState<ExamTab>("higienitas");

  // State Checklist Higienitas
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    h1: true,
    h2: true,
    h3: true,
    h4: true,
    h5: true,
    h6: false,
  });

  // State Briefing Soal
  const [selectedBriefing, setSelectedBriefing] = useState<number | null>(null);

  // State Evaluasi Kinerja (Slider dinamis)
  const [kinerjaValues, setKinerjaValues] = useState({
    waktu: 4.5,
    kebersihan: 4.0,
    layanan: 4.1,
  });

  // State Proctoring
  const [violations, setViolations] = useState(0);
  const [showWarning, setShowWarning] = useState(false);

  const toggleChecklist = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const isHygieneComplete = Object.values(checkedItems).every(Boolean);

  const handleSimulateSwitchApp = () => {
    setViolations((prev) => prev + 1);
    setShowWarning(true);
    setTimeout(() => setShowWarning(false), 3000);
  };

  const avgKinerja = (
    (kinerjaValues.waktu + kinerjaValues.kebersihan + kinerjaValues.layanan) /
    3
  ).toFixed(1);

  return (
    <div className="flex flex-col items-center">
      <PhoneFrame
        variant="android"
        label="Simulasi Modul Exam, Higienitas, dan Briefing"
        time="06:50 WIB"
      >
        <div className="flex-1 flex flex-col justify-between p-4 bg-white">
          <div>
            {/* Banner Wajib Selesai Sebelum Shift */}
            <div className="bg-cream rounded-xl p-2.5 border border-cream-2 mb-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <ClipboardCheck size={14} className="text-orange-700" />
                <span>Wajib Sebelum Clock In</span>
              </div>
              <span className="text-[10px] font-bold text-orange-700">Pukul 06:50 WIB</span>
            </div>

            {/* Indikator Proctoring Wajah */}
            <div className="flex items-center justify-between px-2 py-1 bg-mist rounded-lg border border-line mb-2 text-[10px]">
              <div className="flex items-center gap-1 text-ink-2 font-medium">
                <ScanFace size={12} className="text-ok" />
                <span>Proctoring AI Aktif</span>
              </div>
              <button
                onClick={handleSimulateSwitchApp}
                className="text-danger font-bold hover:underline cursor-pointer"
              >
                Simulasi Pindah Tab
              </button>
            </div>

            {/* Peringatan Pelanggaran Proctoring jika ditekan */}
            {showWarning && (
              <div className="p-2 rounded-lg bg-danger-bg border border-danger/30 text-[10px] text-danger font-bold flex items-center gap-1.5 mb-2">
                <ShieldAlert size={14} className="shrink-0" />
                <span>Terdeteksi keluar aplikasi! Pelanggaran: {violations}x</span>
              </div>
            )}

            {/* TAB 1: HIGIENITAS */}
            {activeTab === "higienitas" && (
              <div className="space-y-2">
                <div className="text-[11px] font-bold text-slate-900 flex justify-between items-center">
                  <span>Checklist Higienitas Outlet</span>
                  <span className="text-ink-3 font-normal">
                    {Object.values(checkedItems).filter(Boolean).length}/6 Selesai
                  </span>
                </div>

                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {HYGIENE_CHECKLIST.map((item) => {
                    const isChecked = checkedItems[item.id] || false;
                    return (
                      <button
                        key={item.id}
                        onClick={() => toggleChecklist(item.id)}
                        className={`w-full text-left p-2 rounded-xl border text-xs flex items-center justify-between transition-colors cursor-pointer ${
                          isChecked
                            ? "bg-ok-bg/50 border-ok/30 text-slate-900"
                            : "bg-mist/60 border-line text-ink-2"
                        }`}
                      >
                        <span className="text-[11px] pr-2 leading-tight">{item.text}</span>
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${
                            isChecked ? "bg-ok text-white" : "border border-line-2 bg-white"
                          }`}
                        >
                          {isChecked && <Check size={12} strokeWidth={3} />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {isHygieneComplete ? (
                  <div className="p-2 rounded-xl bg-ok-bg text-ok text-[11px] font-bold flex items-center gap-1.5 mt-2">
                    <CheckCircle2 size={14} />
                    <span>Higienitas Lengkap · Siap untuk Clock In!</span>
                  </div>
                ) : (
                  <div className="text-[10px] text-warn font-semibold text-center mt-1">
                    Centang seluruh poin sebelum memulai shift.
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: BRIEFING HARIAN */}
            {activeTab === "briefing" && (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">
                    Briefing Soal {EXAM_QUIZZES.briefing.current}/{EXAM_QUIZZES.briefing.total}
                  </span>
                  <div className="flex items-center gap-1 text-orange-700 font-mono font-bold text-[11px]">
                    <Timer size={12} />
                    <span>{EXAM_QUIZZES.briefing.timer}</span>
                  </div>
                </div>

                <div className="bg-mist p-2.5 rounded-xl border border-line text-xs font-semibold text-slate-900">
                  {EXAM_QUIZZES.briefing.question}
                </div>

                <div className="space-y-1.5">
                  {EXAM_QUIZZES.briefing.options.map((opt, idx) => {
                    const isSelected = selectedBriefing === idx;
                    const isCorrect = idx === EXAM_QUIZZES.briefing.correctIndex;
                    return (
                      <button
                        key={opt}
                        onClick={() => setSelectedBriefing(idx)}
                        className={`w-full text-left p-2 rounded-xl border text-[11px] transition-colors cursor-pointer ${
                          isSelected
                            ? isCorrect
                              ? "bg-ok-bg border-ok text-ok font-bold"
                              : "bg-danger-bg border-danger text-danger font-bold"
                            : "bg-white border-line-2 text-ink-2 hover:bg-mist"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 3: UJI KOMPETENSI */}
            {activeTab === "kompetensi" && (
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-900">Uji Standar Barista / Kru</div>
                <div className="bg-mist p-2.5 rounded-xl border border-line text-xs font-semibold text-slate-900">
                  {EXAM_QUIZZES.kompetensi.question}
                </div>
                <div className="space-y-1.5">
                  {EXAM_QUIZZES.kompetensi.options.map((opt, idx) => (
                    <div
                      key={opt}
                      className={`p-2 rounded-xl border text-xs ${
                        idx === 0
                          ? "bg-ok-bg border-ok text-ok font-bold"
                          : "bg-white border-line text-ink-3"
                      }`}
                    >
                      {opt} {idx === 0 && "✓ (Jawaban Benar)"}
                    </div>
                  ))}
                </div>
                <div className="p-2 rounded-xl bg-cream border border-cream-2 text-[11px] font-bold text-orange-700 text-center">
                  Status: {EXAM_QUIZZES.kompetensi.result}
                </div>
              </div>
            )}

            {/* TAB 4: EVALUASI KINERJA */}
            {activeTab === "kinerja" && (
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900">Evaluasi Kinerja Shift</span>
                  <span className="font-mono font-bold text-orange-700 text-sm">
                    {avgKinerja} / 5.0
                  </span>
                </div>

                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span>Ketepatan Waktu</span>
                      <span className="font-mono font-bold">{kinerjaValues.waktu}</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      step="0.1"
                      value={kinerjaValues.waktu}
                      onChange={(e) =>
                        setKinerjaValues((prev) => ({
                          ...prev,
                          waktu: parseFloat(e.target.value),
                        }))
                      }
                      className="w-full accent-orange cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span>Kebersihan & Higienitas</span>
                      <span className="font-mono font-bold">{kinerjaValues.kebersihan}</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      step="0.1"
                      value={kinerjaValues.kebersihan}
                      onChange={(e) =>
                        setKinerjaValues((prev) => ({
                          ...prev,
                          kebersihan: parseFloat(e.target.value),
                        }))
                      }
                      className="w-full accent-orange cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span>Pelayanan Pelanggan</span>
                      <span className="font-mono font-bold">{kinerjaValues.layanan}</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      step="0.1"
                      value={kinerjaValues.layanan}
                      onChange={(e) =>
                        setKinerjaValues((prev) => ({
                          ...prev,
                          layanan: parseFloat(e.target.value),
                        }))
                      }
                      className="w-full accent-orange cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Tab Selector Bawah Ponsel */}
          <div className="grid grid-cols-4 gap-1 pt-2 border-t border-line text-center">
            {[
              { id: "higienitas", label: "Higienis" },
              { id: "briefing", label: "Briefing" },
              { id: "kompetensi", label: "Kuis" },
              { id: "kinerja", label: "Kinerja" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ExamTab)}
                className={`py-1.5 rounded-lg text-[10px] font-bold transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-slate-900 text-white"
                    : "text-ink-3 hover:text-slate-900 bg-mist"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </PhoneFrame>
    </div>
  );
}
