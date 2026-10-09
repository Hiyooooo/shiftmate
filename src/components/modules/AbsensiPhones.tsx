"use client";

import React, { useState } from "react";
import {
  MapPin,
  LogIn,
  ScanFace,
  ShieldAlert,
  RefreshCw,
  Users,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  Camera,
  RotateCcw,
} from "lucide-react";
import { PhoneFrame } from "../phone/PhoneFrame";
import { FloatBadge } from "../phone/FloatBadge";
import { SelfieFace } from "../art/SelfieFace";
import { MiniMap } from "../art/MiniMap";
import { ShiftChip } from "../ui/ShiftChip";
import { useDemo } from "../phone/DemoProvider";
import { buildWeek, ShiftPattern } from "@/lib/shifts";
import { TEAM_MEMBERS } from "@/lib/data";

export function AbsensiPhones() {
  const {
    employee,
    effectiveShiftMalam,
    effectiveHariLemburJam,
    fakeGps,
    setFakeGps,
  } = useDemo();

  // Status Clock In Ponsel A:
  // "idle" | "selfie" | "matching" | "locating" | "success" | "blocked"
  const [clockStep, setClockStep] = useState<
    "idle" | "selfie" | "matching" | "locating" | "success" | "blocked"
  >("idle");

  // State Ponsel B: Pola Rotasi Shift
  const [pattern, setPattern] = useState<ShiftPattern>("2-2-2-2");
  const weekSchedule = buildWeek(pattern);

  // Total lembur jam
  const totalLemburJam = effectiveHariLemburJam.reduce((a, b) => a + b, 0);

  const handleStartClockIn = () => {
    setClockStep("selfie");
  };

  const handleSnapPhoto = () => {
    setClockStep("matching");
    setTimeout(() => {
      setClockStep("locating");
      setTimeout(() => {
        if (fakeGps) {
          setClockStep("blocked");
        } else {
          setClockStep("success");
        }
      }, 1200);
    }, 1000);
  };

  const handleResetClock = () => {
    setClockStep("idle");
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-14 relative w-full">
      {/* Badge melayang di antara ponsel */}
      <FloatBadge
        icon={ShieldAlert}
        title="Anti-Fake GPS"
        description="Deteksi mock & loncatan 41 km"
        positionClass="top-10 -left-6 lg:left-1/2 lg:-translate-x-1/2 z-30"
        iconColorClass="text-danger"
      />

      {/* ========================================================
          PONSEL A: CLOCK-IN & SIMULASI FAKE GPS
      ======================================================== */}
      <div className="flex flex-col items-center">
        <div className="text-center mb-3">
          <span className="text-xs font-mono font-bold text-orange uppercase tracking-wider">
            Ponsel A · Presensi Kru
          </span>
          <div className="text-sm font-bold text-white">Verifikasi Lokasi & Wajah</div>
        </div>

        <PhoneFrame
          variant="android"
          label="Simulasi Clock-In Presensi Lapangan"
          time="07:02 WIB"
        >
          <div className="flex-1 flex flex-col p-4 bg-white">
            {/* Header Kru */}
            <div className="flex items-center justify-between pb-2 border-b border-line mb-3">
              <div>
                <span className="text-[10px] text-ink-3 block">Petugas Aktif</span>
                <span className="text-xs font-bold text-slate-900">{employee.name}</span>
              </div>
              <ShiftChip type="P" size="sm" />
            </div>

            {/* Step: IDLE */}
            {clockStep === "idle" && (
              <div className="flex-1 flex flex-col justify-between py-1">
                <div className="space-y-3">
                  <div className="bg-cream rounded-xl p-3 border border-cream-2 text-center">
                    <span className="text-[10px] font-bold text-orange-700 uppercase tracking-wide block">
                      Status Menunggu
                    </span>
                    <div className="text-xl font-mono font-bold text-slate-900">07:02 WIB</div>
                    <span className="text-[11px] text-ink-2">Jadwal Masuk 07:00 WIB</span>
                  </div>

                  <div className="bg-mist rounded-xl p-2.5 border border-line flex items-center gap-2">
                    <MapPin size={16} className="text-orange-700 shrink-0" />
                    <div className="text-left">
                      <div className="text-xs font-bold text-slate-900">{employee.locationName}</div>
                      <div className="text-[10px] text-ink-2">Geofence radius 50 m aktif</div>
                    </div>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    onClick={handleStartClockIn}
                    className="w-full h-11 rounded-[14px] bg-orange text-slate-900 font-bold text-xs hover:bg-orange-600 transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <LogIn size={15} />
                    <span>Clock In Petugas</span>
                  </button>
                </div>
              </div>
            )}

            {/* Step: SELFIE */}
            {clockStep === "selfie" && (
              <div className="flex-1 flex flex-col justify-between py-1">
                <div className="text-center mb-1">
                  <div className="text-xs font-bold text-slate-900">Foto Selfie Kehadiran</div>
                  <div className="text-[11px] text-ink-2">Wajah wajib di dalam frame</div>
                </div>
                <SelfieFace />
                <button
                  onClick={handleSnapPhoto}
                  className="w-full h-11 rounded-[14px] bg-orange text-slate-900 font-bold text-xs hover:bg-orange-600 transition-colors cursor-pointer flex items-center justify-center gap-2 mt-2"
                >
                  <Camera size={15} />
                  <span>Ambil Foto</span>
                </button>
              </div>
            )}

            {/* Step: MATCHING */}
            {clockStep === "matching" && (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                <div className="w-8 h-8 rounded-full border-2 border-orange border-t-transparent animate-spin mb-3" />
                <div className="text-xs font-bold text-slate-900 mb-1">Mencocokkan Biometrik…</div>
                <div className="text-[11px] text-ink-2">Mencegah foto dari galeri / titip absen</div>
              </div>
            )}

            {/* Step: LOCATING */}
            {clockStep === "locating" && (
              <div className="flex-1 flex flex-col justify-between py-1">
                <div className="text-center mb-1">
                  <div className="text-xs font-bold text-slate-900">Verifikasi GPS Asli</div>
                  <div className="text-[10px] text-ok font-bold">Wajah cocok ✓</div>
                </div>
                <MiniMap variant={fakeGps ? "spoofed" : "inside"} />
                <div className="text-center py-1">
                  <span className="text-[11px] text-ink-2">Memeriksa sinyal mock location…</span>
                </div>
              </div>
            )}

            {/* Step: SUCCESS */}
            {clockStep === "success" && (
              <div className="flex-1 flex flex-col justify-between py-1">
                <div className="text-center py-2">
                  <div className="w-10 h-10 rounded-full bg-ok-bg text-ok flex items-center justify-center mx-auto mb-1">
                    <CheckCircle2 size={24} />
                  </div>
                  <div className="text-xs font-bold text-slate-900">Presensi Sah Diterima</div>
                  <div className="text-[11px] font-mono text-slate-800">07:02:18 WIB</div>
                </div>
                <div className="bg-mist rounded-xl p-2.5 border border-line space-y-1.5 text-left text-[11px]">
                  <div className="flex items-center gap-1.5 font-semibold text-slate-900">
                    <CheckCircle2 size={13} className="text-ok" />
                    <span>Wajah cocok (Biometrik 99,4%)</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-semibold text-slate-900">
                    <CheckCircle2 size={13} className="text-ok" />
                    <span>Lokasi dalam radius 12m / 50m</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-semibold text-slate-900">
                    <CheckCircle2 size={13} className="text-ok" />
                    <span>GPS asli tanpa emulator/mock</span>
                  </div>
                </div>
                <button
                  onClick={handleResetClock}
                  className="w-full h-9 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors cursor-pointer mt-2"
                >
                  Selesai
                </button>
              </div>
            )}

            {/* Step: BLOCKED (FAKE GPS DETECTED) */}
            {clockStep === "blocked" && (
              <div className="flex-1 flex flex-col justify-between py-1">
                <div className="text-center py-2">
                  <div className="w-10 h-10 rounded-full bg-danger-bg text-danger flex items-center justify-center mx-auto mb-1">
                    <XCircle size={24} />
                  </div>
                  <div className="text-xs font-bold text-danger">Clock-In Ditolak!</div>
                  <div className="text-[11px] text-ink-2">Lokasi palsu terdeteksi otomatis</div>
                </div>

                <div className="bg-danger-bg/50 rounded-xl p-2.5 border border-danger/30 space-y-1 text-left text-[10px] text-slate-900">
                  <div className="flex items-center gap-1.5 font-bold text-danger">
                    <XCircle size={12} className="shrink-0" />
                    <span>Aplikasi Fake GPS / Mock Location aktif</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-bold text-danger">
                    <XCircle size={12} className="shrink-0" />
                    <span>Lompatan koordinat tidak wajar (41 km)</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-bold text-danger">
                    <XCircle size={12} className="shrink-0" />
                    <span>Laporan anomali terkirim ke atasan</span>
                  </div>
                </div>

                <button
                  onClick={handleResetClock}
                  className="w-full h-9 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors cursor-pointer mt-2"
                >
                  Coba Lagi (Matikan Mock)
                </button>
              </div>
            )}
          </div>
        </PhoneFrame>

        {/* Saklar Kontrol Fake GPS di Bawah Ponsel A */}
        <div className="mt-4 bg-slate-800 rounded-xl p-3 border border-line-dark flex items-center justify-between gap-4 w-[272px] lg:w-[300px]">
          <div>
            <div className="text-xs font-bold text-white">Simulasi Fake GPS</div>
            <div className="text-[11px] text-on-dark-3">Uji penolakan presensi</div>
          </div>
          <button
            onClick={() => {
              setFakeGps((prev) => !prev);
              setClockStep("idle");
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
              fakeGps
                ? "bg-danger text-white border border-danger"
                : "bg-slate-900 text-on-dark-2 border border-slate-700"
            }`}
          >
            {fakeGps ? "Aktif" : "Mati"}
          </button>
        </div>
      </div>

      {/* ========================================================
          PONSEL B: JADWAL SHIFT & REKAP TIM REAL-TIME
      ======================================================== */}
      <div className="flex flex-col items-center">
        <div className="text-center mb-3">
          <span className="text-xs font-mono font-bold text-orange uppercase tracking-wider">
            Ponsel B · Jadwal & Tim
          </span>
          <div className="text-sm font-bold text-white">Rotasi Shift Dinamis</div>
        </div>

        <PhoneFrame
          variant="ios"
          label="Simulasi Jadwal Shift dan Rekap Kehadiran Tim"
          time="07:02 WIB"
        >
          <div className="flex-1 flex flex-col p-4 bg-white">
            {/* Pemilih Pola Rotasi */}
            <div className="mb-3">
              <div className="text-[11px] font-bold text-slate-900 mb-1.5">
                Pilih Pola Rotasi Shift:
              </div>
              <div className="grid grid-cols-3 gap-1 bg-mist p-1 rounded-xl border border-line text-center text-xs">
                {(["2-2-2-2", "5-2", "3-shift-7d"] as ShiftPattern[]).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPattern(p)}
                    className={`py-1 rounded-lg font-bold text-[11px] transition-colors cursor-pointer ${
                      pattern === p
                        ? "bg-slate-900 text-white"
                        : "text-ink-2 hover:text-slate-900"
                    }`}
                  >
                    {p === "2-2-2-2" ? "2-2-2-2" : p === "5-2" ? "5-2 Rutin" : "3 Shift 7H"}
                  </button>
                ))}
              </div>
            </div>

            {/* Strip Kalender Minggu */}
            <div className="mb-3">
              <div className="flex items-center justify-between text-[11px] font-semibold text-ink-3 mb-1">
                <span>Oktober 2026</span>
                <span className="text-ok font-bold">Jeda &gt; 8 jam aman</span>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center">
                {weekSchedule.map((day) => (
                  <div
                    key={day.dayName}
                    className={`p-1 rounded-lg border flex flex-col items-center ${
                      day.isToday
                        ? "border-slate-900 bg-cream/70 font-bold"
                        : "border-line bg-white"
                    }`}
                  >
                    <span className="text-[9px] text-ink-3">{day.dayName}</span>
                    <span className="text-[10px] font-mono text-slate-900">{day.dateNumber}</span>
                    <span
                      className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-extrabold mt-1 ${
                        day.shift.code === "P"
                          ? "bg-cream-2 text-orange-700"
                          : day.shift.code === "S"
                          ? "bg-warn-bg text-warn"
                          : day.shift.code === "M"
                          ? "bg-slate-900 text-white"
                          : "bg-mist text-ink-3"
                      }`}
                    >
                      {day.shift.code}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ringkasan Jam Terkini (Sinkron dengan Perizinan & Gaji) */}
            <div className="bg-cream rounded-xl p-2.5 border border-cream-2 mb-3">
              <div className="flex items-center justify-between text-[10px] font-bold text-orange-700 mb-1">
                <span>Akumulasi Jam Kerja</span>
                <span>→ Sinkron ke Gaji</span>
              </div>
              <div className="grid grid-cols-3 gap-1 text-center font-mono text-xs">
                <div className="bg-white rounded-lg p-1 border border-cream-2">
                  <span className="text-[9px] text-ink-3 block">Reguler</span>
                  <span className="font-bold text-slate-900">{employee.jamReguler}h</span>
                </div>
                <div className="bg-white rounded-lg p-1 border border-cream-2">
                  <span className="text-[9px] text-ink-3 block">Malam</span>
                  <span className="font-bold text-slate-900">{effectiveShiftMalam}x</span>
                </div>
                <div className="bg-white rounded-lg p-1 border border-cream-2">
                  <span className="text-[9px] text-ink-3 block">Lembur</span>
                  <span className="font-bold text-orange-700">{totalLemburJam}h</span>
                </div>
              </div>
            </div>

            {/* Rekap Tim Real-Time */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-900 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Users size={14} className="text-orange-700" />
                    Presensi Kru (Outlet Dago)
                  </span>
                  <span className="text-[11px] text-ink-3">9/11 Hadir</span>
                </div>

                <div className="space-y-1.5">
                  {TEAM_MEMBERS.map((m) => (
                    <div
                      key={m.name}
                      className="flex items-center justify-between text-[11px] p-1.5 rounded-lg bg-mist/60 border border-line"
                    >
                      <div className="font-semibold text-slate-900">{m.name}</div>
                      <div className="flex items-center gap-1">
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            m.statusType === "ok"
                              ? "bg-ok-bg text-ok"
                              : m.statusType === "warn"
                              ? "bg-warn-bg text-warn"
                              : "bg-danger-bg text-danger"
                          }`}
                        >
                          {m.status}
                        </span>
                        <span className="text-[10px] text-ink-3 font-mono">{m.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </PhoneFrame>

        {/* Keterangan di bawah Ponsel B */}
        <div className="mt-4 text-center">
          <span className="inline-flex items-center gap-1.5 text-xs text-on-dark-2">
            <RefreshCw size={13} className="text-orange" />
            Jadwal diperbarui otomatis saat tukar shift disetujui
          </span>
        </div>
      </div>
    </div>
  );
}
