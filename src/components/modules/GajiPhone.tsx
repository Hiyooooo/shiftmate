"use client";

import React from "react";
import {
  Wallet,
  Receipt,
  FileDown,
  Info,
  Clock,
  Sparkles,
  Link2,
} from "lucide-react";
import { PhoneFrame } from "../phone/PhoneFrame";
import { useDemo } from "../phone/DemoProvider";
import { rupiah, jam } from "@/lib/format";

export function GajiPhone() {
  const {
    employee,
    payrollResult,
    effectiveShiftMalam,
    effectiveJamSakit,
    effectiveHariLemburJam,
    reimbursement,
    setReimbursement,
  } = useDemo();

  const totalJamKerja = employee.jamReguler + effectiveJamSakit;
  const totalLemburJam = effectiveHariLemburJam.reduce((a, b) => a + b, 0);

  return (
    <div className="flex flex-col items-center w-full max-w-sm">
      {/* Panel Sumber: Data Masuk Otomatis (di atas ponsel) */}
      <div className="w-full bg-white rounded-2xl p-3 border border-cream-2 mb-4 text-xs">
        <div className="flex items-center gap-1.5 font-bold text-slate-900 mb-2">
          <Link2 size={14} className="text-orange-700" />
          <span>Data Masuk Otomatis dari Modul Lain:</span>
        </div>
        <div className="space-y-1.5 font-medium text-ink-2">
          <div className="flex justify-between">
            <span>Jam kerja (Absensi & Sakit):</span>
            <span className="font-mono font-bold text-slate-900">{totalJamKerja} jam</span>
          </div>
          <div className="flex justify-between">
            <span>Hari hadir operasional:</span>
            <span className="font-mono font-bold text-slate-900">{employee.hariHadir} hari</span>
          </div>
          <div className="flex justify-between">
            <span>Shift malam terjadwal:</span>
            <span className="font-mono font-bold text-slate-900">{effectiveShiftMalam}x</span>
          </div>
          <div className="flex justify-between">
            <span>Lembur disetujui:</span>
            <span className="font-mono font-bold text-orange-700">{totalLemburJam} jam</span>
          </div>
        </div>
      </div>

      <PhoneFrame
        variant="ios"
        label="Simulasi Slip Gaji Karyawan di Aplikasi"
        time="07:02 WIB"
      >
        <div className="flex-1 flex flex-col justify-between p-4 bg-white">
          <div>
            {/* Header Slip Gaji */}
            <div className="flex items-center justify-between pb-2 border-b border-line mb-3">
              <div>
                <span className="text-[10px] text-ink-3">Slip Gaji Digital</span>
                <div className="text-xs font-bold text-slate-900">Periode Oktober 2026</div>
              </div>
              <div className="w-7 h-7 rounded-lg bg-cream-2 text-orange-700 flex items-center justify-center">
                <Wallet size={14} />
              </div>
            </div>

            {/* Kartu Gaji Bersih Dibawa Pulang */}
            <div className="bg-slate-900 rounded-2xl p-3.5 text-white mb-3">
              <span className="text-[10px] font-semibold text-on-dark-3 uppercase tracking-wider block mb-1">
                Total Dibawa Pulang (Take Home Pay)
              </span>
              <div className="text-xl font-mono font-bold text-white tabular-nums">
                {rupiah(payrollResult.ditransfer)}
              </div>
              <span className="text-[10px] text-on-dark-2 block mt-1">
                Transfer otomatis tiap tgl 28 ke rekening {employee.name}
              </span>
            </div>

            {/* Rincian Komponen Gaji */}
            <div className="space-y-2 text-xs">
              {/* Penghasilan Bruto */}
              <div className="bg-mist/70 rounded-xl p-2.5 border border-line space-y-1.5">
                <div className="text-[11px] font-bold text-slate-900 flex justify-between">
                  <span>Penghasilan Bruto</span>
                  <span className="font-mono">{rupiah(payrollResult.bruto)}</span>
                </div>
                <div className="text-[10px] text-ink-2 space-y-1 pt-1 border-t border-line">
                  <div className="flex justify-between">
                    <span>Upah per jam ({totalJamKerja}h × {rupiah(employee.rate)})</span>
                    <span className="font-mono">{rupiah(payrollResult.upahJam)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Uang hadir ({employee.hariHadir}h × {rupiah(employee.tarifUangHadir)})</span>
                    <span className="font-mono">{rupiah(payrollResult.uangHadir)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tunjangan shift malam ({effectiveShiftMalam}x)</span>
                    <span className="font-mono">{rupiah(payrollResult.tunjMalam)}</span>
                  </div>
                  <div className="flex justify-between text-orange-700 font-semibold">
                    <span>Lembur ({totalLemburJam} jam)</span>
                    <span className="font-mono">{rupiah(payrollResult.lembur)}</span>
                  </div>
                </div>
              </div>

              {/* Potongan Resmi (PPh 21 & BPJS) */}
              <div className="bg-mist/70 rounded-xl p-2.5 border border-line space-y-1 text-[10px] text-ink-2">
                <div className="text-[11px] font-bold text-slate-900 flex justify-between mb-1">
                  <span>Potongan Wajib</span>
                  <span className="font-mono text-danger">
                    {rupiah(
                      -(payrollResult.pph21 + payrollResult.bpjsTK + payrollResult.bpjsKes)
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>PPh 21 (TER A {payrollResult.tarifTERPersen}%)</span>
                  <span className="font-mono">{rupiah(-payrollResult.pph21)}</span>
                </div>
                <div className="flex justify-between">
                  <span>BPJS Ketenagakerjaan (3%)</span>
                  <span className="font-mono">{rupiah(-payrollResult.bpjsTK)}</span>
                </div>
                <div className="flex justify-between">
                  <span>BPJS Kesehatan (1%)</span>
                  <span className="font-mono">{rupiah(-payrollResult.bpjsKes)}</span>
                </div>
              </div>

              {/* Toggle Reimbursement Transport */}
              <div className="bg-cream rounded-xl p-2 border border-cream-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px]">
                  <Receipt size={13} className="text-orange-700" />
                  <span className="font-semibold text-slate-900">Klaim BBM (+Rp 75.000)</span>
                </div>
                <button
                  onClick={() => setReimbursement((prev) => !prev)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors cursor-pointer ${
                    reimbursement
                      ? "bg-orange text-slate-900"
                      : "bg-white border border-line-2 text-ink-2"
                  }`}
                >
                  {reimbursement ? "Ditambahkan" : "+ Tambah"}
                </button>
              </div>
            </div>
          </div>

          {/* Footer & Tombol Unduh PDF */}
          <div className="pt-3 border-t border-line space-y-2">
            <button
              disabled
              className="w-full h-10 rounded-xl bg-mist border border-line-2 text-slate-900 font-bold text-xs flex items-center justify-center gap-1.5 cursor-not-allowed opacity-90"
            >
              <FileDown size={14} />
              <span>Unduh Slip Gaji (PDF)</span>
            </button>
            <div className="text-[10px] text-ink-3 text-center flex items-center justify-center gap-1">
              <Info size={11} />
              <span>Simulasi ilustratif, bukan nasihat pajak.</span>
            </div>
          </div>
        </div>
      </PhoneFrame>
    </div>
  );
}
