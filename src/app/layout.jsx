import { Toaster } from "react-hot-toast";
import { interDisplay, interTight } from "../lib/fonts";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Script from "next/script";
import { getLocale } from "next-intl/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: {
    default: "Database Providers - Global B2B Business Database",
    // template: "%s | Database Providers"
  },
  description:
    "Verified B2B database providers for global business growth, marketing, and lead generation.",
  openGraph: {
    siteName: "Database Providers",
  },
  applicationName: "Database Providers",
};


export default async function RootLayout({ children }) {

  const locale = await getLocale();

  const localeMap = {
    en: 'en-US',
    in: 'en-IN',
    ae: 'en-AE',
    sg: 'en-SG',
    my: 'en-MY'
  };
  const lang = localeMap[locale] || 'en-US';

  return (
    <html lang={lang}>
      <head />
      <body
        className={`antialiased min-h-screen ${interDisplay.variable} ${interTight.variable}`}
      >
        {/* ✅ Google Tag Manager Script */}
        <Script
          id="gtm-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WWP5P6K4');`,
          }}
        />

        {/* ✅ Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WWP5P6K4"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <Header />
        {children}
        <Footer />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
