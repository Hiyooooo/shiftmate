"use client";

import React, { createContext, useContext, useState, useMemo } from "react";
import { EMPLOYEES, EmployeeProfile } from "@/lib/data";
import { computePayroll, PayrollResult } from "@/lib/payroll";

export type RequestId = "tukar" | "sakit" | "lembur" | "cuti";
export type RequestStatus = "idle" | "menunggu-rekan" | "menunggu-atasan" | "disetujui" | "ditolak";

export interface DemoContextType {
  employeeId: "sari" | "rudi";
  employee: EmployeeProfile;
  setEmployeeId: (id: "sari" | "rudi") => void;
  requests: Record<RequestId, RequestStatus>;
  setRequestStatus: (id: RequestId, status: RequestStatus) => void;
  advanceRequest: (id: RequestId) => void;
  rejectRequest: (id: RequestId) => void;
  reimbursement: boolean;
  setReimbursement: (val: boolean | ((prev: boolean) => boolean)) => void;
  offline: boolean;
  setOffline: (val: boolean | ((prev: boolean) => boolean)) => void;
  fakeGps: boolean;
  setFakeGps: (val: boolean | ((prev: boolean) => boolean)) => void;
  resetDemo: () => void;
  payrollResult: PayrollResult;
  effectiveShiftMalam: number;
  effectiveJamSakit: number;
  effectiveHariLemburJam: number[];
  effectiveSisaCuti: number;
  liveFeedback: string;
}

const DemoContext = createContext<DemoContextType | null>(null);

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [employeeId, setEmployeeIdState] = useState<"sari" | "rudi">("sari");
  const [requests, setRequests] = useState<Record<RequestId, RequestStatus>>({
    tukar: "idle",
    sakit: "idle",
    lembur: "idle",
    cuti: "idle",
  });
  const [reimbursement, setReimbursement] = useState(false);
  const [offline, setOffline] = useState(false);
  const [fakeGps, setFakeGps] = useState(false);
  const [liveFeedback, setLiveFeedback] = useState("");

  const baseEmp = EMPLOYEES[employeeId];

  // Efek terintegrasi saat status disetujui:
  const effectiveShiftMalam = useMemo(() => {
    if (requests.tukar === "disetujui") {
      return Math.max(0, baseEmp.shiftMalam - 1);
    }
    return baseEmp.shiftMalam;
  }, [baseEmp.shiftMalam, requests.tukar]);

  const effectiveJamSakit = useMemo(() => {
    if (requests.sakit === "disetujui") {
      return 8; // 8 jam dibayar penuh dengan surat dokter
    }
    return 0;
  }, [requests.sakit]);

  const effectiveHariLemburJam = useMemo(() => {
    if (requests.lembur === "disetujui") {
      return [...baseEmp.hariLemburJam, 2]; // Tambah satu hari lembur 2 jam
    }
    return baseEmp.hariLemburJam;
  }, [baseEmp.hariLemburJam, requests.lembur]);

  const effectiveSisaCuti = useMemo(() => {
    if (requests.cuti === "disetujui") {
      return Math.max(0, baseEmp.sisaCuti - 2);
    }
    return baseEmp.sisaCuti;
  }, [baseEmp.sisaCuti, requests.cuti]);

  // Kalkulasi Payroll otomatis
  const payrollResult = useMemo(() => {
    return computePayroll({
      rate: baseEmp.rate,
      jamReguler: baseEmp.jamReguler,
      jamSakit: effectiveJamSakit,
      hariHadir: baseEmp.hariHadir,
      tarifUangHadir: baseEmp.tarifUangHadir,
      shiftMalam: effectiveShiftMalam,
      tarifShiftMalam: baseEmp.tarifShiftMalam,
      hariLemburJam: effectiveHariLemburJam,
      reimbursement,
    });
  }, [baseEmp, effectiveJamSakit, effectiveShiftMalam, effectiveHariLemburJam, reimbursement]);

  const setEmployeeId = (id: "sari" | "rudi") => {
    setEmployeeIdState(id);
    setRequests({
      tukar: "idle",
      sakit: "idle",
      lembur: "idle",
      cuti: "idle",
    });
    setReimbursement(false);
    setLiveFeedback(`Data beralih ke ${EMPLOYEES[id].name}`);
  };

  const setRequestStatus = (id: RequestId, status: RequestStatus) => {
    setRequests((prev) => ({ ...prev, [id]: status }));
  };

  const advanceRequest = (id: RequestId) => {
    setRequests((prev) => {
      const current = prev[id];
      if (id === "tukar") {
        if (current === "idle") {
          setLiveFeedback("Permintaan tukar shift diajukan ke rekan");
          return { ...prev, [id]: "menunggu-rekan" };
        }
        if (current === "menunggu-rekan") {
          setLiveFeedback("Rekan menyetujui, menunggu persetujuan atasan");
          return { ...prev, [id]: "menunggu-atasan" };
        }
        if (current === "menunggu-atasan") {
          setLiveFeedback("Tukar shift disetujui! Slip gaji & jadwal diperbarui");
          return { ...prev, [id]: "disetujui" };
        }
      } else {
        // Sakit, Lembur, Cuti: langsung ke atasan
        if (current === "idle") {
          setLiveFeedback(`Pengajuan ${id} terkirim ke atasan`);
          return { ...prev, [id]: "menunggu-atasan" };
        }
        if (current === "menunggu-atasan") {
          setLiveFeedback(`Pengajuan ${id} disetujui atasan! Slip gaji diperbarui`);
          return { ...prev, [id]: "disetujui" };
        }
      }
      return prev;
    });
  };

  const rejectRequest = (id: RequestId) => {
    setRequests((prev) => ({ ...prev, [id]: "ditolak" }));
    setLiveFeedback(`Pengajuan ${id} ditolak`);
  };

  const resetDemo = () => {
    setRequests({
      tukar: "idle",
      sakit: "idle",
      lembur: "idle",
      cuti: "idle",
    });
    setReimbursement(false);
    setFakeGps(false);
    setOffline(false);
    setLiveFeedback("Simulasi interaktif telah direset ke kondisi awal");
  };

  return (
    <DemoContext.Provider
      value={{
        employeeId,
        employee: baseEmp,
        setEmployeeId,
        requests,
        setRequestStatus,
        advanceRequest,
        rejectRequest,
        reimbursement,
        setReimbursement,
        offline,
        setOffline,
        fakeGps,
        setFakeGps,
        resetDemo,
        payrollResult,
        effectiveShiftMalam,
        effectiveJamSakit,
        effectiveHariLemburJam,
        effectiveSisaCuti,
        liveFeedback,
      }}
    >
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {liveFeedback}
      </div>
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error("useDemo must be used within a DemoProvider");
  }
  return context;
}
