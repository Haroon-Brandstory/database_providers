import { useEffect, useMemo, useState } from "react";

export function usePaginatedSearch({
    data = [],
    getSearchText = (item) => String(item ?? ""),
    initialItemsPerPage = 9,
    itemsPerPageOptions = [6, 9, 12],
    maxVisiblePages = 5,
    searchDebounceMs = 1500,
}) {
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, searchDebounceMs);

        return () => clearTimeout(timer);
    }, [searchQuery, searchDebounceMs]);

    const isSearching = searchQuery.trim() !== debouncedSearchQuery.trim();

    const filteredData = useMemo(() => {
        const query = debouncedSearchQuery.trim().toLowerCase();
        if (!query) return data;

        return data.filter((item) =>
            getSearchText(item).toLowerCase().includes(query)
        );
    }, [data, debouncedSearchQuery, getSearchText]);

    const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));

    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredData.slice(start, start + itemsPerPage);
    }, [filteredData, currentPage, itemsPerPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearchQuery, itemsPerPage]);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    const resultStart =
        filteredData.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
    const resultEnd = Math.min(currentPage * itemsPerPage, filteredData.length);

    const pageNumbers = useMemo(() => {
        const pages = [];
        let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let end = Math.min(totalPages, start + maxVisiblePages - 1);

        if (end - start + 1 < maxVisiblePages) {
            start = Math.max(1, end - maxVisiblePages + 1);
        }

        for (let page = start; page <= end; page += 1) {
            pages.push(page);
        }

        return pages;
    }, [currentPage, totalPages, maxVisiblePages]);

    return {
        searchQuery,
        setSearchQuery,
        debouncedSearchQuery,
        isSearching,
        itemsPerPage,
        setItemsPerPage,
        currentPage,
        setCurrentPage,
        filteredData,
        paginatedData,
        totalPages,
        resultStart,
        resultEnd,
        pageNumbers,
        itemsPerPageOptions,
        totalCount: data.length,
        filteredCount: filteredData.length,
    };
}
