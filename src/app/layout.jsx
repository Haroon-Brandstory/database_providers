import { interDisplay, interTight } from '../lib/fonts'
import "./globals.css";
import Header from "@/components/header";

export const metadata = {
  title: "Database Providers",
  description: "Your trusted source for database solutions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${interDisplay.variable} ${interTight.variable}`}>
      <body className={`antialiased min-h-screen`}>
        <Header />
        <main className="">
          {children}
        </main>
      </body>
    </html>
  );
}
