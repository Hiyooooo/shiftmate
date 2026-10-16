import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans, DM_Mono } from "next/font/google";
import Script from "next/script";
import { site } from "@/lib/site";
import { getSiteConfig } from "@/lib/api";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-display",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-mono",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteConfig();

  const title = siteConfig.seo.meta_title || site.title;
  const description = siteConfig.seo.meta_description || site.description;
  const ogImageUrl = siteConfig.seo.og_image_url || "/opengraph-image";
  const faviconUrl = siteConfig.branding.favicon_url || "/favicon.svg";

  return {
    metadataBase: new URL(site.url),
    title,
    description,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      siteName: siteConfig.site?.name || site.name,
      locale: site.locale,
      url: "/",
      title,
      description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
    robots: { index: true, follow: true },
    icons: { icon: faviconUrl },
  };
}

export async function generateViewport(): Promise<Viewport> {
  const siteConfig = await getSiteConfig();
  return {
    themeColor: siteConfig.branding.primary_color || "#F97316",
    width: "device-width",
    initialScale: 1,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteConfig = await getSiteConfig();

  return (
    <html
      lang="id"
      className={`${bricolage.variable} ${plusJakarta.variable} ${dmMono.variable}`}
    >
      <head>
        {siteConfig.branding.primary_color && (
          <style
            id="admin-theme-colors"
            dangerouslySetInnerHTML={{
              __html: `
                :root {
                  --orange: ${siteConfig.branding.primary_color};
                  --orange-600: ${siteConfig.branding.primary_color};
                  --orange-700: ${siteConfig.branding.primary_color};
                }
              `,
            }}
          />
        )}
      </head>
      <body className="min-h-screen bg-white text-ink antialiased selection:bg-cream-2 selection:text-orange-700">
        {/* Google Analytics dari Admin Panel (jika diisi) */}
        {siteConfig.tracking.ga_id && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.tracking.ga_id}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${siteConfig.tracking.ga_id}');
              `}
            </Script>
          </>
        )}

        {/* Meta Pixel dari Admin Panel (jika diisi) */}
        {siteConfig.tracking.meta_pixel_id && (
          <>
            <Script id="meta-pixel" strategy="afterInteractive">
              {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${siteConfig.tracking.meta_pixel_id}');
                fbq('track', 'PageView');
              `}
            </Script>
            <noscript>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                src={`https://www.facebook.com/tr?id=${siteConfig.tracking.meta_pixel_id}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        )}

        <a
          href="#konten-utama"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-slate-900 focus:px-4 focus:py-2 focus:text-white focus:outline-2 focus:outline-orange"
        >
          Lewati ke konten utama
        </a>
        {children}
      </body>
    </html>
  );
}
