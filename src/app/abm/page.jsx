import AbmBanner from "@/components/abm/abmBanner";
import AbmBenefits from "@/components/abm/abmBenefits";
import AbmFaq from "@/components/abm/abmFaq";
import AbmTwoCol from "@/components/abm/abmTwoCol";
import ExcelSec from "@/components/abm/excelSec";
import HeadAndTwoCol from "@/components/abm/headTwoCol";
import LaunchAbm from "@/components/abm/launchAbm";
import StepMeter from "@/components/abm/stepMeter";
import WhyChooseAbm from "@/components/abm/whyChooseAbm";

const TwoColSecContent = {
    image: "/abm/marketing-is-losing.png",
    imgAlt: "Marketing is Losing",
    imgWidth: "658",
    imgHeight: "557",
    bubbleTitle: "Pain Point",
    title: "Your Marketing Is Losing Money by Targeting the Wrong Audiences",
    description: "The majority of businesses drain their budgets on wide-reaching campaigns that generate low-quality leads.Sales teams end up pursuing prospects with no buying intent, while poor data and outdated contacts weaken conversions. <span class='block mt-3'>Campaigns lack personalization and fail to resonate with key accounts, and without alignment between teams, pipeline quality becomes inconsistent and difficult to scale.</span>",
    cta: {
        label: "See pricing",
        url: "/pricing-plan?query=abm"
    }
}

const marketingIsLosing = {
    image: "/abm/account-based-marketing.png",
    imgWidth: "555",
    imgHeight: "417",
    imgAlt: "Account Based Marketing",
    bubbleTitle: "Pain Point",
    title: "Account-Based Marketing That Turns High-Value Accounts Into Revenue",
    cta: {
        url: "contact-us",
        label: "Get Started",
    },
    sectionContentisList: [
        "Focuses marketing and sales on high-value target accounts, not random leads",
        "Built specifically for B2B organisations selling to decision-makers",
        "Uses intent data to identify accounts actively in the buying stage",
        "Relies on verified contact data for accurate outreach",
        "Delivers personalised messaging to multiple stakeholders within each account",
        "Improves pipeline quality and deal velocity",
        "Creates a predictable, account-first growth engine",
    ],
}

const PriorityTwoCol = {
    image: "/abm/abm-prioritizing.png",
    imgAlt: "ABM Prioritizing",
    imgWidth: "658",
    imgHeight: "413",
    bubbleTitle: "Why Is ABM Essential for Businesses?",
    title: "Prioritizing Key Accounts Delivers Measurable Results",
    description: "ABM is a strategy that directs marketing resources. It prioritizes revenue-ready buyers rather than generic audiences. It increases deal size through tailored engagement that resonates with decision-makers. Sales and marketing collaborate around a shared, predictable pipeline. Personalization boosts response rates and accelerates conversions. Ultimately, ABM turns your funnel into a high-return growth engine.",
}

const accountBasedMarketing = {
    image: "/abm/flexible-abm.png",
    imgWidth: "555",
    imgHeight: "281",
    cta:{
        url: "/pricing?query=abm",
        label: "See Pricing",
    },
    imgAlt: "Flexible ABM Packages Built for Every Growth Stage ",
    bubbleTitle: "ABM Service Packages ",
    title: "Flexible ABM Packages Built for Every Growth Stage ",
    sectionContentisPara: "Choose from starter, growth, and enterprise-level ABM plans tailored to your pipeline goals and team capacity. Each package applies the principles of account-based marketing (ABM) and key account marketing to focus on targeting high-value accounts with personalized campaigns. Your resources go to a distinct market rather than pursuing broad-based outreach, enabling predictable, revenue-first scaling."
}

const ExcelSecContent = {
    bubbleTitle: "End-to-End ABM Deliverables",
    title: "Everything You Need for Full-Funnel ABM Execution",
    para: "You receive verified contacts, personalized messaging, creative variations, multi-channel activation, analytics dashboards, account-level insights, and performance reports. Every deliverable is designed to help you break into priority accounts and accelerate conversions.",
}

const abmBenefitSection = {
    bubbleTitle: "Benefits of ABM",
    title: "Stronger Targeting. Deeper Engagement. Higher Revenue."
}

const abmFaqs = [
    {
        question: "What exactly is Account-Based Marketing, and how does it work?",
        answer: "ABM focuses on high-value accounts using personalized, multi-channel engagement to drive faster, more meaningful conversions."
    },
    {
        question: "How do you identify and select high-value target accounts for ABM?",
        answer: "We use ICP criteria, intent signals, firmographics, and verified decision-maker data to shortlist accounts with real revenue potential."
    },
    {
        question: "What data do you use to personalize ABM campaigns?",
        answer: "We combine intent data, industry insights, job roles, challenges, and verified contact intelligence to shape tailored messaging."
    },
    {
        question: "How long does it take to launch a complete ABM program?",
        answer: "A complete ABM rollout typically takes 7–14 days, depending on research depth, personalization layers, and channel setup."
    },
    {
        question: "Which channels are included in your ABM execution?",
        answer: "Email, LinkedIn, landing pages, outbound touches, and content-driven engagement are integrated for multi-touch outreach."
    },
    {
        question: "How do you measure ABM success and ROI?",
        answer: "We track engagement, conversions, pipeline influence, account lift, and revenue contribution through real-time ABM dashboards."
    },
    {
        question: "What tools and platforms power your ABM campaigns?",
        answer: "We work with leading ABM, CRM, automation, and data tools for targeting, activation, analytics, and optimization."
    },
    {
        question: "Can ABM work for small teams or early-stage companies?",
        answer: "Yes, ABM scales easily; even small teams can target a focused set of accounts and generate a high-quality pipeline."
    },
    {
        question: "How personalized does an ABM campaign need to be?",
        answer: "ABM personalization is built around each account’s intent, challenges, and decision-maker roles to create messages that drive faster engagement."
    },
    {
        question: "How do Database Providers support ongoing optimization and scaling?",
        answer: "We refine audiences, enhance personalization, optimize channels, and provide continuous insights to keep ABM performance improving."
    },
]

export default function ABM() {
    return (
        <>
            <AbmBanner />
            <AbmTwoCol content={TwoColSecContent} />
            <HeadAndTwoCol content={marketingIsLosing} />
            <StepMeter />
            <AbmTwoCol content={PriorityTwoCol} />
            <HeadAndTwoCol content={accountBasedMarketing} />
            <ExcelSec content={ExcelSecContent} />
            <AbmBenefits content={abmBenefitSection} />
            <WhyChooseAbm />
            <LaunchAbm />
            <AbmFaq faqs={abmFaqs} />
        </>
    )
}