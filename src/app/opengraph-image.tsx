import { ImageResponse } from "next/og";
import { getSiteConfig } from "@/lib/api";

export const alt =
  "ShiftMate: ponsel menampilkan clock-in selfie dan lokasi GPS dalam radius";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Revalidasi cache berkala (120 detik)
export const revalidate = 120;

export default async function Image() {
  const config = await getSiteConfig();

  // 1. Jika ada banner yang diunggah dari Admin Panel:
  // Ambil gambar dari URL banner tersebut dan langsung sajikan file gambarnya sebagai respons.
  if (config.seo.og_image_url && config.seo.og_image_url.trim() !== "") {
    try {
      const response = await fetch(config.seo.og_image_url);
      if (response.ok) {
        const imageContentType =
          response.headers.get("content-type") || "image/png";
        const buffer = await response.arrayBuffer();
        const revalidateSeconds =
          Number(process.env.REVALIDATE_SECONDS) || 120;
        return new Response(buffer, {
          headers: {
            "Content-Type": imageContentType,
            "Cache-Control": `public, max-age=${revalidateSeconds}, stale-while-revalidate=${revalidateSeconds}`,
          },
        });
      }
    } catch (error) {
      console.warn(
        `[OG Image] Gagal mengambil gambar dari ${config.seo.og_image_url}. Beralih ke kartu visual bawaan.`,
        error
      );
    }
  }

  // 2. Jika belum ada banner yang diunggah (mode bawaan):
  // Gunakan desain visual bawaan ShiftMate dengan teks dinamis dari API
  const headline =
    config.hero.headline ||
    config.seo.meta_title ||
    "Absen shift dari ponsel. Tanpa titip absen.";
  const subheadline =
    config.hero.subheadline ||
    config.seo.meta_description ||
    "Aplikasi HRIS mobile untuk F&B, hotel, logistik, dan pekerja multi-shift.";
  const siteName = config.site.name || "ShiftMate";
  const primaryColor = config.branding.primary_color || "#F97316";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#1E293B", // slate-800
          padding: "60px 80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Kolom Kiri: Brand & Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            maxWidth: "600px",
          }}
        >
          {/* Logo ShiftMate */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              marginBottom: "32px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                backgroundColor: primaryColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "28px",
                  height: "14px",
                  borderTopLeftRadius: "14px",
                  borderTopRightRadius: "14px",
                  backgroundColor: "#0F172A",
                }}
              />
            </div>
            <span
              style={{
                fontSize: "36px",
                fontWeight: 900,
                color: "#FFFFFF",
                letterSpacing: "-0.03em",
              }}
            >
              {siteName}
            </span>
          </div>

          {/* Headline Utama */}
          <div
            style={{
              fontSize: "46px",
              fontWeight: 800,
              color: "#FFFFFF",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              marginBottom: "20px",
            }}
          >
            {headline}
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: "18px",
              color: "#CBD5E1",
              lineHeight: 1.5,
              marginBottom: "32px",
            }}
          >
            {subheadline}
          </div>

          {/* Tiga Pilar Fitur */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              fontSize: "15px",
              color: primaryColor,
              fontWeight: 700,
            }}
          >
            <span>• Selfie Biometrik</span>
            <span>• GPS Anti-Fake</span>
            <span>• Rotasi Shift Otomatis</span>
          </div>
        </div>

        {/* Kolom Kanan: Panggung Ponsel & SunDisc */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            width: "380px",
            height: "500px",
          }}
        >
          {/* Layer 1: SunDisc Latar Oranye Datar */}
          <div
            style={{
              position: "absolute",
              width: "340px",
              height: "170px",
              borderTopLeftRadius: "170px",
              borderTopRightRadius: "170px",
              backgroundColor: primaryColor,
              top: "130px",
              left: "20px",
              opacity: 0.9,
            }}
          />

          {/* Layer 2: Frame Ponsel Putih */}
          <div
            style={{
              width: "244px",
              height: "460px",
              backgroundColor: "#0F172A", // Bezel Slate-900
              borderRadius: "36px",
              padding: "9px",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
            }}
          >
            {/* Layar Dalam */}
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#FFFFFF",
                borderRadius: "27px",
                padding: "20px 16px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {/* Dynamic Island */}
              <div
                style={{
                  width: "64px",
                  height: "14px",
                  backgroundColor: "#0F172A",
                  borderRadius: "7px",
                }}
              />

              {/* Status Sukses Presensi */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "24px",
                    backgroundColor: "#DCFCE7",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "8px",
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <polyline
                      points="20 6 9 17 4 12"
                      stroke="#15803D"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: 800,
                    color: "#0F172A",
                  }}
                >
                  Clock-in Berhasil
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#475569",
                    marginTop: "2px",
                  }}
                >
                  07:02 WIB
                </div>
              </div>

              {/* Tiga Baris Verifikasi */}
              <div
                style={{
                  width: "100%",
                  backgroundColor: "#F1F5F9",
                  borderRadius: "12px",
                  padding: "10px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#0F172A",
                }}
              >
                <span>• Wajah Cocok Terverifikasi</span>
                <span>• Lokasi di Radius 50m</span>
                <span>• GPS Asli Valid</span>
              </div>
            </div>
          </div>

          {/* Layer 3: FloatBadge Kanan Atas */}
          <div
            style={{
              position: "absolute",
              top: "50px",
              right: "-10px",
              backgroundColor: "#FFFFFF",
              borderRadius: "12px",
              padding: "8px 14px",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
            }}
          >
            <span
              style={{ fontSize: "12px", fontWeight: 800, color: "#0F172A" }}
            >
              Shift Pagi
            </span>
            <span style={{ fontSize: "10px", color: "#475569" }}>
              07:00 – 15:00
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
