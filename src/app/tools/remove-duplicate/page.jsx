"use client";

import { useState } from "react";
import toast from "react-hot-toast";

const MAX_LIMIT = 250;

export default function RemoveEmailDuplicates() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [inputCount, setInputCount] = useState(0);
    const [outputCount, setOutputCount] = useState(0);
    const [error, setError] = useState("");

    const isValidEmail = (email) => {
        const emailRegex =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const processEmails = () => {
        setError("");
        setOutput("");
        setInputCount(0);
        setOutputCount(0);

        if (!input.trim()) {
            setError("Please paste email IDs.");
            return;
        }

        const lines = input
            .split(/\r?\n/)
            .map((e) => e.trim())
            .filter(Boolean);

        if (lines.length > MAX_LIMIT) {
            setError("Maximum 250 entries allowed.");
            return;
        }

        const seen = new Set();
        const result = [];

        lines.forEach((line) => {
            const email = line.toLowerCase();
            if (!isValidEmail(email)) return;

            if (!seen.has(email)) {
                seen.add(email);
                result.push(email);
            }
        });

        setInputCount(lines.length);
        setOutputCount(result.length);
        setOutput(result.join("\n"));
    };

    const copyEmails = async () => {
        if (!output) return alert("No emails to copy");
        await navigator.clipboard.writeText(output);
        toast.success("Emails copied to clipboard");
    };

    return (
        <section className="bg-[url('/pricing-plan/bulkCta.png')] bg-center bg-norepeat bg-cover py-30">
            <div className="container max-w-6xl mx-auto px-6">
                <div className="">

                    {/* HEADER */}
                    <h1 className="text-3xl md:text-4xl font-semibold text-center mb-2">
                        Remove Duplicates
                    </h1>
                    <p className="text-center text-gray-500 mb-10">
                        Remove duplicate emails and keep only valid email IDs.
                    </p>

                    {/* TOOL */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 backdrop-blur-[20px] bg-[#F3F3F733] p-6 rounded-xl shadow-lg">

                        {/* INPUT */}
                        <div>
                            <label className="block font-medium mb-2">
                                Remove duplicates from this list:
                            </label>

                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Paste up to 250 email IDs (one per line)"
                                className="w-full h-[300px] p-4 text-sm border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            <div className="flex justify-end mt-4">
                                <button
                                    onClick={processEmails}
                                    className="px-6 py-3 text-sm cursor-pointer bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                                >
                                    Remove Duplicates
                                </button>
                            </div>

                            {inputCount > 0 && (
                                <p className="mt-2 text-sm text-gray-500">
                                    Input lines: {inputCount}
                                </p>
                            )}

                            {error && (
                                <p className="mt-2 text-sm text-red-500">{error}</p>
                            )}
                        </div>

                        {/* OUTPUT */}
                        <div>
                            <label className="block font-medium mb-2">
                                Results:
                            </label>

                            <textarea
                                value={output}
                                readOnly
                                placeholder="Valid, unique email IDs (lowercase) will appear here..."
                                className="w-full h-[300px] p-4 text-sm border rounded-md resize-none focus:outline-none"
                            />

                            <div className="flex justify-end mt-4">
                                <button
                                    onClick={copyEmails}
                                    className="px-6 py-3 text-sm cursor-pointer bg-gray-900 text-white rounded-md hover:bg-gray-800 transition"
                                >
                                    Copy Emails
                                </button>
                            </div>

                            {outputCount > 0 && (
                                <p className="mt-2 text-sm text-gray-500">
                                    Valid unique emails: {outputCount}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* FOOTNOTE */}
                    <p className="text-center text-xs text-gray-500 mt-6">
                        Limit: Max 250 entries. Only valid email formats are retained.
                        Output is converted to lowercase.
                    </p>

                </div>
            </div>
        </section>
    );
}
