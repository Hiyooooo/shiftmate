import React from "react";
import { Tag, Check } from "lucide-react";
import { Eyebrow } from "../ui/ShiftChip";
import { Button } from "../ui/Button";
import { PRICING_PLANS } from "@/lib/data";
import { site } from "@/lib/site";

export function PricingSection() {
  return (
    <section
      id="harga"
      className="py-16 lg:py-24 bg-cream border-b border-cream-2"
      aria-labelledby="pricing-heading"
    >
      <div className="max-w-[1160px] mx-auto px-5 lg:px-8">
        <div className="max-w-2xl mb-14 text-center mx-auto">
          <Eyebrow icon={Tag} className="mb-4">
            Paket & Investasi
          </Eyebrow>
          <h2
            id="pricing-heading"
            className="font-display text-3xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4"
          >
            Investasi transparan per staf aktif.
          </h2>
          <p className="text-base lg:text-lg text-ink-2 leading-relaxed">
            Hanya membayar untuk staf yang benar-benar aktif bekerja. Tanpa biaya pemasangan awal atau biaya server tersembunyi.
          </p>
        </div>

        {/* Grid 3 Kartu Harga */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-6 lg:p-8 flex flex-col justify-between transition-all ${
                plan.isHighlighted
                  ? "bg-slate-900 text-white border-2 border-orange shadow-float relative -translate-y-1"
                  : "bg-white text-slate-900 border border-line-2"
              }`}
            >
              <div>
                {/* Header Paket */}
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display text-xl font-bold">{plan.name}</h3>
                  {plan.badge && (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-orange text-slate-900">
                      {plan.badge}
                    </span>
                  )}
                </div>

                <div className={`text-xs mb-6 ${plan.isHighlighted ? "text-on-dark-3" : "text-ink-3"}`}>
                  {plan.range}
                </div>

                {/* Harga Angka (DM Mono) */}
                <div className="mb-4">
                  <div className="font-mono text-3xl lg:text-4xl font-extrabold tracking-tight">
                    {plan.price}
                  </div>
                  <div className={`text-xs ${plan.isHighlighted ? "text-on-dark-2" : "text-ink-2"}`}>
                    {plan.period}
                  </div>
                </div>

                <p className={`text-xs mb-6 leading-relaxed ${plan.isHighlighted ? "text-on-dark-2" : "text-ink-2"}`}>
                  {plan.description}
                </p>

                {/* Fitur Termasuk */}
                <div className="space-y-3 pt-6 border-t border-line/30 mb-8">
                  {plan.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2.5 text-xs">
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          plan.isHighlighted
                            ? "bg-orange text-slate-900"
                            : "bg-ok-bg text-ok"
                        }`}
                      >
                        <Check size={11} strokeWidth={3} />
                      </div>
                      <span className={plan.isHighlighted ? "text-on-dark-2" : "text-ink"}>
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tombol CTA */}
              <Button
                variant={plan.isHighlighted ? "primary" : "dark"}
                href={`mailto:${site.email}?subject=Minta%20Demo%20Paket%20${encodeURIComponent(plan.name)}`}
                className="w-full text-xs"
              >
                Minta Demo {plan.name}
              </Button>
            </div>
          ))}
        </div>

        {/* Catatan Legal Ilustratif */}
        <div className="text-xs text-ink-3 text-center mt-10">
          Harga di atas bersifat simulasi ilustratif. Hubungi tim sales kami untuk penawaran khusus jaringan outlet multi-cabang.
        </div>
      </div>
    </section>
  );
}
