"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Logo } from "../ui/Logo";
import { Button } from "../ui/Button";
import { site } from "@/lib/site";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Tutup menu saat tombol ESC ditekan
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Kunci scroll saat drawer menu terbuka
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-40 w-full h-16 bg-white border-b border-line">
      <div className="max-w-[1160px] mx-auto h-full px-5 lg:px-8 flex items-center justify-between">
        {/* Logo Brand */}
        <a href="#simulasi" className="focus-visible:outline-slate-900 rounded-lg">
          <Logo />
        </a>

        {/* Navigasi Desktop Anchor */}
        <nav
          aria-label="Navigasi Utama"
          className="hidden lg:flex items-center gap-7 text-sm font-bold text-ink-2"
        >
          <a href="#modul" className="hover:text-slate-900 transition-colors">
            Fitur
          </a>
          <a href="#industri" className="hover:text-slate-900 transition-colors">
            Industri
          </a>
          <a href="#cara-kerja" className="hover:text-slate-900 transition-colors">
            Cara Kerja
          </a>
          <a href="#harga" className="hover:text-slate-900 transition-colors">
            Harga
          </a>
          <a href="#faq" className="hover:text-slate-900 transition-colors">
            FAQ
          </a>
        </nav>

        {/* Tombol Aksi CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <Button
            variant="secondary"
            href="#simulasi"
            className="h-10 px-4 text-xs hidden md:inline-flex"
          >
            Coba Simulasi
          </Button>
          <Button
            variant="primary"
            href={`mailto:${site.email}?subject=Minta%20Demo%20ShiftMate`}
            className="h-10 px-5 text-xs"
          >
            Minta Demo
          </Button>
        </div>

        {/* Hamburger Mobile */}
        <div className="flex sm:hidden items-center gap-2">
          <Button
            variant="primary"
            href={`mailto:${site.email}?subject=Minta%20Demo%20ShiftMate`}
            className="h-9 px-3 text-xs"
          >
            Minta Demo
          </Button>
          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Buka menu navigasi"
            className="w-10 h-10 flex items-center justify-center rounded-xl border border-line-2 text-slate-900 hover:bg-mist cursor-pointer"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Layar Penuh */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu navigasi mobile"
          className="fixed inset-0 z-50 bg-white flex flex-col p-6 animate-fadeIn"
        >
          <div className="flex items-center justify-between pb-4 border-b border-line">
            <Logo />
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Tutup menu"
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-mist text-slate-900 hover:bg-line cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex flex-col gap-5 py-8 text-lg font-bold text-slate-900">
            <a
              href="#modul"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 border-b border-line"
            >
              <span>Fitur & Modul</span>
              <ArrowRight size={18} className="text-orange-700" />
            </a>
            <a
              href="#industri"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 border-b border-line"
            >
              <span>Industri</span>
              <ArrowRight size={18} className="text-orange-700" />
            </a>
            <a
              href="#cara-kerja"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 border-b border-line"
            >
              <span>Cara Kerja</span>
              <ArrowRight size={18} className="text-orange-700" />
            </a>
            <a
              href="#harga"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 border-b border-line"
            >
              <span>Pilihan Paket Harga</span>
              <ArrowRight size={18} className="text-orange-700" />
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 border-b border-line"
            >
              <span>Tanya Jawab (FAQ)</span>
              <ArrowRight size={18} className="text-orange-700" />
            </a>
          </nav>

          <div className="mt-auto space-y-3 pt-6 border-t border-line">
            <Button
              variant="primary"
              href={`mailto:${site.email}?subject=Minta%20Demo%20ShiftMate`}
              className="w-full"
            >
              Minta Demo ShiftMate
            </Button>
            <Button
              variant="secondary"
              href="#simulasi"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full"
            >
              Coba Simulasi di Atas
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
