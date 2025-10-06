import { useNavHref } from "@/hooks/useNavHref";
import Image from "next/image";

export default function Footer() {

    const { navHref } = useNavHref();
    return (
        <footer className="bg-black text-white pt-10 pb-4 px-4 md:px-12">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-start gap-10 border-b border-[#222] pb-8">
                <div className="flex-2 min-w-[220px] flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                        <Image src="/header/db_pro_logo.svg" alt="Database Providers Logo" width={100} height={100} />
                    </div>
                    <p className="text-[#D0D0D0] text-sm">
                        Get started with accurate and industry-compliant data and experience a new level of marketing performance, successfully fueling your ABM and Email campaigns.
                    </p>
                    <div className="flex gap-4 mt-2">
                        <a href="https://www.facebook.com/databaseprovidersbangalore/" aria-label="Facebook" className="hover:text-[#2C6BFF]">
                            <Image src="/footer/footer-soc-icon1.svg" width={25} height={25} alt="img" />
                        </a>
                        <a href="https://in.linkedin.com/company/thedatabase-providers" aria-label="LinkedIn" className="hover:text-[#2C6BFF]">
                            <Image src="/footer/footer-soc-icon2.svg" width={25} height={25} alt="img" />
                        </a>
                        <a href="https://x.com/db_providers" aria-label="X" className="hover:text-[#2C6BFF]">
                            <Image src="/footer/footer-soc-icon3.svg" width={25} height={25} alt="img" />
                        </a>
                        <a href="https://www.instagram.com/thedatabaseproviders/" aria-label="Instagram" className="hover:text-[#2C6BFF]">
                            <Image src="/footer/footer-soc-icon4.svg" width={25} height={25} alt="img" />
                        </a>
                        <a href="https://www.youtube.com/channel/UC8ag8pQbzFAkmsgB4a99QAA" aria-label="YouTube" className="hover:text-[#2C6BFF]">
                            <Image src="/footer/footer-soc-icon5.svg" width={25} height={25} alt="img" />
                        </a>
                    </div>
                </div>
                <div className="flex-1 min-w-[180px] flex flex-col gap-2 mt-2 md:mt-0">
                    <div className="font-semibold mb-2">&nbsp;</div>
                    <a href={navHref('/about')} className="hover:text-[#2C6BFF] transition">About Us</a>
                    <a href={navHref('/service-1')} className="hover:text-[#2C6BFF] transition">Services</a>
                    <a href={navHref('/global-professional-data')} className="hover:text-[#2C6BFF] transition">Features</a>
                    <a href={navHref('/blogs')} className="hover:text-[#2C6BFF] transition">Blogs</a>
                    <a href={navHref('/privacy-policy')} className="hover:text-[#2C6BFF] transition">Privacy Policy</a>
                </div>
                <div className="flex-1 min-w-[220px] flex flex-col gap-4 mt-2 md:mt-0">
                    <div className="font-semibold mb-2">Contact Us</div>
                    <div className="flex items-start gap-3">
                        <span className="mt-1">
                            <Image src='/footer/footer-loc.svg' width={25} height={25} alt="img" />
                        </span>
                        <div>
                            <div className="font-bold">USA</div>
                            <div className="text-[#D0D0D0] text-sm leading-tight">39109 Guardino Dr, Fremont,<br />CA - 94538</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span>
                            <Image src='/footer/footer-mail.svg' width={25} height={25} alt="img" />
                        </span>
                        <a href="mailto:sales@thedatabaseproviders.com" className="text-[#D0D0D0] text-sm hover:text-[#2C6BFF]">sales@thedatabaseproviders.com</a>
                    </div>
                </div>
            </div>
            {/* Bottom bar */}
            <div className="max-w-7xl mx-auto flex flex-col justify-center items-center md:flex-row justify-between items-center pt-4 text-xs text-[#D0D0D0] gap-2">
                <div>
                    Privacy policy &nbsp; &bull; &nbsp; © 2025 Database Providers. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
}