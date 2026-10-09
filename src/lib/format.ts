/**
 * Format angka menjadi format Rupiah Indonesia.
 * Contoh: 4661040 -> "Rp 4.661.040", -126720 -> "−Rp 126.720"
 */
export function rupiah(value: number): string {
  const isNegative = value < 0;
  const absValue = Math.abs(Math.round(value));
  const formatted = absValue.toLocaleString("id-ID");
  
  if (isNegative) {
    return `−Rp ${formatted}`;
  }
  return `Rp ${formatted}`;
}

/**
 * Format angka jam.
 * Contoh: 4 -> "4 jam", 7.5 -> "7,5 jam"
 */
export function jam(value: number): string {
  const formatted = value.toLocaleString("id-ID", {
    maximumFractionDigits: 1,
  });
  return `${formatted} jam`;
}

/**
 * Format angka persentase.
 * Contoh: 0.01 -> "1%", 0.0025 -> "0,25%"
 */
export function persen(value: number): string {
  const formatted = (value * 100).toLocaleString("id-ID", {
    maximumFractionDigits: 2,
  });
  return `${formatted}%`;
}
