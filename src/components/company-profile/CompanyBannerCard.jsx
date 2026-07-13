import Image from 'next/image';
import Link from 'next/link';
import {
    buildCompanyLocation,
    formatEmployeeCount,
} from '@/lib/companyProfiles';
import CompanyAboutPanel from './CompanyAboutPanel';

function SocialLink({ href, label, iconSrc }) {
    if (!href) return null;

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="flex h-11 w-11 items-center justify-center rounded-[12px] border border-[#E5E7EB] bg-white transition-opacity hover:opacity-80"
        >
            <Image src={iconSrc} alt="" width={28} height={28} className="h-7 w-7" />
        </a>
    );
}

function CompanyLogo({ company }) {
    if (company.logoUrl) {
        return (
            <img
                src={company.logoUrl}
                alt={`${company.companyName} logo`}
                className="h-[72px] w-[72px] md:h-[100px] md:w-[100px] shrink-0 bg-white object-contain"
            />
        );
    }

    return (
        <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-[12px] bg-[#E53935] text-[34px] font-bold text-white md:h-[80px] md:w-[80px]">
            {company.companyName?.charAt(0) || 'C'}
        </div>
    );
}

function buildMetaLine(company) {
    const employees = formatEmployeeCount(company.employees);
    const employeeLabel = employees !== '—' ? `${employees} Employees` : null;

    return [company.industry, company.country || buildCompanyLocation(company), employeeLabel]
        .filter(Boolean)
        .join(' · ');
}

export default function CompanyBannerCard({ company, previewText, fullText }) {
    const metaLine = buildMetaLine(company);
    const socialLinks = [
        { href: company.facebook, label: 'Facebook', iconSrc: '/company/cfb.svg' },
        { href: company.twitter, label: 'Twitter', iconSrc: '/company/cx.svg' },
        { href: company.linkedin, label: 'LinkedIn', iconSrc: '/company/cin.svg' },
        { href: company.instagram, label: 'Instagram', iconSrc: '/company/cig.svg' },
    ].filter((item) => item.href);

    return (
        <article className="w-full overflow-hidden rounded-[20px] bg-white shadow-[0px_2px_6px_rgba(13,10,44,0.1)]">
            <div className="px-5 py-6 md:px-8 md:py-8">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                        <CompanyLogo company={company} />
                        <div className="min-w-0">
                            <h1 className="text-[18px] font-regular leading-tight text-[#111827] md:text-[28px]">
                                {company.companyName}
                            </h1>
                            {metaLine ? (
                                <p className="mt-2 text-[13px] capitalize text-[#6B7280] md:text-[14px]">
                                    {metaLine}
                                </p>
                            ) : null}
                            <Link
                                href="/contact-us"
                                className="mt-4 inline-flex rounded-lg bg-[#1798FF] px-4 py-2.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-90 md:text-[14px]"
                            >
                                View Company information
                            </Link>
                        </div>
                    </div>

                    {socialLinks.length > 0 ? (
                        <div className="lg:pt-1 lg:text-right">
                            <p className="mb-2.5 text-[12px] text-[#9CA3AF] md:text-[13px]">Social Media:</p>
                            <div className="flex items-center gap-2.5 lg:justify-end">
                                {socialLinks.map((item) => (
                                    <SocialLink
                                        key={item.label}
                                        href={item.href}
                                        label={item.label}
                                        iconSrc={item.iconSrc}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>

            <div className="mx-5 border-t border-[#E8EDF5] md:mx-8" />

            <CompanyAboutPanel
                companyName={company.companyName}
                previewText={previewText}
                fullText={fullText}
            />
        </article>
    );
}
