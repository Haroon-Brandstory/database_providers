import Link from 'next/link';
import {
    buildCompanyLocation,
    formatCompactCurrency,
    formatEmployeeCount,
} from '@/lib/companyProfiles';

function buildHeadquarters(company) {
    const parts = [
        company.address,
        [company.city, company.state].filter(Boolean).join(', '),
        company.postalCode,
        company.country,
    ].filter(Boolean);

    if (parts.length) {
        return parts.join(', ');
    }

    return buildCompanyLocation(company) || '—';
}

function formatWebsite(value) {
    if (!value) return '—';
    return value.replace(/^https?:\/\//i, '').replace(/\/$/, '');
}

function OverviewField({ label, value }) {
    return (
        <div className="min-w-0 py-5 pr-4 lg:pr-8">
            <p className="text-[15px] leading-[1.7] text-[#374151]">
                <span className="font-medium text-[#1798FF]">{label}</span>
                <span className="ml-2">{value || '—'}</span>
            </p>
        </div>
    );
}

function OverviewRow({ left, right }) {
    return (
        <div className="grid grid-cols-1 border-b border-[#E8EDF5] bg-white p-2 last:border-b-0 lg:grid-cols-2">
            <OverviewField label={left.label} value={left.value} />
            <OverviewField label={right.label} value={right.value} />
        </div>
    );
}

function DonutChart() {
    const segments = [
        { color: '#22C55E', size: 30 },
        { color: '#F59E0B', size: 22 },
        { color: '#8B5CF6', size: 24 },
        { color: '#0133E9', size: 24 },
    ];

    const labels = [
        { text: '35%', className: 'left-0 top-[18%]' },
        { text: '24%', className: 'right-0 top-[32%]' },
        { text: '29%', className: 'right-2 bottom-[28%]' },
        { text: '38%', className: 'left-2 bottom-[18%]' },
    ];

    const gradient = segments
        .reduce(
            (acc, segment) => {
                const start = acc.offset;
                const end = start + segment.size;
                acc.parts.push(`${segment.color} ${start}% ${end}%`);
                acc.offset = end;
                return acc;
            },
            { parts: [], offset: 0 }
        )
        .parts.join(', ');

    return (
        <div className="relative mx-auto h-[220px] w-[220px]">
            {labels.map((label) => (
                <span
                    key={label.text}
                    className={`absolute text-[13px] font-medium text-[#6B7280] ${label.className}`}
                >
                    {label.text}
                </span>
            ))}
            <div
                className="absolute inset-4 rounded-full"
                style={{ background: `conic-gradient(${gradient})` }}
            >
                <div className="absolute inset-[26%] flex flex-col items-center justify-center rounded-full bg-white text-center">
                    <span className="text-[34px] font-semibold leading-none text-[#111827]">1.05</span>
                    <span className="mt-1 text-[12px] text-[#6B7280]">Average range</span>
                </div>
            </div>
        </div>
    );
}

function GrowthMetricCard({ percent, color, progress }) {
    return (
        <div className="rounded-[14px] border border-[#E8EDF5] bg-white p-4">
            <p className="text-[13px] font-semibold" style={{ color }}>
                {percent}
            </p>
            <p className="mt-2 text-[14px] font-medium text-[#374151]">Lorem ipsum</p>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#EEF2F8]">
                <div
                    className="h-full rounded-full"
                    style={{ width: `${progress}%`, backgroundColor: color }}
                />
            </div>
            <p className="mt-3 text-[12px] text-[#9CA3AF]">{progress}% percentage used</p>
        </div>
    );
}

function GrowthDataPlaceholder() {
    const cards = [
        { percent: '35%', color: '#22C55E', progress: 30 },
        { percent: '24%', color: '#F59E0B', progress: 30 },
        { percent: '29%', color: '#8B5CF6', progress: 30 },
        { percent: '38%', color: '#0133E9', progress: 30 },
    ];

    return (
        <div className="grid grid-cols-1 items-center gap-8 bg-white p-8 lg:grid-cols-[260px_1fr]">
            <DonutChart />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {cards.map((card) => (
                    <GrowthMetricCard key={card.percent} {...card} />
                ))}
            </div>
        </div>
    );
}

export default function CompanyOverview({ company }) {
    const rows = [
        {
            left: { label: 'Headquarters', value: buildHeadquarters(company) },
            right: { label: 'Revenue', value: formatCompactCurrency(company.annualRevenue) },
        },
        {
            left: { label: 'Phone Number', value: company.phone || '—' },
            right: { label: 'Website', value: formatWebsite(company.website) },
        },
        {
            left: { label: 'Employees', value: formatEmployeeCount(company.employees) },
            right: { label: 'Industry', value: company.industry },
        },
    ];

    return (
        <section className="overflow-hidden rounded-[20px] bg-white shadow-[0px_2px_6px_rgba(13,10,44,0.1)]">
            <div className="px-5 pt-6 md:px-8 md:pt-8">
                <div className='bg-[#F9FAFB] rounded-[8px] p-4'>
                    <h2 className="text-[18px] font-regular text-[#111827] md:text-[28px] pt-2">Overview</h2>
                    <div className="mt-2">
                        {rows.map((row) => (
                            <OverviewRow key={row.left.label} left={row.left} right={row.right} />
                        ))}
                    </div>
                </div>
            </div>

            <div className="relative mx-5 mb-5 mt-2 min-h-[300px] overflow-hidden rounded-[16px] border border-[#EEF2F8] bg-white md:mx-8 md:mb-8">
                <div
                    className="absolute inset-0 scale-110 px-4 pb-9"
                    style={{ filter: 'blur(5px)' }}
                    aria-hidden="true"
                >
                    <GrowthDataPlaceholder />
                </div>
                <div className="absolute inset-0 bg-white/45" aria-hidden="true" />
                <div className="relative z-10 flex min-h-[300px] items-center justify-center px-4">
                    <div className="rounded-[16px] border border-[#D6E4FF] bg-[#F4F8FF]/95 px-10 py-6 text-center shadow-[0_8px_30px_rgba(1,51,233,0.1)]">
                        <p className="text-[16px] font-medium text-[#111827] md:text-[18px]">
                            View Company Growth Data
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
