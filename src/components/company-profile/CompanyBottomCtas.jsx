import Link from 'next/link';

function CtaCard({ title, description, buttonLabel }) {
    return (
        <div className="flex flex-col justify-between rounded-[24px] bg-[#0133E9] p-6 text-white md:p-8">
            <div>
                <h3 className="text-[22px] font-semibold md:text-[24px]">{title}</h3>
                <p className="mt-3 text-[14px] leading-[1.6] text-white/85 md:text-[15px]">{description}</p>
            </div>
            <Link
                href="/contact-us"
                className="mt-6 inline-flex w-fit rounded-full bg-white px-5 py-2.5 text-[14px] font-semibold text-[#0133E9] transition-opacity hover:opacity-90"
            >
                {buttonLabel}
            </Link>
        </div>
    );
}

export default function CompanyBottomCtas() {
    return (
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <CtaCard
                title="Customize Your Database"
                description="Build a targeted B2B database tailored to your ICP, industry, geography, and growth goals."
                buttonLabel="Get Started"
            />
            <CtaCard
                title="AI/ML Integrated Leads Databases"
                description="Access enriched, verified lead data powered by intelligent segmentation and intent signals."
                buttonLabel="Try it For Free"
            />
        </section>
    );
}
