import { site } from "./site";
import { FAQ_LIST } from "./data";

export function generateJsonLd() {
  const organization = {
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    logo: `${site.url}/favicon.svg`,
    email: site.email,
  };

  const website = {
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    inLanguage: "id-ID",
    publisher: {
      "@id": `${site.url}/#organization`,
    },
  };

  const softwareApplication = {
    "@type": "SoftwareApplication",
    "@id": `${site.url}/#software`,
    name: site.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Android, iOS, Web", // KLAIM: konfirmasi ketersediaan platform produksi
    description: site.description,
    featureList: [
      "Clock-in dan clock-out instan berbasis waktu WIB",
      "Biometrik selfie mencocokkan wajah dengan foto referensi",
      "GPS geofencing dengan batas radius titik outlet kerja",
      "Pendeteksi aplikasi mock location dan anti-fake GPS",
      "Shift rolling dinamis pola 2-2-2-2 dan 5-2",
      "Rekap real-time kehadiran seluruh kru lapangan",
      "Tukar shift mandiri antar-rekan satu outlet",
      "Pengajuan izin sakit dengan foto surat dokter dari ponsel",
      "Workflow persetujuan cuti berjenjang rekan dan atasan",
      "Kalkulasi upah per jam dan uang hadir otomatis",
      "Tunjangan shift malam dan lembur berjenjang",
      "Pemotongan PPh 21 TER Kategori A dan BPJS TK/Kesehatan",
      "Slip gaji digital langsung di aplikasi ponsel",
      "Checklist higienitas outlet sebelum clock in",
      "Briefing SOP harian interaktif dengan timer",
      "Perpustakaan SOP operasional yang bisa dibaca offline",
    ],
  };

  const faqPage = {
    "@type": "FAQPage",
    "@id": `${site.url}/#faq`,
    mainEntity: FAQ_LIST.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organization, website, softwareApplication, faqPage],
  };
}
