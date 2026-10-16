import React from "react";
import { Logo } from "../ui/Logo";
import { site } from "@/lib/site";

interface FooterProps {
  footerData?: {
    email?: string;
    phone?: string;
    socialLinks?: Array<{ platform?: string; name?: string; url: string }>;
    copyright?: string;
    logoUrl?: string;
    name?: string;
  };
}

export function Footer({ footerData }: FooterProps = {}) {
  const email = footerData?.email || site.email;
  const phone = footerData?.phone;
  const socialLinks = footerData?.socialLinks || [];
  const siteName = footerData?.name || site.name;
  const copyright =
    footerData?.copyright || `© 2026 ${siteName}. Seluruh hak cipta dilindungi undang-undang.`;

  return (
    <footer className="bg-slate-950 text-on-dark-2 pt-16 pb-12 border-t border-line-dark">
      <div className="max-w-[1160px] mx-auto px-5 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-line-dark">
          {/* Brand & Tagline (2 Kolom di Desktop) */}
          <div className="lg:col-span-2">
            <Logo isDark logoUrl={footerData?.logoUrl} siteName={siteName} className="mb-4" />
            <p className="text-sm text-on-dark-3 max-w-sm leading-relaxed mb-6">
              Shift rapi, absensi jujur, gaji tepat. Aplikasi HRIS mobile untuk tim lapangan dan operasional multi-shift di Indonesia.
            </p>
            <div className="space-y-1.5 text-xs text-on-dark-3">
              <div>
                Kontak Tim:{" "}
                <a
                  href={`mailto:${email}`}
                  className="text-white hover:text-orange underline underline-offset-4"
                >
                  {email}
                </a>
              </div>
              {phone && phone.trim() !== "" && (
                <div>
                  Telepon Kantor:{" "}
                  <a
                    href={`tel:${phone}`}
                    className="text-white hover:text-orange underline underline-offset-4"
                  >
                    {phone}
                  </a>
                </div>
              )}
            </div>
            {socialLinks.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-3">
                {socialLinks.map((item, idx) => (
                  <a
                    key={item.url || idx}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-on-dark-3 hover:text-white transition-colors"
                  >
                    {item.name || item.platform || "Media Sosial"}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Kolom 1: Produk (5 Modul Wajib) */}
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">
              5 Modul Utama
            </div>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#modul-absensi" className="hover:text-white transition-colors">
                  Modul Absensi & GPS
                </a>
              </li>
              <li>
                <a href="#modul-perizinan" className="hover:text-white transition-colors">
                  Modul Perizinan & Tukar Shift
                </a>
              </li>
              <li>
                <a href="#modul-gaji" className="hover:text-white transition-colors">
                  Modul Gaji & Upah per Jam
                </a>
              </li>
              <li>
                <a href="#modul-exam" className="hover:text-white transition-colors">
                  Modul Exam & Higienitas
                </a>
              </li>
              <li>
                <a href="#modul-library" className="hover:text-white transition-colors">
                  Modul Library & SOP Offline
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 2: Perusahaan */}
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">
              Perusahaan
            </div>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#industri" className="hover:text-white transition-colors">
                  Sektor Industri
                </a>
              </li>
              <li>
                <a href="#cara-kerja" className="hover:text-white transition-colors">
                  Cara Kerja & Setup
                </a>
              </li>
              <li>
                <a href="#harga" className="hover:text-white transition-colors">
                  Paket & Biaya
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Pusat Tanya Jawab (FAQ)
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Legalitas & Kepatuhan */}
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">
              Legalitas & Privasi
            </div>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href={`mailto:legal@shiftmate.id?subject=Pertanyaan%20Kebijakan%20Privasi%20UU%20PDP`}
                  className="hover:text-white transition-colors"
                >
                  Kebijakan Privasi (UU PDP)
                </a>
              </li>
              <li>
                <a
                  href={`mailto:legal@shiftmate.id?subject=Syarat%20dan%20Ketentuan%20Layanan`}
                  className="hover:text-white transition-colors"
                >
                  Syarat & Ketentuan Layanan
                </a>
              </li>
              <li>
                <a
                  href={`mailto:legal@shiftmate.id?subject=Sertifikasi%20Keamanan%20Data`}
                  className="hover:text-white transition-colors"
                >
                  Keamanan Data Biometrik
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Baris Bawah Hak Cipta & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-on-dark-3">
          <div>
            {copyright}
          </div>
          <div className="text-center sm:text-right">
            Foto bersifat ilustrasi dokumenter. Simulasi gaji ilustratif dan bukan nasihat pajak.
          </div>
        </div>
      </div>
    </footer>
  );
}
