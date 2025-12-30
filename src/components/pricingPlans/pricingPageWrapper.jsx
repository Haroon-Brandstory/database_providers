"use client";
import AbmCta from "@/components/pricingPlans/abmCta";
import AbmPricing from "@/components/pricingPlans/abmPricing";
import BulkCta from "@/components/pricingPlans/bulkCta";
import CustomDataAttribute from "@/components/pricingPlans/customDataAttribute";
import CustomerReviewPricing from "@/components/pricingPlans/customerReviewPricing";
import CustomPricingPlan from "@/components/pricingPlans/customPricingPlan";
import DataProcessWorks from "@/components/pricingPlans/dataProcessWorks";
import FaqAccordion from "@/components/pricingPlans/faqAccordion";
import PricingBanner from "@/components/pricingPlans/pricingBanner";
import { useState } from "react";

const reviews = [
    {
        text: "If your company's not talking to potential customers, then you are lacking behind generating revenue. But if you start working with Database Providers who target only potential customers, then you can easily achieve your sales goals just like we did. Their data helped us reach the right insurance claim professionals, which was key to growing Prema Consulting Group’s forensic engineering services.",
        name: "Steve Pignotti, Chief Growth Officer",
        company: "Prema Consulting Group",
    },
    {
        text: "B2B global database is hard to reach but with Database Providers it was really easy. We reached 32% of our sales goals within the first month. Their support with BFSI and government tech decision-maker data in UAE and Saudi Arabia gave SquareOne the edge we needed in a competitive market.",
        name: "Minosh Salam, Chief Operating Officer",
        company: "SquareOne",
    },
    {
        text: "Reaching the right UHNI buyers in Chennai was a challenge until we partnered with Database Providers. Their data was spot on. Within just one month, we saw a 3.2X increase in high-intent enquiries and a 48% improvement in our lead-to-site-visit ratio. It gave our outreach the precision it needed.",
        name: "Shiny VR, Sourcing Manager",
        company: "Mahindra Lifespaces",
    },
    {
        text: "We were struggling to connect with the right people in supply chain and warehouse management. After partnering with Database Providers, we saw a 3.5X jump in demo requests and a 60% increase in qualified leads within the first month. Their database gave our outreach the exact push it needed.",
        name: "Maya, Marketing Analyst",
        company: "Armstrong",
    },
    {
        text: "Our ABM campaigns used to feel like we were casting a wide net and hoping for the best. Database Providers helped us shift gears. Their data didn’t just fill our pipeline, it filled it with the right people. In just six weeks, we doubled our response rate and saw a 50% boost in sales-qualified meetings. It finally felt like our outreach was working for us. Their targeted IT decision-maker database across key industries and company sizes gave MicroGenesis TechSoft the focus we needed to grow in both India and Sweden.",
        name: "Santy Nelson,Business Head",
        company: "Microgenesis",
    },
    {
        text: "In the aviation space, timing and precision are everything—even when it comes to partnerships. Database Providers helped us connect with the right airline companies through a focused and reliable database. Within a short span, our outreach led to a 2.5X increase in partnership conversations and opened doors that had been silent for far too long.",
        name: "Kritika Seth, Executive Director",
        company: "Allied Avaiation",
    },
];

const abmReviews = [
    {
        text: "Database Providers helped us reach the right insurance and claims professionals with precision. Their ABM-driven targeting ensured our outreach landed with decision-makers who understood our services. These improvements led to more relevant conversations and stronger engagement across key accounts.",
        name: "Steve Pignotti, Chief Growth Officer",
        company: "Prema Consulting Group"
    },
    {
        text: "Database Providers helped us reach the right enterprise buyers, distributors, and project stakeholders. Their account-focused targeting made our outreach more relevant to ongoing infrastructure and procurement needs. Sales follow-ups improved, with better responses and higher-quality conversion discussions.",
        name: "",
        company: "Arrow Pipes"
    },
    {
        text: "Precision-driven outreach helped us reach aviation and infrastructure decision-makers with clarity and focus. Their ABM-led targeting improved engagement across priority accounts at the right moment.",
        name: "Kritika Seth, Executive Director",
        company: "Allied Aviation"
    },
    {
        text: "Database Providers enabled precise ABM execution that strengthened our outreach to healthcare partners and key decision-makers. The quality of conversations improved across campaigns.",
        name: "Sanjeev Jacob, Business Manager",
        company: "Natural Remedies"
    },
    {
        text: "We needed visibility into accounts with real buying potential. Their ABM approach brought clarity and structure to outreach. Sales and marketing alignment improved significantly.",
        name: "Vinay S R, Managing Director",
        company: "Panache Interiors"
    },
    {
        text: "Database Providers helped bring structure and clarity to our ABM campaigns. Their account-level insights enabled us to prioritize the right enterprise opportunities and decision-makers. Results were measurable and focused on outcomes, not just impressions.",
        name: "",
        company: "HexaCorp"
    },
]

const faqs = [
    {
        question: "How is your data different from automated tools?",
        answer: "We manually research, verify, and review every contact after understanding your ICP—no instant or tool-based data."
    },
    {
        question: "How accurate is your data?",
        answer: "Our multi-layer verification ensures 95%+ email deliverability."
    },
    {
        question: "Is your data GDPR and CAN-SPAM compliant?",
        answer: "Yes. All data is sourced from compliant and permission-based sources."
    },
    {
        question: "Do you provide instant data or downloads?",
        answer: "No. All data is custom-built after a discovery call to ensure accuracy, relevance, and intent alignment."
    },
    {
        question: "What information do you need to get started?",
        answer: "To obtain started, we need information about the industry, job titles, location, company size, and campaign objective. We will help define these details during the call."
    },
    {
        question: "What data fields are included?",
        answer: "Name, business email, job title, company, and location. Custom fields are available on request."
    },
    {
        question: "Do you provide mobile numbers or direct dials?",
        answer: "We may provide publicly available business mobile numbers where legally permissible. Availability depends on industry, region, and compliance rules."
    },
    {
        question: "Can I use this data in my CRM?",
        answer: "Yes. We map and format data to match your CRM for easy upload."
    },
    {
        question: "In which format will I receive the data?",
        answer: "Excel or CSV—clean, organized, and CRM-ready."
    },
    {
        question: "How long does delivery take?",
        answer: "Typically, the response time is 24–72 hours after ICP confirmation, depending on the volume of requests and their complexity."
    },
    {
        question: "Do you offer replacements for invalid contacts?",
        answer: "Yes. Replacements are provided as per our quality assurance policy."
    },
    {
        question: "Can you handle niche or custom industries?",
        answer: "Yes. We specialize in custom and hard-to-reach ICPs."
    },
    {
        question: "Do you support global data requirements?",
        answer: "Yes. We provide region-specific and global B2B datasets, subject to compliance rules."
    },
    {
        question: "What happens if data availability is lower than expected?",
        answer: "If niche targeting limits the data volume, we will notify you beforehand and recommend alternative filters."
    },
    {
        question: "Can I talk to someone before placing an order?",
        answer: "Absolutely. You can book a demo to discuss requirements and timelines."
    },
    {
        question: "What is a Credit?",
        answer: "A credit is a unit used to measure data delivery. 1 Credit = 1 Verified Contact. Each credit represents one verified contact record, including business email, name, job title, company information, and agreed- upon fields."
    },
];

const abmFaqs = [
    {
        question: "How can I get started?",
        answer: "Simply share your requirements below; our specialists will prepare a tailored campaign proposal within 24 hours."
    },
    {
        question: "What’s included in campaign package?",
        answer: "Everything from verified data, domain setup, and authentication to creative design, sending, and analytics. We manage the full campaign process from start to finish."
    },
    {
        question: "Will a domain be purchased for my campaign?",
        answer: "Yes. A new secondary domain is purchased and configured to protect your main domain’s reputation."
    },
    {
        question: "What’s the typical setup timeline?",
        answer: "The initial setup — domain, authentication, warm-up, and creative — takes approximately 4–6 business days before launch."
    },
    {
        question: "How do you ensure compliance with email regulations (like CAN-SPAM or GDPR)?",
        answer: "We strictly follow all global email compliance standards, including CAN-SPAM, GDPR, and ICA, ensuring your campaigns are fully compliant."
    },
    {
        question: "Can I customize the content for my campaigns?",
        answer: "Yes. All newsletters and emails are fully customizable, from subject lines to creative design and messaging to align with your brand voice."
    },
    {
        question: "Do you use animated or video content?",
        answer: "No. We use static, visually appealing designs for better inbox compatibility and faster load times."
    },
    {
        question: "Can I segment my audience within a campaign?",
        answer: "Yes. We support advanced segmentation, allowing you to send tailored messages to different industries, roles, or company sizes for better engagement."
    },
    {
        question: "Can I send campaigns to multiple regions or countries?",
        answer: "Absolutely. Our verified global databases allow campaigns to target multiple geographies, industries, and job roles with precision."
    },
    {
        question: "Can these campaigns support ABM targeting?",
        answer: "Absolutely. Our approach is designed for Account-Based Marketing, enabling hyper-targeted outreach to key decision-makers."
    },
    {
        question: "Do Database Providers support ongoing newsletter campaigns?",
        answer: "Yes. You can run regular newsletters using our verified databases, optimized domain setup, and performance tracking to maintain consistent audience engagement."
    },
    {
        question: "How do you ensure strong deliverability?",
        answer: "Through SPF, DKIM, DMARC setup, MX, premium mailbox warm-up, and continuous monitoring of sender reputation."
    },
    {
        question: "Do you provide testing before full deployment?",
        answer: "Yes. Every campaign undergoes A/B testing for subject lines and designs, and we run test sends to ensure deliverability and performance."
    },
    {
        question: "What happens if emails bounce or are undelivered?",
        answer: "Bounced or undelivered emails are tracked, analyzed, and filtered from future sends. Our team helps improve targeting and data quality to reduce future bounces."
    },
    {
        question: "Who owns the campaign assets?",
        answer: "All domains, sender IDs, Data, and creatives remain yours. Access can be transferred upon request after campaign completion."
    },
    {
        question: "Do you provide post-campaign insights?",
        answer: "Yes, every campaign comes with detailed analytics, including delivery, open rate, click rate, bounce rate, and lead quality."
    },
    {
        question: "How is campaign performance measured?",
        answer: "We provide actionable insights, including open rates, click-through rates, bounce rates, lead quality, and engagement metrics for each campaign."
    },
    {
        question: "Are there limits on email volume or campaign frequency?",
        answer: "Each package includes a defined email send limit, but campaigns can be scaled or customized depending on your requirements with our Enterprise or Custom plans."
    },
    {
        question: "Can I schedule campaigns in advance?",
        answer: "Yes. You can set up campaigns to launch on specific dates and times, allowing you to plan outreach strategically and coordinate with product launches, events, or promotions."
    },
    {
        question: "Can I upgrade or switch my package mid-campaign?",
        answer: "Yes. Packages are flexible. You can upgrade to higher tiers or add custom features anytime based on evolving campaign needs."
    },
]

const abmCta = {
    title: "Not sure how to reach the right accounts? Let’s <br/><span class='gradient-text'>run ABM the right way</span>",
    description: "Book a quick call with our ABM experts. We identify your ideal accounts, set up the outreach, and deliver qualified leads—end to end.",
    cta: "Book Your ABM Consultation"
}

const bulkCta = {
    title: "Not sure which data fits your ICP? <br/><span class='gradient-text'>Let’s build custom data</span>",
    description: "Book a quick call with our data expert. We understand your ICP, define targeting, and deliver high-accuracy data tailored to your business.",
    cta: "Book Your Data Consultation"
}

const steps = [
    {
        icon: "/pricing-plan/dataProcess-step1.svg",
        title: "Client Discovery",
        description: "We begin with a discovery call to understand your business goals and Ideal Customer Profile (ICP).",
    },
    {
        icon: "/pricing-plan/dataProcess-step2.svg",
        title: "Data Segmentation",
        description: "Contacts are segmented by industry, job role, region, and company size.",
    },
    {
        icon: "/pricing-plan/dataProcess-step3.svg",
        title: "Multi-Layer Verification",
        description: "AI, SMTP checks, and human QA ensure 95%+ accuracy.",
    },
    {
        icon: "/pricing-plan/dataProcess-step4.svg",
        title: "Data Delivery",
        description: "CRM-ready data delivered securely within 24 hours.",
    },
    {
        icon: "/pricing-plan/dataProcess-step5.svg",
        title: "Data Delivery",
        description: "CRM-ready data delivered securely within 24 hours.",
    },
    {
        icon: "/pricing-plan/dataProcess-step6.svg",
        title: "Data Delivery",
        description: "CRM-ready data delivered securely within 24 hours.",
    },
];

const abmSteps = [
    {
        icon: "/pricing-plan/abm-slider-img (1).svg",
        title: "Client Discovery & ABM Goal Setting",
        description: "We start with a discovery call to understand your business goals, target accounts, buying cycle, and Ideal Customer Profile (ICP).",
    },
    {
        icon: "/pricing-plan/abm-slider-img (2).svg",
        title: "ICP Finalization & Account Targeting",
        description: "Based on the discussion, we finalize industries, job titles, company size, revenue range, regions, and technology filters to define high-value target accounts.",
    },
    {
        icon: "/pricing-plan/abm-slider-img (3).svg",
        title: "Custom Data Build & Account Research",
        description: "Using our verified data sources, we build a custom account and decision-maker list aligned to your ICP, focusing only on relevant and reachable prospects.",
    },
    {
        icon: "/pricing-plan/abm-slider-img (4).svg",
        title: "Technical Setup & Deliverability Foundation",
        description: "We set up a secondary domain, configure SPF, DKIM, DMARC, DNS records, create sender email IDs, and warm them up using AI-powered models to ensure inbox placement.",
    },
    {
        icon: "/pricing-plan/abm-slider-img (5).svg",
        title: "ABM Messaging & Campaign Execution",
        description: "We design personalized email campaigns and newsletters tailored to your target personas, run structured outreach, and follow up with drip campaigns based on engagement behavior.",
    },
    {
        icon: "/pricing-plan/abm-slider-img (6).svg",
        title: "Engagement Tracking & Optimization",
        description: "We monitor opens, clicks, replies, and intent signals in real time and optimize messaging to improve response rates and Qualified Lead (QL) generation.",
    },
    {
        icon: "/pricing-plan/abm-slider-img (7).svg",
        title: "AI Analytics & Qualified Lead Handover",
        description: "You receive detailed AI-driven performance reports along with verified Qualified Leads and insights to support your sales follow-up and pipeline growth.",
    },
];

export default function PricingPageWrapper() {

    const [plan, setPlan] = useState("bulk");

    return (
        <>
            <PricingBanner onChange={setPlan} defaultPlan={plan} />
            {plan === "abm" && (
                <>
                    <AbmPricing />
                    <DataProcessWorks steps={abmSteps} title={"How Our ABM Campaign Process Works"} />
                    <CustomerReviewPricing title={"What Our Customers say"} reviews={abmReviews} />
                    <FaqAccordion faqs={abmFaqs} />
                    {/* <AbmCta /> */}
                    <BulkCta content={abmCta} />
                </>
            )}
            {plan === "bulk" && (
                <>
                    <CustomPricingPlan />
                    <CustomDataAttribute />
                    <DataProcessWorks steps={steps} title={"How Our Data Process Works"} />
                    <CustomerReviewPricing title={"Customer Reviews"} reviews={reviews} />
                    <FaqAccordion faqs={faqs} />
                    <BulkCta content={bulkCta} />
                </>
            )}
        </>
    );
}