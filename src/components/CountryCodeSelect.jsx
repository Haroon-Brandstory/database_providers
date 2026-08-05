"use client";

import {
    COUNTRY_DIAL_CODES,
    getCountryByCode,
    getCountryFlagUrl,
} from "@/lib/countryDialCodes";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

function FlagImage({ code, size = 20 }) {
    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={getCountryFlagUrl(code, 40)}
            alt=""
            width={size}
            height={Math.round(size * 0.75)}
            className="shrink-0 rounded-[3px] object-cover bg-[#eee]"
            style={{ width: size, height: Math.round(size * 0.75) }}
            loading="lazy"
            decoding="async"
        />
    );
}

export default function CountryCodeSelect({
    value = "US",
    onChange,
    onBlur,
    name = "countryCode",
}) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [mounted, setMounted] = useState(false);
    const [menuPos, setMenuPos] = useState({ top: 0, left: 0, width: 320 });
    const rootRef = useRef(null);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);
    const searchRef = useRef(null);
    const onBlurRef = useRef(onBlur);
    const selected = getCountryByCode(value);

    onBlurRef.current = onBlur;

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
        setMounted(true);
    }, []);

    const updateMenuPosition = () => {
        const btn = buttonRef.current;
        if (!btn) return;
        const rect = btn.getBoundingClientRect();
        const width = Math.min(320, Math.max(280, window.innerWidth - 24));
        let left = rect.left;
        if (left + width > window.innerWidth - 12) {
            left = Math.max(12, window.innerWidth - width - 12);
        }
        setMenuPos({
            top: rect.bottom + 6,
            left,
            width,
        });
    };

    useLayoutEffect(() => {
        if (!open) return;
        updateMenuPosition();
        const onScrollOrResize = () => updateMenuPosition();
        window.addEventListener("resize", onScrollOrResize);
        window.addEventListener("scroll", onScrollOrResize, true);
        return () => {
            window.removeEventListener("resize", onScrollOrResize);
            window.removeEventListener("scroll", onScrollOrResize, true);
        };
    }, [open]);

    useEffect(() => {
        if (!open) return;

        function handlePointerDown(event) {
            const target = event.target;
            if (rootRef.current?.contains(target)) return;
            if (menuRef.current?.contains(target)) return;
            setOpen(false);
            setQuery("");
            onBlurRef.current?.({ target: { name } });
        }

        function handleEscape(event) {
            if (event.key === "Escape") {
                setOpen(false);
                setQuery("");
                buttonRef.current?.focus();
            }
        }

        document.addEventListener("mousedown", handlePointerDown);
        document.addEventListener("keydown", handleEscape);
        return () => {
            document.removeEventListener("mousedown", handlePointerDown);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [open, name]);

    useEffect(() => {
        if (open) {
            // Wait a tick so portal is mounted
            const id = window.setTimeout(() => searchRef.current?.focus(), 0);
            return () => window.clearTimeout(id);
        }
    }, [open]);

    const pick = (code) => {
        onChange?.({ target: { name, value: code } });
        setOpen(false);
        setQuery("");
        onBlurRef.current?.({ target: { name } });
        buttonRef.current?.focus();
    };

    const menu = open && mounted
        ? createPortal(
              <div
                  ref={menuRef}
                  data-country-code-menu
                  style={{
                      position: "fixed",
                      top: menuPos.top,
                      left: menuPos.left,
                      width: menuPos.width,
                      zIndex: 9999,
                  }}
                  className="overflow-hidden rounded-2xl border border-[#E8E8E8] bg-white shadow-[0_12px_40px_rgba(0,0,0,0.16)]"
              >
                  <div className="border-b border-[#F0F0F0] p-2">
                      <input
                          ref={searchRef}
                          type="search"
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  if (filtered[0]) pick(filtered[0].code);
                              }
                          }}
                          placeholder="Search country"
                          className="w-full rounded-xl bg-[#F6F6F6] px-3 py-2 text-sm text-black outline-none placeholder:text-[#B2B2B2]"
                      />
                  </div>
                  <ul role="listbox" className="max-h-64 overflow-y-auto py-1">
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
                                          onMouseDown={(e) => e.preventDefault()}
                                          onClick={() => pick(country.code)}
                                          className={`flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm transition-colors cursor-pointer ${
                                              active
                                                  ? "bg-[#EEF3FF] text-[#0133E9]"
                                                  : "text-[#222] hover:bg-[#F6F6F6]"
                                          }`}
                                      >
                                          <FlagImage code={country.code} size={22} />
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
              </div>,
              document.body
          )
        : null;

    return (
        <div ref={rootRef} className="relative shrink-0" data-country-code-select>
            <button
                ref={buttonRef}
                type="button"
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-label="Country dial code"
                onClick={() => setOpen((prev) => !prev)}
                className="flex h-full min-h-[48px] items-center gap-2 rounded-[20px] bg-[#F6F6F6] px-3 py-3 text-black outline-none focus:ring-2 focus:ring-blue-200 cursor-pointer"
            >
                <FlagImage code={selected.code} size={22} />
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
            {menu}
        </div>
    );
}
