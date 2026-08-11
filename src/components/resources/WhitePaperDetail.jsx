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
                        title={btn.label}
                        className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#f7f8fc] border border-[rgba(8,15,52,0.06)] text-[#51525c] text-base hover:bg-white hover:border-[rgba(1,51,233,0.25)] hover:text-[#0133e9] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(1,51,233,0.12)] transition"
                    >
                        {btn.icon}
                    </a>
                ))}
                <button
                    type="button"
                    onClick={copyLink}
                    aria-label="Copy link"
                    title="Copy Link"
                    className={`inline-flex items-center justify-center w-11 h-11 rounded-full border text-base transition ${
                        copied
                            ? "border-[rgba(26,122,69,0.35)] text-[#1a7a45] bg-[#f0faf4]"
                            : "bg-[#f7f8fc] border-[rgba(8,15,52,0.06)] text-[#51525c] hover:bg-white hover:border-[rgba(1,51,233,0.25)] hover:text-[#0133e9]"
                    }`}
                >
                    <FaLink />
                </button>
            </div>
        </div>
    );
}

export default function WhitePaperDetail({ item, related = [] }) {
    const shortTitle = item.shortTitle || item.title;
    const coverStyle = item.coverImage
        ? {
              backgroundImage: `linear-gradient(120deg, rgba(1, 51, 233, 0.25), rgba(0, 0, 0, 0.15)), url(${item.coverImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
          }
        : undefined;

    return (
        <div className="bg-white">
            {/* Hero — match HTML whitepaper-single-page */}
            <section className="relative min-h-[420px] md:min-h-[560px] bg-[url('/blog/blogListingBanner.png')] bg-center bg-cover bg-no-repeat px-4 md:px-6 pt-28 md:pt-[100px] pb-16 md:pb-[70px] overflow-hidden">
                <div className="container mx-auto max-w-[1200px]">
                    <div className="max-w-[760px]">
                        <nav className="text-[13px] text-[#9db4ff] mb-[18px] flex flex-wrap items-center">
                            <Link href="/white-papers/" className="hover:text-white hover:underline transition">
                                White Papers
                            </Link>
                            <span className="mx-2 text-white/45">&gt;</span>
                            <span className="text-white/80">{shortTitle}</span>
                        </nav>
                        <p className="text-[11px] font-medium tracking-[0.08em] uppercase text-white/65 mb-[18px]">
                            {item.dateLabel}
                            <span className="mx-2.5 text-white/35">|</span>
                            {item.readTime}
                        </p>
                        <h1 className="text-white text-[28px] md:text-[36px] lg:text-[52px] font-medium italic leading-[1.25] max-w-[920px]">
                            {item.title}
                        </h1>
                    </div>
                </div>
            </section>

            {/* Detail — white page content */}
            <section className="py-10 md:py-20 bg-white">
                <div className="container mx-auto max-w-[1200px] px-4 md:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_380px] gap-10 lg:gap-12 xl:gap-14 items-start">
                        <div className="min-w-0">
                            <ShareBar title={item.title} />

                            <div
                                className="w-full h-[300px] md:h-[360px] xl:h-[400px] rounded-xl overflow-hidden mb-8 md:mb-9 bg-gradient-to-br from-[#0a1a4a] via-[#0133e9] to-[#2c6bff]"
                                style={coverStyle}
                                role="img"
                                aria-label="White paper cover"
                            />

                            <div className="wp-body text-left">
                                {(item.body || []).map((block, index) => {
                                    if (block.type === "h3") {
                                        return (
                                            <h3
                                                key={index}
                                                className="text-[20px] md:text-[22px] font-semibold text-[#1a1a1a] mt-8 mb-3"
                                            >
                                                {block.text}
                                            </h3>
                                        );
                                    }
                                    if (block.type === "ul") {
                                        return (
                                            <ul
                                                key={index}
                                                className="list-disc ml-5 mb-5 text-[#51525c]"
                                            >
                                                {block.items.map((li) => (
                                                    <li
                                                        key={li}
                                                        className="text-base leading-[1.7] mb-2"
                                                    >
                                                        {li}
                                                    </li>
                                                ))}
                                            </ul>
                                        );
                                    }
                                    return (
                                        <p
                                            key={index}
                                            className="text-base leading-[1.75] text-[#51525c] mb-4"
                                        >
                                            {block.text}
                                        </p>
                                    );
                                })}

                                <h3 className="text-[20px] md:text-[22px] font-semibold text-[#1a1a1a] mt-8 mb-3">
                                    What this white paper covers
                                </h3>
                                <ul className="list-disc ml-5 mb-5 text-[#51525c]">
                                    {item.covers.map((line) => (
                                        <li key={line} className="text-base leading-[1.7] mb-2">
                                            {line}
                                        </li>
                                    ))}
                                </ul>

                                <h3 className="text-[20px] md:text-[22px] font-semibold text-[#1a1a1a] mt-8 mb-3">
                                    Who should download this
                                </h3>
                                <p className="text-base leading-[1.75] text-[#51525c] mb-4">
                                    {item.whoShouldDownload}
                                </p>

                                <h3 className="text-[20px] md:text-[22px] font-semibold text-[#1a1a1a] mt-8 mb-3">
                                    Key takeaways
                                </h3>
                                <p className="text-base leading-[1.75] text-[#51525c] mb-4">
                                    {item.keyTakeaways}
                                </p>
                            </div>
                        </div>

                        <aside className="lg:sticky lg:top-28">
                            <div className="relative overflow-hidden rounded-[20px] border border-[rgba(8,15,52,0.06)] bg-white p-7 md:p-8 mb-5 shadow-[0_8px_30px_rgba(8,15,52,0.04)]">
                                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#001444] via-[#0133e9] to-[#2c6bff]" />
                                <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#0133e9] mb-3">
                                    Free resource
                                </div>
                                <h2 className="text-xl font-semibold text-[#111827] mb-2 tracking-tight text-left">
                                    Download White Paper
                                </h2>
                                <p className="text-sm leading-relaxed text-[#6b7280] mb-6 text-left">
                                    Get the full PDF instantly. Free, no subscription required.
                                </p>
                                <a
                                    href={item.pdf}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    download
                                    className="flex items-center justify-center gap-2.5 w-full rounded-full px-6 py-3.5 text-white text-[15px] font-medium no-underline bg-[linear-gradient(100deg,#001444_0%,#0133e9_55%,#2c6bff_100%)] shadow-[0_10px_28px_rgba(1,51,233,0.28)] hover:translate-y-[-1px] hover:shadow-[0_14px_32px_rgba(1,51,233,0.34)] transition"
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        className="w-[18px] h-[18px]"
                                        aria-hidden
                                    >
                                        <path d="M12 3v12" />
                                        <path d="m7 10 5 5 5-5" />
                                        <path d="M5 21h14" />
                                    </svg>
                                    Download PDF
                                </a>
                                <div className="mt-4 flex items-center gap-2 text-xs text-[#6b7280]">
                                    <span>PDF</span>
                                    <span className="w-1 h-1 rounded-full bg-[#c5c9ce]" aria-hidden />
                                    <span>{item.readTime}</span>
                                </div>
                            </div>
                        </aside>
                    </div>

                    {/* Related — full width under grid */}
                    {related.length ? (
                        <div className="mt-16 md:mt-20 pt-12 md:pt-[60px] border-t border-[#e8ecf4]">
                            <h2 className="text-[24px] md:text-[28px] font-semibold text-[#1a1a1a] mb-7 text-left">
                                Other White Papers
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {related.map((rel) => (
                                    <Link
                                        key={rel.slug}
                                        href={`/white-papers/${rel.slug}/`}
                                        className="group flex flex-col no-underline text-inherit hover:-translate-y-0.5 transition"
                                    >
                                        <div
                                            className="h-[180px] rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-[#0f2a6b] to-[#2c6bff] bg-cover bg-center"
                                            style={
                                                rel.coverImage
                                                    ? { backgroundImage: `url(${rel.coverImage})` }
                                                    : undefined
                                            }
                                        />
                                        <p className="text-[11px] font-medium tracking-[0.08em] uppercase text-[#9aa0a6] mb-2">
                                            {rel.readTime}
                                        </p>
                                        <h3 className="text-lg font-medium italic text-[#1a1a1a] leading-snug mb-2 group-hover:text-[#0133e9] transition text-left">
                                            {rel.title}
                                        </h3>
                                        <p className="text-sm text-[#6b7280] leading-relaxed text-left">
                                            {rel.excerpt}
                                        </p>
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
