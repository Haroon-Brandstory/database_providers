'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Header() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className=" text-white bg-black relative z-50">
            <div className="container mx-auto px-4 md:px-6 lg:px-15 py-4 md:py-6 lg:py-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Link href='/'>
                            <Image src="/header/db_pro_logo.svg" alt="Database Providers Logo" width={140} height={40} className="w-28 md:w-32 lg:w-36" />
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
                        <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></div>
                        <div className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
                    </button>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-6">
                        <Link href="/" className={`hover:text-blue-400 ${pathname === "/" ? "border-b-2 border-[#0133E9]" : ""}`}>
                            Data
                        </Link>
                        <Link href="/resource" className={`hover:text-blue-400 ${pathname === "/resource" ? "border-b-2 border-[#0133E9]" : ""}`}>
                            Resource
                        </Link>
                        <Link href="/about" className={`hover:text-blue-400 ${pathname === "/about" ? "border-b-2 border-[#0133E9]" : ""}`}>
                            About Us
                        </Link>
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden lg:flex items-center gap-10">
                        <select className=" rounded px-2 py-1">
                            <option value="en">🇺🇸 EN</option>
                            <option value="es">🇪🇸 ES</option>
                        </select>
                        <button className="header_cta_contact">
                            Contact Us
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`lg:hidden absolute left-0 right-0 bg-black transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-96 pt-4' : 'max-h-0'}`}>
                    <nav className="flex flex-col space-y-4 p-4">
                        <Link
                            href="/"
                            className={`hover:text-blue-400 ${pathname === "/" ? "text-blue-400" : ""}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Data
                        </Link>
                        <Link
                            href="/resource"
                            className={`hover:text-blue-400 ${pathname === "/resource" ? "text-blue-400" : ""}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Resource
                        </Link>
                        <Link
                            href="/about"
                            className={`hover:text-blue-400 ${pathname === "/about" ? "text-blue-400" : ""}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            About Us
                        </Link>
                        <Link
                            href="/contact-us"
                            className={`hover:text-blue-400 ${pathname === "/contact-us" ? "text-blue-400" : ""}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Contact Us
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );

}