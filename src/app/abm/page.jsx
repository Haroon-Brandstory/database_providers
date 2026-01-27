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
    bubbleTitle: "Pain Point",
    title: "Prioritizing Key Accounts Delivers Measurable Results",
    description: "ABM is a strategy that directs marketing resources. It prioritizes revenue-ready buyers rather than generic audiences. It increases deal size through tailored engagement that resonates with decision-makers. Sales and marketing collaborate around a shared, predictable pipeline. Personalization boosts response rates and accelerates conversions. Ultimately, ABM turns your funnel into a high-return growth engine.",
}

const accountBasedMarketing = {
    image: "/abm/flexible-abm.png",
    imgWidth: "555",
    imgHeight: "281",
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
        question: "What is Account-Based Marketing (ABM)?",
        answer: "Account-Based Marketing (ABM) is a strategic approach where marketing and sales teams focus their efforts on specific high-value accounts rather than targeting broad audiences. It involves personalizing messaging and campaigns for each account, aligning with decision-makers, and creating tailored experiences to drive engagement and revenue."
    },
    {
        question: "What is Account-Based Marketing (ABM)?",
        answer: "Account-Based Marketing (ABM) is a strategic approach where marketing and sales teams focus their efforts on specific high-value accounts rather than targeting broad audiences. It involves personalizing messaging and campaigns for each account, aligning with decision-makers, and creating tailored experiences to drive engagement and revenue."
    },
    {
        question: "What is Account-Based Marketing (ABM)?",
        answer: "Account-Based Marketing (ABM) is a strategic approach where marketing and sales teams focus their efforts on specific high-value accounts rather than targeting broad audiences. It involves personalizing messaging and campaigns for each account, aligning with decision-makers, and creating tailored experiences to drive engagement and revenue."
    },
    {
        question: "What is Account-Based Marketing (ABM)?",
        answer: "Account-Based Marketing (ABM) is a strategic approach where marketing and sales teams focus their efforts on specific high-value accounts rather than targeting broad audiences. It involves personalizing messaging and campaigns for each account, aligning with decision-makers, and creating tailored experiences to drive engagement and revenue."
    },
    {
        question: "What is Account-Based Marketing (ABM)?",
        answer: "Account-Based Marketing (ABM) is a strategic approach where marketing and sales teams focus their efforts on specific high-value accounts rather than targeting broad audiences. It involves personalizing messaging and campaigns for each account, aligning with decision-makers, and creating tailored experiences to drive engagement and revenue."
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