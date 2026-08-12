"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    FaLinkedinIn,
    FaFacebookF,
    FaWhatsapp,
    FaLink,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import ArticleBody from "./ArticleBody";
import ResourcesCtaBand from "./ResourcesCtaBand";

function ShareBar({ title }) {
    const [url, setUrl] = useState("");
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        setUrl(window.location.href);
    }, []);

    const encoded = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    async function copyLink() {
        try {
            await navigator.clipboard.writeText(url || window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            /* ignore */
        }
    }

    const buttons = [
        {
            label: "LinkedIn",
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`,
            icon: <FaLinkedinIn />,
        },
        {
            label: "X",
            href: `https://twitter.com/intent/tweet?url=${encoded}&text=${encodedTitle}`,
            icon: <FaXTwitter />,
        },
        {
            label: "Facebook",
            href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`,
            icon: <FaFacebookF />,
        },
        {
            label: "WhatsApp",
            href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encoded}`,
            icon: <FaWhatsapp />,
        },
        {
            label: "Email",
            href: `mailto:?subject=${encodedTitle}&body=${encoded}`,
            icon: <HiOutlineMail />,
        },
    ];

    return (
        <div className="flex items-center justify-between gap-4 flex-wrap mb-6 pb-5 border-b border-[rgba(8,15,52,0.06)]">
            <span className="text-xs font-semibold tracking-[0.1em] uppercase text-[#8b93a7]">
                Share
            </span>
            <div className="flex items-center gap-2.5 flex-wrap">
                {buttons.map((btn) => (
                    <a
                        key={btn.label}
                        href={btn.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={btn.label}
                        className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#f7f8fc] border border-[rgba(8,15,52,0.06)] text-[#51525c] text-base hover:bg-white hover:border-[rgba(1,51,233,0.25)] hover:text-[#0133e9] hover:-translate-y-0.5 transition"
                    >
                        {btn.icon}
                    </a>
                ))}
                <button
                    type="button"
                    onClick={copyLink}
                    aria-label="Copy link"
                    className={`inline-flex items-center justify-center w-11 h-11 rounded-full border text-base transition ${
                        copied
                            ? "border-[rgba(26,122,69,0.35)] text-[#1a7a45] bg-[#f0faf4]"
                            : "bg-[#f7f8fc] border-[rgba(8,15,52,0.06)] text-[#51525c] hover:text-[#0133e9]"
                    }`}
                >
                    <FaLink />
                </button>
            </div>
        </div>
    );
}

export default function ArticleDetail({
    item,
    basePath,
    parentLabel,
    related = [],
    relatedTitle = "Related",
}) {
    return (
        <div className="bg-white">
            <section className="relative min-h-[420px] md:min-h-[520px] bg-[url('/blog/blogListingBanner.png')] bg-center bg-cover bg-no-repeat px-4 md:px-6 pt-28 md:pt-[100px] pb-14 overflow-hidden">
                <div className="container mx-auto max-w-[1200px]">
                    <div className="max-w-[860px]">
                        <nav className="text-[13px] text-[#9db4ff] mb-[18px] flex flex-wrap items-center">
                            <Link
                                href={`${basePath}/`}
                                className="hover:text-white hover:underline transition"
                            >
                                {parentLabel}
                            </Link>
                            <span className="mx-2 text-white/45">&gt;</span>
                            <span className="text-white/80 truncate max-w-[280px] md:max-w-md">
                                {item.shortTitle || item.title}
                            </span>
                        </nav>
                        <p className="text-[11px] font-medium tracking-[0.08em] uppercase text-white/65 mb-[18px]">
                            {item.dateLabel}
                            <span className="mx-2.5 text-white/35">|</span>
                            {item.readTime}
                            {item.industry || item.category ? (
                                <>
                                    <span className="mx-2.5 text-white/35">|</span>
                                    {item.industry || item.category}
                                </>
                            ) : null}
                        </p>
                        <h1 className="text-white text-[34px] md:text-[48px] font-medium leading-tight">
                            {item.title}
                        </h1>
                    </div>
                </div>
            </section>

            <section className="py-10 md:py-16 bg-white">
                <div className="container mx-auto max-w-[1200px] px-4 md:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-10 lg:gap-12 items-start">
                        <div className="min-w-0">
                            <ShareBar title={item.title} />
                            <div
                                className="w-full h-[260px] md:h-[360px] rounded-xl overflow-hidden mb-8 bg-gradient-to-br from-[#0a1a4a] via-[#0133e9] to-[#2c6bff] bg-cover bg-center"
                                style={
                                    item.coverImage
                                        ? {
                                              backgroundImage: `linear-gradient(120deg, rgba(1,51,233,0.25), rgba(0,0,0,0.15)), url(${item.coverImage})`,
                                          }
                                        : undefined
                                }
                            />
                            <p className="text-base leading-[1.75] text-[#51525c] mb-6">
                                {item.excerpt}
                            </p>
                            <ArticleBody blocks={item.body} />
                        </div>

                        <aside className="lg:sticky lg:top-28">
                            <div className="rounded-2xl border border-[rgba(8,15,52,0.06)] bg-[#f7f8fc] p-6">
                                <h2 className="text-lg font-medium text-[#1a1a1a] mb-4">
                                    {relatedTitle}
                                </h2>
                                <ul className="space-y-4">
                                    {related.map((rel) => (
                                        <li key={rel.slug}>
                                            <Link
                                                href={`${basePath}/${rel.slug}/`}
                                                className="text-sm font-medium text-[#1a1a1a] hover:text-[#0133e9] transition leading-snug"
                                            >
                                                {rel.title}
                                            </Link>
                                            <p className="text-xs text-[#7c8fac] mt-1">
                                                {rel.readTime}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href={`${basePath}/`}
                                    className="mt-5 inline-block text-sm font-medium text-[#0133e9] hover:underline"
                                >
                                    View all
                                </Link>
                            </div>
                        </aside>
                    </div>

                    {related.length ? (
                        <div className="mt-16 md:mt-20 pt-12 border-t border-[#e8ecf4]">
                            <h2 className="text-[24px] md:text-[28px] font-medium text-[#1a1a1a] mb-7">
                                {relatedTitle}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {related.map((rel) => (
                                    <Link
                                        key={`grid-${rel.slug}`}
                                        href={`${basePath}/${rel.slug}/`}
                                        className="group flex flex-col no-underline text-inherit hover:-translate-y-0.5 transition"
                                    >
                                        <div
                                            className="h-[160px] rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-[#0f2a6b] to-[#2c6bff] bg-cover bg-center"
                                            style={
                                                rel.coverImage
                                                    ? { backgroundImage: `url(${rel.coverImage})` }
                                                    : undefined
                                            }
                                        />
                                        <p className="text-[11px] uppercase tracking-wide text-[#9aa0a6] mb-2">
                                            {rel.readTime}
                                        </p>
                                        <h3 className="text-lg font-medium text-[#1a1a1a] leading-snug group-hover:text-[#0133e9] transition">
                                            {rel.title}
                                        </h3>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ) : null}
                </div>
            </section>

            <ResourcesCtaBand />
        </div>
    );
}
