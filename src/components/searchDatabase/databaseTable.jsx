"use client";

import { useState, useMemo } from "react";
import FilterBar from "./FilterBar";
import CompanyTable from "./CompanyTable";

export default function DatabaseTable({ initialCompanies = [] }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedIndustry, setSelectedIndustry] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [hasSearched, setHasSearched] = useState(false);

    // Extract unique industries and cities for filter dropdowns
    const industries = useMemo(() => {
        const unique = new Set();
        initialCompanies.forEach(company => {
            const atts = company.attributes || company;
            const indList = atts.industries || atts.Industry?.data || [];
            if (indList.length > 0) {
                const name = indList[0].industryName || indList[0].attributes?.industryName;
                if (name) unique.add(name);
            }
        });
        return Array.from(unique).sort();
    }, [initialCompanies]);

    const cities = useMemo(() => {
        const unique = new Set();
        initialCompanies.forEach(company => {
            const atts = company.attributes || company;
            const addresses = atts.address || atts.Address || [];
            if (Array.isArray(addresses) && addresses.length > 0) {
                const city = addresses[0].city;
                if (city) unique.add(city);
            }
        });
        return Array.from(unique).sort();
    }, [initialCompanies]);

    // Filter logic
    const filteredCompanies = useMemo(() => {
        return initialCompanies.filter((company) => {
            const atts = company.attributes || company;
            const companyName = (atts.CompanyName || "").toLowerCase();

            const compIndustries = atts.industries || atts.Industry?.data || [];
            const compIndustry = compIndustries.length > 0 ? (compIndustries[0].industryName || compIndustries[0].attributes?.industryName) : "";

            const addresses = atts.address || atts.Address || [];
            const compCity = (Array.isArray(addresses) && addresses.length > 0) ? addresses[0].city : "";

            const matchesSearch = companyName.includes(searchQuery.toLowerCase());
            const matchesIndustry = selectedIndustry ? compIndustry === selectedIndustry : true;
            const matchesCity = selectedCity ? compCity === selectedCity : true;

            return matchesSearch && matchesIndustry && matchesCity;
        });
    }, [initialCompanies, searchQuery, selectedIndustry, selectedCity]);

    const handleSearch = () => {
        setHasSearched(true);
    };

    return (
        <div className="w-full font-sans text-gray-200">
            <FilterBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedIndustry={selectedIndustry}
                setSelectedIndustry={setSelectedIndustry}
                selectedCity={selectedCity}
                setSelectedCity={setSelectedCity}
                industries={industries}
                cities={cities}
                onSearch={handleSearch}
            />

            {hasSearched ? (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <CompanyTable companies={filteredCompanies} />
                </div>
            ) : (
                <div className="text-center py-20 animate-in fade-in duration-700">
                    <div className="inline-flex items-center justify-center p-6 rounded-full bg-white/5 border border-white/5 mb-6 shadow-2xl shadow-blue-900/10">
                        <svg className="w-16 h-16 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-200 mb-2">Search the Database</h2>
                    <p className="text-gray-400 max-w-md mx-auto">
                        Enter your search criteria above or simply click "Search Database" to view all available companies.
                    </p>
                </div>
            )}
        </div>
    );
}
