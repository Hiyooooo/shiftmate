# AGENTS.md — ShiftMate (Website 03)

> Dibaca PERTAMA oleh setiap AI agent. File ini memuat aturan wajib proyek (format, 5 modul, stack, kualitas). Folder ini berdiri sendiri; tidak ada aturan lintas-website.

## 1. Misi
Bangun **website landing page** (promosi produk, persuasif, fokus konversi dan showcase fitur) untuk **ShiftMate**: aplikasi HRIS mobile untuk **F&B, perhotelan, logistik, klinik/rumah sakit, dan pekerja lapangan dengan sistem multi-shift**.

Bukan aplikasi internal. Mockup ponsel di dalam halaman adalah alat peraga.

Bintang halaman: **Absensi** (selfie biometrik, anti-fake GPS, rotasi shift dinamis pagi/siang/malam), diperagakan lewat **ponsel interaktif di hero**.

Gaya: **Mobile-First App Showcase**. Latar putih bersih + dark slate, aksen Sunset Orange `#F97316`. Setiap section berpusat pada preview ponsel atau gambar, ditambah gambar/ilustrasi/foto agar halaman tidak terasa kosong (`docs/07-image-plan.md`). Detail visual: `docs/02-design-system.md`.

## 2. Urutan Baca & Prioritas
1. `docs/01-brief.md`: konteks, audiens, tujuan konversi, tone
2. `docs/06-anti-slop.md`: larangan "AI slop" (aturan keras; baca sebelum menulis kode)
3. `docs/02-design-system.md`: token, tipografi, ponsel, layout, komponen, motion (SUMBER KEBENARAN visual)
4. `docs/07-image-plan.md`: inventaris gambar, ilustrasi, foto, fallback, performa gambar
5. `docs/04-modules.md`: hero, 5 modul, alur data, rumus gaji & test vector
6. `docs/03-page-structure.md`: urutan section & copywriting
7. `docs/05-seo-og-quality.md`: metadata, OG, schema, aksesibilitas, performa, checklist, laporan

Prioritas jika konflik: `AGENTS.md` > `06-anti-slop` > `02-design-system` > `07-image-plan` > `04-modules` > `03-page-structure` > `05-seo-og-quality` > `01-brief`.

## 3. Format Produk
- Alur persuasi: Hero (janji + demo ponsel) → bukti → industri → masalah → modul → cara kerja → testimoni → harga → FAQ → CTA.
- CTA utama berulang ≥ 5× (navbar, hero, setelah modul, harga, penutup). CTA primer `Minta Demo`; sekunder `Coba Simulasi` (scroll ke ponsel hero).
- Setiap klaim fitur didukung layar ponsel atau contoh angka nyata di halaman.
- **Tidak ada section yang lebih dari satu layar tanpa elemen visual** (ponsel, ilustrasi, foto, atau diagram). Lihat `07` §2.

## 4. Lima Modul Wajib (semua sub-fitur harus terlihat)
| Modul | Peran di ShiftMate | Sub-fitur WAJIB |
|---|---|---|
| 📍 **Absensi** (bintang) | Pusat produk, sumber data jam kerja | Clock-in/out · **Biometrik selfie** · GPS geofencing (radius) · **Anti-fake GPS** · **Shift rolling dinamis (pagi/siang/malam)** · Rekap kehadiran real-time |
| 📑 **Perizinan** | Menggerakkan jadwal & gaji | **Tukar shift antar-rekan** · **Izin sakit + foto surat dokter dari HP** · Workflow approval cuti · Lembur · Transparansi sisa cuti |
| 💰 **Gaji** | Hasil akhir yang dilihat staf di HP | **Upah per jam** · **Uang hadir** · **Uang lembur otomatis** · Tunjangan shift malam · BPJS · PPh 21 (TER) · Reimbursement · **Slip gaji mobile** · Kalkulasi otomatis |
| 📝 **Exam** | Gerbang kesiapan sebelum shift | **Kuis checklist higienitas** · **Briefing SOP harian** · Uji kompetensi · Assessment rekrutmen · Evaluasi kinerja · Proctoring |
| 📚 **Library** | Pegangan di lapangan | **SOP harian bisa dibaca offline** · Arsip dokumen perusahaan · Modul e-learning |

Aturan:
- Nama modul persis: Absensi, Perizinan, Gaji, Exam, Library.
- Ikon Lucide: `MapPin`, `CalendarCheck`, `Wallet`, `ClipboardCheck`, `BookOpen`. Ikon shift: `Sunrise` (pagi), `Sun` (siang), `Moon` (malam), `Coffee`/`CalendarOff` (libur).
- **Integrasi adalah argumen jual**: persetujuan di Perizinan mengubah angka di Absensi dan slip Gaji lewat state bersama (`04` §Alur Data).

## 5. Tech Stack (WAJIB)
- **Next.js (App Router) + React + TypeScript**, **Tailwind CSS** (token dari CSS variables).
- **`lucide-react`** (stroke 1.75) untuk semua ikon UI.
- **`next/image`** untuk semua foto raster. Ilustrasi dan ponsel dibangun dari JSX/SVG.
- Font `next/font/google`: **Bricolage Grotesque** (judul), **Plus Jakarta Sans** (body), **DM Mono** (angka/jam).
- Library tambahan hanya yang perlu: `clsx`, `tailwind-merge`, `vitest` (devDependency, untuk unit test `payroll.ts`). **Tanpa** framer-motion/GSAP/Lottie/chart library; animasi = CSS + IntersectionObserver.
- Proyek mandiri dengan `package.json` sendiri.

```
03-shiftmate/
├── AGENTS.md
├── docs/
├── package.json  next.config.ts  tsconfig.json  postcss.config.mjs  vitest.config.ts
├── public/
│   ├── favicon.svg
│   └── images/                       # foto berlisensi + CREDITS.md (lihat 07)
│       ├── industri/  (fnb.jpg, hotel.jpg, logistik.jpg, klinik.jpg)
│       ├── cta/       (pergantian-shift.jpg)
│       └── CREDITS.md
└── src/
    ├── app/  layout.tsx  page.tsx  globals.css  opengraph-image.tsx  sitemap.ts  robots.ts
    ├── assets/fonts/                 # TTF untuk og:image (jangan fetch saat build)
    ├── components/
    │   ├── layout/        Navbar, Footer
    │   ├── sections/      Hero, TrustStrip, Industries, ProblemSolution, Modules, HowItWorks,
    │   │                  Testimonials, Pricing, Faq, FinalCta
    │   ├── phone/         PhoneFrame, FloatBadge, DemoProvider, HeroPhone,
    │   │                  AbsensiPhones, PerizinanPhone, GajiPhone, ExamPhone, LibraryPhone
    │   ├── art/           SunDisc, SelfieFace, SuratDokter, ChatChaos, MiniMap,
    │   │                  IllustFnb, IllustHotel, IllustLogistik, IllustKlinik, StepArt1-3
    │   └── ui/            Button, Badge, Card, Reveal, Logo, ShiftChip, PhotoSlot
    └── lib/
        site.ts  schema.ts  data.ts
        payroll.ts  payroll.test.ts     # fungsi murni: lembur, TER, BPJS, computePayroll
        shifts.ts                       # pola rotasi shift (fungsi murni)
        images.ts                       # manifest foto + fallback
        format.ts                       # rupiah(), jam(), persen()
```
Komponen interaktif memakai `"use client"`; selebihnya Server Component. **Seluruh rumus di `lib/payroll.ts` dan `lib/shifts.ts`**, bukan di komponen.

## 6. Aturan Mutlak
**DO**
- Warna hanya lewat token. Tidak ada hex di komponen.
- Konten **Bahasa Indonesia**. Copy halaman memakai "Anda"; teks di dalam UI ponsel memakai "kamu" (suara aplikasi untuk staf).
- Semua angka di mockup berasal dari `payroll.ts`/`shifts.ts` dan lolos test vector `04`.
- Mobile-first: tulis CSS dasar untuk 375px, perluas dengan breakpoint ke atas.
- Hover, focus-visible, reduced-motion di setiap elemen interaktif.
- Data dummy: nama Indonesia, Rupiah, WIB, kota (Bandung, Jakarta, Bekasi, Surabaya, Yogyakarta, Denpasar).
- Tandai semua yang ilustratif (testimoni, angka bukti, klien, harga, claim teknis, foto stok) di kode **dan** laporan.

**DON'T**
- Semua larangan `docs/06-anti-slop.md`.
- Tampilan aplikasi internal desktop (sidebar, tabel CRUD penuh, login).
- Foto yang di-hotlink; foto tanpa catatan lisensi; foto wajah AI/stok yang dipasangkan dengan nama testimoni.
- Badge App Store / Google Play resmi, logo Apple/Android/WhatsApp pihak ketiga, logo klien/bank/lembaga asli.
- Wajah asli karyawan di mockup selfie (pakai `SelfieFace` SVG).
- `aggregateRating`/`review` palsu di JSON-LD.

## 7. Kualitas Minimum
- `npm run build` sukses tanpa warning lint/type; `npm test` hijau.
- Lighthouse ≥ 90 (Performance, Accessibility, Best Practices, SEO) **di mobile profile**.
- Responsif 375 / 768 / 1024 / 1440 tanpa scroll horizontal; WCAG 2.2 AA; hormati `prefers-reduced-motion`.
- **Build harus sukses walau tidak ada foto** di `public/images/` (fallback ilustrasi aktif).
- SEO/OG lengkap: `title`, `description`, `canonical`, `og:*` (image 1200×630), Twitter card, JSON-LD (`Organization`, `WebSite`, `SoftwareApplication`, `FAQPage`), `sitemap`, `robots`.
- Domain, email: placeholder, satu tempat di `src/lib/site.ts`.

## 8. Alur Kerja Agent
1. Baca semua docs → ringkas pemahaman dalam 5 baris.
2. `npx create-next-app` (TypeScript, Tailwind, App Router, `src/`); pasang `lucide-react`, `clsx`, `tailwind-merge`, `vitest`. **Hapus semua aset/halaman bawaan template.**
3. Tulis `lib/payroll.ts`, `lib/shifts.ts`, `lib/format.ts` + unit test dari test vector `04`. Jangan lanjut sebelum hijau.
4. `globals.css` + tema Tailwind, `site.ts`, `data.ts`, `images.ts`.
5. Komponen `PhoneFrame`, `FloatBadge`, `PhotoSlot`, `SunDisc`, lalu ilustrasi (`07` §4).
6. Kerangka `page.tsx` dengan semua section; hero ponsel interaktif.
7. Lima modul (Absensi dahulu), `DemoProvider` (state bersama).
8. Foto: ikuti `07` §5 (sumber, kompres, lisensi). Jika jaringan/lisensi tidak memungkinkan, biarkan fallback ilustrasi dan laporkan.
9. SEO: metadata, OG, JSON-LD, sitemap, robots.
10. Audit anti-slop (`06` §7), `npm run build`, `npm test`, checklist `05` §9.
11. Laporkan sesuai `05` §10.

## 9. Definition of Done
Build & test hijau, Lighthouse mobile ≥ 90, lima modul lengkap dengan sub-fitur dan alur data bekerja, setiap section punya elemen visual, semua gambar punya `alt`/dimensi/lisensi, audit anti-slop bersih, metadata persis sesuai `05` §1, seluruh item ilustratif ditandai dan dilaporkan.
