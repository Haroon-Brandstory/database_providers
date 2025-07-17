import { Toaster } from 'react-hot-toast';
import { interDisplay, interTight } from '../lib/fonts'
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata = {
  title: "Database Providers",
  description: "Your trusted source for database solutions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${interDisplay.variable} ${interTight.variable}`}>
      <body className={`antialiased min-h-screen`}>
        <Header />
        <Toaster position='top-right' />
        <main className="">
          {children}
        </main>
        <Footer />

      </body>
    </html>
  );
}
