"use client";

export default function ListPagination({
    currentPage,
    totalPages,
    onPageChange,
    pageNumbers,
    className = "",
}) {
    if (totalPages <= 1) return null;

    return (
        <div className={`mt-12 flex justify-center ${className}`}>
            <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-[24px] bg-white px-3 py-3 drop-shadow-[0px_0px_35px_#0000001A]">
                <button
                    type="button"
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white bg-[#0133E9] hover:bg-[#001444] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[#0133E9] transition-all duration-300"
                >
                    <span aria-hidden="true">←</span>
                    Previous
                </button>

                <div className="flex flex-wrap items-center justify-center gap-1.5 px-1">
                    {pageNumbers.map((page) => (
                        <button
                            key={page}
                            type="button"
                            onClick={() => onPageChange(page)}
                            className={`min-w-10 h-10 rounded-full text-sm font-medium transition-all duration-300 ${
                                page === currentPage
                                    ? "bg-[#0133E9] text-white shadow-md scale-105"
                                    : "bg-[#F6F8FF] text-[#2C6BFF] hover:bg-[#E8EEFF]"
                            }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>

                <button
                    type="button"
                    onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white bg-[#0133E9] hover:bg-[#001444] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[#0133E9] transition-all duration-300"
                >
                    Next
                    <span aria-hidden="true">→</span>
                </button>
            </div>
        </div>
    );
}
