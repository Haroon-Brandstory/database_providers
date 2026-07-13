import Link from 'next/link';
import { formatEmployeeCount } from '@/lib/companyProfiles';

const LEADERSHIP_TEAM = [
    { name: 'Devid Wilium', title: 'Digital marketer' },
    { name: 'Deniyal Shifer', title: 'Graphics designer' },
    { name: 'Philifs Geno', title: 'Content creator' },
    { name: 'Marko Diyan', title: 'Web developer' },
];

const ORG_CHILDREN = [
    { name: 'Andro Strassmann', title: 'Founder & CEO' },
    { name: 'Andro Strassmann', title: 'Founder & CEO' },
];

const CEO_NODE = {
    name: 'Andro Strassmann',
    title: 'Founder & CEO',
    about:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    phone: '+990 343 23443',
    email: 'contact@devid.com',
};

function Avatar({ name, size = 'md' }) {
    const sizes = {
        sm: 'h-9 w-9 text-[12px]',
        md: 'h-11 w-11 text-[13px]',
        lg: 'h-12 w-12 text-[14px]',
    };

    return (
        <div
            className={`flex shrink-0 items-center justify-center rounded-full bg-[#E8EDF5] font-semibold text-[#6B7280] ${sizes[size]}`}
        >
            {name.charAt(0)}
        </div>
    );
}

function ContactFooter({ phone, email, compact = false }) {
    return (
        <div
            className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-[#9CA3AF] ${compact ? 'px-3 py-2.5 text-[11px]' : 'px-4 py-3 text-[12px]'}`}
        >
            <span className="flex items-center gap-1.5">
                <span className="text-[#1798FF]">☎</span>
                {phone}
            </span>
            <span className="flex items-center gap-1.5">
                <span className="text-[#1798FF]">✉</span>
                {email}
            </span>
        </div>
    );
}

function ExpandedOrgCard({ node }) {
    return (
        <div className="w-full max-w-[300px] overflow-hidden rounded-[12px] border border-[#E8EDF5] bg-white shadow-sm">
            <div className="flex items-start justify-between gap-3 border-b border-[#EEF2F8] px-4 py-3">
                <div className="flex min-w-0 items-center gap-3">
                    <Avatar name={node.name} size="lg" />
                    <div className="min-w-0">
                        <p className="truncate text-[14px] font-semibold text-[#111827]">{node.name}</p>
                        <p className="truncate text-[12px] text-[#9CA3AF]">{node.title}</p>
                    </div>
                </div>
                <button
                    type="button"
                    className="shrink-0 rounded-md bg-[#1798FF] px-3 py-1.5 text-[12px] font-semibold text-white"
                >
                    Show More
                </button>
            </div>

            <div className="border-b border-[#EEF2F8] px-4 py-3">
                <p className="text-[12px] font-medium text-[#6B7280]">About Person</p>
                <p className="mt-1 text-[11px] leading-[1.6] text-[#9CA3AF]">{node.about}</p>
            </div>

            <ContactFooter phone={node.phone} email={node.email} />
        </div>
    );
}

function CompactOrgCard({ node }) {
    return (
        <div className="w-full max-w-[220px] overflow-hidden rounded-[12px] border border-[#E8EDF5] bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-[#EEF2F8] px-3 py-2.5">
                <Avatar name={node.name} size="md" />
                <div className="min-w-0">
                    <p className="truncate text-[13px] font-semibold text-[#111827]">{node.name}</p>
                    <p className="truncate text-[11px] text-[#9CA3AF]">{node.title}</p>
                </div>
            </div>
            <ContactFooter phone={CEO_NODE.phone} email={CEO_NODE.email} compact />
        </div>
    );
}

function OrgChartPlaceholder() {
    return (
        <div className="bg-[#F9FAFB] p-6 md:p-8">
            <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center">
                <ExpandedOrgCard node={CEO_NODE} />

                <div className="hidden items-center lg:flex">
                    <div className="h-px w-8 bg-[#D1D5DB]" />
                    <div className="flex flex-col gap-8">
                        {ORG_CHILDREN.map((node, index) => (
                            <div key={index} className="flex items-center">
                                <div className="h-px w-8 bg-[#D1D5DB]" />
                                <CompactOrgCard node={node} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex w-full flex-col gap-4 lg:hidden">
                    {ORG_CHILDREN.map((node, index) => (
                        <CompactOrgCard key={index} node={node} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function LeadershipTeamPanel() {
    return (
        <div className="flex h-full flex-col rounded-[12px] border border-[#E8EDF5] bg-white">
            <p className="border-b border-[#EEF2F8] px-5 py-4 text-[14px] font-medium text-[#111827]">
                Leadership and Team
            </p>

            <ul className="flex-1 space-y-1 bg-[#FAFBFE] px-4 py-3">
                {LEADERSHIP_TEAM.map((member) => (
                    <li
                        key={member.name}
                        className="flex items-center gap-3 rounded-[8px] px-2 py-3"
                    >
                        <Avatar name={member.name} size="sm" />
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-[14px] font-semibold text-[#111827]">
                                {member.name}
                            </p>
                            <p className="truncate text-[12px] text-[#9CA3AF]">{member.title}</p>
                        </div>
                        <button
                            type="button"
                            aria-label={`More options for ${member.name}`}
                            className="shrink-0 px-1 text-[18px] leading-none text-[#9CA3AF]"
                        >
                            ⋮
                        </button>
                    </li>
                ))}
            </ul>

            <div className="border-t border-[#EEF2F8] px-5 py-4 text-center">
                <Link
                    href="/contact-us"
                    className="text-[14px] font-medium text-[#1798FF] transition-opacity hover:opacity-80"
                >
                    Find More Contacts
                </Link>
            </div>
        </div>
    );
}

export default function CompanyOrgChart({ company }) {
    const employeeCount = formatEmployeeCount(company.employees);
    const ctaTitle = `Get Verified Emails for ${employeeCount} ${company.companyName} Employees`;

    return (
        <section className="overflow-hidden rounded-[20px] bg-white p-6 shadow-[0px_2px_6px_rgba(13,10,44,0.1)] md:p-8">
            <h2 className="text-[18px] font-regular text-[#111827] md:text-[28px]">
                {company.companyName} Org Chart
            </h2>

            <div className="relative mt-6 min-h-[420px] overflow-hidden rounded-[16px] border border-[#EEF2F8]">
                <div
                    className="pointer-events-none grid grid-cols-1 select-none gap-5 p-5 lg:grid-cols-[1fr_280px]"
                    style={{ filter: 'blur(5px)' }}
                >
                    <OrgChartPlaceholder />
                    <LeadershipTeamPanel />
                </div>

                <div className="absolute inset-0 bg-white/45" aria-hidden="true" />
                <div className="absolute inset-0 z-10 flex items-center justify-center px-4">
                    <div className="rounded-[16px] border border-[#D6E4FF] bg-[#F4F8FF]/95 px-8 py-6 text-center shadow-[0_8px_30px_rgba(1,51,233,0.1)] md:px-10">
                        <p className="max-w-[420px] text-[15px] font-medium leading-[1.5] text-[#111827] md:text-[16px]">
                            {ctaTitle}
                        </p>
                        <Link
                            href="/contact-us"
                            className="mt-4 inline-flex rounded-lg bg-[#1798FF] px-6 py-3 text-[15px] font-semibold text-white transition-opacity hover:opacity-90"
                        >
                            Get Full Access
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
