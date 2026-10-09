/**
 * Manifest gambar dokumenter & integrasi fallback ilustrasi (docs/07)
 */

export interface ImageManifestItem {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  title: string;
  description: string;
  shiftChip: string;
  fallbackKey: "fnb" | "hotel" | "logistik" | "klinik" | "cta";
}

export const IMAGE_MANIFEST: Record<string, ImageManifestItem> = {
  "P-01": {
    id: "P-01",
    src: "/images/industri/fnb.jpg",
    alt: "Barista menyiapkan pesanan kopi di balik meja bar",
    width: 1200,
    height: 900,
    title: "F&B & Restoran",
    description: "Barista dan kru dapur absen di outlet masing-masing, tukar shift tanpa menunggu grup chat.",
    shiftChip: "2 shift · buka–tutup",
    fallbackKey: "fnb",
  },
  "P-02": {
    id: "P-02",
    src: "/images/industri/hotel.jpg",
    alt: "Staf hotel di meja resepsionis siap menyambut tamu",
    width: 1200,
    height: 900,
    title: "Perhotelan",
    description: "Front office, housekeeping, dan F&B hotel bergantian pagi, siang, malam dengan jeda yang tercatat.",
    shiftChip: "3 shift · 24 jam",
    fallbackKey: "hotel",
  },
  "P-03": {
    id: "P-03",
    src: "/images/industri/logistik.jpg",
    alt: "Kru gudang logistik memeriksa paket di rak penyimpanan",
    width: 1200,
    height: 900,
    title: "Logistik & Gudang",
    description: "Driver dan kru gudang absen dari titik muat, lembur terhitung dari jam nyata.",
    shiftChip: "3 shift · rotasi",
    fallbackKey: "logistik",
  },
  "P-04": {
    id: "P-04",
    src: "/images/industri/klinik.jpg",
    alt: "Perawat di stasiun jaga klinik memeriksa data pasien",
    width: 1200,
    height: 900,
    title: "Klinik & Rumah Sakit",
    description: "Perawat dan staf penunjang mengisi checklist higienitas sebelum jaga dimulai.",
    shiftChip: "3 shift · jaga",
    fallbackKey: "klinik",
  },
  "P-05": {
    id: "P-05",
    src: "/images/cta/pergantian-shift.jpg",
    alt: "Kru staf operasional melakukan serah terima saat pergantian shift kerja",
    width: 1920,
    height: 1080,
    title: "Pergantian Shift Kerja",
    description: "Serah terima shift rapi dan transparan",
    shiftChip: "Serah terima",
    fallbackKey: "cta",
  },
};
