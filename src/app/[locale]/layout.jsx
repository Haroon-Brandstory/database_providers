import { Toaster } from "react-hot-toast";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Database Providers",
  description: "Your trusted source for database solutions",
};

export default async function LocaleRootLayout({ children, params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
   
        <NextIntlClientProvider
          key={locale}
          locale={locale}
          messages={messages}
        >
          <Toaster position="top-right" />
          <main className="">{children}</main>
        </NextIntlClientProvider>
    
    // <div>
    //   {children}
    // </div>
  );
}
