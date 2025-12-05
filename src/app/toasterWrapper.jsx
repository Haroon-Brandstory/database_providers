import Footer from "@/components/footer";
import Header from "@/components/header";
import { Toaster } from "react-hot-toast";

export default function ToasterWrapper({ children }) {
    return (
        <>
            <Header />
            {children}
            <Footer />
            <Toaster position="top-center" />
        </>
    )
}