import React from "react";
import Image from "next/image";
import fs from "fs";
import path from "path";
import { ImageManifestItem } from "@/lib/images";
import { IllustFnb } from "@/components/art/IllustFnb";
import { IllustHotel } from "@/components/art/IllustHotel";
import { IllustLogistik } from "@/components/art/IllustLogistik";
import { IllustKlinik } from "@/components/art/IllustKlinik";
import { SunDisc } from "@/components/art/SunDisc";

interface PhotoSlotProps {
  item: ImageManifestItem;
  className?: string;
  aspectRatio?: string; // "4/3" default
  priority?: boolean;
}

export function PhotoSlot({
  item,
  className = "",
  aspectRatio = "4/3",
  priority = false,
}: PhotoSlotProps) {
  // Cek apakah file foto raster benar-benar ada di public/
  const publicPath = path.join(process.cwd(), "public", item.src);
  const fileExists = fs.existsSync(publicPath);

  // Komponen fallback ilustrasi SVG jika foto tidak ada
  const renderFallback = () => {
    switch (item.fallbackKey) {
      case "fnb":
        return <IllustFnb />;
      case "hotel":
        return <IllustHotel />;
      case "logistik":
        return <IllustLogistik />;
      case "klinik":
        return <IllustKlinik />;
      case "cta":
        return (
          <div className="w-full h-full bg-slate-800 flex items-center justify-center relative overflow-hidden">
            <SunDisc size={360} clipped={false} className="opacity-90" />
          </div>
        );
      default:
        return <IllustFnb />;
    }
  };

  return (
    <div
      className={`relative w-full rounded-[16px] overflow-hidden border border-line-2 bg-cream select-none ${className}`}
      style={{ aspectRatio }}
    >
      {fileExists ? (
        <>
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            loading={priority ? undefined : "lazy"}
            priority={priority}
            className="object-cover"
          />
          {/* Overlay datar netral tipis untuk legibilitas chip */}
          <div className="absolute inset-0 bg-slate-900/10 pointer-events-none" />
        </>
      ) : (
        renderFallback()
      )}

      {/* Chip Pola Shift di Kiri Bawah (Flat) */}
      {item.shiftChip && (
        <div className="absolute bottom-3 left-3 z-10">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-slate-900 text-white">
            {item.shiftChip}
          </span>
        </div>
      )}
    </div>
  );
}
