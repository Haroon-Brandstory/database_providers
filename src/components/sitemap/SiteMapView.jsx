"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

function LinkList({ links, query }) {
    const filtered = useMemo(() => {
        if (!query) return links;
        const q = query.toLowerCase();
        return links.filter(
            (link) =>
                link.label.toLowerCase().includes(q) ||
                link.href.toLowerCase().includes(q)
        );
    }, [links, query]);

    if (!filtered.length) return null;

    return (
        <ul className="columns-1 sm:columns-2 lg:columns-3 gap-x-8 [column-fill:_balance]">
            {filtered.map((link) => (
                <li key={link.href} className="break-inside-avoid mb-2">
                    <Link
                        href={link.href}
                        className="text-[#9ec0ff] hover:text-white text-sm md:text-[15px] leading-snug transition-colors"
                    >
                        {link.label}
                    </Link>
                </li>
            ))}
        </ul>
    );
}

function GroupBlock({ group, query, sectionId }) {
    const hasLetters = Array.isArray(group.letters) && group.letters.length > 0;

    if (hasLetters) {
        const visibleLetters = group.letters
            .map((entry) => {
                const q = query?.toLowerCase() || "";
                const links = q
                    ? entry.links.filter(
                          (link) =>
                              link.label.toLowerCase().includes(q) ||
                              link.href.toLowerCase().includes(q)
                      )
                    : entry.links;
                return { ...entry, links };
            })
            .filter((entry) => entry.links.length > 0);

        if (!visibleLetters.length) return null;

        return (
            <div className="mt-8">
                <h3 className="text-white text-lg md:text-xl font-medium mb-4">
                    {group.title}
                </h3>
                {!query ? (
                    <div className="flex flex-wrap gap-2 mb-6">
                        {visibleLetters.map((entry) => (
                            <a
                                key={entry.letter}
                                href={`#${sectionId}-${group.id}-${entry.letter}`}
                                className="inline-flex size-8 items-center justify-center rounded-md border border-[#2a2a2a] text-sm text-[#9ec0ff] hover:border-[#2C6BFF] hover:text-white transition-colors"
                            >
                                {entry.letter}
                            </a>
                        ))}
                    </div>
                ) : null}
                <div className="space-y-8">
                    {visibleLetters.map((entry) => (
                        <div
                            key={entry.letter}
                            id={`${sectionId}-${group.id}-${entry.letter}`}
                            className="scroll-mt-28"
                        >
                            <h4 className="text-[#8a8a8a] text-sm font-medium tracking-wide mb-3">
                                {entry.letter}
                            </h4>
                            <LinkList links={entry.links} query="" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const q = query?.toLowerCase() || "";
    const any = q
        ? group.links.some(
              (link) =>
                  link.label.toLowerCase().includes(q) ||
                  link.href.toLowerCase().includes(q)
          )
        : group.links.length > 0;
    if (!any) return null;

    return (
        <div className="mt-8">
            <h3 className="text-white text-lg md:text-xl font-medium mb-4">
                {group.title}
            </h3>
            <LinkList links={group.links} query={query} />
        </div>
    );
}

export default function SiteMapView({ data }) {
    const [query, setQuery] = useState("");

    return (
        <main className="bg-[#050505] text-white min-h-screen pt-28 md:pt-36 pb-16 md:pb-24">
            <div className="container mx-auto px-4 md:px-8">
                <header className="max-w-3xl">
                    <p className="text-blue-300 text-sm uppercase tracking-wide mb-3">
                        Database Providers
                    </p>
                    <h1 className="text-[34px] md:text-[48px] font-medium leading-tight">
                        {data.title}
                    </h1>
                    <p className="mt-4 text-[#D0D0D0] text-base md:text-lg">
                        {data.description}
                    </p>
                    <p className="mt-2 text-sm text-[#8a8a8a]">
                        {data.totalLinks.toLocaleString()} links across {data.sections.length}{" "}
                        sitemap sources
                    </p>
                </header>

                <div className="mt-8 md:mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <nav className="flex flex-wrap gap-2">
                        {data.sections.map((section) => (
                            <a
                                key={section.id}
                                href={`#sitemap-${section.id}`}
                                className="rounded-full border border-[#2a2a2a] px-3 py-1.5 text-sm text-[#D0D0D0] hover:border-[#2C6BFF] hover:text-white transition-colors"
                            >
                                {section.title}
                            </a>
                        ))}
                    </nav>

                    <label className="relative block w-full md:max-w-sm">
                        <span className="sr-only">Search site map</span>
                        <input
                            type="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search pages…"
                            className="w-full rounded-xl border border-[#2a2a2a] bg-[#0d0d0d] px-4 py-2.5 text-sm text-white placeholder:text-[#6d6d6d] outline-none focus:border-[#2C6BFF]"
                        />
                    </label>
                </div>

                <div className="mt-12 md:mt-16 space-y-14 md:space-y-20">
                    {data.sections.map((section) => (
                        <section
                            key={section.id}
                            id={`sitemap-${section.id}`}
                            className="scroll-mt-28 border-t border-[#1a1a1a] pt-8"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-2">
                                <h2 className="text-2xl md:text-[32px] font-medium tracking-[-0.5px]">
                                    {section.title}
                                </h2>
                                <p className="text-xs text-[#8a8a8a]">
                                    Source: /{section.file} · {section.total.toLocaleString()} URLs
                                </p>
                            </div>

                            {section.groups.map((group) => (
                                <GroupBlock
                                    key={group.id}
                                    group={group}
                                    query={query}
                                    sectionId={section.id}
                                />
                            ))}
                        </section>
                    ))}
                </div>
            </div>
        </main>
    );
}
