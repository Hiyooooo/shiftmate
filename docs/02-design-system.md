# 02 — Design System (SUMBER KEBENARAN VISUAL)

Gaya: **Mobile-First App Showcase**. Putih bersih, dark slate, Sunset Orange. Ramah, jelas, berpusat pada ponsel. Kesan profesional datang dari **gambar yang konsisten** (ponsel, ilustrasi datar, foto dokumenter), ritme warna antar section, dan detail UI yang rapi, bukan dari efek.

## 1. Identitas (ringkas)
| Sumbu | Keputusan |
|---|---|
| Mode | Terang dominan; pita dark slate untuk bukti, modul bintang (Absensi), CTA, footer |
| Warna | Orange `#F97316` (fill/aksen), putih, krem hangat, dark slate |
| Font | Bricolage Grotesque (judul) · Plus Jakarta Sans (body) · DM Mono (angka, jam) |
| Bentuk | Membulat ramah: kartu 20px, tombol 14px, chip pil, ponsel 44px |
| Layout | Berpusat pada ponsel: hero ponsel + badge melayang; setiap modul = baris ponsel + penjelasan, bergantian kiri/kanan |
| Motif | **Matahari terbenam datar** (`SunDisc`): setengah lingkaran oranye + garis horizon, merujuk rotasi shift pagi→siang→malam |
| Motion | Sentuhan aplikasi: ponsel bereaksi saat disentuh, badge muncul berurutan sekali, transisi layar 250ms. Nol animasi looping |

## 2. Token Warna (`:root` di `src/app/globals.css`)
```css
:root {
  /* Permukaan */
  --white:   #FFFFFF;       /* latar utama, layar ponsel */
  --cream:   #FFF7ED;       /* section alternatif, latar badge hangat */
  --cream-2: #FFEDD5;       /* chip/badge oranye muda */
  --mist:    #F1F5F9;       /* latar kartu netral, input */
  --slate-800: #1E293B;     /* pita gelap */
  --slate-900: #0F172A;     /* teks judul, bezel ponsel, tombol gelap */
  --slate-950: #0B1220;     /* footer */

  /* Garis */
  --line:    #E2E8F0;       /* pemisah dekoratif */
  --line-2:  #CBD5E1;       /* border kartu */
  --control: #64748B;       /* border input/slider (4,76:1) */
  --line-dark: rgba(255,255,255,.14);

  /* Teks di atas terang */
  --ink:   #0F172A;         /* judul */
  --ink-2: #475569;         /* body (7,58:1 putih; 7,14:1 krem) */
  --ink-3: #64748B;         /* meta (4,76:1 putih). DI ATAS KREM pakai --ink-2 (4,48:1 gagal) */
  /* Teks di atas gelap */
  --on-dark:   #FFFFFF;     /* 14,63:1 di slate-800 */
  --on-dark-2: #CBD5E1;     /* 9,85:1 */
  --on-dark-3: #94A3B8;     /* 5,71:1 */

  /* Orange (Sunset) */
  --orange:     #F97316;    /* FILL: tombol, bar, titik, matahari. Teks di atasnya = --slate-900 (6,37:1). JANGAN putih (2,80:1) */
  --orange-600: #EA580C;    /* hover tombol (slate-900 di atasnya 5,02:1) */
  --orange-700: #C2410C;    /* TEKS & ikon oranye di atas terang (5,18:1 putih; 4,88:1 krem; 4,52:1 di cream-2) */
  /* Oranye sebagai teks di atas dark slate: pakai --orange (5,22:1 di slate-800; 6,37:1 di slate-900) */

  /* Status (selalu dengan ikon/teks) */
  --ok: #15803D;   --ok-bg: #DCFCE7;       /* 4,57:1 */
  --warn: #B45309; --warn-bg: #FEF3C7;     /* 4,51:1 */
  --danger: #B91C1C; --danger-bg: #FEE2E2; /* 5,30:1 */

  /* Bayangan: HANYA untuk ponsel, badge melayang, bottom-sheet */
  --shadow-float: 0 12px 32px -8px rgba(15,23,42,.22), 0 2px 6px rgba(15,23,42,.08);
}
```
**Aturan warna (keras)**
- **Teks putih di atas `--orange` dilarang** (2,80:1). Tombol primer = fill oranye + teks `--slate-900`.
- **Teks `--orange` di atas putih/krem dilarang**. Gunakan `--orange-700`. (Di atas dark slate, `--orange` boleh.)
- Oranye ≤ ±12% area layar: tombol primer, status aktif, matahari, bar progres, angka kunci.
- Warna shift (selalu dengan ikon + huruf, bukan warna saja): Pagi = oranye (`Sunrise`, huruf P), Siang = amber `#FBBF24`-tint **hanya sebagai latar chip** `--warn-bg` (`Sun`, S), Malam = `--slate-800` fill teks putih (`Moon`, M), Libur = `--mist` (`CalendarOff`, L).
- **Tanpa gradien sama sekali**; matahari dan semua ilustrasi datar (flat). Tanpa ungu/pink/biru-ungu. Tanpa glow dan glassmorphism.
- Hex hanya di `globals.css`, `opengraph-image.tsx`, dan file ilustrasi SVG (fill memakai `currentColor`/CSS variable bila memungkinkan).
- Verifikasi kontras dengan skrip saat selesai.

## 3. Tipografi (mobile-first: angka pertama = 375px)
| Peran | Font | Mobile / Desktop | Weight | Tracking | LH |
|---|---|---|---|---|---|
| H1 hero | Bricolage Grotesque | 36 / 60 px | 800 | -0.03em | 1.05 |
| H2 section | Bricolage Grotesque | 28 / 42 px | 700 | -0.02em | 1.12 |
| H3 judul modul/kartu | Bricolage Grotesque | 22 / 28 px | 700 | -0.01em | 1.2 |
| Judul kecil | Plus Jakarta Sans | 17 / 18 px | 700 | 0 | 1.3 |
| Body | Plus Jakarta Sans | 16 / 17 px | 400 | 0 | 1.6 |
| Kecil/meta | Plus Jakarta Sans | 13 px | 500 | 0 | 1.45 |
| Eyebrow | Plus Jakarta Sans | 13 px | 700 | 0.04em | 1.2 |
| Angka, jam, Rupiah | DM Mono | konteks | 500 | -0.01em | 1.2 |

- `font-variant-numeric: tabular-nums` pada semua angka yang berubah.
- Teks di dalam layar ponsel: minimum 12px; judul layar 17px; angka besar 28–32px DM Mono.
- Eyebrow berbentuk pil: ikon Lucide shift 14px + teks, bg `--cream-2`, teks `--orange-700` (di atas gelap: bg `rgba(249,115,22,.16)`, teks `--orange`).
- Judul rata kiri di mobile; boleh rata tengah hanya pada CTA penutup.
- `next/font`: Bricolage (700, 800), Plus Jakarta (400, 500, 600, 700), DM Mono (500). `display: swap`, subset `latin`.

## 4. Spacing, Radius, Layout
- Skala spacing: 4 / 8 / 12 / 16 / 20 / 24 / 32 / 48 / 64 / 80.
- Container `max-width: 1160px`, gutter 20px (mobile) / 32px (≥1024).
- Section padding vertikal: 56px mobile / 96px desktop.
- Radius: kartu **20px**, foto **16px**, elemen dalam kartu **14px**, tombol **14px**, chip/badge **999px**, ponsel **44px**, layar ponsel **34px**.
- Breakpoint: 640 (sm), 768 (md), 1024 (lg), 1280 (xl). **Tulis gaya dasar untuk 375px lebih dulu.**
- **Baris modul**: mobile = ponsel di atas, penjelasan di bawah; ≥1024 = grid 12 kolom, ponsel 5 kolom, teks 7 kolom, bergantian sisi.
- Target sentuh ≥ 44×44px di seluruh UI, termasuk di dalam layar ponsel mockup.

## 5. Ponsel (`phone/PhoneFrame.tsx`): komponen utama
- Props: `variant: "ios" | "android"`, `label` (aria-label), `decorative?: boolean`, `children`, `className`.
- Ukuran: lebar 272px (mobile) / 300px (≥1024); rasio 9:19; bezel 10px `--slate-900`; radius luar 44px, layar 34px; `--shadow-float`.
- **iOS**: pil "dynamic island" 88×24 di atas, indikator home (bar 108×4) di bawah. **Android**: lubang kamera 10px di tengah atas, bar navigasi gestur 72×4 di bawah. Gambar dengan CSS/SVG sendiri; **tanpa logo/penanda merek**.
- Status bar di layar: jam (DM Mono 12px, WIB), ikon `Wifi`, `SignalHigh`, `BatteryFull` (Lucide 14px).
- Layar: bg `--white`; header aplikasi menampilkan wordmark kecil atau judul layar; konten bisa scroll di dalam layar (`overflow-y: auto`, `tabindex="0"`, `aria-label`), bar scroll disembunyikan secara visual tetapi tetap fungsional.
- Mockup dekoratif murni (tanpa interaksi) `aria-hidden="true"`; mockup interaktif memakai `role="group"` + `aria-label`.
- Toggle `iPhone | Android` hanya di hero (segmented control, `role="radiogroup"`), mengganti variant dengan CSS.
- Hanya satu ponsel yang boleh "berisi demo aktif" di viewport pada satu waktu (hentikan timer yang tidak terlihat).

## 6. Badge Melayang (`phone/FloatBadge.tsx`)
- Kartu putih, radius 14, `--shadow-float`, padding 10×14, ikon Lucide 18px + dua baris teks (judul 13px/700, keterangan 12px/500 `--ink-2`).
- Posisi absolut mengelilingi ponsel (kiri-atas, kanan-atas, kiri-bawah, kanan-bawah) dan sedikit menimpa tepi ponsel. Mobile (<640): tampilkan 2 badge (`hidden sm:flex` untuk sisanya) dan jangan menyebabkan scroll horizontal.
- Isi hero (data di `data.ts`): `Shift Pagi · 07:00 – 15:00` (ikon `Sunrise`), `12 m dari Kopi Lereng Dago · radius 50 m` (`MapPin`), `Wajah cocok` (`ScanFace`), `Lokasi asli terverifikasi` (`ShieldCheck`).
- Muncul berurutan sekali (opacity + scale .96→1, 300ms, jeda 150ms). Tanpa goyang/mengambang berulang.

## 7. Komponen
**Tombol** (tinggi 48px, radius 14, teks 16px/700)
- Primer: bg `--orange`, teks `--slate-900`; hover bg `--orange-600`; active `translateY(1px)`.
- Gelap: bg `--slate-900`, teks putih; hover `--slate-800`. Di atas gelap: bg putih, teks `--slate-900`.
- Sekunder: bg putih, border 1.5px `--slate-900`, teks `--slate-900`; hover bg `--cream`. Di atas gelap: transparan, border `--on-dark-2`, teks putih.
- Tautan teks: `--orange-700` + underline 2px offset 3px (di atas gelap: `--orange`).
- Fokus: `outline: 3px solid var(--slate-900); outline-offset: 2px;` di atas gelap: `--orange`. (Kontras fokus ≥ 3:1 terhadap latar.)
**Card**: bg putih, border 1px `--line-2`, radius 20; **tanpa shadow**. Varian krem: bg `--cream`, border `--cream-2`. Varian gelap: bg `--slate-800`, border `--line-dark`.
**Chip/ShiftChip**: pil 32px tinggi, ikon 14px + teks 13px/600; varian oranye muda (`--cream-2` / `--orange-700`), netral (`--mist` / `--ink`), status (`--ok`/`--warn`/`--danger` + ikon `Check`/`AlertTriangle`/`XCircle`).
**Input/select/slider**: bg putih, border 1.5px `--control`, radius 14, tinggi 48, fokus ring slate-900 3px. Toggle: 52×32 pil; aktif bg `--orange` dengan thumb `--slate-900`; label kata ("Aktif"/"Mati") tampil di samping, bukan hanya warna.
**Navbar**: sticky, 64px, bg putih, border bawah 1px `--line`. Tanpa blur/transparansi. Mobile: tombol `Menu`/`X` + panel layar penuh, focus trap, Esc menutup.
**Stepper persetujuan**: titik 24px dihubungkan garis 2px; selesai = fill `--ok` + `Check`; aktif = border `--orange-700`; label teks di bawah titik.

## 8. Motion
- Durasi: 120ms (warna), 250ms (transisi layar ponsel, akordeon), 400ms (tween angka), 500ms (reveal). Easing `cubic-bezier(.2,.8,.2,1)`.
- Diizinkan: (a) **Reveal** sekali saat masuk viewport: opacity + `translateY(12px→0)`, tanpa stagger antar kartu; (b) badge melayang muncul berurutan sekali; (c) layar ponsel bergeser horizontal saat berpindah tab/langkah; (d) tween angka saat gaji dihitung ulang; (e) sorot baris berubah (`--cream-2` memudar 1 dtk, sekali); (f) jam digital berjalan per detik (data, bukan animasi); (g) hero: urutan demo clock-in diputar **sekali** saat terlihat, lalu tombol `Ulangi simulasi`.
- **Nol animasi looping/infinite.** Tanpa pulse, bounce, marquee, parallax.
- `@media (prefers-reduced-motion: reduce)`: matikan reveal, geser, tween, sorot; tampilkan state akhir (hero langsung di layar "Clock-in berhasil").
- Timer/tween berhenti saat elemen tidak terlihat (IntersectionObserver) atau tab tersembunyi (`visibilitychange`).

## 9. Ikonografi & Logo
- Ikon UI **hanya `lucide-react`**: `strokeWidth={1.75}`, 16–24px, `currentColor`, import per-ikon. Tidak ditaruh di lingkaran/kotak berwarna sebagai hiasan kartu (pengecualian: `ShiftChip` dan eyebrow pil).
- Logo: wordmark `ShiftMate` (Bricolage Grotesque 800) + simbol buatan sendiri: persegi 10px radius `--orange` berisi setengah lingkaran matahari `--slate-900` di atas garis horizon (SVG, bukan ikon Lucide). Komponen `ui/Logo.tsx` + `public/favicon.svg`.

## 10. Latar & Motif
- Hero: bg putih; `SunDisc` datar oranye besar (diameter ±520px desktop / 340px mobile) di belakang ponsel, terpotong horizon: setengah bawah tersembunyi di balik garis `--slate-900` 2px selebar container, tiga lingkaran tipis konsentris (`--cream-2` 1.5px) di sekitarnya. Tanpa gradien.
- Section krem: `--cream`. Pita gelap: `--slate-800` dengan satu `SunDisc` kecil terpotong di sudut (opacity penuh, `--orange`, ≤ 160px) sebagai penanda ritme.
- Pola titik halus (`radial-gradient` dot grid 1px `--line` per 24px) **dilarang** (gradien). Bila perlu tekstur, pakai SVG pattern titik statis.

## 11. Implementasi Tailwind + Next.js
- Token di `globals.css` persis §2. Tailwind v4: `@theme inline { --color-orange: var(--orange); --color-orange-700: var(--orange-700); --color-ink: var(--ink); --color-cream: var(--cream); ... }`. Tailwind v3: `theme.extend.colors`. **Matikan palet bawaan** agar warna tak resmi (indigo, purple, pink) tidak terpakai tidak sengaja.
- Font via `next/font/google` → `--font-display`, `--font-sans`, `--font-mono` di `<html>`.
- `Reveal.tsx`: IntersectionObserver sekali jalan.
- `PhoneFrame.tsx`, `FloatBadge.tsx`, `ShiftChip.tsx` adalah komponen kunci; semua mockup memakainya.
