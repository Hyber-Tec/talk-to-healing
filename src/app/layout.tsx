import type { Metadata, Viewport } from "next";
import { Figtree, Fraunces } from "next/font/google";

import { BookingProvider } from "@/components/booking/booking-context";
import { MotionProvider } from "@/components/motion/motion-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { faqs, site } from "@/lib/site";
import "./globals.css";
import { asset } from "@/lib/asset";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "opsz"],
  display: "swap",
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

const title = `${site.name} | Therapy in Johns Creek, GA & Online`;

/** Preview deploys (GitHub Pages) set these so links resolve there and search engines skip the copy. */
const siteOrigin = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;
const isPreview = process.env.NEXT_PUBLIC_PREVIEW === "1";

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title,
  description: site.description,
  applicationName: site.name,
  keywords: [
    "therapy Johns Creek",
    "counseling Johns Creek GA",
    "Korean therapist Georgia",
    "couples therapy",
    "family therapy",
    "teen therapy",
    "culturally sensitive therapy",
    "online therapy Georgia",
  ],
  openGraph: {
    type: "website",
    title,
    description: site.description,
    siteName: site.name,
    locale: "en_US",
    images: [{ url: asset("/brand/logo-full.png"), width: 1280, height: 619, alt: site.name }],
  },
  twitter: { card: "summary_large_image", title, description: site.description },
  robots: isPreview ? { index: false, follow: false } : undefined,
};

export const viewport: Viewport = {
  themeColor: "#fbf7f0",
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: site.name,
    slogan: site.tagline,
    description: site.description,
    url: site.url,
    telephone: site.phone.display,
    faxNumber: site.fax,
    email: site.email.general,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: "US",
    },
    areaServed: { "@type": "State", name: "Georgia" },
    medicalSpecialty: "Psychiatric",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fraunces.variable} ${figtree.variable} antialiased`}>
      <body className="min-h-full">
        <a
          href="#main"
          className="sr-only z-[100] rounded-full bg-ink px-5 py-3 text-cream focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        <MotionProvider>
          <TooltipProvider>
            <BookingProvider>{children}</BookingProvider>
          </TooltipProvider>
        </MotionProvider>
        <script
          type="application/ld+json"
          // Static, trusted content from site.ts; < is escaped so no string can close the tag.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
