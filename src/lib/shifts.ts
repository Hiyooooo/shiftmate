/**
 * Manajemen Shift & Pola Rotasi (lib/shifts.ts)
 */

export type ShiftType = "P" | "S" | "M" | "L";

export interface ShiftInfo {
  code: ShiftType;
  label: string;
  name: string;
  hours: string;
  startTime: string; // "07:00"
  endTime: string;   // "15:00"
}

export const SHIFT_DEFS: Record<ShiftType, ShiftInfo> = {
  P: {
    code: "P",
    label: "Pagi",
    name: "Shift Pagi",
    hours: "07:00 – 15:00",
    startTime: "07:00",
    endTime: "15:00",
  },
  S: {
    code: "S",
    label: "Siang",
    name: "Shift Siang",
    hours: "15:00 – 23:00",
    startTime: "15:00",
    endTime: "23:00",
  },
  M: {
    code: "M",
    label: "Malam",
    name: "Shift Malam",
    hours: "23:00 – 07:00",
    startTime: "23:00",
    endTime: "07:00",
  },
  L: {
    code: "L",
    label: "Libur",
    name: "Hari Libur",
    hours: "Off",
    startTime: "",
    endTime: "",
  },
};

export type ShiftPattern = "2-2-2-2" | "5-2" | "3-shift-7d";

export interface DaySchedule {
  dayName: string; // "Sen", "Sel", dst.
  dateNumber: number; // 12, 13, dst.
  dateString: string; // "12 Okt"
  shift: ShiftInfo;
  isToday?: boolean;
  hasConflict?: boolean;
  conflictReason?: string;
}

/**
 * Cek apakah ada bentrok jeda istirahat < 8 jam antara dua shift berurutan.
 * Khususnya: Shift Malam (selesai 07:00) langsung diikuti Shift Pagi (mulai 07:00 di hari berikutnya).
 */
export function checkShiftConflict(prev: ShiftType, curr: ShiftType): { hasConflict: boolean; reason?: string } {
  if (prev === "M" && curr === "P") {
    return {
      hasConflict: true,
      reason: "Jeda kurang dari 8 jam",
    };
  }
  return { hasConflict: false };
}

/**
 * Buat jadwal 7 hari (Senin s/d Minggu) berdasarkan pola yang dipilih.
 */
export function buildWeek(pattern: ShiftPattern, startDayOffset: number = 0): DaySchedule[] {
  const dayNames = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
  const baseDate = 12; // Contoh minggu 12–18 Oktober 2026

  let patternSequence: ShiftType[];

  switch (pattern) {
    case "2-2-2-2":
      // 2 pagi, 2 siang, 2 malam, 2 libur (siklus 8 hari)
      patternSequence = ["P", "P", "S", "S", "M", "M", "L"];
      break;
    case "5-2":
      // 5 hari kerja pagi, 2 hari libur
      patternSequence = ["P", "P", "P", "P", "P", "L", "L"];
      break;
    case "3-shift-7d":
      // Rotasi 3 shift bergiliran
      patternSequence = ["P", "S", "M", "L", "P", "S", "M"];
      break;
    default:
      patternSequence = ["P", "P", "S", "S", "M", "M", "L"];
  }

  const result: DaySchedule[] = [];

  for (let i = 0; i < 7; i++) {
    const shiftCode = patternSequence[(i + startDayOffset) % patternSequence.length];
    const prevCode = i > 0 ? patternSequence[(i - 1 + startDayOffset) % patternSequence.length] : "L";
    const conflict = checkShiftConflict(prevCode, shiftCode);

    result.push({
      dayName: dayNames[i],
      dateNumber: baseDate + i,
      dateString: `${baseDate + i} Okt`,
      shift: SHIFT_DEFS[shiftCode],
      isToday: i === 2, // Rabu 14 Okt sebagai hari ini
      hasConflict: conflict.hasConflict,
      conflictReason: conflict.reason,
    });
  }

  return result;
}
