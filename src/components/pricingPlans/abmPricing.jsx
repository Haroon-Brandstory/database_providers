"use client";
import Image from "next/image";

const plans = [
    {
        name: "Basic",
        tag: null,
        price: "$299",
        oldPrice: "$699",
        description: "For B2B, B2C & D2C Brands\nStarting Email Growth",
        cta: "Get Started",
        highlighted: false,
        features: [
            "ICP-based contacts/credits 5,000 verified",
            "Two newsletter designs",
            "30,000 email sends",
            "ABM campaign strategy",
            "Email copywriting included",
            "Target account segmentation",
            "Automated workflow sequences",
        ],
    },
    {
        name: "Advanced",
        tag: "Most popular",
        price: "$499",
        oldPrice: "$1299",
        description:
            "For Growing B2B, B2C & D2C Brands\nNeeding Consistent Lead Flow",
        cta: "Get Started",
        highlighted: true,
        features: [
            "ICP-based 10k contacts/credits",
            "Four newsletter designs",
            "60,000 email sends",
            "Multi-step ABM strategy",
            "Advanced personalized messaging",
            "Creative variant options",
            "Target account segmentation",
        ],
    },
    {
        name: "Plus",
        tag: "Best value for money",
        price: "$999",
        oldPrice: "$2299",
        description:
            "For Large B2B, B2C & D2C Brands\nRunning High-volume Campaigns",
        cta: "Get Started",
        highlighted: false,
        features: [
            "ICP-based 15,000 contacts/credits",
            "6 custom designs",
            "120,000 email sends",
            "Clustered messaging layers",
            "Deep account research (250+ accounts)",
            "Full-cycle nurture (drip + retargeting logic)",
            "Multivariate testing optimization",
        ],
    },
];

export default function AbmPricing() {
    return (
        <section className="bg-black pb-20 pt-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                    {plans.map((plan, idx) => (
                        <div
                            key={idx}
                            className={`relative rounded-3xl p-8 flex flex-col justify-between hover:scale-104 cursor-pointer transtion-all hover:shadow-[0_0_80px_rgba(59,130,246,0.35)] duration-300 ease-in-out
                                 ${plan.highlighted ? "bg-[url('/pricing-plan/favPlan-bg.png')] bg-center bg-norepeat bg-cover border border-blue-500  scale-102" : "bg-gradient-to-b from-[#0a0f2a] to-[#02030d] border border-white/10"
                                }`}
                        >
                            {/* Badge */}
                            {plan.tag && (
                                <span className={`absolute top-6 right-6 text-xs px-3 py-1 rounded-full font-medium  ${plan.highlighted ? "bg-blue-600 text-white" : "bg-yellow-400/10 text-yellow-300"
                                    }`}
                                >
                                    {plan.tag}
                                </span>
                            )}

                            {/* Header */}
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center ${plan.highlighted ? "bg-blue-600" : "bg-white/10"
                                            }`}
                                    >
                                        <span className="text-white text-lg">
                                            {plan.name === "Basic" && "✦"}
                                            {plan.name === "Advanced" && "⚡"}
                                            {plan.name === "Plus" && "👑"}
                                        </span>
                                    </div>
                                </div>

                                <h3 className="text-white text-2xl font-semibold mb-2">
                                    {plan.name}
                                </h3>

                                <p className="text-sm text-blue-100/70 whitespace-pre-line mb-6">
                                    {plan.description}
                                </p>

                                {/* Pricing */}
                                <div className="mb-6">
                                    <div className="flex items-end gap-2">
                                        <span className="text-white text-4xl font-bold">
                                            {plan.price}
                                        </span>
                                        {/* <span className="text-sm text-white/60 line-through">
                                            {plan.oldPrice}
                                        </span> */}
                                    </div>
                                    <p className="text-xs text-white/50 mt-1">/ per month</p>
                                </div>

                                {/* CTA */}
                                <button
                                    className={`w-full py-3 rounded-xl font-medium transition
                  ${plan.highlighted
                                            ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg"
                                            : "bg-white/10 text-white hover:bg-white/20"
                                        }`}
                                >
                                    {plan.cta}
                                </button>

                                <hr className="my-8 border-white/10" />

                                {/* Features */}
                                <h4 className="text-white text-sm font-semibold mb-4">
                                    What you will get
                                </h4>

                                <ul className="space-y-3 text-sm text-blue-100/80">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex gap-3">
                                            <span className="text-blue-400 mt-1">✔</span>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Know more */}
                            <button className="mt-6 text-sm text-blue-400 flex items-center gap-2">
                                <span className="text-lg">＋</span> Know More
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
