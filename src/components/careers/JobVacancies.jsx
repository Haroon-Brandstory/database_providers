"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import JobCard from "./JobCard";

export default function JobVacancies({ title, jobs = [], cta }) {
    const [activeSlug, setActiveSlug] = useState(jobs[0]?.slug ?? null);
    const [expandedSlug, setExpandedSlug] = useState(jobs[0]?.slug ?? null);

    useEffect(() => {
        if (!jobs.length) return;
        if (!jobs.some((job) => job.slug === activeSlug)) {
            setActiveSlug(jobs[0].slug);
            setExpandedSlug(jobs[0].slug);
        }
    }, [jobs, activeSlug]);

    const selectJob = (slug) => {
        setActiveSlug(slug);
        setExpandedSlug(slug);
        const el = document.getElementById(`job-${slug}`);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    if (!jobs.length) {
        return (
            <section className="bg-[#264bd1] px-4 md:px-8 py-16 md:py-20 text-white">
                <div className="container mx-auto text-center">
                    <h2 className="text-[32px] md:text-[42px] font-medium tracking-[-0.84px]">
                        {title}
                    </h2>
                    <p className="mt-4 text-white/80">No open roles right now. Check back soon.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-[#264bd1] px-4 md:px-8 py-14 md:py-20">
            <div className="container mx-auto">
                <h2 className="text-center text-white text-[32px] md:text-[42px] font-medium tracking-[-0.84px] mb-10 md:mb-14">
                    {title}
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[312px_minmax(0,1fr)] gap-5 md:gap-6 items-start">
                    <aside className="lg:sticky lg:top-28">
                        <div className="flex lg:flex-col gap-3 overflow-x-auto pb-2 lg:pb-0 -mx-1 px-1 scrollbar-thin">
                            {jobs.map((job) => {
                                const isActive = job.slug === activeSlug;
                                return (
                                    <button
                                        key={job.slug}
                                        type="button"
                                        onClick={() => selectJob(job.slug)}
                                        className={`shrink-0 min-w-[220px] lg:min-w-0 lg:w-full rounded-xl px-4 py-5 text-sm md:text-base font-medium text-center transition-colors cursor-pointer ${
                                            isActive
                                                ? "bg-[#1798ff] text-white"
                                                : "bg-white text-[#1798ff] hover:bg-[#f1f8ff]"
                                        }`}
                                    >
                                        {job.title}
                                    </button>
                                );
                            })}
                        </div>
                    </aside>

                    <div className="flex flex-col gap-5 md:gap-6">
                        {jobs.map((job) => (
                            <JobCard
                                key={job.slug}
                                job={job}
                                expanded={expandedSlug === job.slug}
                                detailHref={`/careers/${job.slug}/`}
                                onToggle={() =>
                                    setExpandedSlug((prev) =>
                                        prev === job.slug ? null : job.slug
                                    )
                                }
                            />
                        ))}

                        {cta?.label ? (
                            <div className="pt-2">
                                <Link
                                    href={cta.href || "/contact-us/"}
                                    className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl bg-white px-6 py-4 text-[#1798ff] text-base font-semibold hover:bg-[#f1f8ff] transition-colors"
                                >
                                    {cta.label}
                                </Link>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </section>
    );
}
