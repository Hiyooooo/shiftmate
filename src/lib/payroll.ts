/**
 * Rumus Payroll ShiftMate (lib/payroll.ts)
 * 
 * Penyederhanaan demo (WAJIB dicatat & dikonfirmasi sebelum rilis produksi):
 * (a) pengali lembur dihitung dari upah per jam langsung, bukan 1/173 upah bulanan;
 * (b) hanya mengimplementasikan tarif TER kategori A (TK/0);
 * (c) premi BPJS yang dibayar pemberi kerja belum diperhitungkan ke dalam penghasilan bruto;
 * (d) batas atas upah iuran BPJS tidak dimodelkan (unclamped);
 * (e) izin sakit dibayar penuh 100% (sesuai kebijakan perusahaan demo);
 * (f) rekonsiliasi tahunan PPh 21 masa pajak Desember tidak dimodelkan.
 * 
 * Catatan hukum & perpajakan: Simulasi ilustratif, bukan nasihat pajak.
 */

export interface PayrollInput {
  rate: number;
  jamReguler: number;
  jamSakit: number;
  hariHadir: number;
  tarifUangHadir: number;
  shiftMalam: number;
  tarifShiftMalam: number;
  hariLemburJam: number[];
  reimbursement?: boolean;
}

export interface PayrollResult {
  upahJam: number;
  uangHadir: number;
  tunjMalam: number;
  lembur: number;
  bruto: number;
  tarifTERPersen: number;
  pph21: number;
  bpjsTK: number;
  bpjsKes: number;
  bersih: number;
  reimbursementNominal: number;
  ditransfer: number;
  jamLemburTotal: number;
}

/**
 * Hitung upah lembur harian:
 * jam ke-1 dikalikan 1,5x; jam berikutnya dikalikan 2x
 */
export function hitungLemburHarian(jam: number, rate: number): number {
  if (jam <= 0) return 0;
  const jamPertama = Math.min(jam, 1);
  const jamLanjutan = Math.max(jam - 1, 0);
  return Math.round(jamPertama * 1.5 * rate + jamLanjutan * 2 * rate);
}

/**
 * Lookup tarif TER Kategori A (PTKP TK/0) berdasarkan penghasilan bruto bulanan.
 * Tabel TER Kategori A (PP 58/2023):
 * ≤ 5.400.000 -> 0%
 * ≤ 5.650.000 -> 0,25%
 * ≤ 5.950.000 -> 0,5%
 * ≤ 6.300.000 -> 0,75%
 * ≤ 6.750.000 -> 1%
 * ≤ 7.500.000 -> 1,25%
 * ≤ 8.550.000 -> 1,5%
 * ≤ 9.650.000 -> 1,75%
 * ≤ 10.050.000 -> 2%
 * > 10.050.000 -> 2% (klem demo)
 */
export function lookupTER_A(bruto: number): number {
  if (bruto <= 5_400_000) return 0;
  if (bruto <= 5_650_000) return 0.25;
  if (bruto <= 5_950_000) return 0.5;
  if (bruto <= 6_300_000) return 0.75;
  if (bruto <= 6_750_000) return 1.0;
  if (bruto <= 7_500_000) return 1.25;
  if (bruto <= 8_550_000) return 1.5;
  if (bruto <= 9_650_000) return 1.75;
  return 2.0;
}

/**
 * Kalkulasi menyeluruh payroll karyawan shift
 */
export function computePayroll(input: PayrollInput): PayrollResult {
  const upahJam = Math.round((input.jamReguler + input.jamSakit) * input.rate);
  const uangHadir = Math.round(input.hariHadir * input.tarifUangHadir);
  const tunjMalam = Math.round(input.shiftMalam * input.tarifShiftMalam);

  let lembur = 0;
  let jamLemburTotal = 0;
  for (const jam of input.hariLemburJam) {
    jamLemburTotal += jam;
    lembur += hitungLemburHarian(jam, input.rate);
  }

  const bruto = upahJam + uangHadir + tunjMalam + lembur;
  const tarifTERPersen = lookupTER_A(bruto);
  const pph21 = Math.round((bruto * tarifTERPersen) / 100);

  // Porsi karyawan: JHT 2% + JP 1% = 3%
  const bpjsTK = Math.round(upahJam * 0.03);
  // Porsi karyawan: BPJS Kesehatan 1%
  const bpjsKes = Math.round(upahJam * 0.01);

  const bersih = bruto - pph21 - bpjsTK - bpjsKes;
  const reimbursementNominal = input.reimbursement ? 75_000 : 0;
  const ditransfer = bersih + reimbursementNominal;

  return {
    upahJam,
    uangHadir,
    tunjMalam,
    lembur,
    bruto,
    tarifTERPersen,
    pph21,
    bpjsTK,
    bpjsKes,
    bersih,
    reimbursementNominal,
    ditransfer,
    jamLemburTotal,
  };
}
