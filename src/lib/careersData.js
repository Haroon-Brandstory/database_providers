/**
 * Careers page content — Strapi-ready shape.
 * Swap getCareersPageData() / getCareerBySlug() to fetchAPI later.
 */

export const careersPageData = {
    seo: {
        title: "Careers | Database Providers",
        description:
            "Join Database Providers. Explore open roles across lead research, email campaigns, and B2B data operations.",
    },
    hero: {
        title: "Let's Build the Future of the B2B Data Solution Industry",
        description:
            "Develop a successful career with Database Service Providers, a reputed B2B data service provider in the USA that excels in segmenting and optimizing key data information. Working with us ensures growth, sustainability and work satisfaction.",
        image: {
            src: "/careers/careers-hero-animation.png",
            alt: "Person navigating a maze toward a golden star",
            width: 1024,
            height: 364,
        },
    },
    whyJoin: {
        title: "Why Join Us",
        description:
            "Get the best-in-class opportunities with us to recognize your strength and thrive in your career.",
        cards: [
            {
                id: "inclusive",
                title: "Proactive and Inclusive Work Environment",
                description:
                    "We pay attention to bringing out and enhancing every employee's unique strengths, thereby providing an inclusive work culture where all can work without inhibition.",
                image: {
                    src: "/careers/proactive.png",
                    alt: "Inclusive workplace interview illustration",
                    width: 315,
                    height: 218,
                },
                variant: "wide",
            },
            {
                id: "learning",
                title: "Learning & Growth Opportunity",
                description:
                    "Get the right opportunities to spruce up your skills, enhance your knowledge and stay ahead in the evolving data-driven global landscape.",
                variant: "narrow",
            },
            {
                id: "experts",
                title: "Scope to work with Global Industry Experts",
                description:
                    "Unlock the best career prospects for you while communicating and working with leading industry experts across the globe.",
                variant: "narrow",
            },
            {
                id: "vision",
                title: "Value-driven Brand Vision",
                description:
                    "Unlike many other data service companies, we strongly believe in maintaining our core values and ethics, including assured employee benefits and a healthy work-life balance.",
                image: {
                    src: "/careers/buildings.png",
                    alt: "Modern office buildings illustration",
                    width: 348,
                    height: 285,
                },
                variant: "wide",
            },
        ],
    },
    vacancies: {
        title: "Job Vacancies",
        cta: {
            label: "Join A Team that Values You! →",
            href: "/contact-us",
        },
    },
    jobs: [
        {
            slug: "junior-lead-executive",
            title: "Junior Lead Executive (Onsite/Remote)",
            location: "USA",
            employmentType: "Full-time",
            experience: "1-2 years",
            about:
                "We, Database Service Providers, are seeking a creative, dynamic, detail-oriented, and proactive mind who can develop and implement best-in-class data research and lead-generation strategies. In this role, you will be responsible for identifying, validating and maintaining high-quality B2B data, which enables our clients to reach the right decision-makers.",
            responsibilities: [
                "Research and collect accurate B2B contact data",
                "Verify and update collected data",
                "Segment data depending on our client's request",
                "Conduct regular quality checks to ensure high quality of the data",
                "Monitor and maintain data validation and compliance standards",
                "Collaborate with data analysts and senior data executives of our internal teams",
                "Good communication skills and team-building abilities",
            ],
            eligibility: [
                "Bachelor's degree or equivalent professional experience",
                "Strong and efficient online data research and navigation skills",
                "Keen attention to detail and the accuracy of the data",
                "Understanding of B2B marketing and lead generation",
                "Experience of working in MS. Excel, Google Sheets, and CRM systems",
                "Ability to work in a fast-paced work environment and meet deadlines",
            ],
            closingNote:
                "If you enjoy working with B2B data and are eager to boost your career in it, this role is for you. Apply today.",
        },
        {
            slug: "email-campaign-specialist",
            title: "Email Campaign Specialist",
            location: "USA",
            employmentType: "Full-time",
            experience: "1-2 years",
            about:
                "We are currently looking for an innovative and passionate mind who can efficiently manage, execute and optimize diverse email outreach campaigns for B2B companies. In this role, you have to focus on creating high-conversion email campaigns with targeted data while working closely with our data teams.",
            responsibilities: [
                "Plan and execute B2B email outreach campaigns",
                "Segment audiences using verified contact data",
                "Optimize subject lines, copy, and send cadence for conversions",
                "Track campaign performance and iterate based on results",
                "Collaborate with data and sales teams on targeting",
            ],
            eligibility: [
                "Bachelor's degree or equivalent professional experience",
                "Hands-on experience with email marketing tools",
                "Strong written communication skills",
                "Familiarity with B2B lead generation",
                "Ability to analyze campaign metrics and improve ROI",
            ],
            closingNote:
                "If you love building high-performing outreach programs, apply today.",
        },
    ],
};

export async function getCareersPageData() {
    // Future: return fetchAPI("/career-page?populate=...")
    return careersPageData;
}

export async function getCareerJobs() {
    const data = await getCareersPageData();
    return data.jobs;
}

export async function getCareerBySlug(slug) {
    const jobs = await getCareerJobs();
    return jobs.find((job) => job.slug === slug) ?? null;
}
