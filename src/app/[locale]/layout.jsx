import { Toaster } from "react-hot-toast";
import { interDisplay, interTight } from "../../lib/fonts";
import "../globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Database Providers",
  description: "Your trusted source for database solutions",
};

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`antialiased min-h-screen ${interDisplay.variable} ${interTight.variable}`}
      >
        <NextIntlClientProvider
          key={locale}
          locale={locale}
          messages={messages}
        >
          <Header />
          <Toaster position="top-right" />
          <main className="">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
    // <div>
    //   {children}
    // </div>
  );
}
