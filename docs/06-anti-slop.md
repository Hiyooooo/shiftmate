# 06 — Anti "AI Slop" (ATURAN KERAS)

"AI slop" = hasil generik yang terlihat dan terdengar otomatis: gradien ungu, ikon-dalam-lingkaran, blob melayang, foto stok senyum yang sama di semua situs, slogan kosong, angka karangan. Untuk aplikasi absensi, kesan generik sama dengan kesan tidak bisa dipercaya. Baca file ini sebelum menulis kode atau copy.

## 1. Visual: dilarang
- Gradien apa pun (CSS `linear/radial/conic-gradient`, `bg-gradient-*`, teks gradien, SVG `<linearGradient>`). Semua bentuk **datar**.
- Ungu, pink, indigo, violet, fuchsia, biru-ungu. Palet Tailwind bawaan yang tidak ada di token.
- Blob/gelembung organik melayang, aurora, mesh, glow, glassmorphism, `backdrop-blur`, noise.
- Ikon di lingkaran/kotak berwarna sebagai hiasan kartu (pengecualian: `ShiftChip`, eyebrow pil). Ikon "sparkle/roket/petir" sebagai penanda fitur. Emoji di UI.
- Ponsel 3D mengilap, ponsel miring ekstrem, mockup dengan layar bergambar acak, tangan memegang ponsel dari stok, **ponsel yang menampilkan teks lorem atau UI yang tidak sesuai produk**.
- `rounded-3xl` di luar spesifikasi, `shadow-*` selain `--shadow-float` (hanya ponsel, badge melayang, bottom-sheet).
- Animasi looping (pulse, bounce, float berulang, marquee), parallax, stagger berlebihan.
- Badge App Store/Google Play resmi, logo Apple/Android/WhatsApp, logo klien/bank/lembaga asli.
- Tiga kartu identik berderet untuk semua section; setiap section memakai pola yang sama.
- Mockup yang menampilkan angka tidak konsisten antar tempat (hero, Absensi, Gaji, OG).

## 2. Gambar & foto: dilarang
- **Foto stok klise**: jabat tangan, tim tertawa menatap laptop, orang menunjuk papan kaca, pose menghadap kamera dengan senyum korporat, tangan memegang ponsel dengan layar kosong.
- **Wajah buatan AI** (foto maupun avatar) dan foto wajah yang dipasangkan dengan nama testimoni atau jabatan.
- Foto yang di-hotlink dari situs lain, foto tanpa catatan lisensi, foto berlogo/merek yang terbaca, foto ber-watermark.
- Teks langsung di atas foto tanpa overlay datar; foto diregangkan, tidak diberi `alt`, atau tanpa dimensi.
- Gambar raster untuk hal yang bisa digambar dengan SVG (ikon, ilustrasi, ponsel, peta).
- Gaya ilustrasi campur-aduk (satu datar, satu 3D, satu isometrik). **Satu gaya: datar geometris, palet token, garis 0 atau 2px slate-900.**
- Memakai foto yang sama berulang di dua tempat.

## 3. Visual: wajib (penanda desain yang disengaja)
- Ponsel sebagai tokoh utama setiap bagian modul, dengan UI yang benar-benar menggambarkan fiturnya.
- Motif **matahari terbenam datar** (`SunDisc`) sebagai satu-satunya dekorasi berulang, dipakai hemat (hero, 1–2 pita gelap, fallback CTA).
- Ritme latar putih → slate → krem → putih yang terlihat saat scroll cepat.
- Setiap foto memiliki treatment sama: radius 16, border 1px, chip pola shift datar, keterangan `Foto ilustrasi`.
- Oranye hanya sebagai aksen (≤ 12% layar).

## 4. Copy: dilarang
- Kata/frasa: *revolusioner, terdepan, inovatif, canggih, seamless, tanpa batas, next-level, supercharge, unlock, game-changer, all-in-one solution, solusi terbaik, di era digital, transformasi digital, mudah banget, sekali klik beres, bukan sekadar … tetapi …*.
- Triplet slogan kosong ("Cepat. Mudah. Aman."). Pertanyaan retoris sebagai judul. Banyak tanda seru.
- Klaim absolut tanpa mekanisme ("100% anti curang", "tidak bisa dipalsukan"). Selalu sebut mekanisme dan batasnya ("ditandai ke atasan").
- Statistik, rating, testimoni karangan tanpa penanda ilustratif. Angka bulat yang dikarang untuk akurasi biometrik.
- Em dash (—) di copy halaman; pakai titik atau titik dua.
- Sapaan campur (Anda di satu paragraf, kamu di paragraf lain) di luar aturan: marketing = "Anda", isi ponsel = "kamu".

## 5. Copy: wajib
- Kalimat pendek dengan kata benda dan angka spesifik: `12 m dari titik kerja, radius 50 m`, `4 jam lembur`.
- Judul menyatakan hasil atau fakta; kata kerja aktif; satu ide per kalimat.
- Istilah lapangan yang dipakai orang sungguhan: titip absen, shift malam, tukar shift, uang hadir.
- Jujur soal batas: pemeriksaan lokasi palsu "menandai", tidak "menjamin".

## 6. Kode: dilarang
- Sisa template `create-next-app` (logo Next/Vercel, `page.module.css`, SVG bawaan, "Get started by editing").
- `any`, `// @ts-ignore`, `console.log`, komentar yang mengulang kode, dependensi/komponen tak terpakai.
- Rumus atau rupiah hardcoded di JSX; angka sihir tanpa nama.
- `div` + `onClick` sebagai tombol; ikon bermakna tanpa label; `<img>` tanpa `next/image`; `<Image>` tanpa `alt`/`sizes`.
- `getUserMedia`, geolokasi sungguhan, atau upload file sungguhan di mockup.

## 7. Uji anti-slop (jawab semua; jika ada "tidak", perbaiki)
1. Jika logo dan nama dihapus, apakah halaman ini masih jelas milik aplikasi absensi shift (bukan SaaS apa saja)?
2. Apakah setiap angka bisa ditelusuri ke `payroll.ts`/`shifts.ts` atau diberi tanda ilustratif?
3. Apakah ada section yang bisa dipindah ke website lain tanpa mengubah satu kata? Jika ya, tulis ulang dengan konteks multi-shift.
4. Apakah tiap section punya elemen visual yang spesifik (bukan dekorasi acak)?
5. Apakah semua foto terasa dokumenter, satu gaya warna, dan tidak ada yang klise (§2)?
6. Apakah ilustrasi satu gaya datar yang sama, dan ponsel menampilkan UI sungguhan?
7. Apakah klaim anti-fake dan biometrik menyebut mekanisme dan batas?
8. Apakah ritme latar dan bentuk antar section terlihat bervariasi saat di-scroll cepat?
9. Apakah ada elemen yang bergerak terus-menerus? (Harus tidak.)
10. Apakah build tetap indah jika tidak ada satu pun foto (fallback ilustrasi)?

## 8. Audit otomatis (jalankan di root proyek; semua **tanpa hasil** kecuali dicatat)
```bash
# warna & efek terlarang
grep -rEn "gradient|bg-clip-text|backdrop-blur|blur-|shadow-(sm|md|lg|xl|2xl)|rounded-3xl|hover:scale|indigo|purple|violet|fuchsia|pink|animate-(pulse|bounce|ping)" src
# hex di komponen (hanya boleh di globals.css, opengraph-image.tsx, components/art/)
grep -rEn "#[0-9A-Fa-f]{6}\b" src --include=*.tsx --include=*.ts | grep -v -e "opengraph-image" -e "components/art/"
# kata & placeholder terlarang
grep -rEin "lorem|revolusioner|terdepan|seamless|next-level|supercharge|game-changer|your text here|href=\"#\"" src
# sisa template & debug & API sensor
grep -rEn "console\.log|@ts-ignore|: any\b|Get started by editing|getUserMedia|navigator\.geolocation" src
# gambar tanpa next/image dan hotlink
grep -rEn "<img |https?://(images\.unsplash|images\.pexels|source\.unsplash)" src
# emoji di source UI
grep -rEnP "[\x{1F300}-\x{1FAFF}\x{2728}\x{26A1}]" src
```
Pengecualian sah (catat di laporan): `rounded-full` pada chip/pil/avatar/tombol rana; `shadow-float` (token) pada ponsel/badge; `animate-spin` pada spinner; `<img>` hanya bila di dalam `PhotoSlot` yang membungkus `next/image`.
