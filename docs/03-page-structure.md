# 03 — Struktur Halaman & Copywriting

Satu halaman (`src/app/page.tsx`), single scroll. **Urutan section tetap.** Setiap section = satu komponen di `components/sections/`. **Setiap section wajib punya elemen visual** (ponsel, ilustrasi, foto, atau diagram); rinciannya di `07` §2.

## Peta Section & Ritme Latar
| # | Section | Latar | Visual utama |
|---|---|---|---|
| 1 | Navbar | putih | Logo |
| 2 | Hero | putih + `SunDisc` | Ponsel interaktif + 4 badge melayang |
| 3 | Strip Bukti | slate-800 | Angka + wordmark klien fiktif |
| 4 | Industri (id `industri`) | putih | 4 foto/ilustrasi industri |
| 5 | Masalah → Solusi | krem | `ChatChaos` vs ponsel jadwal rapi |
| 6 | **Modul** (id `modul`) | putih / slate-900 (Absensi) / krem | 6 ponsel (Absensi 2) |
| 7 | Cara Kerja (id `cara-kerja`) | krem | 3 ilustrasi langkah |
| 8 | Testimoni | putih | Avatar inisial + ilustrasi kecil per kartu |
| 9 | Paket & Harga (id `harga`) | krem | Ikon modul + `SunDisc` kecil |
| 10 | FAQ (id `faq`) | putih | Ilustrasi ponsel samping (desktop) |
| 11 | CTA Penutup | slate-800 | Foto pergantian shift + ponsel |
| 12 | Footer | slate-950 | Logo |

CTA primer `Minta Demo` → `mailto:${site.email}?subject=Minta%20Demo%20ShiftMate` (placeholder). Muncul di: navbar, hero, setelah modul, harga, CTA penutup (≥ 5×).

---

## 1. Navbar
- Kiri: Logo. Tengah (≥1024): `Fitur` (→ `#modul`) · `Industri` · `Cara Kerja` · `Harga` · `FAQ`.
- Kanan: sekunder `Coba Simulasi` (→ `#simulasi`, disembunyikan <640), primer `Minta Demo`.
- Mobile: `Menu`/`X` → panel penuh, focus trap, Esc menutup.

## 2. Hero (`id="simulasi"`)
Mobile: copy → ponsel (badge melayang menimpa tepi). Desktop ≥1024: 12 kolom, copy 6 kolom kiri, panggung ponsel 6 kolom kanan dengan `SunDisc` di belakang.
- Eyebrow pil: `Absensi shift untuk tim lapangan` (ikon `Sunrise`)
- H1: **Absen shift dari ponsel. Tanpa titip absen.**
- Sub (≤ 2 kalimat): `Selfie memastikan orangnya, GPS memastikan tempatnya. Rotasi pagi, siang, dan malam tersusun otomatis, jam kerjanya langsung masuk ke slip gaji.`
- CTA: primer `Minta Demo` · sekunder `Lihat Fitur` (→ `#modul`).
- Catatan mikro: `Cocok untuk 10 sampai 1.000 karyawan · Pilot satu outlet dulu`
- Tiga butir (ikon Lucide + 14px): `Selfie biometrik` · `Radius GPS + deteksi lokasi palsu` · `Shift rolling pagi/siang/malam`.
- **Panggung ponsel**: `HeroPhone` (`04` §0) dengan toggle `iPhone | Android`, tombol `Ulangi simulasi`, dan 4 `FloatBadge` (`02` §6). Tautan kecil di bawah ponsel: `Coba simulasi lokasi palsu ↓` (→ ponsel Absensi di `#modul`).

## 3. Strip Bukti (slate-800)
Empat angka (DM Mono besar, label 13px `--on-dark-2`), lalu 5 wordmark klien **fiktif** (teks `--on-dark-3`, tanpa logo):
- `85+` bisnis multi-shift · `12.000+` clock-in per hari · `0` titip absen lolos tanpa tanda · `5 menit` pasang pola shift baru
- Klien fiktif: `Kopi Lereng` · `Hotel Senja Raya` · `Lintas Kirim Nusantara` · `Klinik Medika Sejahtera` · `Dapur Nusa Group`
- Komentar kode: `{/* ILUSTRATIF: ganti dengan data & klien asli. Pastikan nama tidak menyerupai bisnis nyata */}`
- Catatan: angka "0 titip absen lolos tanpa tanda" adalah klaim kuat; **tandai untuk dihapus/diganti** bila tidak bisa dibuktikan.

## 4. Industri (id `industri`)
- Eyebrow `Dipakai di lapangan`. H2: **Dibuat untuk jam kerja yang tidak 9 sampai 5.**
- Grid 4 `PhotoSlot` (mobile 1 kolom → 2 kolom ≥640 → 4 kolom ≥1024), rasio 4:3, radius 16. Tiap tile: foto/ilustrasi, chip pola shift di atas foto (kiri bawah, flat), judul 17px, satu kalimat ≤ 20 kata:
  1. **F&B**: chip `2 shift · buka–tutup`. `Barista dan kru dapur absen di outlet masing-masing, tukar shift tanpa menunggu grup chat.`
  2. **Perhotelan**: chip `3 shift · 24 jam`. `Front office, housekeeping, dan F&B hotel bergantian pagi, siang, malam dengan jeda yang tercatat.`
  3. **Logistik**: chip `3 shift · rotasi`. `Driver dan kru gudang absen dari titik muat, lembur terhitung dari jam nyata.`
  4. **Klinik & RS**: chip `3 shift · jaga`. `Perawat dan staf penunjang mengisi checklist higienitas sebelum jaga dimulai.`
- Keterangan kecil di bawah grid: `Foto ilustrasi.` (wajib bila foto stok dipakai).

## 5. Masalah → Solusi
- Eyebrow `Sebelum dan sesudah`. H2: **Jadwal shift tidak seharusnya hidup di grup chat.**
- Dua kolom (mobile: tumpuk):
  - **Sebelum**: `ChatChaos` (`07` §4), bubble chat tentang jadwal kacau (`Besok siapa jaga malam?`, `Aku tukar sama Dimas ya`, `Foto surat dokter menyusul`).
  - **Sesudah**: ponsel `PerizinanPhone` mini/statis menampilkan jadwal rapi + status persetujuan.
- Di antaranya tiga baris sebelum → sesudah (ikon + teks):
  - `Titip absen lewat teman` → `Selfie + GPS per clock-in`
  - `Jadwal difoto dan dikirim berulang` → `Rotasi shift tersusun di aplikasi`
  - `Lembur dan uang hadir dihitung manual` → `Masuk otomatis ke slip gaji`
- Penutup 1 kalimat + tautan `Lihat aplikasinya ↓` (→ `#modul`).

## 6. Section Modul (id `modul`)
- Eyebrow `Lima modul, satu aplikasi`. H2: **Semua urusan shift, di satu ponsel.**
- Sub: `Persetujuan di Perizinan mengubah jadwal dan slip gaji secara langsung. Coba sendiri di bawah.`
- Tombol `Reset Demo` di kanan atas section.
- Urutan baris dan latar:
  1. **Absensi** (slate-900, 2 ponsel) · 2. **Perizinan** (putih, ponsel kiri) · 3. **Gaji** (krem, ponsel kanan) · 4. **Exam** (putih) · 5. **Library** (krem).
- Setiap baris: eyebrow ikon + nama modul, H3 manfaat, deskripsi ≤ 22 kata, **daftar sub-fitur** (grid 2 kolom, ikon Lucide + judul 15px/700 + satu baris 14px), lalu ponsel interaktif (`04`).
- CTA di bawah semua baris: primer `Minta Demo`, tautan teks `Lihat harga`.

## 7. Cara Kerja (id `cara-kerja`)
- Eyebrow `Mulai`. H2: **Dari daftar karyawan ke absen pertama dalam tiga langkah.**
  1. `Impor tim dan lokasi` (`StepArt1`) — `Unggah CSV karyawan, tentukan titik lokasi dan radius tiap outlet.`
  2. `Susun pola shift` (`StepArt2`) — `Pilih pola rotasi, atur jeda minimum, dan tetapkan upah per jam serta uang hadir.`
  3. `Staf absen dari ponsel` (`StepArt3`) — `Karyawan memasang aplikasi, foto referensi sekali, lalu absen dengan selfie.`
- Tiap langkah punya ilustrasi 4:3 (`07` §4) dan nomor mono `01 02 03`.
- Catatan: `Migrasi dari absensi lama dapat dijalankan paralel selama satu siklus gaji.` (klaim layanan: tandai untuk konfirmasi pemilik)

## 8. Testimoni
3 kartu (mobile: geser horizontal dengan `scroll-snap`, ≥1024: 3 kolom). Kutipan 1–2 kalimat berisi hasil konkret, nama, jabatan, perusahaan **fiktif**. Avatar **inisial** (lingkaran 44px `--cream-2`), tidak memakai foto wajah. Di atas tiap kartu, ikon industri kecil dari ilustrasi (`07` §4).
- `Intan Permata, Area Manager, Kopi Lereng` — "Titip absen berhenti sejak selfie wajib. Rekap kehadiran sembilan outlet selesai tanpa kami mengejar laporan."
- `Made Arta, Kepala Housekeeping, Hotel Senja Raya` — "Tukar shift dulu lewat chat dan sering lupa dicatat. Sekarang tercatat, disetujui, dan masuk jadwal hari itu juga."
- `Hendra Wijaya, Kepala Gudang, Lintas Kirim Nusantara` — "Lembur dan tunjangan shift malam sudah ada di slip. Staf berhenti menanyakan hitungan di akhir bulan."
- Komentar kode: `{/* ILUSTRATIF: ganti dengan testimoni asli yang disetujui */}`.

## 9. Paket & Harga (id `harga`, ilustratif)
3 kartu: `Starter` (hingga 50 karyawan), `Tim` (disorot, badge `Paling Dipilih`, 50–250), `Skala` (250+). Harga per karyawan aktif/bulan **placeholder**: `Rp 12.000`, `Rp 9.000`, `Hubungi kami`. Daftar modul termasuk (ikon `Check`): Starter = Absensi, Perizinan, Library; Tim = + Gaji, Exam; Skala = + multi-cabang, ekspor payroll, SLA dukungan. CTA `Minta Demo`.
- Catatan: `Harga ilustratif. Konfirmasi dengan pemilik sebelum rilis.` Tanpa `offers` di JSON-LD.

## 10. FAQ (id `faq`)
Akordeon aksesibel (`button` + `aria-expanded` + `aria-controls`), 7 pertanyaan. Data di `data.ts`, dipakai juga oleh JSON-LD. Desktop: ilustrasi ponsel statis di samping.
1. **Bagaimana selfie dan GPS mencegah titip absen?** Setiap clock-in meminta selfie yang dicocokkan dengan foto referensi karyawan, lalu memeriksa lokasi terhadap radius titik kerja. Clock-in yang tidak cocok ditandai untuk ditinjau atasan.
2. **Apakah fake GPS benar-benar terdeteksi?** Aplikasi memeriksa tanda umum lokasi palsu, seperti aplikasi mock location dan lompatan posisi yang tidak wajar. Tidak ada sistem yang menjamin nol celah, karena itu clock-in mencurigakan ditandai, bukan diam-diam diterima.
3. **Bagaimana data wajah dan lokasi dilindungi?** Karyawan memberi persetujuan saat pendaftaran, data dienkripsi, dan akses dibatasi per peran. Lokasi hanya diperiksa saat clock-in. Rincian retensi mengikuti kebijakan perusahaan dan UU Pelindungan Data Pribadi.
4. **Bagaimana jika sinyal lemah di lokasi kerja?** Clock-in tetap tercatat dengan waktu perangkat dan ditandai untuk diverifikasi setelah sinyal kembali. SOP dapat dibaca offline.
5. **Bisakah upah per jam, uang hadir, dan lembur diatur?** Bisa. Tarif per jabatan, nilai uang hadir, tunjangan shift malam, dan pengali lembur diatur saat setup, lalu dihitung otomatis dari data absensi.
6. **Bagaimana rotasi shift dan tukar jadwal bekerja?** Manajer memilih pola rotasi. Staf mengajukan tukar shift ke rekan, rekan menyetujui, lalu atasan menyetujui. Jadwal dan gaji ikut berubah setelah persetujuan akhir.
7. **Berapa lama pemasangan untuk satu outlet atau gudang?** Dengan impor CSV, satu lokasi dapat berjalan dalam hitungan hari. Kami menyarankan pilot satu lokasi sebelum perluasan.

## 11. CTA Penutup (slate-800)
Latar foto pergantian shift (`07`) dengan overlay slate datar 78%, atau fallback `SunDisc` bila foto tidak tersedia. Ponsel kecil di sisi kanan (≥1024).
- H2: **Coba lihat shift tim Anda di ponsel.**
- Sub: `Minta demo. Kami siapkan satu lokasi contoh dengan pola shift Anda.`
- Tombol: primer `Minta Demo` + sekunder `Lihat Harga`.

## 12. Footer (slate-950)
- Logo + tagline `Shift rapi, absensi jujur, gaji tepat.`
- Kolom: **Produk** (5 modul, anchor ke `#modul`), **Perusahaan** (`Industri` → `#industri`, `Kontak` → `mailto:`), **Legal** (Privasi, Syarat → `mailto:legal@shiftmate.id?subject=...` placeholder; **laporkan: halaman legal asli belum ada**).
- `© 2026 ShiftMate. Seluruh hak dilindungi.` + `Foto bersifat ilustrasi. Simulasi gaji ilustratif dan bukan nasihat pajak.`
- Tanpa `href="#"` kosong.

## Aturan Copywriting
- Judul ≤ 9 kata, deskripsi kartu ≤ 22 kata. Mulai dengan hasil atau kata kerja.
- Tanda "—" di dokumen ini hanya pemisah dalam spesifikasi. Jangan ditulis di halaman; pakai titik dua, titik, atau pisahkan elemen.
- Setiap klaim fitur memakai contoh konkret (12 m, radius 50 m, 4 jam lembur). Kata terlarang di `06`.
- Data dummy: Sari Wulandari, Rudi Hartono, Dimas Saputra, Nadia Putri, Made Arta, Intan Permata, Agus Salim; kota Bandung, Jakarta, Bekasi/Cikarang, Surabaya, Yogyakarta, Denpasar; `Rp`, `WIB`.
