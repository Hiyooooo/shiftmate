# ShiftMate (03-shiftmate) — Rencana Kerja & Pelacakan Task

Dokumen ini melacak seluruh tahapan implementasi landing page **ShiftMate** berdasarkan panduan `AGENTS.md` dan `docs/01`–`docs/07`.

---

## Ringkasan Proyek
- **Produk**: ShiftMate — HRIS Mobile-First untuk tim multi-shift (F&B, Hotel, Logistik, Klinik).
- **Stack**: Next.js 16 (App Router), TypeScript, Tailwind CSS, Lucide Icons, Vitest.
- **Warna & Karakter**: Sunset Orange (`#F97316`), Clean White, Dark Slate (`#0F172A`/`#1E293B`).
- **Prinsip Utama**: Anti "AI Slop" (tanpa gradien, tanpa looping animation, tanpa foto klise/wajah AI, visual berbasis ponsel & SVG datar).

---

## Fase 1: Inisialisasi Proyek & Setup Lingkungan
- [x] 1.1 Inisialisasi Next.js App Router dengan TypeScript, Tailwind CSS, ESLint di direktori `03-shiftmate`.
- [x] 1.2 Bersihkan sisa template bawaan `create-next-app` (`page.module.css`, favicon bawaan, SVG Vercel/Next).
- [x] 1.3 Pasang dependensi yang diperlukan:
  - `lucide-react`
  - `clsx` & `tailwind-merge`
  - `vitest` (devDependency untuk unit testing formula payroll & shifts)
- [x] 1.4 Konfigurasi `vitest.config.ts` dan script npm (`test`, `build`, `lint`).
- [x] 1.5 Konfigurasi `next.config.ts` (AVIF/WebP image formats, strict settings).

---

## Fase 2: Logika Bisnis & Unit Testing (Formula Baku)
> Sesuai aturan: logika payroll dan rotasi shift harus tuntas dan lolos unit test sebelum komponen UI dibangun.
- [x] 2.1 Buat `src/lib/format.ts`: fungsi utilitas pemformatan (`rupiah()`, `jam()`, `persen()`).
- [x] 2.2 Buat `src/lib/payroll.ts`:
  - Formula lembur berjenjang (jam ke-1 × 1,5, jam berikutnya × 2)
  - Formula upah per jam, uang hadir, tunjangan shift malam
  - Lookup tarif TER Kategori A (TK/0)
  - Perhitungan BPJS TK (3%) dan BPJS Kesehatan (1%)
  - Logika reimbursement transport (+Rp 75.000)
- [x] 2.3 Buat `src/lib/shifts.ts`:
  - Generator jadwal mingguan murni `buildWeek(pola, startDate)`
  - Pola rotasi: `2-2-2-2`, `5-2`, `3 shift 7 hari`
  - Deteksi bentrok shift (jeda istirahat < 8 jam)
- [x] 2.4 Buat `src/lib/payroll.test.ts`:
  - 10 skenario test vector baku (Sari Wulandari & Rudi Hartono)
  - Unit test generator pola shift
- [x] 2.5 Jalankan `npm test` dan pastikan 100% test hijau (16/16 tests passed).

---

## Fase 3: Fondasi Desain, Token & Data Konfigurasi
- [x] 3.1 Setup `src/app/globals.css`:
  - Definisikan seluruh CSS variables `:root` (`--orange`, `--slate-900`, `--cream`, `--mist`, `--shadow-float`, status colors).
  - Terapkan aturan kontras WCAG (larangan teks putih di atas oranye, teks oranye di atas terang menggunakan `--orange-700`).
  - Utilitas pendukung fokus dan aksesibilitas.
- [x] 3.2 Konfigurasi tema Tailwind (`tailwind.config.ts` / CSS theme) memetakan token CSS variables.
- [x] 3.3 Setup font Google di `src/app/layout.tsx`:
  - Bricolage Grotesque (Display/Judul)
  - Plus Jakarta Sans (Body & Meta)
  - DM Mono (Angka, Jam, Rupiah)
- [x] 3.4 Buat `src/lib/site.ts`: data tunggal situs (title, description, URL placeholder, email).
- [x] 3.5 Buat `src/lib/data.ts`:
  - Profil dummy karyawan (Sari Wulandari & Rudi Hartono)
  - Data tim dan presensi
  - Pertanyaan & materi Exam (Higienitas, Briefing, Kuis)
  - Daftar 8 dokumen Library & SOP
  - Data FAQ (7 butir akordeon)
  - Data paket harga ilustratif
  - Data testimoni dengan kutipan konkret
- [x] 3.6 Buat `src/lib/images.ts`: manifest gambar (P-01 s/d P-05) dengan mapping fallback SVG.

---

## Fase 4: Komponen Fondasi Visual & Ilustrasi SVG
- [x] 4.1 Buat komponen inti ponsel: `src/components/phone/PhoneFrame.tsx`:
  - Frame ponsel rasio 9:19 (lebar 272px/300px, radius 44px)
  - Variant toggle iOS (Dynamic Island) & Android (Punch-hole)
  - Status bar WIB + ikon sinyal & baterai
  - Area layar scrollable aksesibel (`tabindex="0"`)
- [x] 4.2 Buat `src/components/phone/FloatBadge.tsx`: badge status melayang responsif.
- [x] 4.3 Buat komponen UI dasar di `src/components/ui/`:
  - `Logo.tsx`: SVG wordmark ShiftMate + simbol matahari & horizon
  - `Button.tsx`: varian primer (oranye + teks slate-900), gelap, sekunder, outline
  - `Badge.tsx` / `ShiftChip.tsx`: chip shift P/S/M/L dengan ikon Lucide
  - `PhotoSlot.tsx`: komponen hybrid dengan pengecekan file lokal dan auto-fallback SVG
  - `Reveal.tsx`: transisi kemunculan viewport sekali jalan (IntersectionObserver)
- [x] 4.4 Buat seluruh set ilustrasi SVG datar di `src/components/art/`:
  - `SunDisc.tsx` (motif matahari terbenam dengan cincin konsentris)
  - `SelfieFace.tsx` (siluet kepala netral untuk frame selfie)
  - `MiniMap.tsx` (peta radius geofencing dan simulasi spoofed jump)
  - `SuratDokter.tsx` (kop klinik fiktif & stempel medis)
  - `ChatChaos.tsx` (bubble chat grup yang berantakan)
  - `IllustFnb.tsx`, `IllustHotel.tsx`, `IllustLogistik.tsx`, `IllustKlinik.tsx`
  - `StepArt1.tsx`, `StepArt2.tsx`, `StepArt3.tsx`

---

## Fase 5: Komponen Interaktif & State Management
- [x] 5.1 Buat `src/components/phone/DemoProvider.tsx`:
  - React Context untuk mengelola state interaktif (`employeeId`, status `requests`: tukar, sakit, lembur, cuti, toggle `reimbursement`, `offline`, `fakeGps`).
  - Logika pembaruan data real-time saat status disetujui.
  - Selector karyawan (Sari vs Rudi) dan tombol `Reset Demo`.
- [x] 5.2 Buat `src/components/phone/HeroPhone.tsx`:
  - Mesin status: `idle → selfie → matching → locating → success`.
  - Animasi clock-in otomatis sekali putar saat terlihat.
  - Jam digital DM Mono WIB real-time.
  - Tombol ulangi simulasi dan integrasi 4 FloatBadge.

---

## Fase 6: Pembangunan 5 Modul HRIS Wajib
- [x] 6.1 Modul 1: **Absensi (Bintang)** (`src/components/modules/AbsensiSection.tsx` & `AbsensiPhones.tsx`):
  - Latar dark slate (`--slate-900`), 2 ponsel bersebelahan (Ponsel A: Clock-in + Fake GPS, Ponsel B: Jadwal & Tim).
  - Saklar simulasi fake GPS (deteksi lompatan lokasi dan pesan penolakan).
  - Pemilih pola shift (2-2-2-2, 5-2, 3 shift) dan strip kalender minggu.
  - 6 sub-fitur wajib tampak jelas.
- [x] 6.2 Modul 2: **Perizinan** (`src/components/modules/PerizinanSection.tsx` & `PerizinanPhone.tsx`):
  - Latar putih, tab interaktif: Tukar, Sakit (preview `SuratDokter`), Lembur, Cuti.
  - Stepper approval workflow (Rekan -> Atasan).
  - 5 sub-fitur wajib tampak jelas; aksi approval memicu pembaruan ke Gaji dan Absensi.
- [x] 6.3 Modul 3: **Gaji** (`src/components/modules/GajiSection.tsx` & `GajiPhone.tsx`):
  - Latar krem hangat, panel samping sumber data terhubung dari Absensi & Perizinan.
  - Tampilan rincian slip gaji Oktober 2026 dengan titik leader dan angka hitung otomatis.
  - Toggle reimbursement transport (+Rp 75.000).
  - 8 sub-fitur wajib tampak jelas.
- [x] 6.4 Modul 4: **Exam** (`src/components/modules/ExamSection.tsx` & `ExamPhone.tsx`):
  - Latar putih, 5 tab: Checklist Higienitas, Briefing SOP (dengan timer hitung mundur), Uji Kompetensi, Rekrutmen, Evaluasi Kinerja.
  - Fitur proctoring simulasi pindah tab/aplikasi.
  - 6 sub-fitur wajib tampak jelas.
- [x] 6.5 Modul 5: **Library** (`src/components/modules/LibrarySection.tsx` & `LibraryPhone.tsx`):
  - Latar krem, filter pencarian dokumen dan tab kategori (SOP, Arsip, E-learning).
  - Saklar mode pesawat (menonaktifkan dokumen online, mempertahankan dokumen offline).
  - Fitur pembaca SOP step-by-step.
  - 4 sub-fitur wajib tampak jelas.

---

## Fase 7: Pembangunan Section Landing Page Lengkap
- [x] 7.1 **Navbar** (`src/components/layout/Navbar.tsx`):
  - Sticky header, navigasi anchor, tombol CTA Minta Demo, mobile drawer menu dengan focus trap.
- [x] 7.2 **Hero Section** (`src/components/sections/HeroSection.tsx`):
  - H1 persuasi, copywriting bebas buzzword, CTA Minta Demo & Coba Simulasi, panggung ponsel + motif `SunDisc`.
- [x] 7.3 **Strip Bukti** (`src/components/sections/TrustStrip.tsx`):
  - Latar dark slate (`--slate-800`), 4 angka statistik DM Mono, 5 wordmark klien fiktif.
- [x] 7.4 **Industri** (`src/components/sections/IndustriesSection.tsx`):
  - Grid 4 kartu (F&B, Hotel, Logistik, Klinik) menggunakan `PhotoSlot` + chip pola shift.
- [x] 7.5 **Masalah → Solusi** (`src/components/sections/ProblemSection.tsx`):
  - Komparasi visual: `ChatChaos` (grup WhatsApp semrawut) vs ponsel jadwal teratur.
- [x] 7.6 **Cara Kerja** (`src/components/sections/HowItWorksSection.tsx`):
  - 3 langkah konkret dengan ilustrasi `StepArt1-3` dan penomoran mono.
- [x] 7.7 **Testimoni** (`src/components/sections/TestimonialsSection.tsx`):
  - 3 kutipan hasil konkret (bukan pujian generik) dengan inisial avatar netral.
- [x] 7.8 **Paket & Harga** (`src/components/sections/PricingSection.tsx`):
  - 3 tier harga transparan (Starter, Tim, Skala) ditandai ilustratif.
- [x] 7.9 **FAQ** (`src/components/sections/FaqSection.tsx`):
  - 7 akordeon aksesibel keyboard (WAI-ARIA) dengan ilustrasi ponsel samping pada desktop.
- [x] 7.10 **Final CTA** (`src/components/sections/FinalCtaSection.tsx`):
  - Latar gelap dengan foto pergantian shift / fallback `SunDisc` besar dan tombol Minta Demo.
- [x] 7.11 **Footer** (`src/components/layout/Footer.tsx`):
  - Navigasi anchor lengkap, disclaimer ilustratif, hak cipta 2026 tanpa link kosong `#`.
- [x] 7.12 Rakit seluruh section di `src/app/page.tsx`.

---

## Fase 8: SEO, OpenGraph, Schema & Aset
- [x] 8.1 Setup `src/app/layout.tsx`:
  - Metadata lengkap (Title & Description persis `docs/05`), canonical URL, viewport, themeColor.
- [x] 8.2 Buat `src/app/opengraph-image.tsx`:
  - OpenGraph Image 1200×630 dinamis via `ImageResponse` (bebas gradien, ponsel + status centang + SunDisc).
- [x] 8.3 Buat `src/lib/schema.ts` & pasang JSON-LD di `page.tsx`:
  - `Organization`, `WebSite`, `SoftwareApplication` (daftar lengkap fitur 5 modul), `FAQPage`.
- [x] 8.4 Buat `src/app/sitemap.ts` dan `src/app/robots.ts`.
- [x] 8.5 Buat favicon SVG di `public/favicon.svg` & `public/images/CREDITS.md`.

---

## Fase 9: Audit Kualitas, Anti-Slop & Verifikasi Build
- [x] 9.1 Jalankan skrip audit otomatis Anti-Slop (`docs/06` §8):
  - Bebas gradien / glow / blur / rounded-3xl / hover-scale / warna terlarang (purple, violet, pink).
  - Bebas hex langsung di komponen (hanya di CSS variables / art).
  - Bebas kata-kata buzzword AI (revolusioner, seamless, supercharge, dll.).
  - Bebas `lorem ipsum` dan `href="#"` kosong.
- [x] 9.2 Verifikasi aksesibilitas (WCAG 2.2 AA):
  - Kontras teks di atas oranye (`--slate-900`) dan teks oranye di atas terang (`--orange-700`).
  - Navigasi keyboard, target sentuh ≥ 44×44px, atribut `aria-*`.
- [x] 9.3 Uji responsivitas di resolusi 375px, 768px, 1024px, 1440px tanpa scroll horizontal.
- [x] 9.4 Jalankan `npm test` (semua unit test formula payroll & shifts lulus: 16/16).
- [x] 9.5 Jalankan `npm run build` dan pastikan compile sukses tanpa error/warning.

---

## Fase 10: Laporan Akhir & Dokumentasi Penyerahan
- [x] 10.1 Buat laporan penutupan sesuai format `docs/05` §10:
  - Fitur yang selesai
  - Asumsi & placeholder yang digunakan
  - Status gambar & fallback SVG
  - Penyederhanaan rumus payroll
  - Hasil testing & build
  - Poin keputusan pemilik untuk rilis produksi
