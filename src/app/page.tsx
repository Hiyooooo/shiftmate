import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { DemoProvider } from "@/components/phone/DemoProvider";
import { ModulesHub } from "@/components/modules/ModulesHub";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { generateJsonLd } from "@/lib/schema";

export default function HomePage() {
  const jsonLd = generateJsonLd();

  return (
    <>
      {/* Schema Markup JSON-LD (@graph) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Header & Navigasi */}
      <Navbar />

      <main id="konten-utama">
        {/* 2. Hero Section dengan Mockup Ponsel Interaktif */}
        <HeroSection />

        {/* 3. Strip Bukti Angka & Klien */}
        <TrustStrip />

        {/* 4. Industri yang Dilayani */}
        <IndustriesSection />

        {/* 5. Masalah -> Solusi */}
        <ProblemSection />

        {/* 6. Lima Modul Utama Berurutan (Dibungkus State DemoProvider) */}
        <DemoProvider>
          <ModulesHub />
        </DemoProvider>

        {/* 7. Cara Kerja dalam Tiga Langkah */}
        <HowItWorksSection />

        {/* 8. Cerita Pengguna / Testimoni */}
        <TestimonialsSection />

        {/* 9. Pilihan Paket & Harga */}
        <PricingSection />

        {/* 10. FAQ (Tanya Jawab Aksesibel) */}
        <FaqSection />

        {/* 11. Final CTA Penutup */}
        <FinalCtaSection />
      </main>

      {/* 12. Footer */}
      <Footer />

      {/* Tombol Kapsul Melayang WhatsApp */}
      <WhatsAppButton />
    </>
  );
}
