"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const LIMIT = 5;

const blockedDomains = [
    "gmail.com", "googlemail.com",
    "yahoo.com", "yahoo.co.in",
    "outlook.com", "hotmail.com", "live.com",
    "icloud.com", "me.com",
    "aol.com", "protonmail.com",
    "zoho.com", "rediffmail.com", "yandex.com"
];

const isValidDomain = (domain) =>
    /^(?!-)([a-z0-9-]{1,63}\.)+[a-z]{2,}$/.test(domain);

const isPersonalDomain = (domain) =>
    blockedDomains.includes(domain);

export default function EmailPermutator() {
    const [usage, setUsage] = useState(0);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [emails, setEmails] = useState("");
    const [count, setCount] = useState(0);
    const [limitReached, setLimitReached] = useState(false);

    const [form, setForm] = useState({
        first: "",
        middle: "",
        last: "",
        nickname: "",
        domain1: "",
        domain2: "",
        domain3: "",
    });

    useEffect(() => {
        const stored = Number(localStorage.getItem("emailPermutatorUsage") || 0);
        setUsage(stored);
    }, []);

    const updateField = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const validateDomain = (domain) => {
        if (!isValidDomain(domain) || isPersonalDomain(domain)) {
            // alert("Personal email domains are not supported. Please enter a business domain.");
            toast("Personal email domains are not supported. Please enter a business domain.");
            return false;
        }
        return true;
    };

    const generateEmails = () => {
        if (usage >= LIMIT) {
            setLimitReached(true);
            return;
        }

        const first = form.first.toLowerCase().trim();
        const last = form.last.toLowerCase().trim();
        if (!first || !last) {
            // alert("First name and last name are required");
            toast("First name and last name are required");
            return;
        }

        const domains = [form.domain1, form.domain2, form.domain3]
            .filter(Boolean)
            .map(d => d.toLowerCase().trim());

        if (!domains.length || !validateDomain(domains[0])) return;
        if (domains.slice(1).some(d => !validateDomain(d))) return;

        const fi = first[0];
        const li = last[0];
        const mi = form.middle ? form.middle[0] : "";

        let formats = [
            `${first}`, `${last}`,
            `${first}${last}`, `${first}.${last}`,
            `${fi}${last}`, `${fi}.${last}`,
            `${first}${li}`, `${first}.${li}`,
            `${fi}${li}`, `${fi}.${li}`,
            `${last}${first}`, `${last}.${first}`,
            `${first}-${last}`, `${fi}-${last}`,
            `${first}_${last}`, `${fi}_${last}`
        ];

        if (form.middle) {
            formats.push(`${first}.${form.middle}.${last}`, `${fi}${mi}${last}`);
        }

        if (form.nickname) {
            formats.push(
                `${form.nickname}${last}`,
                `${form.nickname}.${last}`,
                `${form.nickname}${li}`
            );
        }

        const results = new Set();
        domains.forEach(d =>
            formats.forEach(f => results.add(`${f}@${d}`))
        );

        setEmails([...results].join("\n"));
        setCount(results.size);

        const newUsage = usage + 1;
        localStorage.setItem("emailPermutatorUsage", newUsage);
        setUsage(newUsage);
    };

    const copyEmails = async () => {
        if (!emails) return toast.error("No emails to copy");
        await navigator.clipboard.writeText(emails);
        toast.success("Emails copied to clipboard");
        // alert("Emails copied to clipboard");
    };

    return (
        <section className="bg-[url('/pricing-plan/bulkCta.png')] bg-center bg-norepeat bg-cover py-30">
            <div className="container px-6 flex items-center justify-center mx-auto">
                <div className="bg-[#F3F3F733] backdrop-blur-[20px] rounded-xl lg:p-8 p-4 border border-gray-600 shadow">
                    <h1 className="text-2xl font-semibold text-center">
                        Free Email Permutator Tool
                    </h1>
                    <p className="text-center text-gray-400 mt-1">
                        B2B Email Permutator – Business Domains Only
                    </p>

                    {/* Inputs */}
                    <div className="grid md:grid-cols-3 gap-4 mt-6">
                        <input name="first" onChange={updateField} placeholder="First Name *" className="input" />
                        <input name="last" onChange={updateField} placeholder="Last Name *" className="input" />
                        <input name="domain1" onChange={updateField} placeholder="Business Domain *" className="input" />
                    </div>

                    <button
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        className="mt-4 w-full bg-gray-800 py-2 cursor-pointer rounded text-sm"
                    >
                        {showAdvanced ? "– Hide Advanced Filters" : "+ Advanced Filters"}
                    </button>

                    {showAdvanced && (
                        <div className="grid md:grid-cols-3 gap-4 mt-4">
                            <input name="middle" onChange={updateField} placeholder="Middle Name" className="input" />
                            <input name="nickname" onChange={updateField} placeholder="Nickname" className="input" />
                            <input name="domain2" onChange={updateField} placeholder="Additional Domain" className="input" />
                            <input name="domain3" onChange={updateField} placeholder="Additional Domain" className="input" />
                        </div>
                    )}

                    <button
                        onClick={generateEmails}
                        className="mt-4 w-full bg-blue-500 cursor-pointer text-white py-3 rounded font-medium"
                    >
                        Generate Email Addresses
                    </button>

                    <textarea
                        value={emails}
                        readOnly
                        className="mt-6 w-full h-64 p-3 border rounded text-sm"
                        placeholder="Generated emails will appear here..."
                    />

                    <button
                        onClick={copyEmails}
                        className="mt-3 w-full bg-gray-800 cursor-pointer text-white py-2 rounded"
                    >
                        Copy Emails
                    </button>

                    <div className="text-center mt-2 text-gray-600">
                        {count > 0 && `${count} B2B email addresses generated`}
                    </div>

                    {limitReached && (
                        <div className="text-center mt-4 text-red-600 font-medium">
                            Free limit reached (5 uses).
                            <div className="mt-2">
                                <a
                                    href="https://www.thedatabaseproviders.com/contact-us"
                                    className="text-blue-500 font-semibold"
                                    target="_blank"
                                >
                                    Contact The Database Providers
                                </a>
                            </div>
                        </div>
                    )}

                    <p className="text-xs text-center text-gray-500 mt-4">
                        Note: Personal/free email domains (Gmail, Yahoo, Outlook, etc.) are not supported.
                    </p>
                </div>
            </div>

            {/* Tailwind input helper */}
            <style jsx>{`
        .input {
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 14px;
        }
      `}</style>
        </section>
    );
}
