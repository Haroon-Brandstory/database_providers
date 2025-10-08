import { Toaster } from "react-hot-toast";
import { interDisplay, interTight } from "../lib/fonts";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";


export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
    title: "Database Providers",
    description: "Your trusted source for database solutions",
};

export default async function RootLayout({ children,  }) {


    return (
        <html lang='en'>
            <body
                className={`antialiased min-h-screen ${interDisplay.variable} ${interTight.variable}`}
            >
                <Header />
                {children}
                <Footer />
            </body>
        </html>
        // <div>
        //   {children}
        // </div>
    );
}
