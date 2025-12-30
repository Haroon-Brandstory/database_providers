"use client";

import { useEffect, useState } from "react";

const DIY_NEWSLETTER_COST = 1420;
const DIY_ABM_EXTRA_COST = 820;

export default function ROI() {
    const [plan, setPlan] = useState(299);
    const [months, setMonths] = useState(1);
    const [leads, setLeads] = useState(50);
    const [closeRate, setCloseRate] = useState(10);
    const [dealValue, setDealValue] = useState(3000);

    const [results, setResults] = useState({
        diyCost: 0,
        yourCost: 0,
        savings: 0,
        deals: 0,
        revenue: 0,
        profit: 0,
        roi: 0,
    });

    useEffect(() => {
        calculate();
    }, [plan, months, leads, closeRate, dealValue]);

    const calculate = () => {
        let diyMonthlyCost = DIY_NEWSLETTER_COST;
        if (plan === 749) diyMonthlyCost += DIY_ABM_EXTRA_COST;

        const diyCost = diyMonthlyCost * months;
        const yourCost = plan * months;
        const savings = diyCost - yourCost;

        const deals = Math.round(leads * (closeRate / 100) * months);
        const revenue = deals * dealValue;
        const profit = revenue - yourCost;
        const roi = yourCost > 0 ? ((profit / yourCost) * 100).toFixed(1) : 0;

        setResults({
            diyCost,
            yourCost,
            savings,
            deals,
            revenue,
            profit,
            roi,
        });
    };

    return (
        <section className="bg-[url('/pricing-plan/bulkCta.png')] bg-center bg-norepeat bg-cover py-30">
            <div className="container max-w-7xl mx-auto px-6">
                <div className="">

                    {/* HEADER */}
                    <p className="text-center text-blue-600 font-semibold tracking-widest">
                        FREE TOOL
                    </p>
                    <h1 className="text-center text-3xl md:text-4xl font-semibold mt-2">
                        Email Campaign Value & ROI Calculator
                    </h1>
                    <p className="text-center text-gray-500 mt-3 mb-10">
                        See how much cost, effort, and risk you save with our all-in-one managed campaigns.
                    </p>

                    {/* GRID */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* DIY COST */}
                        <div className="backdrop-blur-[20px] bg-[#F3F3F733] p-6 rounded-xl shadow-sm">
                            <h3 className="font-semibold mb-4">
                                If You Do This Yourself (Typical Market Cost)
                            </h3>

                            {[
                                ["Email tools", 120],
                                ["Domains & inboxes", 200],
                                ["ICP-based database", 300],
                                ["Newsletter design", 200],
                                ["Email HTML templates", 150],
                                ["Campaign setup & tracking", 250],
                                ["Optimization & reporting", 200],
                            ].map(([label, cost]) => (
                                <div key={label} className="flex justify-between text-sm mb-2">
                                    <span>{label}</span>
                                    <span>${cost}</span>
                                </div>
                            ))}

                            <hr className="my-4" />

                            <div className="flex justify-between font-semibold">
                                <span>Total DIY Cost / Month</span>
                                <span>${results.diyCost.toLocaleString()}</span>
                            </div>
                        </div>

                        {/* YOUR PLAN */}
                        <div className="backdrop-blur-[20px] bg-[#F3F3F733] p-6 rounded-xl shadow-sm">
                            <h3 className="font-semibold mb-4">Your All-in-One Plan</h3>

                            <label className="block text-sm font-medium mb-1">Select Plan</label>
                            <select
                                value={plan}
                                onChange={(e) => setPlan(Number(e.target.value))}
                                className="w-full border rounded-md p-3 mb-4 "
                            >
                                <option style={{color:'black',backdropFilter:'blur(10px)',background:"#F3F3F733"}} value={299}>Plan 1 – Newsletter ($299)</option>
                                <option style={{color:'black',backdropFilter:'blur(10px)',background:"#F3F3F733"}} value={499}>Plan 2 – Newsletter ($499)</option>
                                <option style={{color:'black',backdropFilter:'blur(10px)',background:"#F3F3F733"}} value={749}>
                                    Plan 3 – Newsletter + Cold Email + LinkedIn ABM ($749)
                                </option>
                            </select>

                            {[
                                ["Campaign Duration (Months)", months, setMonths],
                                ["Monthly Leads Generated", leads, setLeads],
                                ["Close Rate (%)", closeRate, setCloseRate],
                                ["Average Deal Value ($)", dealValue, setDealValue],
                            ].map(([label, value, setter]) => (
                                <div key={label} className="mb-4">
                                    <label className="block text-sm font-medium mb-1">{label}</label>
                                    <input
                                        type="number"
                                        value={value}
                                        min="1"
                                        onChange={(e) => setter(Number(e.target.value))}
                                        className="w-full border rounded-md p-3"
                                    />
                                </div>
                            ))}

                            <h4 className="font-semibold mt-6 mb-3">
                                Included FREE in All Plans
                            </h4>
                            <ul className="text-sm space-y-2 text-gray-50 list-disc list-inside">
                                <li>Tool setup & configuration</li>
                                <li>Domain purchase & sender setup</li>
                                <li>ICP-based database</li>
                                <li>Newsletter creation</li>
                                <li>Email HTML template conversion</li>
                                <li>Campaign setup & reports</li>
                            </ul>
                        </div>

                        {/* RESULTS */}
                        <div className="backdrop-blur-[20px] bg-[#F3F3F733] p-6 rounded-xl shadow-sm relative">
                            <span className="absolute -top-3 right-5 bg-green-600 text-white text-xs px-3 py-1 rounded-full">
                                Most Value
                            </span>

                            <h3 className="font-semibold mb-4">Your Value & ROI</h3>

                            {[
                                ["Your Total Cost", `$${results.yourCost.toLocaleString()}`],
                                ["Monthly Savings vs DIY", `$${results.savings.toLocaleString()}`],
                                ["Deals Closed", results.deals],
                                ["Total Revenue", `$${results.revenue.toLocaleString()}`],
                                ["Net Profit", `$${results.profit.toLocaleString()}`],
                                ["ROI (%)", `${results.roi}%`],
                            ].map(([label, value], i) => (
                                <div
                                    key={label}
                                    className={`flex justify-between mb-3 ${i === 1 || i >= 4 ? "text-green-600 font-semibold" : ""
                                        }`}
                                >
                                    <span>{label}</span>
                                    <span>{value}</span>
                                </div>
                            ))}

                            <div className="text-center mt-6">
                                <a
                                    href="https://www.thedatabaseproviders.com/contact-us"
                                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
                                >
                                    Book Free Strategy Call
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* NOTE */}
                    <p className="text-center text-xs text-gray-500 mt-8">
                        DIY costs are industry averages. All setup, tools, databases, execution,
                        and reporting are included free in our plans.
                    </p>
                </div>
            </div>
        </section>
    );
}
