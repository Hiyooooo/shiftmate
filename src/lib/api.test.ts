import { describe, it, expect } from "vitest";
import { normalizeImageUrl, DEFAULT_CONFIG } from "./api";

describe("API Helper & Config (03-shiftmate)", () => {
  it("DEFAULT_CONFIG memuat data default ShiftMate yang lengkap", () => {
    expect(DEFAULT_CONFIG.site.id).toBe("03-shiftmate");
    expect(DEFAULT_CONFIG.site.name).toBe("ShiftMate");
    expect(DEFAULT_CONFIG.branding.primary_color).toBe("#F97316");
    expect(DEFAULT_CONFIG.branding.favicon_url).toBe("/favicon.svg");
    expect(DEFAULT_CONFIG.hero.headline).toContain("Absen shift dari ponsel");
    expect(DEFAULT_CONFIG.hero.cta_text).toBe("Minta Demo");
    expect(DEFAULT_CONFIG.cta.whatsapp_url).toContain("https://wa.me/");
  });

  describe("normalizeImageUrl", () => {
    const apiUrl = "https://joziah-unqualifiable-undesirably.ngrok-free.dev";

    it("mengembalikan string kosong jika input null / kosong", () => {
      expect(normalizeImageUrl(null, apiUrl)).toBe("");
      expect(normalizeImageUrl("", apiUrl)).toBe("");
      expect(normalizeImageUrl(undefined, apiUrl)).toBe("");
    });

    it("mempertahankan aset lokal publik bawaan", () => {
      expect(normalizeImageUrl("/favicon.svg", apiUrl)).toBe("/favicon.svg");
      expect(normalizeImageUrl("/logo.svg", apiUrl)).toBe("/logo.svg");
      expect(normalizeImageUrl("/opengraph-image", apiUrl)).toBe("/opengraph-image");
    });

    it("menggabungkan URL relatif dengan origin API", () => {
      expect(normalizeImageUrl("/storage/logos/logo.png", apiUrl)).toBe(
        `${apiUrl}/storage/logos/logo.png`
      );
      expect(normalizeImageUrl("storage/banners/hero.jpg", apiUrl)).toBe(
        `${apiUrl}/storage/banners/hero.jpg`
      );
    });

    it("mengganti localhost jika API_URL menggunakan domain eksternal", () => {
      const localhostUrl = "http://localhost:8000/storage/uploads/img.png";
      expect(normalizeImageUrl(localhostUrl, apiUrl)).toBe(
        `${apiUrl}/storage/uploads/img.png`
      );
    });

    it("membiarkan URL remote yang valid dan bukan localhost", () => {
      const cdnUrl = "https://images.unsplash.com/photo-123";
      expect(normalizeImageUrl(cdnUrl, apiUrl)).toBe(cdnUrl);
    });
  });
});
