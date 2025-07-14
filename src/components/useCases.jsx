export default function useCases() {

    const emailBusiness_Content = [
        {
            title: "Lead Generation for B2B Sales Teams",
            description: "Use purchased B2B email lists to reach decision-makers across industries and drive more qualified leads into your sales pipeline.",
        },
        {
            title: "Targeted Email Campaigns by Geography",
            description: "Run hyper-local campaigns by purchasing email lists based on ZIP code, state, or city to promote regional offers and events.",
        },
        {
            title: "Healthcare Marketing Outreach",
            description: "Reach doctors, nurses, hospital administrators, and medical staff with industry-specific databases for healthcare marketing.",
        },
        {
            title: "Startup Product Launch Campaigns",
            description: "Launching a new SaaS tool or product? Use verified email leads to reach early adopters and beta users in your target market.",
        },
        {
            title: "Event Promotion and Webinar Invites",
            description: "Drive registrations by sending personalized invites to business professionals segmented by role, industry, or interest.",
        },
        {
            title: "Franchise and Dealer Network Expansion",
            description: "Find potential franchisees or dealer partners by purchasing industry-focused business contact lists.",
        },
        {
            title: "Recruitment Campaigns",
            description: "HR firms and recruiters can directly reach professionals and executives through curated email lists segmented by job role.",
        },
        {
            title: "Market Research Surveys",
            description: "Distribute surveys to a targeted audience and collect fast, reliable feedback using pre-verified email contact lists.",
        },
        {
            title: "Channel Partner and Reseller Outreach",
            description: "Find value-added resellers, distributors, or white-label partners by using industry-specific email lists.",
        },
        {
            title: "Promotions for B2C E-Commerce Offers",
            description: "B2C brands can use consumer email databases to run seasonal sales, cart recovery campaigns, and personalized discounts.",
        }
    ]

    return (
        <section className="py-20 px-4 md:px-20 bg-white">
            <div className="container mx-auto flex flex-col items-center justify-center">
                <div className="text-center max-w-4xl flex flex-col justify-center">
                    <h5 className="text-[#2C6BFF] text-[16px] font-medium">Use Cases</h5>
                    <h2 className="text-black text-[36px] font-medium mb-6">
                        How Businesses Use Our  <span className="block"><span className="text-[#00000080]">Email Databases</span></span>
                    </h2>
                </div>
                <div className="bg-[#F0F0FF] w-full lg:p-10 p-3 rounded-[20px]">
                    <div className="grid md:grid-cols-2 grid-cols-1  ">
                        {
                            emailBusiness_Content.map((item, index) => (

                                <div key={index} className="parent-text flex flex-col border-b-1 border-[#00000033] m-5">
                                    <h4 className="text-[24px] font-[500] text-black mb-6">{item.title}</h4>
                                    <p className="text-[#51525C] text-[16px] mb-8">{item.description}</p>
                                </div>
                            ))
                        }
                    </div>

                </div>
            </div>
        </section>
    )
}