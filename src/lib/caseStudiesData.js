function slugify(title) {
    return title
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}

export const caseStudies = [
    {
        slug: "2-7x-more-project-walkthroughs-in-60-days",
        title: "2.7X More Project Walkthroughs in 60 Days",
        excerpt:
            "Targeted lists across real estate, construction, and coworking unlocked decision-makers that were previously unreachable — turning outreach into booked conversations.",
        dateLabel: "Mon, Jun 10",
        dateISO: "2026-06-10",
        readTime: "8 min Read",
        views: 8420,
        comments: 18,
        author: "VS",
        shortTitle: "2.7X More Project Walkthroughs",
        industry: "Real Estate & Construction",
        featured: true,
        coverImage:
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
        body: [
            {
                type: "p",
                text: "A growth team selling workplace and project services needed decision-makers across real estate, construction, and coworking — roles their CRM barely covered. With verified title and industry filters from Database Providers, outreach shifted from generic volume to conversations with buyers who could book walkthroughs.",
            },
            {
                type: "h3",
                text: "The challenge",
            },
            {
                type: "p",
                text: "Existing lists were stale, bounced heavily, and skewed toward junior contacts. The team had a 60-day window to prove pipeline impact before renewing tools and agency spend.",
            },
            {
                type: "h3",
                text: "What changed",
            },
            {
                type: "ul",
                items: [
                    "Built segmented lists by industry, geography, and seniority",
                    "Suppressed known bounces and prior unsubscribes before launch",
                    "Aligned messaging to each vertical’s project buying cycle",
                    "Routed positive replies into a dedicated walkthrough booking flow",
                ],
            },
            {
                type: "h3",
                text: "Results",
            },
            {
                type: "p",
                text: "Within 60 days, project walkthrough bookings rose 2.7× versus the prior period. Reply quality improved because more conversations started with people who owned budget and timing — not just inbox access.",
            },
        ],
    },
    {
        slug: "30-percent-sales-lift-with-targeted-lead-generation",
        title: "30% Sales Lift With Targeted Lead Generation",
        excerpt:
            "Precision targeting replaced spray-and-pray outbound, giving sales a cleaner pipeline of ICP-fit accounts and measurable lift in closed revenue.",
        dateLabel: "Fri, May 16",
        dateISO: "2026-05-16",
        readTime: "6 min Read",
        views: 5210,
        comments: 11,
        author: "AM",
        resultPill: "+30% Sales growth",
        shortTitle: "30% Sales Lift",
        industry: "B2B SaaS",
        featured: false,
        coverImage:
            "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80",
        body: [
            {
                type: "p",
                text: "A mid-market SaaS sales org was missing quota because SDRs spent more time hunting emails than selling. Verified, ICP-aligned contact data changed the ratio of productive dials and emails to noise.",
            },
            {
                type: "h3",
                text: "Approach",
            },
            {
                type: "ul",
                items: [
                    "Defined ICP by company size, industry, and buying titles",
                    "Refreshed target account coverage with verified emails",
                    "Weekly suppression of hard bounces and role changes",
                ],
            },
            {
                type: "p",
                text: "Sales attributed a 30% lift in closed-won contribution from outbound sequences that used the new lists versus the previous quarter’s generic purchases.",
            },
        ],
    },
    {
        slug: "4-years-of-consistent-high-quality-leads",
        title: "4 Years of Consistent, High-Quality Leads",
        excerpt:
            "A long-term partnership kept list quality steady through market shifts — so campaigns could scale without rebuilding data from scratch every year.",
        dateLabel: "Wed, Apr 30",
        dateISO: "2026-04-30",
        readTime: "5 min Read",
        views: 3980,
        comments: 6,
        author: "SK",
        resultPill: "4 yrs Partnership",
        shortTitle: "4 Years of Consistent Leads",
        industry: "Agency",
        featured: false,
        coverImage:
            "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
        body: [
            {
                type: "p",
                text: "An agency partner needed reliable multi-client list delivery without quality cliffs. Over four years, recurring refreshes and title-level targeting kept campaigns stable even as client ICPs evolved.",
            },
            {
                type: "p",
                text: "Consistency mattered as much as one-off accuracy: shared suppression logic, clear SLAs, and repeatable segment templates reduced onboarding time for each new client launch.",
            },
        ],
    },
    {
        slug: "new-market-contacts-beyond-existing-reach",
        title: "New Market Contacts Beyond Existing Reach",
        excerpt:
            "Expanding into a new region meant finding buyers outside the CRM. Fresh verified contacts opened coverage where sales previously had zero local footing.",
        dateLabel: "Mon, Apr 14",
        dateISO: "2026-04-14",
        readTime: "4 min Read",
        views: 2740,
        comments: 3,
        author: "AB",
        resultPill: "New contact pools",
        shortTitle: "New Market Contacts",
        industry: "Expansion",
        featured: false,
        coverImage:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
        body: [
            {
                type: "p",
                text: "Entering a new market with a thin CRM is a cold start. Verified regional contacts — filtered by role and company profile — gave the team a first wave of conversations without waiting months for organic inbound.",
            },
        ],
    },
    {
        slug: "95-percent-mail-delivery-with-proven-targeting",
        title: "95% Mail Delivery With Proven Targeting",
        excerpt:
            "Better verification and suppression pushed deliverability to 95%, protecting domain reputation while keeping send volume meaningful.",
        dateLabel: "Tue, Mar 25",
        dateISO: "2026-03-25",
        readTime: "7 min Read",
        views: 6155,
        comments: 14,
        author: "AS",
        resultPill: "95% Mail delivery",
        shortTitle: "95% Mail Delivery",
        industry: "Demand Gen",
        featured: false,
        coverImage:
            "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
        body: [
            {
                type: "p",
                text: "High bounce rates were throttling send volume and risking domain health. After moving to verified segments and tighter hygiene, campaigns sustained ~95% delivery on targeted batches.",
            },
            {
                type: "ul",
                items: [
                    "Pre-send verification on new segments",
                    "Hard-bounce and complaint suppression between waves",
                    "Smaller, persona-specific batches instead of one mega-list",
                ],
            },
        ],
    },
    {
        slug: "hitting-sales-goals-with-potential-customers-only",
        title: "Hitting Sales Goals With Potential Customers Only",
        excerpt:
            "ICP-only outreach cut wasted touches. Sales spent time on accounts that matched budget, industry, and buying role — and goals followed.",
        dateLabel: "Thu, Mar 6",
        dateISO: "2026-03-06",
        readTime: "5 min Read",
        views: 4470,
        comments: 9,
        author: "DS",
        resultPill: "ICP-only outreach",
        shortTitle: "Potential Customers Only",
        industry: "Sales Ops",
        featured: false,
        coverImage:
            "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
        body: [
            {
                type: "p",
                text: "When every contact looked equal, productivity collapsed. Narrowing to potential customers only — by firmographics and title — restored focus and helped the team hit quarterly goals with fewer total touches.",
            },
        ],
    },
    {
        slug: "faster-pipeline-growth-with-healthcare-contacts",
        title: "Faster Pipeline Growth With Healthcare Contacts",
        excerpt:
            "Verified physicians and administrators helped a healthcare marketer fill pipeline faster with role-accurate outreach.",
        dateLabel: "Fri, Feb 14",
        dateISO: "2026-02-14",
        readTime: "6 min Read",
        views: 3890,
        comments: 7,
        author: "DP",
        resultPill: "Verified outreach",
        shortTitle: "Healthcare Contacts",
        industry: "Healthcare",
        featured: false,
        coverImage:
            "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
        body: [
            {
                type: "p",
                text: "Healthcare buying committees are specific. Accurate specialty and admin contacts shortened the path from first touch to qualified opportunity compared with generic medical lists used before.",
            },
        ],
    },
].map((item) => ({ ...item, slug: item.slug || slugify(item.title) }));

export function getAllCaseStudies() {
    return caseStudies;
}

export function getCaseStudyBySlug(slug) {
    return caseStudies.find((item) => item.slug === slug) ?? null;
}

export function getFeaturedCaseStudy() {
    return caseStudies.find((item) => item.featured) ?? caseStudies[0];
}

export function getRelatedCaseStudies(slug, limit = 3) {
    return caseStudies.filter((item) => item.slug !== slug).slice(0, limit);
}
