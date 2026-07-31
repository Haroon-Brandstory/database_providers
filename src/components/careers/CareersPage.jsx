import CareersHero from "./CareersHero";
import WhyJoinUs from "./WhyJoinUs";
import JobVacancies from "./JobVacancies";

export default function CareersPage({ data }) {
    if (!data) return null;

    return (
        <main className="bg-white">
            <CareersHero {...data.hero} />
            <WhyJoinUs {...data.whyJoin} />
            <JobVacancies
                title={data.vacancies?.title || "Job Vacancies"}
                jobs={data.jobs}
                cta={data.vacancies?.cta}
            />
        </main>
    );
}
