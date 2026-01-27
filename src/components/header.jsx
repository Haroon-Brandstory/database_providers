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

const menuItems = [
	{
		label: "Home",
		url: "/"
	},
	// {
	// 	label: "About",
	// 	url: "/about"
	// },
	{
		label: "Our-Data",
		url: "/our-data",
		childMenu: [
			{
				label: "Healthcare Data",
				url: "/healthcare-data"
			},
			{
				label: "B2B Data",
				url: "/b2b-data"
			},
			{
				label: "Tech Install Base Data",
				url: "/tech-install-data"
			},
			{
				label: "Industry Data",
				url: "/industry-data"
			},
			{
				label: "Professional Data",
				url: "/professional-data"
			},
			{
				label: "Data Enrichment",
				url: "/data-enrichment"
			},
			{
				label: "Custom Data Solutions",
				url: "/custom-data"
			},
			{
				label: "Global Database",
				url: "/global-database"
			}
		]
	},
	{
		label: "ABM",
		url: "/abm"
	},
	{
		label: "Pricing",
		url: "/pricing-plans"
	},
	{
		label: "Resources",
		url: "/resources",
		childMenu: [
			{
				label: "Blogs",
				url: "/blogs"
			},
			{
				label: "Case Studies",
				url: "/case-studies"
			},
			{
				label: "White Papers",
				url: "/white-papers"
			},
			{
				label: "Webinars",
				url: "/webinars"
			},
			{
				label: "Tools",
				url: "/tools"
			},
			{
				label: "Videos",
				url: "/videos"
			}
		]
	}
]

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
	const [openMenuIndex, setOpenMenuIndex] = useState(null);
	const [activeMobileMenu, setActiveMobileMenu] = useState(null);
	const [headerHeight, setHeaderHeight] = useState(80);
	const headerRef = useRef(null);
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

	useEffect(() => {
		if (openMenuIndex === null) return;
		function handleClickOutside(event) {
			const menuElement = document.querySelector(`[data-menu-index="${openMenuIndex}"]`);
			if (menuElement && !menuElement.contains(event.target)) {
				setOpenMenuIndex(null);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [openMenuIndex]);

	useEffect(() => {
		const updateHeaderHeight = () => {
			if (headerRef.current) {
				setHeaderHeight(headerRef.current.offsetHeight - 20);
			}
		};
		updateHeaderHeight();
		window.addEventListener('resize', updateHeaderHeight);
		return () => window.removeEventListener('resize', updateHeaderHeight);
	}, []);

	const { navHref } = useNavHref();

	const isActive = (target) => {
		const cleanPath = pathname.replace(/^\/(en|in|uae|my|tur)(?=\/|$)/, "");
		const cleanTarget = target.replace(/^\/(en|in|uae|my|tur)(?=\/|$)/, "");
		return cleanPath === cleanTarget;
	};

	return (
		<header
			ref={headerRef}
			className="fixed top-0 left-0 w-full z-50 transition-all duration-500 bg-transparent"
		>
			<div className={`absolute inset-0 -z-10 transition-all duration-500 ${scrolled || isMenuOpen ? "backdrop-blur-md bg-black/30" : "bg-transparent"}`} />
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
						{
							menuItems.map((item, index) => {
								// Check if item has childMenu
								if (item?.childMenu && Array.isArray(item.childMenu) && item.childMenu.length > 0) {
									const isOurData = item.label === "Our-Data";
									const isResources = item.label === "Resources";

									return (
										<div
											key={index}
											className="relative"
											data-menu-index={index}
										>
											<button
												type="button"
												onClick={(e) => {
													e.preventDefault();
													setOpenMenuIndex(openMenuIndex === index ? null : index);
												}}
												className={`hover:text-blue-400 text-white cursor-pointer bg-transparent border-none p-0 ${isActive(navHref(item?.url)) ? "border-b-2 border-[#0133E9]" : ""
													}`}
											>
												{item?.label || "menu"}
												<span className="text-[10px] pl-1">{item.label === "Our-Data" ? "▼" : ""}</span>
												{/* <span className="text-[10px] pl-1">{item.label === "Resources" ? "▼" : ""}</span> */}
											</button>

											{openMenuIndex === index && (
												<>
													{/* Full-width Mega Menu for Our-Data */}
													{isOurData && (
														<div className={`flex items-center justify-center w-full fixed left-0 place-content-center top-24`} style={{
															top: `${headerHeight}px`
														}}>
															<div
																className="backdrop-blur-md w-[70vw] bg-[#0236ef3b] rounded shadow-lg z-[100]"

															>
																<div className="container mx-auto px-4 md:px-6 lg:px-6 py-4">
																	<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
																		{item.childMenu.map((childItem, childIndex) => {
																			if (childItem?.label && childItem?.url) {
																				return (
																					<Link
																						key={childIndex}
																						href={navHref(childItem.url)}
																						className="block px-4 py-3 rounded hover:bg-[#0236EF] transition-colors text-white cursor-pointer"
																						onClick={() => setOpenMenuIndex(null)}
																					>
																						{childItem.label}
																					</Link>
																				);
																			}
																			return null;
																		})}
																	</div>
																</div>
															</div>
														</div>
													)}

													{/* Normal Dropdown for Resources */}
													{isResources && (
														<div
															className="absolute left-0 top-full mt-2 w-fit bg-[#0236ef3b] backdrop-blur-md rounded shadow-lg z-[100]"
														>
															{item.childMenu.map((childItem, childIndex) => {
																if (childItem?.label && childItem?.url) {
																	return (
																		<div key={childIndex}
																			className="flex items-center gap-2 px-4 py-2 w-full rounded cursor-pointer hover:bg-[#0236EF] text-white"
																			onClick={() => setOpenMenuIndex(null)}>
																			<Link
																				href={navHref(childItem.url)}
																			>
																				{childItem.label}
																			</Link>
																		</div>
																	);
																}
																return null;
															})}
														</div>
													)}
												</>
											)}
										</div>
									);
								}

								// Regular menu item without childMenu
								return (
									<Link
										href={navHref(item?.url)}
										key={index}
										className={`hover:text-blue-400 text-white ${isActive(navHref(item?.url)) ? "border-b-2 border-[#0133E9]" : ""
											}`}
									>
										{item?.label || "menu"}
									</Link>
								);
							})
						}
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
						{menuItems.map((item, index) => {
							if (item?.childMenu && Array.isArray(item.childMenu) && item.childMenu.length > 0) {
								return (
									<div key={index} className="flex flex-col">
										<button
											className={`flex items-center justify-between w-full text-left hover:text-blue-400 ${activeMobileMenu === index ? "text-blue-400" : "text-white"
												}`}
											onClick={() => setActiveMobileMenu(activeMobileMenu === index ? null : index)}
										>
											{item.label}
											<svg
												className={`w-4 h-4 transition-transform ${activeMobileMenu === index ? "rotate-180" : ""
													}`}
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
											</svg>
										</button>
										<div
											className={`flex flex-col space-y-3 pl-4 overflow-hidden transition-all duration-300 ${activeMobileMenu === index ? "max-h-96 mt-3" : "max-h-0"
												}`}
										>
											{item.childMenu.map((child, childIndex) => (
												<Link
													key={childIndex}
													href={navHref(child.url)}
													className="text-gray-300 hover:text-white text-sm" // Slightly smaller or greyed to distinguish
													onClick={() => setIsMenuOpen(false)}
												>
													{child.label}
												</Link>
											))}
										</div>
									</div>
								);
							}
							return (
								<Link
									key={index}
									href={navHref(item?.url)}
									className={`hover:text-blue-400 ${isActive(navHref(item?.url)) ? "text-blue-400" : ""
										}`}
									onClick={() => setIsMenuOpen(false)}
								>
									{item?.label || "menu"}
								</Link>
							);
						})}
					</nav>
				</div>
			</div>
		</header>
	);
}