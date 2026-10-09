/**
 * Data Terpusat ShiftMate (lib/data.ts)
 * Seluruh data dummy, teks ilustratif, FAQ, dan konten edukatif/pemasaran.
 */

export interface EmployeeProfile {
  id: "sari" | "rudi";
  name: string;
  role: string;
  company: string;
  city: string;
  locationName: string;
  rate: number;
  jamReguler: number;
  hariHadir: number;
  tarifUangHadir: number;
  shiftMalam: number;
  tarifShiftMalam: number;
  hariLemburJam: number[];
  sisaCuti: number;
  totalCuti: number;
  ptkp: string;
}

export const EMPLOYEES: Record<"sari" | "rudi", EmployeeProfile> = {
  sari: {
    id: "sari",
    name: "Sari Wulandari",
    role: "Barista",
    company: "Kopi Lereng Dago",
    city: "Bandung",
    locationName: "Kopi Lereng Dago, Bandung",
    rate: 24_000,
    jamReguler: 176,
    hariHadir: 22,
    tarifUangHadir: 15_000,
    shiftMalam: 6,
    tarifShiftMalam: 20_000,
    hariLemburJam: [1, 2, 1],
    sisaCuti: 9,
    totalCuti: 12,
    ptkp: "TK/0 (TER A)",
  },
  rudi: {
    id: "rudi",
    name: "Rudi Hartono",
    role: "Driver Ekspedisi",
    company: "Lintas Kirim Nusantara",
    city: "Cikarang",
    locationName: "Hub Cikarang Barat",
    rate: 28_000,
    jamReguler: 192,
    hariHadir: 24,
    tarifUangHadir: 20_000,
    shiftMalam: 8,
    tarifShiftMalam: 25_000,
    hariLemburJam: [2, 2, 3],
    sisaCuti: 6,
    totalCuti: 12,
    ptkp: "TK/0 (TER A)",
  },
};

export interface TeamMemberStatus {
  name: string;
  status: "Hadir" | "Terlambat" | "Di luar radius";
  time: string;
  statusType: "ok" | "warn" | "danger";
}

export const TEAM_MEMBERS: TeamMemberStatus[] = [
  { name: "Sari Wulandari", status: "Hadir", time: "06:58 WIB", statusType: "ok" },
  { name: "Dimas Saputra", status: "Hadir", time: "07:03 WIB", statusType: "ok" },
  { name: "Rudi Hartono", status: "Terlambat", time: "07:19 WIB", statusType: "warn" },
  { name: "Nadia Putri", status: "Di luar radius", time: "07:05 WIB", statusType: "danger" },
];

export interface ExamChecklistItem {
  id: string;
  text: string;
}

export const HYGIENE_CHECKLIST: ExamChecklistItem[] = [
  { id: "h1", text: "Cuci tangan 20 detik dengan sabun antibakteri" },
  { id: "h2", text: "Celemek dan penutup kepala bersih terpasang" },
  { id: "h3", text: "Kuku pendek, rapi, dan bersih" },
  { id: "h4", text: "Perhiasan dan aksesoris tangan dilepas" },
  { id: "h5", text: "Permukaan kerja dan meja bar didisinfeksi" },
  { id: "h6", text: "Suhu chiller tercatat dalam batas aman (0–5 °C)" },
];

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const EXAM_QUIZZES = {
  briefing: {
    current: 2,
    total: 5,
    timer: "04:30",
    question: "Pelanggan menyebut memiliki alergi kacang. Apa langkah pertama yang wajib kamu ambil?",
    options: [
      "Melanjutkan pesanan seperti biasa",
      "Pisahkan alat, bersihkan area kerja, dan informasikan ke dapur",
      "Meminta pelanggan memilih menu lain tanpa konfirmasi",
    ],
    correctIndex: 1,
    explanation: "Prosedur standar penanganan alergen mewajibkan pemisahan peralatan dan koordinasi langsung.",
  },
  kompetensi: {
    question: "Berapa suhu penyimpanan chiller yang aman untuk produk susu dan olahan segar?",
    options: ["0–5 °C", "10–15 °C", "20–25 °C"],
    correctIndex: 0,
    result: "Level 2 tercapai",
  },
  rekrutmen: {
    question: "Rekan kerja satu shift terlambat dan antrean pelanggan mulai menumpuk. Apa yang Anda lakukan?",
    options: [
      "Menunggu rekan datang tanpa mengambil tindakan",
      "Membantu melayani antrean lalu mengabari atasan di grup operasional",
      "Menutup kasir sementara sampai kru lengkap",
    ],
    correctIndex: 1,
    result: "Skor 70 · Layak wawancara",
  },
};

export interface LibraryDocument {
  id: string;
  title: string;
  category: "SOP" | "Arsip" | "E-learning";
  offline: boolean;
  progress?: number;
  syncTime: string;
  steps?: string[];
}

export const LIBRARY_DOCUMENTS: LibraryDocument[] = [
  {
    id: "sop-1",
    title: "SOP Pembukaan Outlet",
    category: "SOP",
    offline: true,
    syncTime: "06:45 WIB",
    steps: [
      "Buka gembok utama dan matikan alarm perimeter",
      "Nyalakan panel lampu, exhaust, dan sistem pendingin ruangan",
      "Periksa suhu chiller (0–5 °C) dan catat di logbook operasional",
      "Lakukan kalibrasi mesin espresso dan cek persediaan air filtrasi",
      "Buka kasir POS dan hitung float kas awal bersama supervisor",
    ],
  },
  {
    id: "sop-2",
    title: "SOP Higienitas Dapur & Bar",
    category: "SOP",
    offline: true,
    syncTime: "06:45 WIB",
    steps: [
      "Sanitasi seluruh permukaan kerja dengan cairan disinfektan aman pangan",
      "Ganti lap kerja setiap 2 jam dengan kode warna yang tepat",
      "Pastikan tempat sampah tertutup rapat dan pedal kaki berfungsi",
    ],
  },
  {
    id: "sop-3",
    title: "SOP Serah Terima Shift",
    category: "SOP",
    offline: true,
    syncTime: "06:45 WIB",
    steps: [
      "Hitung fisik kas POS bersama staf pengganti",
      "Tuliskan catatan stok menipis di buku serah terima",
      "Pastikan seluruh order tertunda sudah terselesaikan",
    ],
  },
  {
    id: "sop-4",
    title: "SOP Penanganan Kecelakaan Kerja",
    category: "SOP",
    offline: true,
    syncTime: "06:45 WIB",
    steps: [
      "Hentikan operasional di area insiden dan amankan korban",
      "Gunakan kotak P3K sesuai jenis cedera",
      "Laporkan segera ke Kepala Cabang dan bawa ke faskes bila darurat",
    ],
  },
  {
    id: "arsip-1",
    title: "Kebijakan Tukar Shift",
    category: "Arsip",
    offline: true,
    syncTime: "Kemarin",
  },
  {
    id: "arsip-2",
    title: "Peraturan Perusahaan 2026",
    category: "Arsip",
    offline: true,
    syncTime: "1 Okt 2026",
  },
  {
    id: "arsip-3",
    title: "Jadwal Pelatihan K3 Terpusat",
    category: "Arsip",
    offline: false,
    syncTime: "Perlu koneksi",
  },
  {
    id: "elearn-1",
    title: "Pelayanan Prima 101",
    category: "E-learning",
    offline: false,
    progress: 60,
    syncTime: "Perlu koneksi",
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_LIST: FaqItem[] = [
  {
    question: "Bagaimana selfie dan GPS mencegah titip absen?",
    answer:
      "Setiap clock-in meminta selfie yang dicocokkan dengan foto referensi karyawan, lalu memeriksa lokasi terhadap radius titik kerja. Clock-in yang tidak cocok ditandai untuk ditinjau atasan.",
  },
  {
    question: "Apakah fake GPS benar-benar terdeteksi?",
    answer:
      "Aplikasi memeriksa tanda umum lokasi palsu, seperti aplikasi mock location dan lompatan posisi yang tidak wajar. Tidak ada sistem yang menjamin nol celah, karena itu clock-in mencurigakan ditandai, bukan diam-diam diterima.",
  },
  {
    question: "Bagaimana data wajah dan lokasi dilindungi?",
    answer:
      "Karyawan memberi persetujuan saat pendaftaran, data dienkripsi, dan akses dibatasi per peran. Lokasi hanya diperiksa saat clock-in. Rincian retensi mengikuti kebijakan perusahaan dan UU Pelindungan Data Pribadi.",
  },
  {
    question: "Bagaimana jika sinyal lemah di lokasi kerja?",
    answer:
      "Clock-in tetap tercatat dengan waktu perangkat dan ditandai untuk diverifikasi setelah sinyal kembali. SOP dapat dibaca offline.",
  },
  {
    question: "Bisakah upah per jam, uang hadir, dan lembur diatur?",
    answer:
      "Bisa. Tarif per jabatan, nilai uang hadir, tunjangan shift malam, dan pengali lembur diatur saat setup, lalu dihitung otomatis dari data absensi.",
  },
  {
    question: "Bagaimana rotasi shift dan tukar jadwal bekerja?",
    answer:
      "Manajer memilih pola rotasi. Staf mengajukan tukar shift ke rekan, rekan menyetujui, lalu atasan menyetujui. Jadwal dan gaji ikut berubah setelah persetujuan akhir.",
  },
  {
    question: "Berapa lama pemasangan untuk satu outlet atau gudang?",
    answer:
      "Dengan impor CSV, satu lokasi dapat berjalan dalam hitungan hari. Kami menyarankan pilot satu lokasi sebelum perluasan.",
  },
];

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  company: string;
  industry: "fnb" | "hotel" | "logistik";
  initials: string;
}

export const TESTIMONIALS: TestimonialItem[] = [
  {
    quote:
      "Titip absen berhenti sejak selfie wajib. Rekap kehadiran sembilan outlet selesai tanpa kami mengejar laporan.",
    author: "Intan Permata",
    role: "Area Manager",
    company: "Kopi Lereng",
    industry: "fnb",
    initials: "IP",
  },
  {
    quote:
      "Tukar shift dulu lewat chat dan sering lupa dicatat. Sekarang tercatat, disetujui, dan masuk jadwal hari itu juga.",
    author: "Made Arta",
    role: "Kepala Housekeeping",
    company: "Hotel Senja Raya",
    industry: "hotel",
    initials: "MA",
  },
  {
    quote:
      "Lembur dan tunjangan shift malam sudah ada di slip. Staf berhenti menanyakan hitungan di akhir bulan.",
    author: "Hendra Wijaya",
    role: "Kepala Gudang",
    company: "Lintas Kirim Nusantara",
    industry: "logistik",
    initials: "HW",
  },
];

export interface PricingPlan {
  name: string;
  badge?: string;
  range: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isHighlighted?: boolean;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Starter",
    range: "Hingga 50 karyawan aktif",
    price: "Rp 12.000",
    period: "/ karyawan / bulan",
    description: "Untuk outlet tunggal, kafe mandiri, atau tim lapangan pemula.",
    features: [
      "Modul Absensi (Selfie & Geofencing)",
      "Modul Perizinan & Tukar Shift",
      "Modul Library & SOP Offline",
      "Deteksi dasar fake GPS",
      "Dukungan WhatsApp operasional",
    ],
  },
  {
    name: "Tim",
    badge: "Paling Dipilih",
    range: "50 sampai 250 karyawan",
    price: "Rp 9.000",
    period: "/ karyawan / bulan",
    description: "Cocok untuk jaringan outlet multi-cabang, hotel, dan gudang logistik.",
    isHighlighted: true,
    features: [
      "Semua fitur di paket Starter",
      "Modul Gaji (Slip digital & kalkulasi per jam)",
      "Modul Exam (Checklist higienitas & briefing SOP)",
      "Rotasi shift multi-pola dinamis",
      "Integrasi approval berjenjang",
    ],
  },
  {
    name: "Skala",
    range: "250+ karyawan korporasi",
    price: "Hubungi Kami",
    period: "harga khusus perusahaan",
    description: "Kustomisasi penuh untuk rumah sakit, jaringan ritel besar, dan multi-entitas.",
    features: [
      "Semua fitur di paket Tim",
      "Multi-cabang & multi-PT tanpa batas",
      "Ekspor laporan bank & payroll batch",
      "SLA respons teknis 2 jam",
      "Dedicated account manager",
    ],
  },
];

export const TRUST_METRICS = [
  { value: "85+", label: "bisnis multi-shift" },
  { value: "12.000+", label: "clock-in per hari" },
  { value: "0", label: "titip absen lolos tanpa tanda" },
  { value: "5 menit", label: "pasang pola shift baru" },
];

export const CLIENT_WORDMARKS = [
  "Kopi Lereng",
  "Hotel Senja Raya",
  "Lintas Kirim Nusantara",
  "Klinik Medika Sejahtera",
  "Dapur Nusa Group",
];
