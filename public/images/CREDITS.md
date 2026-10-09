# CREDITS — Dokumentasi Aset Visual ShiftMate

Dokumen ini mencatat sumber, status lisensi, dan peruntukan aset gambar untuk **ShiftMate** (`03-shiftmate`).

---

## 1. Status Slot Gambar (`docs/07`)

| ID Slot | Jalur File | Peruntukan Section | Status Saat Ini | Mekanisme Fallback |
|---|---|---|---|---|
| **P-01** | `images/industri/fnb.jpg` | Sektor F&B | Fallback Aktif (Layer 1) | Ilustrasi SVG datar `IllustFnb.tsx` |
| **P-02** | `images/industri/hotel.jpg` | Sektor Perhotelan | Fallback Aktif (Layer 1) | Ilustrasi SVG datar `IllustHotel.tsx` |
| **P-03** | `images/industri/logistik.jpg` | Sektor Logistik | Fallback Aktif (Layer 1) | Ilustrasi SVG datar `IllustLogistik.tsx` |
| **P-04** | `images/industri/klinik.jpg` | Sektor Klinik/RS | Fallback Aktif (Layer 1) | Ilustrasi SVG datar `IllustKlinik.tsx` |
| **P-05** | `images/cta/pergantian-shift.jpg` | CTA Penutup | Fallback Aktif (Layer 1) | Motif SVG datar `SunDisc.tsx` |

> **Catatan Agent**:
> Sesuai instruksi `docs/07` §5 (Sumber dan lisensi prioritas 3), jika foto dokumentasi milik klien asli belum diserahkan oleh pemilik proyek, sistem secara otomatis mengaktifkan fallback ilustrasi vektor datar (`components/art/*`) melalui komponen server-side `PhotoSlot.tsx`.
> Hal ini menjamin bahwa:
> 1. Build Next.js 100% sukses tanpa dependensi aset eksternal.
> 2. Tidak ada risiko hotlink ilegal, watermark, atau foto wajah AI generik yang melanggar aturan Anti-Slop (`docs/06`).
> 3. Tampilan visual tetap konsisten, rapi, dan profesional.

---

## 2. Aset Ilustrasi Vektor Mandiri (Layer 1)
Seluruh ilustrasi di bawah ini dibuat mandiri secara programmatic berbasis SVG/JSX dalam palet token desain sistem (`Sunset Orange`, `Slate-900`, `Cream`, `Mist`):
- `SunDisc.tsx`: Motif matahari terbit/terbenam di atas garis horizon (simbol rotasi shift).
- `SelfieFace.tsx`: Siluet kepala dan bahu netral untuk panduan kamera presensi selfie.
- `MiniMap.tsx`: Peta ilustrasi radius geofencing dan simulasi lompatan fake GPS.
- `SuratDokter.tsx`: Kop klinik fiktif dengan stempel sah untuk modul perizinan sakit.
- `ChatChaos.tsx`: Tampilan bubble chat WhatsApp semrawut untuk komparasi masalah vs solusi.
- `IllustFnb.tsx`, `IllustHotel.tsx`, `IllustLogistik.tsx`, `IllustKlinik.tsx`: Ilustrasi 4 sektor industri.
- `StepArt1.tsx`, `StepArt2.tsx`, `StepArt3.tsx`: Ilustrasi 3 langkah penerapan.
- `Logo.tsx`: Wordmark ShiftMate + simbol custom matahari di atas garis horizon.
