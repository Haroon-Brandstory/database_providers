"use client";

export default function FilterBar({
    searchQuery,
    setSearchQuery,
    selectedIndustry,
    setSelectedIndustry,
    selectedCity,
    setSelectedCity,
    industries,
    cities,
    onSearch
}) {
    return (
        <div className="mb-8 p-6 rounded-2xl border border-white/10 bg-gray-900/60 backdrop-blur-xl shadow-lg ring-1 ring-black/5">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Search Input */}
                <div className="relative group col-span-1 md:col-span-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400 group-focus-within:text-[#0236ef] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Search by company name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-xl leading-5 bg-black/20 text-gray-200 placeholder-gray-500 focus:outline-none focus:bg-black/40 focus:border-[#0236ef]/50 focus:ring-1 focus:ring-[#0236ef]/50 sm:text-sm transition-all duration-200"
                    />
                </div>

                {/* Industry Filter */}
                <div className="relative col-span-1 md:col-span-1">
                    <select
                        value={selectedIndustry}
                        onChange={(e) => setSelectedIndustry(e.target.value)}
                        className="block w-full pl-3 pr-10 py-3 border border-white/10 rounded-xl leading-5 bg-black/20 text-gray-200 focus:outline-none focus:bg-black/40 focus:border-[#0236ef]/50 focus:ring-1 focus:ring-[#0236ef]/50 sm:text-sm appearance-none transition-all duration-200 [&>option]:bg-gray-900"
                    >
                        <option value="">All Industries</option>
                        {industries.map((ind) => (
                            <option key={ind} value={ind}>{ind}</option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>

                {/* City Filter */}
                <div className="relative col-span-1 md:col-span-1">
                    <select
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        className="block w-full pl-3 pr-10 py-3 border border-white/10 rounded-xl leading-5 bg-black/20 text-gray-200 focus:outline-none focus:bg-black/40 focus:border-[#0236ef]/50 focus:ring-1 focus:ring-[#0236ef]/50 sm:text-sm appearance-none transition-all duration-200 [&>option]:bg-gray-900"
                    >
                        <option value="">All Cities</option>
                        {cities.map((city) => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="relative col-span-1 md:col-span-1">
                    <button
                        onClick={onSearch}
                        className="w-full h-full py-3 px-6 rounded-xl bg-[#0236ef] hover:bg-[#0236ef]/90 text-white font-medium shadow-lg shadow-blue-500/30 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        Search Database
                    </button>
                </div>
            </div>
        </div>
    );
}
