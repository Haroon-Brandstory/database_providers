import { notFound } from "next/navigation";
import CareerDetail from "@/components/careers/CareerDetail";
import { getCareerBySlug, getCareerJobs } from "@/lib/careersData";
import { generateSeoMetadata } from "@/lib/seo";

export async function generateStaticParams() {
    const jobs = await getCareerJobs();
    return jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const job = await getCareerBySlug(slug);

    if (!job) {
        return { title: "Career Not Found | Database Providers" };
    }

    return generateSeoMetadata({
        locale: "en",
        slug: `careers/${job.slug}`,
        title: `${job.title} | Careers | Database Providers`,
        description: job.about,
        noIntl: true,
    });
}

export default async function CareerDetailPage({ params }) {
    const { slug } = await params;
    const job = await getCareerBySlug(slug);

    if (!job) notFound();

    return <CareerDetail job={job} applyHref="/contact-us/" />;
}
