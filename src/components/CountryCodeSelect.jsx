"use client";

import { COUNTRY_DIAL_CODES, getCountryByCode } from "@/lib/countryDialCodes";
import { useEffect, useMemo, useRef, useState } from "react";

export default function CountryCodeSelect({
    value = "US",
    onChange,
    onBlur,
    name = "countryCode",
}) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const rootRef = useRef(null);
    const searchRef = useRef(null);
    const selected = getCountryByCode(value);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return COUNTRY_DIAL_CODES;
        return COUNTRY_DIAL_CODES.filter(
            (c) =>
                c.name.toLowerCase().includes(q) ||
                c.code.toLowerCase().includes(q) ||
                c.dial.includes(q)
        );
    }, [query]);

    useEffect(() => {
        if (!open) return;
        function handleClickOutside(event) {
            if (rootRef.current && !rootRef.current.contains(event.target)) {
                setOpen(false);
                setQuery("");
                onBlur?.({ target: { name } });
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open, name, onBlur]);

    useEffect(() => {
        if (open) {
            searchRef.current?.focus();
        }
    }, [open]);

    const pick = (code) => {
        onChange?.({ target: { name, value: code } });
        setOpen(false);
        setQuery("");
        onBlur?.({ target: { name } });
    };

    return (
        <div ref={rootRef} className="relative shrink-0" data-country-code-select>
            <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-label="Country dial code"
                onClick={() => setOpen((prev) => !prev)}
                className="flex h-full min-h-[48px] items-center gap-2 rounded-[20px] bg-[#F6F6F6] px-3 py-3 text-black outline-none focus:ring-2 focus:ring-blue-200 cursor-pointer"
            >
                <span className="text-[20px] leading-none" aria-hidden>
                    {selected.flag}
                </span>
                <span className="text-sm font-medium whitespace-nowrap">{selected.dial}</span>
                <svg
                    className={`w-3.5 h-3.5 text-[#666] transition-transform ${open ? "rotate-180" : ""}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden
                >
                    <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            {open ? (
                <div className="absolute left-0 top-[calc(100%+6px)] z-50 w-[280px] sm:w-[320px] overflow-hidden rounded-2xl border border-[#E8E8E8] bg-white shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
                    <div className="border-b border-[#F0F0F0] p-2">
                        <input
                            ref={searchRef}
                            type="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search country"
                            className="w-full rounded-xl bg-[#F6F6F6] px-3 py-2 text-sm text-black outline-none placeholder:text-[#B2B2B2]"
                        />
                    </div>
                    <ul
                        role="listbox"
                        className="max-h-64 overflow-y-auto py-1"
                    >
                        {filtered.length === 0 ? (
                            <li className="px-3 py-3 text-sm text-[#888]">No countries found</li>
                        ) : (
                            filtered.map((country) => {
                                const active = country.code === value;
                                return (
                                    <li key={country.code}>
                                        <button
                                            type="button"
                                            role="option"
                                            aria-selected={active}
                                            onClick={() => pick(country.code)}
                                            className={`flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm transition-colors cursor-pointer ${
                                                active
                                                    ? "bg-[#EEF3FF] text-[#0133E9]"
                                                    : "text-[#222] hover:bg-[#F6F6F6]"
                                            }`}
                                        >
                                            <span className="text-[20px] leading-none" aria-hidden>
                                                {country.flag}
                                            </span>
                                            <span className="min-w-0 flex-1 truncate">{country.name}</span>
                                            <span className="shrink-0 font-medium text-[#555]">
                                                {country.dial}
                                            </span>
                                        </button>
                                    </li>
                                );
                            })
                        )}
                    </ul>
                </div>
            ) : null}
        </div>
    );
}
