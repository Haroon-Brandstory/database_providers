"use client";

import Link from "next/link";

export default function CompanyTable({ companies }) {
    if (!companies) return null;

    return (
        <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-gray-900/60 backdrop-blur-xl ring-1 ring-black/5">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[1000px] border-collapse text-left text-sm">
                    <thead>
                        <tr className="bg-black/40 backdrop-blur-md border-b border-white/10">
                            <th scope="col" className="px-6 py-5 font-bold text-gray-400 uppercase tracking-widest text-xs w-16 text-center">
                                #
                            </th>
                            <th scope="col" className="px-6 py-5 font-bold text-gray-400 uppercase tracking-widest text-xs w-1/3">
                                Company Details
                            </th>
                            <th scope="col" className="px-6 py-5 font-bold text-gray-400 uppercase tracking-widest text-xs w-1/4">
                                Location
                            </th>
                            <th scope="col" className="px-6 py-5 font-bold text-gray-400 uppercase tracking-widest text-xs w-1/6 text-center">
                                Region
                            </th>
                            <th scope="col" className="px-6 py-5 font-bold text-gray-400 uppercase tracking-widest text-xs w-1/6 text-center">
                                Contact
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {companies.length > 0 ? (
                            companies.map((company, index) => {
                                const atts = company.attributes || company;
                                const companyName = atts.CompanyName || "N/A";

                                const compIndustries = atts.industries || atts.Industry?.data || [];
                                const industry = compIndustries.length > 0 ? (compIndustries[0].industryName || compIndustries[0].attributes?.industryName) : null;

                                const subIndustry = atts.SubIndustry || "-";

                                const rankings = atts.rankings || atts.Ranking?.data || [];
                                const ranking = rankings.length > 0 ? (rankings[0].ranking || rankings[0].attributes?.ranking) : null;

                                const turnover = atts.turnover || atts.Turnover || "For Members only";
                                const employees = atts.employees || atts.Employees || "For Members only";

                                const sectors = atts.sectors || atts.Sector?.data || [];
                                const sector = sectors.length > 0 ? (sectors[0].sector || sectors[0].attributes?.sector) : "-";

                                const entities = atts.entities || atts.CoEntity?.data || [];
                                const coEntity = entities.length > 0 ? (entities[0].Entity || entities[0].attributes?.Entity) : "-";

                                const addresses = atts.address || atts.Address || [];
                                let addressStr = "-";
                                let city = "-";
                                let state = "-";

                                if (Array.isArray(addresses) && addresses.length > 0) {
                                    const addr = addresses[0];
                                    const cityVal = addr.city || "";
                                    const stateVal = addr.state || "";
                                    const countryVal = addr.country || "";
                                    const pinVal = addr.pin || "";

                                    city = cityVal || "-";
                                    state = stateVal || "-";

                                    const parts = [cityVal, stateVal, countryVal, pinVal ? `${pinVal}` : ""].filter(Boolean);
                                    if (parts.length > 0) addressStr = parts.join(", ");
                                } else if (typeof addresses === 'string') {
                                    addressStr = addresses;
                                }

                                const phone = atts.phone || atts.Phone || "-";
                                const website = atts.website || atts.Website;

                                const isMemberTurnover = turnover.toLowerCase().includes("member");
                                const isMemberEmployees = employees.toLowerCase().includes("member");

                                return (
                                    <tr
                                        key={company.id || index}
                                        className="group hover:bg-white/5 transition-all duration-300 ease-in-out border-l-2 border-l-transparent hover:border-l-[#0236ef]"
                                    >
                                        <td className="px-6 py-6 text-center">
                                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/5 text-gray-400 text-xs font-medium group-hover:bg-[#0236ef] group-hover:text-white transition-colors border border-white/5">
                                                {index + 1}
                                            </span>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="flex flex-col gap-3">
                                                <div className="flex items-start justify-between">
                                                    <h3 className="text-lg font-bold text-white leading-tight group-hover:text-[#0236ef] transition-colors tracking-wide">
                                                        {companyName}
                                                    </h3>
                                                    {ranking && (
                                                        <span className="flex-shrink-0 inline-flex items-center gap-1 px-2.5 py-1 bg-amber-500/10 text-amber-400 text-[10px] font-bold uppercase tracking-wide rounded-full border border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                                                            Top 500
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="flex flex-wrap gap-2">
                                                    {industry && (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-[#0236ef]/10 text-blue-400 border border-[#0236ef]/20">
                                                            {industry}
                                                        </span>
                                                    )}
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-white/5 text-gray-400 border border-white/10">
                                                        {subIndustry}
                                                    </span>
                                                </div>

                                                <div className="grid grid-cols-2 gap-x-6 gap-y-3 mt-2 text-xs">
                                                    <div className="flex flex-col">
                                                        <span className="text-gray-500 font-medium uppercase tracking-wider text-[10px] mb-1">Turnover</span>
                                                        {isMemberTurnover && <span className="text-[10px] text-blue-400 font-medium mt-0.5 flex items-center gap-1">For Members Only</span>}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-gray-500 font-medium uppercase tracking-wider text-[10px] mb-1">Employees</span>
                                                        {isMemberEmployees && <span className="text-[10px] text-blue-400 font-medium mt-0.5 flex items-center gap-1">For Members Only</span>}
                                                    </div>
                                                    <div className="flex flex-col pt-2 border-t border-white/5">
                                                        <span className="text-gray-500 font-medium uppercase tracking-wider text-[10px] mb-1">Sector</span>
                                                        <span className="font-semibold text-gray-300">{sector}</span>
                                                    </div>
                                                    <div className="flex flex-col pt-2 border-t border-white/5">
                                                        <span className="text-gray-500 font-medium uppercase tracking-wider text-[10px] mb-1">Entity</span>
                                                        <span className="font-semibold text-gray-300">{coEntity}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 align-top">
                                            <div className="flex flex-col gap-4">
                                                <div className="flex items-start gap-3">
                                                    <div className="p-2 rounded-lg bg-white/5 text-gray-400 mt-0.5 border border-white/5">
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                                    </div>
                                                    <span className="text-sm text-gray-300 font-medium leading-relaxed max-w-[200px]">
                                                        {addressStr}
                                                    </span>
                                                </div>

                                                {website && (
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 rounded-lg bg-[#0236ef]/10 text-blue-400 border border-[#0236ef]/20">
                                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                                                        </div>
                                                        <Link
                                                            href={website.startsWith("http") ? website : `https://${website}`}
                                                            target="_blank"
                                                            className="text-sm font-semibold text-gray-300 hover:text-[#0236ef] hover:underline truncate max-w-[180px] transition-colors"
                                                        >
                                                            {website.replace(/^https?:\/\/(www\.)?/, '')}
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="flex flex-col items-center justify-center gap-2">
                                                <span className="font-bold text-white text-base tracking-wide">
                                                    {city}
                                                </span>
                                                {state !== "-" && (
                                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/5 text-gray-400 border border-white/5">
                                                        {state}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="flex justify-center">
                                                <a
                                                    href={`tel:${phone}`}
                                                    className="group/btn flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:bg-[#0236ef] hover:border-[#0236ef] hover:text-white hover:shadow-[0_0_15px_rgba(2,54,239,0.5)] transition-all duration-300 relative overflow-hidden"
                                                    title={phone}
                                                >
                                                    <svg className="w-5 h-5 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                    </svg>
                                                    <span className="sr-only">Call {phone}</span>
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={5} className="px-6 py-24 text-center">
                                    <div className="max-w-xs mx-auto flex flex-col items-center justify-center text-gray-500">
                                        <div className="p-4 rounded-full bg-white/5 border border-white/5 mb-4">
                                            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-200 mb-1">No matches found</h3>
                                        <p className="text-sm text-gray-400 text-center">We couldn't find any companies matching your search criteria.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
