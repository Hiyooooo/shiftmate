import { describe, it, expect } from "vitest";
import { computePayroll, hitungLemburHarian, lookupTER_A, PayrollInput } from "./payroll";
import { buildWeek, checkShiftConflict } from "./shifts";

describe("Formula Payroll ShiftMate - 10 Test Vector Wajib (docs/04)", () => {
  const sariBaseInput: PayrollInput = {
    rate: 24_000,
    jamReguler: 176,
    jamSakit: 0,
    hariHadir: 22,
    tarifUangHadir: 15_000,
    shiftMalam: 6,
    tarifShiftMalam: 20_000,
    hariLemburJam: [1, 2, 1],
  };

  const rudiBaseInput: PayrollInput = {
    rate: 28_000,
    jamReguler: 192,
    jamSakit: 0,
    hariHadir: 24,
    tarifUangHadir: 20_000,
    shiftMalam: 8,
    tarifShiftMalam: 25_000,
    hariLemburJam: [2, 2, 3],
  };

  describe("Sari Wulandari (Barista - Bandung, Rate Rp 24.000)", () => {
    it("1. Skenario Dasar", () => {
      const res = computePayroll(sariBaseInput);
      expect(res.upahJam).toBe(4_224_000);
      expect(res.uangHadir).toBe(330_000);
      expect(res.tunjMalam).toBe(120_000);
      expect(res.lembur).toBe(156_000);
      expect(res.bruto).toBe(4_830_000);
      expect(res.tarifTERPersen).toBe(0);
      expect(res.pph21).toBe(0);
      expect(res.bpjsTK).toBe(126_720);
      expect(res.bpjsKes).toBe(42_240);
      expect(res.bersih).toBe(4_661_040);
    });

    it("2. Skenario + Sakit Disetujui (+8 jam sakit)", () => {
      const res = computePayroll({ ...sariBaseInput, jamSakit: 8 });
      expect(res.upahJam).toBe(4_416_000);
      expect(res.uangHadir).toBe(330_000);
      expect(res.tunjMalam).toBe(120_000);
      expect(res.lembur).toBe(156_000);
      expect(res.bruto).toBe(5_022_000);
      expect(res.tarifTERPersen).toBe(0);
      expect(res.pph21).toBe(0);
      expect(res.bpjsTK).toBe(132_480);
      expect(res.bpjsKes).toBe(44_160);
      expect(res.bersih).toBe(4_845_360);
    });

    it("3. Skenario + Tukar Shift (Shift malam berkurang 1 jadi 5)", () => {
      const res = computePayroll({ ...sariBaseInput, shiftMalam: 5 });
      expect(res.upahJam).toBe(4_224_000);
      expect(res.uangHadir).toBe(330_000);
      expect(res.tunjMalam).toBe(100_000);
      expect(res.lembur).toBe(156_000);
      expect(res.bruto).toBe(4_810_000);
      expect(res.tarifTERPersen).toBe(0);
      expect(res.pph21).toBe(0);
      expect(res.bpjsTK).toBe(126_720);
      expect(res.bpjsKes).toBe(42_240);
      expect(res.bersih).toBe(4_641_040);
    });

    it("4. Skenario + Lembur 2 Jam (Tambah 1 hari lembur 2 jam)", () => {
      const res = computePayroll({ ...sariBaseInput, hariLemburJam: [1, 2, 1, 2] });
      expect(res.upahJam).toBe(4_224_000);
      expect(res.uangHadir).toBe(330_000);
      expect(res.tunjMalam).toBe(120_000);
      expect(res.lembur).toBe(240_000);
      expect(res.bruto).toBe(4_914_000);
      expect(res.tarifTERPersen).toBe(0);
      expect(res.pph21).toBe(0);
      expect(res.bpjsTK).toBe(126_720);
      expect(res.bpjsKes).toBe(42_240);
      expect(res.bersih).toBe(4_745_040);
    });

    it("5. Skenario Ketiganya (Sakit + Tukar + Lembur)", () => {
      const res = computePayroll({
        ...sariBaseInput,
        jamSakit: 8,
        shiftMalam: 5,
        hariLemburJam: [1, 2, 1, 2],
      });
      expect(res.upahJam).toBe(4_416_000);
      expect(res.uangHadir).toBe(330_000);
      expect(res.tunjMalam).toBe(100_000);
      expect(res.lembur).toBe(240_000);
      expect(res.bruto).toBe(5_086_000);
      expect(res.tarifTERPersen).toBe(0);
      expect(res.pph21).toBe(0);
      expect(res.bpjsTK).toBe(132_480);
      expect(res.bpjsKes).toBe(44_160);
      expect(res.bersih).toBe(4_909_360);
    });

    it("Reimbursement +75.000 pada Sari Dasar", () => {
      const res = computePayroll({ ...sariBaseInput, reimbursement: true });
      expect(res.reimbursementNominal).toBe(75_000);
      expect(res.ditransfer).toBe(4_736_040);
    });
  });

  describe("Rudi Hartono (Driver - Cikarang, Rate Rp 28.000)", () => {
    it("6. Skenario Dasar", () => {
      const res = computePayroll(rudiBaseInput);
      expect(res.upahJam).toBe(5_376_000);
      expect(res.uangHadir).toBe(480_000);
      expect(res.tunjMalam).toBe(200_000);
      expect(res.lembur).toBe(350_000);
      expect(res.bruto).toBe(6_406_000);
      expect(res.tarifTERPersen).toBe(1.0);
      expect(res.pph21).toBe(64_060);
      expect(res.bpjsTK).toBe(161_280);
      expect(res.bpjsKes).toBe(53_760);
      expect(res.bersih).toBe(6_126_900);
    });

    it("7. Skenario + Sakit Disetujui (+8 jam sakit)", () => {
      const res = computePayroll({ ...rudiBaseInput, jamSakit: 8 });
      expect(res.upahJam).toBe(5_600_000);
      expect(res.uangHadir).toBe(480_000);
      expect(res.tunjMalam).toBe(200_000);
      expect(res.lembur).toBe(350_000);
      expect(res.bruto).toBe(6_630_000);
      expect(res.tarifTERPersen).toBe(1.0);
      expect(res.pph21).toBe(66_300);
      expect(res.bpjsTK).toBe(168_000);
      expect(res.bpjsKes).toBe(56_000);
      expect(res.bersih).toBe(6_339_700);
    });

    it("8. Skenario + Tukar Shift (Shift malam berkurang 1 jadi 7)", () => {
      const res = computePayroll({ ...rudiBaseInput, shiftMalam: 7 });
      expect(res.upahJam).toBe(5_376_000);
      expect(res.uangHadir).toBe(480_000);
      expect(res.tunjMalam).toBe(175_000);
      expect(res.lembur).toBe(350_000);
      expect(res.bruto).toBe(6_381_000);
      expect(res.tarifTERPersen).toBe(1.0);
      expect(res.pph21).toBe(63_810);
      expect(res.bpjsTK).toBe(161_280);
      expect(res.bpjsKes).toBe(53_760);
      expect(res.bersih).toBe(6_102_150);
    });

    it("9. Skenario + Lembur 2 Jam (Tambah 1 hari lembur 2 jam)", () => {
      const res = computePayroll({ ...rudiBaseInput, hariLemburJam: [2, 2, 3, 2] });
      expect(res.upahJam).toBe(5_376_000);
      expect(res.uangHadir).toBe(480_000);
      expect(res.tunjMalam).toBe(200_000);
      expect(res.lembur).toBe(448_000);
      expect(res.bruto).toBe(6_504_000);
      expect(res.tarifTERPersen).toBe(1.0);
      expect(res.pph21).toBe(65_040);
      expect(res.bpjsTK).toBe(161_280);
      expect(res.bpjsKes).toBe(53_760);
      expect(res.bersih).toBe(6_223_920);
    });

    it("10. Skenario Ketiganya (Sakit + Tukar + Lembur)", () => {
      const res = computePayroll({
        ...rudiBaseInput,
        jamSakit: 8,
        shiftMalam: 7,
        hariLemburJam: [2, 2, 3, 2],
      });
      expect(res.upahJam).toBe(5_600_000);
      expect(res.uangHadir).toBe(480_000);
      expect(res.tunjMalam).toBe(175_000);
      expect(res.lembur).toBe(448_000);
      expect(res.bruto).toBe(6_703_000);
      expect(res.tarifTERPersen).toBe(1.0);
      expect(res.pph21).toBe(67_030);
      expect(res.bpjsTK).toBe(168_000);
      expect(res.bpjsKes).toBe(56_000);
      expect(res.bersih).toBe(6_411_970);
    });

    it("Reimbursement +75.000 pada Rudi Dasar", () => {
      const res = computePayroll({ ...rudiBaseInput, reimbursement: true });
      expect(res.reimbursementNominal).toBe(75_000);
      expect(res.ditransfer).toBe(6_201_900);
    });
  });

  describe("Detail Fungsi Lembur & Lookup TER", () => {
    it("Hitung lembur harian bertahap", () => {
      // 1 jam: 1 * 1.5 * 24000 = 36000
      expect(hitungLemburHarian(1, 24_000)).toBe(36_000);
      // 2 jam: 36000 + 1 * 2 * 24000 = 84000
      expect(hitungLemburHarian(2, 24_000)).toBe(84_000);
      // 3 jam Rudi: 1 * 1.5 * 28000 + 2 * 2 * 28000 = 42000 + 112000 = 154000
      expect(hitungLemburHarian(3, 28_000)).toBe(154_000);
    });

    it("Lookup tarif TER A", () => {
      expect(lookupTER_A(5_000_000)).toBe(0);
      expect(lookupTER_A(5_400_000)).toBe(0);
      expect(lookupTER_A(5_500_000)).toBe(0.25);
      expect(lookupTER_A(5_800_000)).toBe(0.5);
      expect(lookupTER_A(6_200_000)).toBe(0.75);
      expect(lookupTER_A(6_500_000)).toBe(1.0);
      expect(lookupTER_A(7_000_000)).toBe(1.25);
      expect(lookupTER_A(8_000_000)).toBe(1.5);
      expect(lookupTER_A(9_000_000)).toBe(1.75);
      expect(lookupTER_A(10_000_000)).toBe(2.0);
    });
  });

  describe("Generator Jadwal Shift (lib/shifts.ts)", () => {
    it("Membangun 7 hari pola 2-2-2-2", () => {
      const week = buildWeek("2-2-2-2");
      expect(week).toHaveLength(7);
      expect(week[0].shift.code).toBe("P");
      expect(week[1].shift.code).toBe("P");
      expect(week[2].shift.code).toBe("S");
      expect(week[3].shift.code).toBe("S");
      expect(week[4].shift.code).toBe("M");
      expect(week[5].shift.code).toBe("M");
      expect(week[6].shift.code).toBe("L");
    });

    it("Mendeteksi bentrok jeda shift kurang dari 8 jam (M -> P)", () => {
      const conflict = checkShiftConflict("M", "P");
      expect(conflict.hasConflict).toBe(true);
      expect(conflict.reason).toBe("Jeda kurang dari 8 jam");

      const noConflict = checkShiftConflict("P", "S");
      expect(noConflict.hasConflict).toBe(false);
    });
  });
});
