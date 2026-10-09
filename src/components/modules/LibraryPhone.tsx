"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Search,
  WifiOff,
  Plane,
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { PhoneFrame } from "../phone/PhoneFrame";
import { LIBRARY_DOCUMENTS, LibraryDocument } from "@/lib/data";
import { useDemo } from "../phone/DemoProvider";

export function LibraryPhone() {
  const { offline, setOffline } = useDemo();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"Semua" | "SOP" | "Arsip" | "E-learning">("Semua");
  const [readingDoc, setReadingDoc] = useState<LibraryDocument | null>(null);

  // Filter dokumen
  const filteredDocs = LIBRARY_DOCUMENTS.filter((doc) => {
    const matchesCategory =
      selectedCategory === "Semua" ? true : doc.category === selectedCategory;
    const matchesQuery = doc.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="flex flex-col items-center">
      <PhoneFrame
        variant="ios"
        label="Simulasi Modul Library dan SOP Offline di Ponsel"
        time="07:02 WIB"
      >
        <div className="flex-1 flex flex-col justify-between p-4 bg-white">
          {/* TAMPILAN BACA DOKUMEN (READER MODE) */}
          {readingDoc ? (
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <button
                  onClick={() => setReadingDoc(null)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-700 hover:underline mb-3 cursor-pointer"
                >
                  <ArrowLeft size={14} />
                  <span>Kembali ke Dokumen</span>
                </button>

                <div className="pb-2 border-b border-line mb-3">
                  <span className="text-[10px] font-bold text-orange-700 uppercase tracking-wide">
                    {readingDoc.category} · Offline Tersimpan
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 mt-0.5">{readingDoc.title}</h4>
                  <span className="text-[10px] text-ink-3">Disinkron: {readingDoc.syncTime}</span>
                </div>

                {/* Langkah-langkah SOP */}
                <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                  {readingDoc.steps && readingDoc.steps.length > 0 ? (
                    readingDoc.steps.map((step, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-mist/70 border border-line flex items-start gap-2.5 text-xs"
                      >
                        <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="text-slate-900 leading-relaxed font-medium">{step}</span>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 bg-mist rounded-xl text-xs text-ink-2">
                      Dokumen kebijakan internal resmi telah diunduh di penyimpanan lokal perangkat.
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-line text-center">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-ok">
                  <CheckCircle2 size={13} />
                  <span>Dapat dibaca tanpa sinyal internet</span>
                </span>
              </div>
            </div>
          ) : (
            /* TAMPILAN DAFTAR DOKUMEN DENGAN SEARCH & FILTER */
            <div className="flex-1 flex flex-col justify-between">
              <div>
                {/* Header & Mode Pesawat Toggle */}
                <div className="flex items-center justify-between pb-2 border-b border-line mb-3">
                  <div>
                    <span className="text-[10px] text-ink-3">Arsip Lapangan</span>
                    <div className="text-xs font-bold text-slate-900">Perpustakaan SOP</div>
                  </div>
                  {/* Toggle Mode Pesawat */}
                  <button
                    onClick={() => setOffline((prev) => !prev)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors cursor-pointer ${
                      offline
                        ? "bg-danger text-white border border-danger"
                        : "bg-mist text-ink-2 border border-line"
                    }`}
                  >
                    <Plane size={11} className={offline ? "rotate-45" : ""} />
                    <span>Mode Pesawat: {offline ? "Aktif" : "Mati"}</span>
                  </button>
                </div>

                {/* Status bar offline jika mode pesawat aktif */}
                {offline && (
                  <div className="mb-2 p-1.5 rounded-lg bg-danger-bg text-danger text-[10px] font-bold flex items-center gap-1.5 justify-center">
                    <WifiOff size={12} />
                    <span>Internet Nonaktif (Hanya dokumen offline dibuka)</span>
                  </div>
                )}

                {/* Input Pencarian Cepat */}
                <div className="relative mb-2.5">
                  <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder='Cari SOP "higienitas"…'
                    className="w-full h-8 pl-8 pr-3 rounded-xl bg-mist border border-line text-xs text-ink placeholder:text-ink-3 focus:outline-slate-900"
                  />
                </div>

                {/* Kategori Filter Tabs */}
                <div className="flex gap-1 mb-2.5 overflow-x-auto no-scrollbar pb-1 text-[10px] font-bold">
                  {(["Semua", "SOP", "Arsip", "E-learning"] as const).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-2.5 py-1 rounded-lg shrink-0 transition-colors cursor-pointer ${
                        selectedCategory === cat
                          ? "bg-slate-900 text-white"
                          : "bg-mist text-ink-2 hover:text-slate-900"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* List 8 Dokumen */}
                <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
                  {filteredDocs.length === 0 ? (
                    <div className="p-4 text-center text-xs text-ink-3">
                      Tidak ada dokumen yang cocok.
                    </div>
                  ) : (
                    filteredDocs.map((doc) => {
                      const isDisabled = offline && !doc.offline;
                      return (
                        <button
                          key={doc.id}
                          disabled={isDisabled}
                          onClick={() => setReadingDoc(doc)}
                          className={`w-full text-left p-2 rounded-xl border text-xs flex items-center justify-between transition-colors cursor-pointer ${
                            isDisabled
                              ? "bg-line/40 border-line text-ink-3 opacity-60 cursor-not-allowed"
                              : "bg-white border-line hover:bg-cream/50 text-slate-900"
                          }`}
                        >
                          <div className="pr-2">
                            <div className="font-bold text-[11px] leading-tight mb-0.5">
                              {doc.title}
                            </div>
                            <div className="text-[10px] text-ink-3 flex items-center gap-1.5">
                              <span>{doc.category}</span>
                              <span>•</span>
                              <span>{doc.offline ? "Offline siap" : "Perlu internet"}</span>
                            </div>
                          </div>

                          <div className="shrink-0 text-ink-3">
                            {isDisabled ? (
                              <Lock size={12} className="text-ink-3" />
                            ) : (
                              <ChevronRight size={14} />
                            )}
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>

              <div className="pt-2 border-t border-line text-center">
                <span className="text-[10px] text-ink-3">
                  {LIBRARY_DOCUMENTS.filter((d) => d.offline).length} dari 8 dokumen tersimpan lokal di perangkat
                </span>
              </div>
            </div>
          )}
        </div>
      </PhoneFrame>
    </div>
  );
}
