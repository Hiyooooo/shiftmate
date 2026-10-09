# 05 — SEO, OpenGraph, Schema, Aksesibilitas, Performa & Checklist Final

## 1. Sumber Data Tunggal — `src/lib/site.ts`
```ts
export const site = {
  name: "ShiftMate",
  url: "https://shiftmate.id",              // PLACEHOLDER: ganti dengan domain asli
  title: "ShiftMate - Aplikasi HRIS Absensi Shift & Operasional Lapangan",
  description:
    "Atur rotasi shift kerja, absensi GPS anti-fake, dan izin tim lapangan dengan mudah lewat aplikasi mobile.",
  locale: "id_ID",
  email: "halo@shiftmate.id",               // PLACEHOLDER
};
```
Title (62 karakter) dan description (105 karakter) **persis** seperti di atas; jangan diubah. Description ≤ 160 karakter.

## 2. Metadata Next.js (`src/app/layout.tsx`)
```ts
import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website", siteName: site.name, locale: site.locale, url: "/",
    title: site.title, description: site.description,
    // og:image otomatis dari src/app/opengraph-image.tsx
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
};
export const viewport = { themeColor: "#F97316", width: "device-width", initialScale: 1 };
```
- `<html lang="id">` wajib. Jangan menonaktifkan zoom (`maximumScale`/`userScalable`).
- Wajib: `title`, `description`, `canonical`, `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:locale`, Twitter card.

## 3. OG Image (`src/app/opengraph-image.tsx`)
- `ImageResponse` dari `next/og`, **1200×630**, `contentType = "image/png"`, `alt = "ShiftMate: ponsel menampilkan clock-in selfie dan lokasi GPS dalam radius"`.
- Desain: latar `--slate-800`; kiri wordmark ShiftMate, headline `Absen shift dari ponsel. Tanpa titip absen.` (Bricolage), satu baris `Selfie · GPS anti-fake · Rotasi shift`; kanan **ponsel putih** (rasio 9:19) berisi layar `success` (centang hijau, `07:02 WIB`, tiga baris verifikasi), `SunDisc` oranye datar di belakang ponsel terpotong horizon, dua badge melayang (`Shift Pagi 07:00 – 15:00`, `12 m dari lokasi`). Tanpa gradien/glow/foto.
- Font: simpan TTF di `src/assets/fonts/` dan baca lokal; **jangan fetch jaringan saat build**.
- Periksa `/opengraph-image`: teks tidak terpotong, kontras terbaca.

## 4. Schema Markup (JSON-LD) — `src/lib/schema.ts` + `page.tsx`
Satu `@graph` lewat `<script type="application/ld+json">`:
- `Organization` (name, url, logo, email)
- `WebSite` (name, url, inLanguage `id-ID`)
- `SoftwareApplication` (name, `applicationCategory: "BusinessApplication"`, `operatingSystem: "Android, iOS, Web"` **(tandai: konfirmasi platform)**, description, `featureList` = **seluruh sub-fitur 5 modul**, **tanpa `offers`** selama harga placeholder)
- `FAQPage` dibangun dari data FAQ yang sama dengan komponen

Tanpa `aggregateRating`/`review`.

## 5. Sitemap & Robots
- `sitemap.ts`: halaman utama (`lastModified`, `changeFrequency: "monthly"`, `priority: 1`). `robots.ts`: izinkan semua, tunjuk `sitemap`.

## 6. HTML Semantik
- Satu `<h1>`; heading berurutan. Landmark: `<header>`, `<nav aria-label="Utama">`, `<main>`, `<section aria-labelledby>`, `<footer>`.
- Tautan "Lewati ke konten" di paling atas. `next/link` untuk tautan internal.
- Rincian gaji memakai `<dl>` atau `<table>` dengan `<th scope>`, bukan `div` murni.

## 7. Aksesibilitas (WCAG 2.2 AA)
- Kontras sesuai `02` §2 (teks oranye = `--orange-700` di terang; teks di atas fill oranye = `--slate-900`).
- Semua interaksi bisa dengan keyboard; ponsel interaktif dapat di-tab, tab bar dan toggle punya label teks; area scroll di dalam layar ponsel `tabindex="0"` + `aria-label`.
- **Gambar**: foto/ilustrasi bermakna punya `alt` Indonesia deskriptif; dekoratif `alt=""` atau `aria-hidden`. Ponsel dekoratif `aria-hidden="true"`.
- Status dinamis `aria-live="polite"`; tidak hanya mengandalkan warna (ikon + teks, huruf P/S/M/L pada chip shift).
- Target sentuh ≥ 44×44px. Teks minimum 12px, body 16px. Hormati `prefers-reduced-motion`.
- Teks di atas foto selalu di atas overlay slate datar (kontras ≥ 4.5:1), diverifikasi pada foto terang.

## 8. Performa (Lighthouse **mobile** ≥ 90 semua kategori)
- Server Components default; `"use client"` hanya untuk ponsel interaktif; `dynamic()` untuk ponsel di bawah lipatan (Perizinan, Gaji, Exam, Library).
- **Gambar**: lihat `07` §6 (format AVIF/WebP, `sizes`, `loading="lazy"`, dimensi pasti, anggaran berat). Hanya hero yang boleh `priority`; LCP hero = teks H1/ponsel JSX, bukan foto.
- Ilustrasi = SVG inline ringan (< 8 KB per file, tanpa filter/blur SVG).
- Font via `next/font` (`display: swap`), hanya weight yang dipakai.
- CLS < 0.05: dimensi pasti pada ponsel, `PhotoSlot` (`aspect-ratio`), dan badge.
- Tanpa `backdrop-filter`. Animasi hanya `transform`/`opacity`/warna.
- `npm run build` dan `npm test` bersih tanpa warning.

## 9. Checklist Final (agent wajib mencentang semua)

**Format & Konten**
- [ ] Terasa seperti landing page promosi (bukan dashboard); alur persuasi lengkap
- [ ] CTA `Minta Demo` muncul ≥ 5×
- [ ] Teks Bahasa Indonesia; tanpa lorem ipsum / `href="#"` kosong
- [ ] Testimoni, angka bukti, klien, harga, claim teknis, foto stok: ditandai ilustratif di kode **dan** dilaporkan

**5 Modul Wajib (semua sub-fitur terlihat)**
- [ ] Absensi: Clock-in/out · Biometrik selfie · GPS geofencing · Anti-fake GPS · Shift rolling · Rekap real-time
- [ ] Perizinan: Tukar shift · Izin sakit + foto surat dokter · Approval cuti · Lembur · Sisa cuti
- [ ] Gaji: Upah per jam · Uang hadir · Lembur · Tunjangan shift malam · BPJS · PPh 21 · Reimbursement · Slip mobile
- [ ] Exam: Checklist higienitas · Briefing SOP · Kompetensi · Rekrutmen · Kinerja · Proctoring
- [ ] Library: SOP offline · Arsip dokumen · E-learning

**Integritas Angka & Alur**
- [ ] `npm test` hijau: 10 test vector payroll `04` + test pola rotasi `shifts.ts`
- [ ] Tidak ada angka rupiah hardcoded di JSX yang seharusnya hasil hitung
- [ ] Alur data diuji manual sesuai `04` "Verifikasi akhir" (6 butir)
- [ ] Angka sama di hero, Absensi, Gaji, dan OG image (tidak saling bertentangan)

**Gambar & Visual (`07`)**
- [ ] Setiap section memiliki elemen visual; tabel `07` §2 terpenuhi
- [ ] Setiap `<img>`/`next/image`: `alt`, `width`/`height`, `sizes`; semua di bawah lipatan `lazy`
- [ ] `public/images/CREDITS.md` memuat sumber + lisensi tiap foto; tidak ada hotlink
- [ ] Build sukses **tanpa** foto (fallback ilustrasi) dan **dengan** foto
- [ ] Total transfer gambar halaman awal ≤ 600 KB; seluruh halaman ≤ 1,5 MB
- [ ] Tidak ada foto wajah dipasangkan dengan nama testimoni; tidak ada wajah AI

**Desain & Anti-Slop**
- [ ] Semua warna dari token; konsisten dengan `02-design-system.md`
- [ ] Audit otomatis `06` §7 bersih; semua "uji anti-slop" terjawab
- [ ] Teks di atas oranye = slate-900; teks oranye di atas terang = orange-700 (verifikasi dengan skrip)
- [ ] Tanpa badge toko aplikasi resmi, logo merek, logo klien/bank asli

**SEO & OG**
- [ ] `title` & `description` persis sesuai §1
- [ ] `canonical`, `og:*`, `twitter:*` lengkap; `og:image` 1200×630 tampil
- [ ] JSON-LD valid (Organization, WebSite, SoftwareApplication, FAQPage)
- [ ] `sitemap.xml` dan `robots.txt` tersedia

**Teknis**
- [ ] `npm run build` sukses; tanpa error console
- [ ] Responsif 375/768/1024/1440 tanpa scroll horizontal (cek badge melayang di 375px)
- [ ] Hover, focus-visible, reduced-motion di semua elemen interaktif
- [ ] Lighthouse mobile ≥ 90 (Performance, Accessibility, Best Practices, SEO)

## 10. Format Laporan Akhir Agent
1. **Selesai**: daftar fitur/halaman/file penting.
2. **Asumsi**: domain/email placeholder; angka bukti, testimoni, klien, harga ilustratif; logo buatan sendiri; CTA primer `Minta Demo`.
3. **Gambar**: daftar gambar per section, mana yang foto (sumber + lisensi) dan mana fallback ilustrasi; alasan jika foto tidak bisa diunduh.
4. **Penyederhanaan rumus**: daftar (a)–(f) dari `04`.
5. **Skor**: hasil Lighthouse mobile (atau alasan jika tidak bisa dijalankan) + hasil `npm test`.
6. **Perlu keputusan pemilik**: verifikasi rumus gaji dengan konsultan pajak/HR; klaim teknis (biometrik selfie, deteksi lokasi palsu, mode offline, clock-in saat sinyal lemah); platform yang benar-benar tersedia (Android/iOS/Web); kebijakan data biometrik dan persetujuan karyawan (UU PDP); domain asli, harga final; foto asli perusahaan atau persetujuan memakai foto stok; halaman Privasi dan Syarat; data & klien asli.
