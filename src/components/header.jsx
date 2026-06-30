"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import { useNavHref } from "@/hooks/useNavHref";
import { isStaticPageSlugForLocale } from "@/lib/localeFreePageSlugs";

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
		const pathParts = pathname.split("/").filter(Boolean);
		const slug =
			["en", "in", "ae", "sg", "my"].includes(pathParts[0]) && pathParts.length > 1
				? pathParts[1]
				: pathParts[0];

		if (slug && isStaticPageSlugForLocale(locale, slug)) {
			setOpen(false);
			return;
		}

		const pathWithoutLocale =
			pathname.replace(new RegExp(`^/${locale}`), "") || "/";
		router.push(`/${newLocale}${pathWithoutLocale}`);
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

const HealthcareIcon = () => (
	<Image src="/header/healthCare-icon.svg" alt="Healthcare" width={24} height={24} />
);

const GlobalIcon = () => (
	<Image src="/header/global-icon.svg" alt="Healthcare" width={24} height={24} />
);

const IndustryIcon = () => (
	<Image src="/header/industry-icon.svg" alt="Healthcare" width={24} height={24} />
);

const menuItems = [
	{
		label: "Home",
		url: "/"
	},
	{
		label: "Data",
		url: "/our-data",
		isMega: true,
		sections: [
			{
				title: "Healthcare Data",
				icon: <HealthcareIcon />,
				items: [
					{ label: "Physicians Email List", url: "/healthcare-data" },
					{ label: "Dental Assistant Email List", url: "/healthcare-data" },
					{ label: "Nurses Email List", url: "/healthcare-data" },
					{ label: "Hospital Administrators Email List", url: "/healthcare-data" },
					{ label: "Pharmacy Executive Email List", url: "/healthcare-data" },
					{ label: "Cardiologist Email List", url: "/healthcare-data" },
				]
			},
			{
				title: "Global",
				icon: <GlobalIcon />,
				items: [
					{ label: "C-level Executives Email List", url: "/global-database" },
					{ label: "Directors Email List", url: "/global-database" },
					{ label: "HR Email List", url: "/global-database" },
					{ label: "Manager Email List", url: "/global-database" },
					{ label: "Lawyers Email List", url: "/global-database" },
					{ label: "Accountants Email List", url: "/global-database" },
				]
			},
			{
				title: "Industry",
				icon: <IndustryIcon />,
				items: [
					{ label: "IT Industry Email List", url: "/industry-data" },
					{ label: "Hospitals and Health Care", url: "/industry-data" },
					{ label: "Manufacturing Industry Email List", url: "/industry-data" },
					{ label: "Education Industry Email List", url: "/industry-data" },
					{ label: "BFSI Email Lists", url: "/industry-data" },
					{ label: "Real Estate Email List", url: "/industry-data" },
				]
			}
		]
	},
	{
		label: "About Us",
		url: "/about"
	},
	{
		label: "Resource",
		url: "/resources",
		isDropdown: true,
		items: [
			{ label: "Case Studies", url: "/case-studies" },
			{ label: "Testimonials", url: "/testimonials" },
			{ label: "News", url: "/news" },
			{ label: "White Paper", url: "/white-papers" },
			{ label: "Blogs", url: "/blogs" },
			{ label: "Tools", url: "/tools" },
			{ label: "Videos", url: "/videos" },
		],
		card: {
			title: "Contact Us",
			image: "/header/resource-contact-img.svg",
			buttonLabel: "Contact Us",
			url: "/contact-us"
		}
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
					<nav className="hidden lg:flex items-center space-x-8">
						{
							menuItems.map((item, index) => {
								if (item.isMega || item.isDropdown) {
									return (
										<div
											key={index}
											className="relative group"
											onMouseEnter={() => setOpenMenuIndex(index)}
											onMouseLeave={() => setOpenMenuIndex(null)}
										>
											<button
												type="button"
												className={`flex items-center gap-1 hover:text-blue-400 text-white cursor-pointer bg-transparent border-none p-0 transition-colors ${isActive(navHref(item.url)) ? "text-blue-400 font-semibold" : ""}`}
											>
												{item.label}
												<svg className={`w-3 h-3 transition-transform duration-300 ${openMenuIndex === index ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
												</svg>
											</button>

											{openMenuIndex === index && (
												<div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 z-[100]">
													{/* Arrow Pointer */}
													<div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-t border-l border-gray-100 shadow-[-2px_-2px_5px_rgba(0,0,0,0.02)]"></div>

													{item.isMega ? (
														<div className="bg-white rounded-[32px] shadow-2xl p-10 w-[1000px] border border-gray-100">
															<div className="grid grid-cols-3 gap-10">
																{item.sections.map((section, sIndex) => (
																	<div key={sIndex} className="flex flex-col gap-6">
																		<div className="flex items-center gap-3">
																			<div className="p-2.5 bg-blue-50 rounded-xl">
																				{section.icon}
																			</div>
																			<h3 className="font-bold text-gray-900 text-lg">{section.title}</h3>
																		</div>
																		<div className="flex flex-col gap-1.5 border-r pr-2">
																			{section.items.map((subItem, iIndex) => {
																				const isSubActive = isActive(navHref(subItem.url));
																				return (
																					<Link
																						key={iIndex}
																						href={navHref(subItem.url)}
																						className={`flex items-center justify-between px-4 py-2.5 rounded-full transition-all transition-0.3s ease-in-out text-[15px] ${isSubActive
																							? "bg-[#EBF2FF] text-[#0133E9] font-medium"
																							: "text-gray-600 hover:text-[#0133E9] hover:bg-gray-50 hover:translate-x-1"
																							}`}
																					>
																						{subItem.label}
																						{isSubActive && (
																							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
																							</svg>
																						)}
																					</Link>
																				);
																			})}
																		</div>
																	</div>
																))}
															</div>
														</div>
													) : (
														<div className="bg-white rounded-[24px] shadow-2xl overflow-hidden w-[700px] border border-gray-100 flex p-2">
															<div className="flex-1 p-6">
																<h3 className="font-bold text-gray-900 text-xl mb-6">Resources</h3>
																<div className="flex flex-col gap-1">
																	{item.items.map((subItem, iIndex) => {
																		const isSubActive = isActive(navHref(subItem.url));
																		return (
																			<Link
																				key={iIndex}
																				href={navHref(subItem.url)}
																				className={`flex items-center justify-between group/item px-4 py-2.5 rounded-full transition-all text-[15px] ${isSubActive
																					? "bg-[#EBF2FF] text-[#0133E9] font-medium"
																					: "text-gray-600 hover:text-[#0133E9] hover:bg-gray-50 hover:translate-x-1"
																					}`}
																			>
																				{subItem.label}
																				{isSubActive && (
																					<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
																					</svg>
																				)}
																			</Link>
																		);
																	})}
																</div>
															</div>
															<div className="w-[55%] relative min-h-[350px]">
																<div className="absolute inset-0 p-2">
																	<div className="relative h-[90%] w-full rounded-[20px] overflow-hidden">
																		<Image
																			src={item.card.image}
																			alt="Resource"
																			fill
																			className="object-cover"
																		/>
																		<div className="absolute inset-0 bg-gradient-to-t from-[#0133E9]/80 via-transparent to-transparent opacity-60"></div>
																		<div className="absolute bottom-6 left-6">
																			<Link
																				href={navHref(item.card.url)}
																				className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-[#0133E9] transition-all"
																			>
																				{item.card.buttonLabel}
																				<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7" />
																				</svg>
																			</Link>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													)}
												</div>
											)}
										</div>
									);
								}

								return (
									<Link
										href={navHref(item.url)}
										key={index}
										className={`hover:text-blue-400 text-white transition-colors ${isActive(navHref(item.url)) ? "text-blue-400 font-semibold" : ""}`}
									>
										{item.label}
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
					className={`lg:hidden relative left-0 right-0 transition-all duration-300 overflow-y-auto ${isMenuOpen ? "max-h-[85vh] pt-4 " : "max-h-0 overflow-hidden"
						}`}
				>
					<nav className="flex flex-col space-y-4 p-4">
						{menuItems.map((item, index) => {
							if (item.isMega || item.isDropdown) {
								return (
									<div key={index} className="flex flex-col">
										<button
											className={`flex items-center justify-between w-full text-left font-medium py-1 transition-colors ${activeMobileMenu === index ? "text-blue-400" : "text-white"}`}
											onClick={() => setActiveMobileMenu(activeMobileMenu === index ? null : index)}
										>
											{item.label}
											<svg
												className={`w-4 h-4 transition-transform duration-300 ${activeMobileMenu === index ? "rotate-180" : ""}`}
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
											</svg>
										</button>
										<div
											className={`flex flex-col space-y-1 pl-4 transition-all duration-300 ${activeMobileMenu === index ? "max-h-[50vh] overflow-y-auto mt-4" : "max-h-0 overflow-hidden"}`}
										>
											{item.isMega ? (
												item.sections.map((section, sIndex) => (
													<div key={sIndex} className="flex flex-col mb-4 last:mb-0">
														<div className="flex items-center gap-2 mb-2">
															<span className="scale-75 origin-left">{section.icon}</span>
															<h4 className="text-blue-400 font-bold text-sm uppercase tracking-wider">{section.title}</h4>
														</div>
														<div className="flex flex-col space-y-3 pl-2">
															{section.items.map((subItem, iIndex) => (
																<Link
																	key={iIndex}
																	href={navHref(subItem.url)}
																	className="text-gray-300 hover:text-white text-sm py-1"
																	onClick={() => setIsMenuOpen(false)}
																>
																	{subItem.label}
																</Link>
															))}
														</div>
													</div>
												))
											) : (
												<div className="flex flex-col space-y-3">
													{item.items.map((subItem, iIndex) => (
														<Link
															key={iIndex}
															href={navHref(subItem.url)}
															className="text-gray-300 hover:text-white text-sm py-1"
															onClick={() => setIsMenuOpen(false)}
														>
															{subItem.label}
														</Link>
													))}
												</div>
											)}
										</div>
									</div>
								);
							}
							return (
								<Link
									key={index}
									href={navHref(item.url)}
									className={`font-medium py-1 transition-colors ${isActive(navHref(item.url)) ? "text-blue-400" : "text-white hover:text-blue-400"}`}
									onClick={() => setIsMenuOpen(false)}
								>
									{item.label}
								</Link>
							);
						})}
					</nav>
				</div>
			</div>
		</header>
	);
}