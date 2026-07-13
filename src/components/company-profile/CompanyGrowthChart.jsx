import CompanyGatedSection from './CompanyGatedSection';

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const CHART_VALUES = [30, 42, 58, 52, 36, 44, 50, 67, 60, 48, 72, 56];
const Y_LABELS = ['5k', '4k', '3k', '2k', '1k', '0'];
const HIGHLIGHT_INDEX = 7;

function buildChartPaths(values, width, height, paddingX, paddingY) {
    const chartWidth = width - paddingX * 2;
    const chartHeight = height - paddingY * 2;
    const step = chartWidth / (values.length - 1);

    const points = values.map((value, index) => ({
        x: paddingX + index * step,
        y: paddingY + chartHeight - (value / 100) * chartHeight,
    }));

    let linePath = `M ${points[0].x} ${points[0].y}`;

    for (let index = 1; index < points.length; index += 1) {
        const previous = points[index - 1];
        const current = points[index];
        const controlX = (previous.x + current.x) / 2;
        linePath += ` C ${controlX} ${previous.y}, ${controlX} ${current.y}, ${current.x} ${current.y}`;
    }

    const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`;

    return { linePath, areaPath, points };
}

function PeriodToggle() {
    const options = ['Daily', 'Weekly', 'Annually'];

    return (
        <div className="flex rounded-full bg-[#EEF3FF] p-1">
            {options.map((option) => {
                const isActive = option === 'Annually';

                return (
                    <button
                        key={option}
                        type="button"
                        className={`rounded-full px-4 py-1.5 text-[12px] font-medium transition-colors ${
                            isActive
                                ? 'bg-[#0F172A] text-white'
                                : 'text-[#6B7280]'
                        }`}
                    >
                        {option}
                    </button>
                );
            })}
        </div>
    );
}

function GrowthChartPlaceholder() {
    const width = 900;
    const height = 240;
    const paddingX = 24;
    const paddingY = 20;
    const { linePath, areaPath, points } = buildChartPaths(
        CHART_VALUES,
        width,
        height,
        paddingX,
        paddingY
    );
    const highlight = points[HIGHLIGHT_INDEX];

    return (
        <div className="bg-white p-6 md:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <p className="text-[13px] text-[#9CA3AF]">Year 2025</p>
                    <div className="mt-1 flex flex-wrap items-center gap-3">
                        <p className="text-[32px] font-semibold leading-none text-[#6B7280] md:text-[36px]">
                            $12.7k
                        </p>
                        <p className="flex items-center gap-1 text-[12px] font-semibold text-[#22C55E]">
                            <span>↑</span>
                            1.3% VS LAST YEAR
                        </p>
                    </div>
                </div>
                <PeriodToggle />
            </div>

            <div className="relative mt-8">
                <div className="absolute right-0 top-0 flex h-[220px] flex-col justify-between py-2 text-[11px] text-[#9CA3AF]">
                    {Y_LABELS.map((label) => (
                        <span key={label}>{label}</span>
                    ))}
                </div>

                <div className="mr-10 overflow-hidden">
                    <svg
                        viewBox={`0 0 ${width} ${height}`}
                        className="h-[220px] w-full"
                        aria-hidden="true"
                    >
                        <defs>
                            <linearGradient id="growthAreaGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#1798FF" stopOpacity="0.35" />
                                <stop offset="100%" stopColor="#1798FF" stopOpacity="0.02" />
                            </linearGradient>
                        </defs>

                        {[0, 1, 2, 3, 4, 5].map((index) => {
                            const y = paddingY + ((height - paddingY * 2) / 5) * index;

                            return (
                                <line
                                    key={index}
                                    x1={paddingX}
                                    y1={y}
                                    x2={width - paddingX}
                                    y2={y}
                                    stroke="#EEF2F8"
                                    strokeWidth="1"
                                />
                            );
                        })}

                        <path d={areaPath} fill="url(#growthAreaGradient)" />
                        <path
                            d={linePath}
                            fill="none"
                            stroke="#1798FF"
                            strokeWidth="3"
                            strokeLinecap="round"
                        />

                        <line
                            x1={highlight.x}
                            y1={highlight.y}
                            x2={highlight.x}
                            y2={height - paddingY}
                            stroke="#1798FF"
                            strokeWidth="2"
                        />
                        <circle cx={highlight.x} cy={highlight.y} r="7" fill="#1798FF" />
                        <circle cx={highlight.x} cy={highlight.y} r="4" fill="white" />
                    </svg>

                    <div
                        className="absolute rounded-[10px] bg-[#0F172A] px-3 py-2 text-white shadow-lg"
                        style={{
                            left: `calc(${(highlight.x / width) * 100}% - 42px)`,
                            top: `calc(${(highlight.y / height) * 100}% - 58px)`,
                        }}
                    >
                        <p className="text-[10px] text-white/80">1,348 sales</p>
                        <p className="text-[14px] font-semibold">$3,348</p>
                        <div className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-[#0F172A]" />
                    </div>
                </div>

                <div className="mr-10 mt-3 grid grid-cols-12 gap-1 text-center text-[11px] font-medium text-[#9CA3AF]">
                    {MONTHS.map((month) => (
                        <span key={month}>{month}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function CompanyGrowthChart({ company }) {
    return (
        <CompanyGatedSection
            title={`${company.companyName} Employee Growth Rate`}
            ctaTitle="View Company Growth Data"
            minHeight="380px"
        >
            <GrowthChartPlaceholder />
        </CompanyGatedSection>
    );
}
