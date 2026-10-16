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
import { getSiteConfig } from "@/lib/api";

export default async function HomePage() {
  const config = await getSiteConfig();
  const jsonLd = generateJsonLd(config);

  return (
    <>
      {/* Schema Markup JSON-LD (@graph) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Header & Navigasi */}
      <Navbar
        branding={config.branding}
        siteName={config.site.name}
        whatsappUrl={config.cta.whatsapp_url}
        email={config.contact.email}
      />

      <main id="konten-utama">
        {/* 2. Hero Section dengan Mockup Ponsel Interaktif */}
        <HeroSection
          heroData={config.hero}
          whatsappUrl={config.cta.whatsapp_url}
          email={config.contact.email}
        />

        {/* 3. Strip Bukti Angka & Klien */}
        <TrustStrip />

        {/* 4. Industri yang Dilayani */}
        <IndustriesSection />

        {/* 5. Masalah -> Solusi */}
        <ProblemSection />

        {/* 6. Lima Modul Utama Berurutan (Dibungkus State DemoProvider) - Tetap Asli */}
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
        <FinalCtaSection
          whatsappUrl={config.cta.whatsapp_url}
          email={config.contact.email}
          siteName={config.site.name}
        />
      </main>

      {/* 12. Footer */}
      <Footer
        footerData={{
          email: config.contact.email,
          phone: config.contact.phone,
          socialLinks: config.contact.social_links,
          copyright: config.footer_text,
          logoUrl: config.branding.logo_url,
          name: config.site.name,
        }}
      />

      {/* Tombol Kapsul Melayang WhatsApp */}
      <WhatsAppButton whatsappUrl={config.cta.whatsapp_url} />
    </>
  );
}
