# 04 — Spesifikasi: Hero Ponsel, Alur Data, dan 5 Modul

Semua visual dari **JSX/CSS/SVG + `lucide-react`**; foto hanya lewat `PhotoSlot` (`07`). Mockup = showcase interaktif dengan state lokal React, **tanpa network request**. Semua angka berasal dari `lib/payroll.ts` dan `lib/shifts.ts`, bukan ditulis tangan di JSX. Setiap ponsel memakai `PhoneFrame` (`02` §5) dan punya `aria-label` deskriptif.

Struktur baris modul: `eyebrow (ikon + nama modul)` → `H3 manfaat` → `deskripsi ≤ 22 kata` → `daftar sub-fitur (ikon + judul + 1 baris)` → `ponsel interaktif`. Di dalam layar ponsel, UI berbicara "kamu".

---

## 0. HERO PHONE (`HeroPhone.tsx`): demo clock-in selfie + radius GPS
Satu ponsel (variant mengikuti toggle `iPhone | Android`). Layar berganti dengan geser horizontal 250ms. Mesin status: `idle → selfie → matching → locating → success`, plus `blocked` (lokasi palsu).

| Status | Layar |
|---|---|
| `idle` | Header `Halo, Sari`, chip shift `Pagi 07:00 – 15:00` (`Sunrise`), kartu lokasi `Kopi Lereng Dago, Bandung`, jam besar (DM Mono, WIB, berjalan), tombol primer `Clock In` |
| `selfie` | Kamera tiruan: `SelfieFace` SVG di dalam bingkai oval dengan 4 sudut siku; petunjuk `Hadap kamera, wajah di dalam bingkai`; tombol rana 64px `Ambil Selfie` |
| `matching` | Bingkai berubah menjadi centang bertahap; teks `Mencocokkan wajah…` (900ms) lalu `Wajah cocok` |
| `locating` | `MiniMap` SVG: grid jalan, lingkaran radius 50 m (stroke putus-putus `--orange-700`, fill `--cream-2`), pin pengguna; teks `Memeriksa lokasi…` (900ms) lalu `12 m dari titik kerja · di dalam radius 50 m` |
| `success` | Lingkaran centang hijau (`--ok-bg`), `Clock-in berhasil`, `07:02 WIB`, tiga baris verifikasi (ikon + teks): `Wajah cocok`, `Lokasi di dalam radius`, `Lokasi asli terverifikasi`; tombol `Clock Out` (dinonaktifkan) |
| `blocked` | Banner `--danger-bg` dengan ikon: `Lokasi palsu terdeteksi. Clock-in ditolak dan dilaporkan ke atasan.` + tombol `Coba Lagi` |

- Autoplay **sekali** saat ponsel terlihat (kecuali reduced-motion: langsung `success`). Tombol `Ulangi simulasi` di bawah ponsel. Pengguna dapat mengetuk `Clock In` sendiri kapan saja.
- Selfie **tidak** memakai wajah asli, kamera sungguhan, atau `getUserMedia`.
- Hero hanya menunjukkan alur normal; **simulasi lokasi palsu hidup di modul Absensi** (tautan di bawah ponsel).
- `aria-live="polite"` untuk teks status ("Mencocokkan wajah", "Clock-in berhasil pukul 07:02 WIB").

---

## Alur Data Terintegrasi (`phone/DemoProvider.tsx`)
React Context `"use client"` yang membungkus section Modul. State:
```ts
type RequestId = "tukar" | "sakit" | "lembur" | "cuti";
type DemoState = {
  employeeId: "sari" | "rudi";
  requests: Record<RequestId, "idle" | "menunggu-rekan" | "menunggu-atasan" | "disetujui" | "ditolak">;
  reimbursement: boolean;     // toggle di Gaji
  offline: boolean;           // toggle di Library
  fakeGps: boolean;           // toggle di Absensi (lokal ke AbsensiPhones)
};
```
- Selector karyawan (segmented `Sari Wulandari` / `Rudi Hartono`) berada di header section Modul; mengganti karyawan memuat data `data.ts` dan mereset `requests`.
- `Reset Demo` mengembalikan semuanya.
- **Efek hanya saat status `disetujui`** (persetujuan akhir atasan):
  - `tukar` → `shiftMalam − 1` (Malam ditukar dengan Pagi, jam tetap)
  - `sakit` → `jamSakit + 8` (dibayar, karena ada surat dokter)
  - `lembur` → tambah satu hari lembur 2 jam
  - `cuti` → sisa cuti − 2 hari (tidak mengubah gaji; jam cuti berbayar sudah termasuk di jam reguler data demo)
- Absensi (rekap & jadwal) dan Gaji (slip) **hanya membaca** state; Perizinan menulis. Perubahan memunculkan sorot baris dan pesan `aria-live`: `Slip gaji diperbarui: lembur 6 jam`.
- Kartu sumber memperlihatkan chip `Tersinkron ke Gaji ✓` (`RefreshCw`/`Check`, statis).

### Data karyawan (`data.ts`)
| | Sari Wulandari | Rudi Hartono |
|---|---|---|
| Jabatan, lokasi | Barista, Kopi Lereng Dago, Bandung | Driver, Lintas Kirim Nusantara, Cikarang |
| Upah per jam | Rp 24.000 | Rp 28.000 |
| Jam reguler (Okt) | 176 jam (22 hari × 8) | 192 jam (24 hari × 8) |
| Hari hadir | 22 | 24 |
| Uang hadir | Rp 15.000 / hari hadir | Rp 20.000 / hari hadir |
| Shift malam | 6 × Rp 20.000 | 8 × Rp 25.000 |
| Hari lembur (jam) | 1 · 2 · 1 | 2 · 2 · 3 |
| Sisa cuti | 9 dari 12 | 6 dari 12 |
| PTKP demo | TK/0 (TER A) | TK/0 (TER A) |

---

## Rumus Payroll (`lib/payroll.ts`)
```
lemburHari(h, rate)  = min(h,1) × 1,5 × rate + max(h−1,0) × 2 × rate     // jam ke-1 ×1,5; jam berikutnya ×2
upahJam    = (jamReguler + jamSakit) × rate
uangHadir  = hariHadir × tarifUangHadir
tunjMalam  = shiftMalam × tarifShiftMalam
lembur     = Σ lemburHari(jam, rate)  untuk tiap hari lembur
bruto      = upahJam + uangHadir + tunjMalam + lembur
tarifTER   = lookupTER_A(bruto)
pph21      = round(bruto × tarifTER / 100)
bpjsTK     = round(upahJam × 3%)      // JHT 2% + JP 1% (porsi karyawan)
bpjsKes    = round(upahJam × 1%)      // porsi karyawan
bersih     = bruto − pph21 − bpjsTK − bpjsKes
reimb      = reimbursement ? 75.000 : 0      // uang transport, di luar dasar pajak dalam demo
ditransfer = bersih + reimb
```
**Tabel TER kategori A (TK/0)**, `bruto ≤ batas → tarif`: 5.400.000 → 0% · 5.650.000 → 0,25% · 5.950.000 → 0,5% · 6.300.000 → 0,75% · 6.750.000 → 1% · 7.500.000 → 1,25% · 8.550.000 → 1,5% · 9.650.000 → 1,75% · 10.050.000 → 2%. (Di atas itu di luar cakupan demo: klem + peringatan.)

**Penyederhanaan demo (WAJIB komentar kode + laporan):** (a) pengali lembur dihitung dari upah per jam langsung, bukan 1/173 upah bulanan; (b) hanya TER kategori A; (c) premi BPJS pemberi kerja belum masuk bruto; (d) batas upah iuran tidak dimodelkan; (e) izin sakit dibayar 100% (kebijakan demo); (f) penghitungan ulang Desember tidak dimodelkan. **Pemilik wajib mengonfirmasi dengan konsultan pajak/HR sebelum rilis.** UI memuat catatan `Simulasi ilustratif, bukan nasihat pajak.`

### Test vector (`payroll.test.ts`, semua harus hijau)
| Karyawan | Skenario | Upah jam | Uang hadir | Tunj. malam | Lembur | Bruto | TER | PPh 21 | BPJS TK | BPJS Kes | **Bersih** |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Sari | dasar | 4.224.000 | 330.000 | 120.000 | 156.000 | 4.830.000 | 0% | 0 | 126.720 | 42.240 | **4.661.040** |
| Sari | + sakit disetujui | 4.416.000 | 330.000 | 120.000 | 156.000 | 5.022.000 | 0% | 0 | 132.480 | 44.160 | **4.845.360** |
| Sari | + tukar shift | 4.224.000 | 330.000 | 100.000 | 156.000 | 4.810.000 | 0% | 0 | 126.720 | 42.240 | **4.641.040** |
| Sari | + lembur 2 jam | 4.224.000 | 330.000 | 120.000 | 240.000 | 4.914.000 | 0% | 0 | 126.720 | 42.240 | **4.745.040** |
| Sari | ketiganya | 4.416.000 | 330.000 | 100.000 | 240.000 | 5.086.000 | 0% | 0 | 132.480 | 44.160 | **4.909.360** |
| Rudi | dasar | 5.376.000 | 480.000 | 200.000 | 350.000 | 6.406.000 | 1% | 64.060 | 161.280 | 53.760 | **6.126.900** |
| Rudi | + sakit disetujui | 5.600.000 | 480.000 | 200.000 | 350.000 | 6.630.000 | 1% | 66.300 | 168.000 | 56.000 | **6.339.700** |
| Rudi | + tukar shift | 5.376.000 | 480.000 | 175.000 | 350.000 | 6.381.000 | 1% | 63.810 | 161.280 | 53.760 | **6.102.150** |
| Rudi | + lembur 2 jam | 5.376.000 | 480.000 | 200.000 | 448.000 | 6.504.000 | 1% | 65.040 | 161.280 | 53.760 | **6.223.920** |
| Rudi | ketiganya | 5.600.000 | 480.000 | 175.000 | 448.000 | 6.703.000 | 1% | 67.030 | 168.000 | 56.000 | **6.411.970** |

Reimbursement `+75.000`: Sari dasar ditransfer `4.736.040`; Rudi dasar `6.201.900`. Lembur: Sari `[1,2,1]` = 36.000 + 84.000 + 36.000 = 156.000; hari tambahan 2 jam = 84.000. Rudi `[2,2,3]` = 98.000 + 98.000 + 154.000 = 350.000; hari tambahan 2 jam = 98.000. Jam lembur total di rekap Absensi: Sari 4 → 6; Rudi 7 → 9.

---

## 1. ABSENSI 📍 (`AbsensiPhones.tsx`): BINTANG, latar slate-900, 2 ponsel
- **Ikon** `MapPin` · **H3** `Absen yang tidak bisa dititipkan.`
- **Deskripsi**: `Selfie mencocokkan wajah, GPS memeriksa radius, dan shift berotasi otomatis pagi, siang, malam.`
- **Daftar sub-fitur** (kiri/kanan ponsel, ikon + judul + baris):
  1. `Clock-in/out` (`LogIn`): Satu ketukan, waktu WIB tercatat.
  2. `Biometrik selfie` (`ScanFace`): Wajah dicocokkan dengan foto referensi karyawan.
  3. `GPS geofencing` (`MapPin`): Clock-in hanya sah di dalam radius titik kerja.
  4. `Anti-fake GPS` (`ShieldAlert`): Lokasi palsu dan lompatan posisi ditandai ke atasan.
  5. `Shift rolling dinamis` (`RefreshCw`): Pola rotasi pagi, siang, malam tersusun otomatis.
  6. `Rekap real-time` (`Users`): Siapa hadir, terlambat, atau di luar radius terlihat langsung.
- **Ponsel A "Clock-in"**: memakai mesin status hero (§0) dengan kontrol di panel di bawah ponsel (lihat Interaksi): saklar `Simulasi lokasi palsu` (label kata Aktif/Mati). Saat aktif lalu `Clock In` → selfie → matching → **`blocked`**: `MiniMap` menampilkan pin loncat ke luar radius dan banner `Lokasi palsu terdeteksi`; di bawahnya daftar sinyal (ikon `X`): `Aplikasi mock location aktif` · `Posisi melompat 41 km dalam 2 detik` · `Sinyal jaringan tidak cocok dengan lokasi`.
- **Ponsel B "Jadwal & Tim"**:
  1. **Pemilih pola rotasi** (segmented): `2-2-2-2` (2 pagi, 2 siang, 2 malam, 2 libur) · `5-2` (5 kerja, 2 libur) · `3 shift 7 hari`. Memilih pola mengubah strip minggu (`lib/shifts.ts`, fungsi murni `buildWeek(pola, startDate)`).
  2. **Strip minggu** Sen–Min: sel 44px dengan `ShiftChip` (ikon + huruf P/S/M/L + jam). Hari ini disorot (border 2px slate-900). Bentrok (mis. Malam lalu Pagi tanpa jeda minimum) ditandai `AlertTriangle` + teks `Jeda kurang dari 8 jam`.
  3. **Ringkasan jam**: `Jam reguler 176 · Shift malam 6 · Lembur 4 jam` (mengikuti state; saat lembur/tukar shift disetujui di Perizinan, angka berubah dengan sorot) dengan baris `→ Masuk ke slip gaji`.
  4. **Rekap real-time tim** (`Shift Pagi · 9 / 11 hadir` + bar): 4 baris `Sari Wulandari · Hadir · 06:58`, `Dimas Saputra · Hadir · 07:03`, `Rudi Hartono · Terlambat · 07:19`, `Nadia Putri · Di luar radius` (ikon + teks, tidak hanya warna).
- **Interaksi**: `Clock In` sukses → toast `Check-in berhasil · {jam} WIB`, rekap hadir +1. `Clock Out` menampilkan durasi total (tanpa mengubah gaji). Ganti pola rotasi memicu pesan `aria-live`.
- Desain: ponsel A dan B bersebelahan (≥1024), tumpuk (mobile). Badge `Anti-fake GPS` dan `Selfie biometrik` melayang di antara ponsel (statis).
- **Klaim teknis** (anti-fake, biometrik, jeda minimum): komentar kode `{/* KLAIM: konfirmasi dengan engineering */}`.

## 2. PERIZINAN 📑 (`PerizinanPhone.tsx`): putih, 1 ponsel
- **Ikon** `CalendarCheck` · chip `Tersinkron ke Gaji ✓` · **H3** `Tukar shift dan izin sakit, selesai dari ponsel.`
- **Deskripsi**: `Tukar jadwal dengan rekan, kirim foto surat dokter, dan pantau persetujuan sampai ke slip gaji.`
- **Daftar sub-fitur**: `Tukar shift antar-rekan` (`ArrowLeftRight`) · `Izin sakit + foto surat dokter` (`Camera`) · `Workflow approval cuti` (`GitPullRequest`/`ListChecks`) · `Lembur` (`Clock`) · `Sisa cuti transparan` (`CalendarRange`).
- **Layar**: tab bar bawah 4 item (≥44px): `Tukar` · `Sakit` · `Lembur` · `Cuti`. Ganti tab = geser horizontal.
  1. **Tukar** (`tukar`): kartu `Rabu 14 Okt · kamu Malam 23:00–07:00 ⇄ Dimas Saputra Pagi 07:00–15:00` (Rudi: `Kamis 15 Okt · Malam ⇄ Agus Salim Siang`). Tombol `Ajukan Tukar Shift`.
  2. **Sakit** (`sakit`): form `Tanggal 8 Okt 2026` (Rudi: 12 Okt), `Keterangan: Demam` (readonly), tombol `Ambil Foto Surat Dokter` → memunculkan `SuratDokter` SVG (kop klinik fiktif, nama pasien, `Istirahat 1 hari`, tanpa data nyata) dengan label `surat-dokter.jpg · terlampir ✓`; tombol `Kirim`. **Tidak ada upload nyata** dan tanpa akses kamera.
  3. **Lembur** (`lembur`): `Jumat 16 Okt · 17:00–19:00 WIB · 2 jam`, perkiraan `+Rp 84.000` (Sari) / `+Rp 98.000` (Rudi) dari `payroll.ts`.
  4. **Cuti** (`cuti`): `Cuti Tahunan · 20–21 Okt · 2 hari`; panel **Sisa Cuti** `9 dari 12 hari` (Rudi `6 dari 12`) dengan bar; setelah disetujui turun 2 hari (tween).
- **Workflow** semua permintaan: stepper `Diajukan → Rekan setuju → Atasan setuju` (untuk `tukar`), atau `Diajukan → Atasan setuju` (lainnya). Tombol aksi di bawah stepper: label aktor berikutnya (`Rekan menyetujui`, `Atasan menyetujui`) + `Tolak`. Status akhir `Disetujui`/`Ditolak` (ikon + teks) dan baris dampak: `Tunjangan shift malam −Rp 20.000` · `8 jam dibayar sebagai izin sakit` · `Lembur +2 jam` · `Sisa cuti −2 hari`.
- Di bawah ponsel: strip dampak "Perubahan terkirim ke: Absensi · Gaji" dengan ikon.
- **Chip footer / daftar** harus memuat semua sub-fitur di atas.

## 3. GAJI 💰 (`GajiPhone.tsx`): krem, 1 ponsel + panel sumber
- **Ikon** `Wallet` · **H3** `Slip gaji di ponsel, dihitung per jam.`
- **Deskripsi**: `Upah per jam, uang hadir, tunjangan shift malam, dan lembur masuk slip tanpa input ulang.`
- **Daftar sub-fitur**: `Upah per jam` (`Timer`) · `Uang hadir` (`CalendarCheck2`) · `Uang lembur otomatis` (`Clock`) · `Tunjangan shift malam` (`Moon`) · `BPJS & PPh 21` (`Landmark`) · `Reimbursement` (`Receipt`) · `Slip gaji mobile` (`Smartphone`) · `Hitung otomatis` (`Calculator`).
- **Panel sumber (di samping/di atas ponsel)** `Data masuk otomatis` (ikon `Link2`, label sumber): `Jam reguler dari Absensi: 176 jam` · `Hari hadir: 22` · `Shift malam dari jadwal: 6` · `Lembur dari Perizinan & Absensi: 4 jam`. Angka berubah mengikuti state; baris yang berubah disorot.
- **Layar ponsel "Slip Oktober 2026"**: kartu ringkasan `Dibawa pulang` + angka besar DM Mono (`Rp 4.661.040` untuk Sari dasar), lalu rincian dengan **leader titik** dan angka rata kanan:
  - `Upah per jam · 176 jam × Rp 24.000` · `Uang hadir · 22 hari × Rp 15.000` · `Tunjangan shift malam · 6 × Rp 20.000` · `Lembur · 4 jam` → **Penghasilan bruto**
  - `PPh 21 (TER 0%)` `−Rp 0` · `BPJS Ketenagakerjaan` `−Rp 126.720` · `BPJS Kesehatan` `−Rp 42.240` → **Gaji bersih**
  - Toggle `Reimbursement transport +Rp 75.000` → **Total diterima**
- Tombol `Unduh Slip PDF` (dekoratif, tanpa unduhan); baris `Dikirim ke ponsel kamu tiap tanggal 28` (ilustratif).
- Angka tween 400ms saat berubah; reduced-motion: langsung.
- Catatan 12px: `Simulasi ilustratif, bukan nasihat pajak.`
- Aritmetika harus sama persis dengan test vector. Verifikasi: setujui `lembur` → bersih Sari `4.745.040`; setujui `sakit` + `tukar` + `lembur` → `4.909.360`.

## 4. EXAM 📝 (`ExamPhone.tsx`): putih, 1 ponsel
- **Ikon** `ClipboardCheck` · **H3** `Siap sebelum shift: higienitas dan briefing.`
- **Deskripsi**: `Kuis checklist higienitas dan briefing SOP harian wajib selesai sebelum staf memulai shift.`
- **Daftar sub-fitur**: `Checklist higienitas` (`SprayCan`/`Hand`) · `Briefing SOP harian` (`Megaphone`) · `Uji kompetensi` (`BadgeCheck`) · `Assessment rekrutmen` (`UserPlus`) · `Evaluasi kinerja` (`TrendingUp`) · `Proctoring` (`ScanFace`).
- **Layar**: banner `Selesaikan sebelum Clock In` + tab geser horizontal (scroll-snap): `Higienitas` · `Briefing` · `Kompetensi` · `Rekrutmen` · `Kinerja`.
  1. **Higienitas**: 6 item checklist (`Cuci tangan 20 detik`, `Celemek dan topi bersih`, `Kuku pendek dan bersih`, `Perhiasan dilepas`, `Permukaan kerja didisinfeksi`, `Suhu chiller tercatat`), tiap item switch 44px. Semua tercentang → tombol `Mulai Shift` aktif → status `Higienitas lengkap · 06:51 WIB` dengan ikon centang.
  2. **Briefing**: `Soal 2/5`, timer mono hitung mundur `04:30` (jadi `--warn` + ikon di bawah 01:00), pilihan ganda 3 opsi; jawab → benar/salah (warna + ikon), ring skor SVG `80/100`.
  3. **Kompetensi**: 1 soal teknis, hasil `Level 2 tercapai`.
  4. **Rekrutmen**: 1 soal situasional, hasil `Skor 70 · layak wawancara`.
  5. **Kinerja**: 3 indikator (ketepatan waktu, kebersihan, pelayanan) slider 1–5 → `Skor kinerja 4,2 / 5` (rata-rata dihitung, bukan statis).
- **Proctoring**: indikator `Pemeriksaan wajah acak aktif` (`ScanFace`) + log `Wajah terdeteksi ✓`; tombol demo `Simulasi pindah aplikasi` → badge peringatan (`AlertTriangle` + teks) + penghitung pelanggaran bertambah.
- **Soal contoh**:
  - Briefing: `Pelanggan menyebut alergi kacang. Langkah pertama?` — (a) Lanjut seperti biasa (b) **Pisahkan alat dan informasikan ke dapur** (c) Meminta pelanggan memilih menu lain
  - Kompetensi: `Suhu aman penyimpanan chiller makanan?` — (a) **0–5 °C** (b) 10–15 °C (c) 20–25 °C
  - Rekrutmen: `Rekan terlambat dan antrean menumpuk. Apa yang Anda lakukan?` — (a) Membiarkan (b) **Membantu antrean lalu mengabari atasan** (c) Pulang lebih cepat
- Logika `Mulai Shift` memperlihatkan keterkaitan dengan Absensi lewat teks `Siap untuk Clock In`.

## 5. LIBRARY 📚 (`LibraryPhone.tsx`): krem, 1 ponsel
- **Ikon** `BookOpen` · **H3** `SOP di genggaman, tetap terbaca tanpa sinyal.`
- **Deskripsi**: `SOP harian, arsip dokumen, dan e-learning tersimpan di ponsel dan bisa dibuka offline.`
- **Daftar sub-fitur**: `SOP harian offline` (`WifiOff`) · `Arsip dokumen perusahaan` (`Archive`) · `Modul e-learning` (`GraduationCap`) · `Pencarian cepat` (`Search`).
- **Layar**: pencarian + filter chip `Semua` · `SOP` · `Arsip` · `E-learning` (≥44px, wrap) + saklar `Mode pesawat` (ikon `Plane`, label Aktif/Mati). Saat aktif, status bar menampilkan `WifiOff`; item **Perlu internet** menjadi redup + label `Perlu internet`, item offline tetap bisa dibuka.
- **Data (8 item)**: `SOP Pembukaan Outlet` (SOP, offline) · `SOP Higienitas Dapur` (SOP, offline) · `SOP Serah Terima Shift` (SOP, offline) · `SOP Penanganan Kecelakaan Kerja` (SOP, offline) · `Kebijakan Tukar Shift` (Arsip, offline) · `Peraturan Perusahaan 2026` (Arsip, offline) · `Jadwal Pelatihan K3` (Arsip, perlu internet) · `Pelayanan Prima 101` (E-learning, 60%, perlu internet).
- **Pembaca SOP**: mengetuk item offline membuka layar baca (judul, 5 langkah bernomor dengan teks besar 16px, `Disinkron 06:45 WIB`, tombol `Kembali`).
- **Interaksi**: ketik memfilter (case-insensitive, sorot cocok `--cream-2` + teks `--orange-700`); state kosong `Tidak ada dokumen yang cocok`; placeholder `Cari "higienitas"…` (diketik otomatis sekali saat terlihat, kecuali reduced-motion).

---

## Aturan Lintas Modul
- State lokal React hooks; **tanpa network request, kamera, atau geolokasi sungguhan**.
- `<button>` asli, target sentuh ≥ 44px; status dinamis di `aria-live="polite"`.
- Timer/tween berhenti saat tidak terlihat dan saat tab tersembunyi.
- Nol animasi looping (`02` §8).
- Hover: ponsel tidak bergeser; elemen interaktif di dalamnya punya state sendiri. Focus-visible: ring slate-900 3px (atas gelap: oranye).
- Warna/radius/spacing dari token `02`; ikon dari `lucide-react`.
- **Verifikasi akhir**: (1) semua sub-fitur di `AGENTS.md` §4 terlihat; (2) setujui `lembur` → Absensi `6 jam` → Gaji Sari bersih `Rp 4.745.040`; (3) setujui `tukar` → shift malam `5` → bersih `Rp 4.641.040`; (4) setujui `sakit` → `+8 jam` → `Rp 4.845.360`; (5) selfie/lokasi palsu tampil di Absensi dan hero; (6) mode pesawat membuat item online-only redup.
