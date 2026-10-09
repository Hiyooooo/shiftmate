# 07 — Rencana Gambar (agar halaman hidup dan profesional)

Tujuan: halaman tidak terasa kosong atau "mati". Pendekatan **dua lapis** supaya hasil selalu bagus, walau agent tidak punya akses jaringan atau foto:

- **Lapis 1 (wajib, selalu ada)**: ponsel mockup dan **ilustrasi datar buatan sendiri** (SVG/JSX). Tidak butuh unduhan, lisensi, atau jaringan.
- **Lapis 2 (ditambahkan bila tersedia)**: **foto dokumenter lapangan** yang berlisensi, lewat `PhotoSlot`. Jika foto tidak ada, `PhotoSlot` otomatis menampilkan ilustrasi lapis 1, tanpa gambar rusak.

## 1. Prinsip
1. Gambar harus **menjelaskan** (ponsel menampilkan fitur, foto menunjukkan industri), bukan sekadar mengisi ruang.
2. Satu bahasa visual: ilustrasi datar geometris dalam palet token; foto dengan treatment sama.
3. Tidak ada gambar yang menyiratkan klaim palsu (wajah dipasangkan dengan testimoni, logo klien).
4. Ringan: ilustrasi SVG inline, foto dikompres, semua di bawah lipatan lazy.
5. Selalu ada fallback; build tidak bergantung pada file foto.

## 2. Peta Visual per Section (tidak ada section tanpa visual)
| # | Section | Visual | Jenis | Komponen / file |
|---|---|---|---|---|
| 2 | Hero | Ponsel interaktif + 4 badge melayang + matahari | JSX/SVG | `HeroPhone`, `FloatBadge`, `SunDisc`, `SelfieFace`, `MiniMap` |
| 3 | Strip Bukti | Satu `SunDisc` kecil terpotong di sudut + wordmark klien | SVG | `SunDisc` |
| 4 | Industri | 4 foto (atau 4 ilustrasi) + chip pola shift | Foto / SVG | `PhotoSlot` → `IllustFnb/Hotel/Logistik/Klinik` |
| 5 | Masalah → Solusi | Chat kacau vs jadwal rapi di ponsel | JSX/SVG | `ChatChaos`, `PerizinanPhone` (statis) |
| 6 | Modul | 6 ponsel (Absensi 2) + `SuratDokter` + `MiniMap` | JSX/SVG | `phone/*`, `SuratDokter` |
| 7 | Cara Kerja | 3 ilustrasi langkah | SVG | `StepArt1/2/3` |
| 8 | Testimoni | Avatar inisial + ikon industri kecil | SVG | `Illust*` (ukuran kecil) |
| 9 | Harga | Ikon modul + `SunDisc` kecil di kartu sorotan | SVG | `SunDisc` |
| 10 | FAQ | Ponsel statis di samping (≥1024) | JSX/SVG | `PhoneFrame` + `MiniMap`/`SelfieFace` |
| 11 | CTA Penutup | Foto pergantian shift + overlay slate, atau fallback `SunDisc` | Foto / SVG | `PhotoSlot`, `SunDisc` |
| OG | Open Graph | Ponsel + badge + matahari | `ImageResponse` | `opengraph-image.tsx` |

## 3. Gaya Ilustrasi (satu gaya untuk semuanya)
- **Datar geometris**: bentuk dasar (persegi membulat, lingkaran, setengah lingkaran, garis), tanpa gradien, tanpa bayangan, tanpa tekstur, tanpa outline tebal bervariasi.
- Palet: `--orange`, `--orange-700`, `--cream`, `--cream-2`, `--slate-900`, `--slate-800`, `--mist`, `--white`, dan `--ok`/`--warn` hanya untuk detail kecil (status). Maksimum 5 warna per ilustrasi.
- Garis: 2px `--slate-900` hanya untuk kontur penting (horizon, tepi layar); sisanya fill tanpa garis.
- Manusia digambar **tanpa wajah detail** (siluet/ bentuk sederhana: lingkaran kepala polos, seragam berwarna), agar netral dan tidak canggung.
- Ukuran: viewBox tetap (mis. `0 0 480 360` untuk 4:3), `role="img"` + `<title>` bila bermakna, `aria-hidden` bila dekoratif. Berat < 8 KB per file; tanpa `<filter>`, tanpa `<image>` tertanam.
- Fill memakai `currentColor` atau `var(--token)` lewat kelas Tailwind, bukan hex (hex hanya bila tak terhindarkan di `components/art/`).

## 4. Spesifikasi Komponen Ilustrasi (`components/art/`)
| Komponen | Isi komposisi | Rasio |
|---|---|---|
| `SunDisc` | Setengah lingkaran oranye di atas garis horizon slate-900 2px; props `size`, `rings` (0–3 lingkaran tipis `--cream-2`), `clipped` (terpotong horizon) | bebas |
| `SelfieFace` | Siluet kepala + bahu netral (lingkaran + bentuk bahu), latar `--cream-2`, tanpa fitur wajah; dipakai di bingkai selfie | 3:4 |
| `MiniMap` | Grid jalan (garis `--line-2` 2px, 3 blok), satu taman `--cream-2`, lingkaran radius (putus-putus `--orange-700`), pin; varian `inside` / `spoofed` (pin loncat keluar + garis lintasan putus-putus `--danger`) | 1:1 |
| `SuratDokter` | Kertas putih dengan kop klinik fiktif, 5 baris teks abu (garis), kotak stempel melingkar `--danger` tipis, tanda tangan sederhana (path), tanpa teks nyata terbaca | 3:4 |
| `ChatChaos` | 5–6 bubble chat bertumpuk dengan sudut berbeda ringan (maks ±2°, statis): teks nyata (`Besok siapa jaga malam?`, `Aku tukar sama Dimas ya`, `Foto surat dokter menyusul`, `Jadwal minggu lalu mana?`), tanda baca `unread` | 4:3 |
| `IllustFnb` | Meja bar kafe, mesin espresso sederhana, dua figur berseragam apron oranye, papan menu | 4:3 |
| `IllustHotel` | Meja resepsionis, lonceng, troli housekeeping, figur berseragam; jendela dengan `SunDisc` kecil | 4:3 |
| `IllustLogistik` | Truk box datar, rak gudang, figur dengan rompi oranye, tumpukan kardus | 4:3 |
| `IllustKlinik` | Tempat tidur/papan jaga, figur seragam scrub, salib medis netral (persegi plus `--ok`), tiang infus sederhana | 4:3 |
| `StepArt1` | Tabel CSV sederhana + pin lokasi berlingkaran radius | 4:3 |
| `StepArt2` | Strip minggu berisi chip P/S/M/L + pemilih pola | 4:3 |
| `StepArt3` | Ponsel kecil dengan centang + tiga avatar inisial | 4:3 |

## 5. Foto Dokumenter (Lapis 2) — `public/images/`
**Slot foto**
| ID | Berkas | Dipakai di | Rasio / ukuran sumber | Konten yang dicari |
|---|---|---|---|---|
| P-01 | `industri/fnb.jpg` | Industri (F&B) | 4:3, 1200×900 | Barista/kru dapur di balik bar, tampak samping atau punggung, cahaya alami |
| P-02 | `industri/hotel.jpg` | Industri (Hotel) | 4:3, 1200×900 | Staf hotel di resepsionis atau housekeeping merapikan kamar |
| P-03 | `industri/logistik.jpg` | Industri (Logistik) | 4:3, 1200×900 | Kru gudang dengan rompi/helm, rak dan kardus, tanpa merek terbaca |
| P-04 | `industri/klinik.jpg` | Industri (Klinik/RS) | 4:3, 1200×900 | Perawat/staf klinik di koridor atau nurse station, tanpa pasien yang dapat dikenali |
| P-05 | `cta/pergantian-shift.jpg` | CTA penutup | 16:9, 1920×1080 | Dua kelompok staf bergantian jaga (serah terima), siluet atau dari belakang |

**Kriteria foto (semua harus terpenuhi)**
- Gaya dokumenter alami: kegiatan nyata, cahaya alami, tidak berpose menghadap kamera, tidak ada senyum korporat yang dipaksakan.
- Konteks Indonesia/Asia Tenggara diutamakan; seragam dan tempat kerja realistis.
- Tidak ada logo/merek atau teks yang terbaca; tidak ada pasien/anak yang dapat dikenali; tidak ada layar ponsel berisi UI aplikasi lain.
- Palet hangat/netral. Bila foto terlalu dingin/jenuh, selaraskan dengan penyesuaian warna ringan (bukan filter ungu/biru). **Tanpa duotone atau gradient overlay.**
- Komposisi menyisakan ruang di kiri bawah untuk chip pola shift.

**Sumber dan lisensi (urutan prioritas)**
1. **Foto milik pemilik/klien** (dokumentasi outlet, hotel, gudang, klinik) dengan izin tertulis; paling kuat untuk kepercayaan.
2. **Foto berlisensi bebas komersial** dari Unsplash atau Pexels (lisensi masing-masing situs). Unduh berkas, **jangan hotlink**.
3. Jika jaringan agent diblokir atau lisensi tidak jelas: **jangan memaksa**. Biarkan fallback ilustrasi aktif dan laporkan slot yang kosong.
- Catat setiap foto di `public/images/CREDITS.md`: ID slot, judul, fotografer, URL halaman sumber, lisensi, tanggal unduh, dan catatan model release.
- Tidak boleh menyiratkan bahwa orang di foto adalah pelanggan, karyawan ShiftMate, atau pemberi testimoni. Tampilkan keterangan `Foto ilustrasi`.
- **Dilarang** menghasilkan wajah manusia dengan AI untuk dipakai sebagai foto.

**Pemrosesan**
- Pangkas ke rasio slot, ekspor JPG kualitas 78 sumber maksimum 1600px sisi panjang, ≤ 220 KB per berkas (Next menghasilkan AVIF/WebP). Hapus metadata EXIF/lokasi.
- Simpan nama berkas kebab-case di folder di atas, sesuai tabel.

## 6. Integrasi Next.js
- `lib/images.ts`: manifest tipe `{ id, src, alt, width, height, fallback }` untuk P-01…P-05. Alt contoh: `Barista menyiapkan pesanan di balik bar kafe` (deskriptif, tanpa "foto/gambar").
- `PhotoSlot` (server component): cek keberadaan berkas saat build (`fs.existsSync` pada `public/`); ada → `<Image>` (`fill` di dalam wadah `aspect-ratio`, `sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"`, `loading="lazy"`, `placeholder="empty"`, radius 16, border 1px `--line-2`); tidak ada → render ilustrasi fallback di wadah yang sama dengan `role="img"` dan `aria-label` yang sama dengan alt.
- Chip pola shift (datar, `--slate-900` + teks putih atau `--cream-2` + `--orange-700`) di kiri bawah foto; teks di atas foto selalu di atas chip/overlay datar.
- CTA foto: `<Image>` penuh + overlay `--slate-800` **opasitas 78% datar** (tanpa gradien) + `SunDisc` kecil. Bila P-05 tidak ada: latar `--slate-800` + `SunDisc` besar terpotong.
- `next.config.ts`: `images.formats = ["image/avif", "image/webp"]`; **tanpa** `remotePatterns` (semua gambar lokal).
- Hanya hero yang boleh memakai `priority`, dan hero tidak memuat foto raster; LCP = H1/ponsel.
- Anggaran berat: gambar halaman awal (di atas lipatan) ≤ 600 KB; seluruh halaman ≤ 1,5 MB; tidak ada CLS (wadah `aspect-ratio` selalu ada).

## 7. Treatment Seragam
- Radius 16, border 1px `--line-2`, tanpa bayangan. Hover pada tile industri: tidak ada gerak; hanya fokus-visible ring bila tile dapat diklik.
- Keterangan kecil `Foto ilustrasi.` di bawah grid Industri dan di footer.
- Ilustrasi dan foto tidak ditempel berdampingan dalam satu grid (grid industri seluruhnya foto **atau** seluruhnya ilustrasi, tergantung ketersediaan; jika sebagian foto tidak ada, ganti seluruh grid ke ilustrasi agar tampilan seragam).

## 8. Checklist Gambar
- [ ] Setiap section di tabel §2 memiliki visual yang disebutkan
- [ ] Semua ilustrasi satu gaya (§3) dan < 8 KB
- [ ] `alt` Indonesia deskriptif untuk gambar bermakna; dekoratif disembunyikan dari pembaca layar
- [ ] `CREDITS.md` lengkap atau tidak ada foto (fallback aktif)
- [ ] Tidak ada hotlink, wajah AI, wajah dipasangkan dengan testimoni, atau logo asli
- [ ] Grid Industri seragam (semua foto atau semua ilustrasi)
- [ ] Build sukses dengan dan tanpa foto; tidak ada CLS; anggaran berat terpenuhi
