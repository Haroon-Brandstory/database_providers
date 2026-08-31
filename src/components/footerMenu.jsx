"use client"
import Image from "next/image";
import { useNavHref } from "@/hooks/useNavHref";

const healthcareLinks = [
	{ label: "Physicians Email List", url: "/physicians-email-list/" },
	{ label: "Dental Assistant Email List", url: "/dental-assistant-email-list/" },
	{ label: "Nurses Email List", url: "/nurses-email-list/" },
	{ label: "Hospital Administrators Email List", url: "/hospital-administrators-email-list/" },
	{ label: "Pharmacy Executive Email List", url: "/pharmacy-executive-email-list/" },
	{ label: "Cardiologist Email List", url: "/cardiologist-email-list/" },
];

const globalLinks = [
	{ label: "C-level Executives Email List", url: "/c-level-executives-email-list/" },
	{ label: "Directors Email List", url: "/directors-email-list/" },
	{ label: "HR Email List", url: "/hr-email-list/" },
	{ label: "Manager Email List", url: "/managers-email-list/" },
	{ label: "Lawyers Email List", url: "/lawyers-email-list/" },
	{ label: "Accountants Email List", url: "/accountants-email-list/" },
];

const resourceLinks = [
	{ label: "Case Studies", url: "/case-studies/" },
	{ label: "Testimonials", url: "/testimonials/" },
	{ label: "News", url: "/news/" },
	{ label: "White Paper", url: "/white-papers/" },
	{ label: "Blogs", url: "/blogs/" },
	{ label: "Community", url: "/community/" },
	{ label: "Tools", url: "/tools/" },
	{ label: "Videos", url: "/videos/" },
];

const companyLinks = [
	{ label: "About Us", url: "/about/" },
	{ label: "Careers", url: "/careers/" },
	{ label: "Contact Us", url: "/contact-us/" },
	{ label: "Sitemap", url: "/sitemap/" },
];

function FooterColumn({ title, links, navHref }) {
	return (
		<div className="flex-1 min-w-[180px] flex flex-col gap-2 mt-2 md:mt-0">
			<div className="font-semibold mb-2">{title}</div>
			{links.map((link) => (
				<a
					key={link.url + link.label}
					href={navHref(link.url)}
					className="hover:text-[#2C6BFF] transition"
				>
					{link.label}
				</a>
			))}
		</div>
	);
}

export default function FooterMenu() {
	const { navHref } = useNavHref();

	return (
		<>
			<div className="container px-2 pt-5">
				<div className="mx-auto flex flex-wrap flex-col md:flex-row md:justify-between md:items-start gap-10 border-b border-[#222] py-8">
					<FooterColumn title="Healthcare Data" links={healthcareLinks} navHref={navHref} />
					<FooterColumn title="Global" links={globalLinks} navHref={navHref} />
					<FooterColumn title="Resources" links={resourceLinks} navHref={navHref} />
					<FooterColumn title="Company" links={companyLinks} navHref={navHref} />

					<div className="flex-1 min-w-[220px] flex flex-col gap-4 mt-2 md:mt-0">
						<div className="font-semibold mb-2">Contact Us</div>
						<div className="flex items-start gap-3">
							<span className="mt-1">
								<Image src='/footer/footer-loc.svg' width={25} height={25} alt="" />
							</span>
							<div>
								<div className="font-bold">USA</div>
								<div className="text-[#D0D0D0] text-sm leading-tight">39109 Guardino Dr, Fremont,<br />CA - 94538</div>
							</div>
						</div>
						<div className="flex items-center">
							<span>
								<Image src='/footer/footer-mail.svg' className="w-[25px] h-[25px] mr-9" width={25} height={25} alt="" />
							</span>
							<a href="mailto:sales@thedatabaseproviders.com" className="text-[#D0D0D0] text-sm hover:text-[#2C6BFF]">sales@thedatabaseproviders.com</a>
						</div>
						<div className="flex gap-4 mt-2">
							<a href="https://www.facebook.com/databaseprovidersbangalore/" aria-label="Facebook" className="hover:text-[#2C6BFF]">
								<Image src="/footer/footer-soc-icon1.svg" width={25} height={25} alt="" />
							</a>
							<a href="https://in.linkedin.com/company/thedatabase-providers" aria-label="LinkedIn" className="hover:text-[#2C6BFF]">
								<Image src="/footer/footer-soc-icon2.svg" width={25} height={25} alt="" />
							</a>
							<a href="https://x.com/db_providers" aria-label="X" className="hover:text-[#2C6BFF]">
								<Image src="/footer/footer-soc-icon3.svg" width={25} height={25} alt="" />
							</a>
							<a href="https://www.instagram.com/thedatabaseproviders/" aria-label="Instagram" className="hover:text-[#2C6BFF]">
								<Image src="/footer/footer-soc-icon4.svg" width={25} height={25} alt="" />
							</a>
							<a href="https://www.youtube.com/channel/UC8ag8pQbzFAkmsgB4a99QAA" aria-label="YouTube" className="hover:text-[#2C6BFF]">
								<Image src="/footer/footer-soc-icon5.svg" width={25} height={25} alt="" />
							</a>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
