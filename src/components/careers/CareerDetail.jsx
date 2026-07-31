"use client";

import Link from "next/link";
import JobMetaTag from "./JobMetaTag";

export default function CareerDetail({ job, applyHref = "/contact-us/" }) {
    if (!job) return null;

    return (
        <main className="bg-[#264bd1] min-h-screen text-white pt-28 md:pt-36 pb-16 md:pb-24">
            <div className="container mx-auto px-4 md:px-8">
                <Link
                    href="/careers/"
                    className="inline-flex text-sm text-white/80 hover:text-white transition-colors mb-6"
                >
                    ← Back to careers
                </Link>

                <article className="rounded-[24px] md:rounded-[30px] bg-white text-[#080808] p-6 md:p-10 max-w-4xl">
                    <h1 className="text-2xl md:text-4xl font-medium tracking-[-0.5px] leading-tight">
                        {job.title}
                    </h1>

                    <div className="mt-4 flex flex-wrap gap-2">
                        <JobMetaTag label={job.location} icon="location" />
                        <JobMetaTag label={job.employmentType} icon="type" />
                        <JobMetaTag label={job.experience} icon="experience" />
                    </div>

                    <div className="mt-8 space-y-8">
                        <section>
                            <h2 className="text-xl font-medium mb-3">About the Role:</h2>
                            <p className="text-[#6d6d6d] leading-relaxed">{job.about}</p>
                        </section>

                        {job.responsibilities?.length ? (
                            <section>
                                <h2 className="text-xl font-medium mb-3">What you’ll do:</h2>
                                <ul className="list-disc pl-5 space-y-1 text-[#6d6d6d] leading-relaxed">
                                    {job.responsibilities.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                                {job.closingNote ? (
                                    <p className="mt-4 text-[#6d6d6d] leading-relaxed">
                                        {job.closingNote}
                                    </p>
                                ) : null}
                            </section>
                        ) : null}

                        {job.eligibility?.length ? (
                            <section>
                                <h2 className="text-xl font-medium mb-3">Eligibility Criteria:</h2>
                                <ul className="list-disc pl-5 space-y-1 text-[#6d6d6d] leading-relaxed">
                                    {job.eligibility.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </section>
                        ) : null}
                    </div>

                    <Link
                        href={applyHref}
                        className="mt-8 inline-flex items-center justify-center rounded-xl bg-[#1798ff] px-6 py-3 text-white font-medium hover:bg-[#0f86e6] transition-colors"
                    >
                        Apply Now
                    </Link>
                </article>
            </div>
        </main>
    );
}
