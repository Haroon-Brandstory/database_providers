"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import { useNavHref } from "@/hooks/useNavHref";

const languages = [
	{ code: "en", label: "English", flag: "/header/flag5.svg" },
	{ code: "in", label: "English (IN)", flag: "/header/flag1.svg" },
	{ code: "ae", label: "Arabic (UAE)", flag: "/header/flag2.svg" },
	{ code: "sg", label: "English (SGP)", flag: "/header/flag4.svg" },
	{ code: "my", label: "Malaysia", flag: "/header/flag3.svg" },
];

function LanguageDropdown() {
	const getLocaleFromPath = (pathname) => {
		const parts = pathname.split("/");
		const maybeLocale = parts[1];
		const supported = ["en", "in", "ae", "sg", "my"];
		return supported.includes(maybeLocale) ? maybeLocale : "en";
	};
	const pathname = usePathname();
	const locale = getLocaleFromPath(pathname);

	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState(languages[0]);
	const dropdownRef = useRef(null);
	// const locale = useLocale();
	const router = useRouter();
	// const pathname = usePathname();

	useEffect(() => {
		const match = languages.find((l) => l.code === locale);
		if (match) {
			setSelected(match);
		} else {
			setSelected(languages[0]);
		}
	}, [locale]);

	useEffect(() => {
		if (!open) return;
		function handleClickOutside(event) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [open]);

	const handleLanguageChange = (newLocale) => {
		const pathWithoutLocale =
			pathname.replace(new RegExp(`^/${locale}`), "") || "/";
		router.push(`/${newLocale}${pathWithoutLocale}`);
		// window.location.href = `/${newLocale}${pathWithoutLocale}`;
		setOpen(false);
	};

	return (
		<div ref={dropdownRef} className="relative inline-block text-left">
			<button
				type="button"
				className="flex items-center gap-2  px-3 py-2 rounded cursor-pointer"
				onClick={() => setOpen((o) => !o)}
			>
				<Image
					src={selected.flag}
					alt={selected.label}
					width={24}
					height={16}
				/>
				<svg
					className="w-4 h-4 text-white"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M19 9l-7 7-7-7"
					/>
				</svg>
			</button>
			{open && (
				<ul className="absolute right-0 mt-2 w-auto bg-[#0236ef3b] border-[#0236EF] rounded shadow-lg z-50">
					{languages.map((lang) => (
						<li
							key={lang.code}
							className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-[#0236EF]"
							onClick={() => handleLanguageChange(lang.code)}
						>
							<Image src={lang.flag} alt={lang.label} width={24} height={16} />
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default function Header() {
	const getLocaleFromPath = (pathname) => {
		const parts = pathname.split("/");
		const maybeLocale = parts[1];
		const supported = ["en", "in", "ae", "sg", "tur"];
		return supported.includes(maybeLocale) ? maybeLocale : "en";
	};
	const pathname = usePathname();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const locale = getLocaleFromPath(pathname);

	useEffect(() => {
		const handleScroll = () => {
			// setScrolled(window.scrollY > 50);

			if (pathname.includes("thank-you")) {
				setScrolled(true);
			} else {
				setScrolled(window.scrollY > 50);
			}
		};
		window.addEventListener("scroll", handleScroll);
		handleScroll();
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const { navHref } = useNavHref();

	const isActive = (target) => {
		const cleanPath = pathname.replace(/^\/(en|in|uae|my|tur)(?=\/|$)/, "");
		const cleanTarget = target.replace(/^\/(en|in|uae|my|tur)(?=\/|$)/, "");
		return cleanPath === cleanTarget;
	};

	return (
		<header
			className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? "backdrop-blur-md bg-black/30" : "bg-transparent"
				} ${isMenuOpen ? 'backdrop-blur-md bg-black/30' : "bg-trasnparent"}`}
		>
			<div className="container mx-auto px-4 md:px-6 lg:px-15 py-4 md:py-6 lg:py-6">
				<div className="flex items-center justify-between">
					{/* Logo */}
					<div className="flex items-center gap-2">
						<Link href={navHref("/")}>
							<Image
								src="/header/db_pro_logo.svg"
								alt="Database Providers Logo"
								width={140}
								height={40}
								className="w-28 md:w-32 lg:w-36"
							/>
						</Link>
					</div>

					{/* Mobile Menu Button */}
					<button
						className="lg:hidden p-2"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						aria-label="Toggle menu"
					>
						<div
							className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${isMenuOpen ? "rotate-45 translate-y-2" : ""
								}`}
						></div>
						<div
							className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${isMenuOpen ? "opacity-0" : ""
								}`}
						></div>
						<div
							className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""
								}`}
						></div>
					</button>

					{/* Desktop Navigation */}
					<nav className="hidden lg:flex items-center space-x-6">
						<Link
							href={navHref("/")}
							className={`hover:text-blue-400 text-white ${isActive(navHref("/")) ? "border-b-2 border-[#0133E9]" : ""
								}`}
						>
							{/* {t("nav.home", { defaultMessage: "Home" })} */}
							Home
						</Link>
						<Link
							href={"/blogs"}
							className={`hover:text-blue-400 text-white ${isActive("/blogs") ? "border-b-2 border-[#0133E9]" : ""
								}`}
						>
							{/* {t("nav.blogs", { defaultMessage: "Blogs" })} */}
							Blogs
						</Link>
						<Link
							href={navHref("/testimonials")}
							className={`hover:text-blue-400 text-white ${isActive("/testimonials") ? "border-b-2 border-[#0133E9]" : ""
								}`}
						>
							Testimonials
							{/* {t("nav.testimonials", { defaultMessage: "Testimonials" })} */}
						</Link>
						<Link
							href={navHref("/about")}
							className={`hover:text-blue-400 text-white ${isActive(navHref("/about")) ? "border-b-2 border-[#0133E9]" : ""
								}`}
						>
							{/* {t("nav.about", { defaultMessage: "About Us" })} */}
							About Us
						</Link>
					</nav>

					{/* Desktop Actions */}
					<div className="hidden lg:flex items-center gap-10">
						<LanguageDropdown />
						<Link href={navHref("/contact-us")}>
							<button className="header_cta_contact">
								{/* {t("nav.contact", { defaultMessage: "Contact Us" })} */}
								Contact Us
							</button>
						</Link>
					</div>
				</div>

				{/* Mobile Menu */}
				<div
					className={`lg:hidden relative left-0 right-0 transition-all duration-300 overflow-hidden ${isMenuOpen ? "max-h-96 pt-4 " : "max-h-0"
						}`}
				>
					<nav className="flex flex-col space-y-4 p-4">
						<Link
							href={navHref("/")}
							className={`hover:text-blue-400 ${isActive(navHref("/")) ? "text-blue-400" : ""
								}`}
							onClick={() => setIsMenuOpen(false)}
						>
							{/* {t("nav.home", { defaultMessage: "Home" })} */}
							Home
						</Link>
						<Link
							href={"/blogs"}
							className={`hover:text-blue-400 ${isActive(navHref("/blogs")) ? "text-blue-400" : ""
								}`}
							onClick={() => setIsMenuOpen(false)}
						>
							{/* {t("nav.resource", { defaultMessage: "Resource" })} */}
							Blogs
						</Link>
						<Link
							href={navHref("/testimonials")}
							className={`hover:text-blue-400 ${isActive(navHref("/testimonials")) ? "text-blue-400" : ""
								}`}
							onClick={() => setIsMenuOpen(false)}
						>
							{/* {t("nav.resource", { defaultMessage: "Resource" })} */}
							Testimonials
						</Link>
						<Link
							href={navHref("/about")}
							className={`hover:text-blue-400 ${isActive(navHref("/about")) ? "text-blue-400" : ""
								}`}
							onClick={() => setIsMenuOpen(false)}
						>
							About Us
							{/* {t("nav.about", { defaultMessage: "About Us" })} */}
						</Link>
						<Link
							href={navHref("/contact-us")}
							className={`hover:text-blue-400 ${isActive(navHref("/contact-us")) ? "text-blue-400" : ""
								}`}
							onClick={() => setIsMenuOpen(false)}
						>
							{/* {t("nav.contact", { defaultMessage: "Contact Us" })} */}
							Contact Us
						</Link>
					</nav>
				</div>
			</div>
		</header>
	);
}

// header.jsx without intnlztn

// 'use client';
// import Image from 'next/image';
// import Link from 'next/link';
// import { usePathname, useRouter } from 'next/navigation';
// import { useRef, useEffect, useState } from 'react';
// import { useLocale, useTranslations } from 'next-intl';

// const languages = [
// 	{ code: 'en', label: 'English', flag: '/header/flag5.svg' },
// 	{ code: 'in', label: 'English (IN)', flag: '/header/flag1.svg' },
// 	{ code: 'uae', label: 'Arabic (UAE)', flag: '/header/flag2.svg' },
// 	{ code: 'sgp', label: 'English (SGP)', flag: '/header/flag3.svg' },
// 	{ code: 'tur', label: 'Turkish', flag: '/header/flag4.svg' },
// ];

// function LanguageDropdown() {
// 	const [open, setOpen] = useState(false);
// 	const [selected, setSelected] = useState(languages[0]);
// 	const dropdownRef = useRef(null);
// 	const locale = useLocale();
// 	const router = useRouter();
// 	const pathname = usePathname();

// 	useEffect(() => {
// 		const match = languages.find((l) => l.code === locale);
// 		if (match) setSelected(match);
// 	}, [locale]);

// 	useEffect(() => {
// 		if (!open) return;
// 		function handleClickOutside(event) {
// 			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
// 				setOpen(false);
// 			}
// 		}
// 		document.addEventListener('mousedown', handleClickOutside);
// 		return () => document.removeEventListener('mousedown', handleClickOutside);
// 	}, [open]);

// 	const handleLanguageChange = (newLocale) => {
// 		const pathWithoutLocale =
// 			pathname.replace(new RegExp(`^/${locale}`), '') || '/';
// 		router.push(`/${newLocale}${pathWithoutLocale}`);
// 		setOpen(false);
// 	};

// 	return (
// 		<div ref={dropdownRef} className="relative inline-block text-left">
// 			<button
// 				type="button"
// 				className="flex items-center gap-2  px-3 py-2 rounded cursor-pointer"
// 				onClick={() => setOpen((o) => !o)}
// 			>
// 				<Image
// 					src={selected.flag}
// 					alt={selected.label}
// 					width={24}
// 					height={16}
// 				/>
// 				<svg
// 					className="w-4 h-4 text-white"
// 					fill="none"
// 					stroke="currentColor"
// 					viewBox="0 0 24 24"
// 				>
// 					<path
// 						strokeLinecap="round"
// 						strokeLinejoin="round"
// 						strokeWidth={2}
// 						d="M19 9l-7 7-7-7"
// 					/>
// 				</svg>
// 			</button>
// 			{open && (
// 				<ul className="absolute right-0 mt-2 w-auto bg-[#0236ef3b] border-[#0236EF] rounded shadow-lg z-50">
// 					{languages.map((lang) => (
// 						<li
// 							key={lang.code}
// 							className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-[#0236EF]"
// 							onClick={() => handleLanguageChange(lang.code)}
// 						>
// 							<Image src={lang.flag} alt={lang.label} width={24} height={16} />
// 						</li>
// 					))}
// 				</ul>
// 			)}
// 		</div>
// 	);
// }

// export default function Header() {
// 	const pathname = usePathname();
// 	const [isMenuOpen, setIsMenuOpen] = useState(false);
// 	const [scrolled, setScrolled] = useState(false);
// 	const locale = useLocale();
// 	const t = useTranslations();

// 	useEffect(() => {
// 		const handleScroll = () => {
// 			// setScrolled(window.scrollY > 50);

// 			if (pathname.includes('thank-you')) {
// 				setScrolled(true);
// 			} else {
// 				setScrolled(window.scrollY > 50);
// 			}

// 		};
// 		window.addEventListener('scroll', handleScroll);
// 		handleScroll();
// 		return () => window.removeEventListener('scroll', handleScroll);
// 	}, []);

// 	const navHref = (path) => {
// 		if (path === '/') return `/${locale}`;
// 		return `/${locale}${path}`;
// 	};

// 	const isActive = (target) => {
// 		return pathname === target;
// 	};

// 	return (
// 		<header
// 			className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled
// 				? 'backdrop-blur-md bg-black/30'
// 				: 'bg-transparent'
// 				}`}
// 		>
// 			<div className="container mx-auto px-4 md:px-6 lg:px-15 py-4 md:py-6 lg:py-6">
// 				<div className="flex items-center justify-between">
// 					{/* Logo */}
// 					<div className="flex items-center gap-2">
// 						<Link href={`/${locale}`}>
// 							<Image
// 								src="/header/db_pro_logo.svg"
// 								alt="Database Providers Logo"
// 								width={140}
// 								height={40}
// 								className="w-28 md:w-32 lg:w-36"
// 							/>
// 						</Link>
// 					</div>

// 					{/* Mobile Menu Button */}
// 					<button
// 						className="lg:hidden p-2"
// 						onClick={() => setIsMenuOpen(!isMenuOpen)}
// 						aria-label="Toggle menu"
// 					>
// 						<div
// 							className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''
// 								}`}
// 						></div>
// 						<div
// 							className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${isMenuOpen ? 'opacity-0' : ''
// 								}`}
// 						></div>
// 						<div
// 							className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''
// 								}`}
// 						></div>
// 					</button>

// 					{/* Desktop Navigation */}
// 					<nav className="hidden lg:flex items-center space-x-6">
// 						<Link
// 							href={'/'}
// 							// href={navHref('/')}
// 							className={`hover:text-blue-400 ${isActive('/') ? 'border-b-2 border-[#0133E9]' : ''}`}
// 						// className={`hover:text-blue-400 ${isActive(navHref('/')) ? 'border-b-2 border-[#0133E9]' : ''}`}
// 						>
// 							{/* {t('nav.home', { defaultMessage: 'Home' })} */}
// 							Home
// 						</Link>
// 						<Link
// 							href={'/resource'}
// 							// href={navHref('/resource')}
// 							className={`hover:text-blue-400 ${isActive('/resource')
// 								// className={`hover:text-blue-400 ${isActive(navHref('/resource'))
// 								? 'border-b-2 border-[#0133E9]'
// 								: ''
// 								}`}
// 						>
// 							{/* {t('nav.resource', { defaultMessage: 'Resource' })} */}
// 							Resource
// 						</Link>
// 						<Link
// 							href={'/about'}
// 							// href={navHref('/about')}
// 							className={`hover:text-blue-400 ${isActive('/about') ? 'border-b-2 border-[#0133E9]' : ''
// 								// className={`hover:text-blue-400 ${isActive(navHref('/about')) ? 'border-b-2 border-[#0133E9]' : ''
// 								}`}
// 						>
// 							About Us
// 							{/* {t('nav.about', { defaultMessage: 'About Us' })} */}
// 						</Link>
// 					</nav>

// 					{/* Desktop Actions */}
// 					<div className="hidden lg:flex items-center gap-10">
// 						<LanguageDropdown />
// 						<Link
// 							// href={navHref('/contact-us')}>
// 							href={'/contact-us'}>
// 							<button className="header_cta_contact">
// 								Contact Us
// 								{/* {t('nav.contact', { defaultMessage: 'Contact Us' })} */}
// 							</button>
// 						</Link>
// 					</div>
// 				</div>

// 				{/* Mobile Menu */}
// 				<div
// 					className={`lg:hidden relative left-0 right-0 transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-96 pt-4 ' : 'max-h-0'
// 						}`}
// 				>
// 					<nav className="flex flex-col space-y-4 p-4">
// 						<Link
// 							// href={navHref('/')}
// 							href={'/'}
// 							className={`hover:text-blue-400 ${isActive('/') ? 'text-blue-400' : ''
// 								// className={`hover:text-blue-400 ${isActive(navHref('/')) ? 'text-blue-400' : ''
// 								}`}
// 							onClick={() => setIsMenuOpen(false)}
// 						>
// 							Home
// 							{/* {t('nav.home', { defaultMessage: 'Home' })} */}
// 						</Link>
// 						<Link
// 							href={'/resource'}
// 							// href={navHref('/resource')}
// 							className={`hover:text-blue-400 ${isActive('/resource') ? 'text-blue-400' : ''
// 								// className={`hover:text-blue-400 ${isActive(navHref('/resource')) ? 'text-blue-400' : ''
// 								}`}
// 							onClick={() => setIsMenuOpen(false)}
// 						>
// 							Resource
// 							{/* {t('nav.resource', { defaultMessage: 'Resource' })} */}
// 						</Link>
// 						<Link
// 							href={'/about'}
// 							// href={navHref('/about')}
// 							className={`hover:text-blue-400 ${isActive('/about') ? 'text-blue-400' : ''
// 								// className={`hover:text-blue-400 ${isActive(navHref('/about')) ? 'text-blue-400' : ''
// 								}`}
// 							onClick={() => setIsMenuOpen(false)}
// 						>
// 							About Us
// 							{/* {t('nav.about', { defaultMessage: 'About Us' })} */}
// 						</Link>
// 						<Link
// 							// href={navHref('/contact-us')}
// 							href={'/contact-us'}
// 							className={`hover:text-blue-400 ${isActive('/contact-us') ? 'text-blue-400' : ''
// 								// className={`hover:text-blue-400 ${isActive(navHref('/contact-us')) ? 'text-blue-400' : ''
// 								}`}
// 							onClick={() => setIsMenuOpen(false)}
// 						>
// 							{/* {t('nav.contact', { defaultMessage: 'Contact Us' })} */}
// 							Contact Us
// 						</Link>
// 					</nav>
// 				</div>
// 			</div>
// 		</header>
// 	);
// }
