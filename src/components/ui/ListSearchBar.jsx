"use client";

export default function ListSearchBar({
    title = "Browse",
    searchLabel = "Search",
    searchId = "list-search",
    placeholder = "Search...",
    searchQuery,
    onSearchChange,
    itemsPerPage,
    onItemsPerPageChange,
    itemsPerPageOptions = [6, 9, 12],
    resultStart = 0,
    resultEnd = 0,
    filteredCount = 0,
    totalCount = 0,
    itemLabel = "items",
    showItemsPerPage = true,
    isSearching = false,
    className = "",
}) {
    const isFiltered = searchQuery.trim().length > 0;

    return (
        <div
            className={`mb-10 bg-white rounded-2xl p-6 md:p-8 drop-shadow-[0px_0px_35px_#0000001A] ${className}`}
        >
            <p className="text-[#2C6BFF] text-[16px] font-medium mb-5">{title}</p>

            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="w-full lg:max-w-xl">
                    <label
                        htmlFor={searchId}
                        className="block text-[#222] text-[15px] font-medium mb-2"
                    >
                        {searchLabel}
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg
                                className="h-5 w-5 text-[#2C6BFF]"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                        <input
                            id={searchId}
                            type="text"
                            placeholder={placeholder}
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="block w-full rounded-[20px] bg-[#F6F6F6] pl-12 pr-12 py-3.5 text-[#222] placeholder-[#B2B2B2] outline-none focus:ring-2 focus:ring-[#2C6BFF]/20 transition-all"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => onSearchChange("")}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#51525C] hover:text-[#0133E9] transition-colors"
                                aria-label="Clear search"
                            >
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>

                {showItemsPerPage && (
                    <div className="w-full lg:w-auto">
                        <p className="block text-[#222] text-[15px] font-medium mb-2">
                            Items per page
                        </p>
                        <div className="inline-flex items-center gap-2 rounded-full bg-[#F0F4FF] p-1.5">
                            {itemsPerPageOptions.map((count) => (
                                <button
                                    key={count}
                                    type="button"
                                    onClick={() => onItemsPerPageChange(count)}
                                    className={`min-w-[44px] rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                                        itemsPerPage === count
                                            ? "bg-[#0133E9] text-white shadow-md"
                                            : "text-[#2C6BFF] hover:bg-white"
                                    }`}
                                >
                                    {count}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-6 pt-5 border-t border-[#E8EEFF] flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center rounded-full bg-[#F0F4FF] px-4 py-2 text-sm font-medium text-[#222]">
                    {filteredCount === 0
                        ? "0 results"
                        : `Showing ${resultStart}-${resultEnd} of ${filteredCount}`}
                </span>
                {isSearching && (
                    <span className="inline-flex items-center gap-2 text-sm text-[#2C6BFF]">
                        <span className="h-3.5 w-3.5 border-2 border-[#2C6BFF] border-t-transparent rounded-full animate-spin" />
                        Searching...
                    </span>
                )}
                {isFiltered && totalCount > 0 && (
                    <span className="text-sm text-[#51525C]">
                        filtered from {totalCount} total {itemLabel}
                    </span>
                )}
            </div>
        </div>
    );
}
