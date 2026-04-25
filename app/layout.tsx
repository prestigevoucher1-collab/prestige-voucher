import type { Metadata } from "next";
import { Newsreader, Manrope } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fryment | Official PTE Vouchers & Free Mock Tests 2026",
  description: "Get verified PTE Vouchers at discounted prices on Fryment.info. Practice with official PTE mock tests, AI scoring, and instant results. Save ₹3,000 on your PTE Academic exam booking today.",
  keywords: "PTE voucher, PTE mock test, PTE practice test free, PTE test preparation, Fryment PTE, discounted PTE voucher India, PTE Academic UKVI voucher",
  authors: [{ name: "Fryment" }],
  openGraph: {
    title: "Fryment | Official PTE Vouchers & Free Mock Tests 2026",
    description: "Save ₹3,000 on your PTE Academic exam with Fryment.info. Instant voucher delivery and 24/7 expert support.",
    url: "https://www.fryment.info",
    siteName: "Fryment",
    type: "website",
    images: [
      {
        url: "https://www.fryment.info/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fryment | Official PTE Vouchers & Free Mock Tests 2026",
    description: "Save ₹3,000 on your PTE Academic exam with verified vouchers on Fryment.info.",
    images: ["https://www.fryment.info/og-image.png"],
  },
  alternates: {
    canonical: "https://www.fryment.info",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${manrope.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Fryment",
              "url": "https://www.fryment.info",
              "logo": "https://www.fryment.info/logo.png",
              "founder": {
                "@type": "Person",
                "name": "Tanay Shinde"
              },
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Yashodev",
                "addressLocality": "Nashik",
                "addressRegion": "Maharashtra",
                "addressCountry": "IN"
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
                ],
                "opens": "00:00",
                "closes": "23:59"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-9325216364",
                "contactType": "customer service",
                "areaServed": "IN",
                "availableLanguage": "en"
              },
              "sameAs": [
                "https://www.instagram.com/fryment/",
                "https://www.facebook.com/fryment"
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "Official PTE Exam Voucher",
              "description": "Fryment.info provides verified PTE Academic vouchers with instant delivery and ₹3,000 discount on exam bookings.",
              "brand": {
                "@type": "Brand",
                "name": "Fryment"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "8450"
              }
            })
          }}
        />
      </head>
      <body className="font-body selection:bg-primary-fixed selection:text-primary">
        {children}
      </body>
    </html>
  );
}
