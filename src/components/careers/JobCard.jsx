"use client";

import Link from "next/link";
import JobMetaTag from "./JobMetaTag";

export default function JobCard({
    job,
    expanded = false,
    onToggle,
    detailHref,
}) {
    if (!job) return null;

    return (
        <article
            id={`job-${job.slug}`}
            className="scroll-mt-28 rounded-[24px] md:rounded-[30px] bg-white p-6 md:p-10 shadow-sm"
        >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <h3 className="text-[#080808] text-xl md:text-2xl font-medium tracking-[-0.48px] leading-snug">
                    {detailHref ? (
                        <Link href={detailHref} className="hover:text-[#1798ff] transition-colors">
                            {job.title}
                        </Link>
                    ) : (
                        job.title
                    )}
                </h3>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
                <JobMetaTag label={job.location} icon="location" />
                <JobMetaTag label={job.employmentType} icon="type" />
                <JobMetaTag label={job.experience} icon="experience" />
            </div>

            <div className="mt-6 space-y-6">
                <section>
                    <h4 className="text-[#080808] text-lg md:text-xl font-medium mb-3">
                        About the Role:
                    </h4>
                    <p className="text-[#6d6d6d] text-sm md:text-base leading-relaxed">
                        {job.about}
                    </p>
                </section>

                {expanded ? (
                    <>
                        {job.responsibilities?.length ? (
                            <section>
                                <h4 className="text-[#080808] text-lg md:text-xl font-medium mb-3">
                                    What you’ll do:
                                </h4>
                                <ul className="list-disc pl-5 space-y-1 text-[#6d6d6d] text-sm md:text-base leading-relaxed">
                                    {job.responsibilities.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                                {job.closingNote ? (
                                    <p className="mt-4 text-[#6d6d6d] text-sm md:text-base leading-relaxed">
                                        {job.closingNote}
                                    </p>
                                ) : null}
                            </section>
                        ) : null}

                        {job.eligibility?.length ? (
                            <section>
                                <h4 className="text-[#080808] text-lg md:text-xl font-medium mb-3">
                                    Eligibility Criteria:
                                </h4>
                                <ul className="list-disc pl-5 space-y-1 text-[#6d6d6d] text-sm md:text-base leading-relaxed">
                                    {job.eligibility.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </section>
                        ) : null}
                    </>
                ) : null}
            </div>

            <button
                type="button"
                onClick={onToggle}
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#1798ff] px-5 py-3 text-white text-base font-medium hover:bg-[#0f86e6] transition-colors cursor-pointer"
            >
                {expanded ? "Show Less" : "Show More"}
            </button>
        </article>
    );
}
