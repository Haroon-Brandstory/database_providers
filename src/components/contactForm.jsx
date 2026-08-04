"use client";
import CountryCodeSelect from "@/components/CountryCodeSelect";
import { useNavHref } from "@/hooks/useNavHref";
import { DEFAULT_COUNTRY_CODE, getCountryByCode } from "@/lib/countryDialCodes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const EMPTY_FORM = {
    name: "",
    businessEmail: "",
    countryCode: DEFAULT_COUNTRY_CODE,
    mobileNumber: "",
    companyName: "",
    message: "",
};

function digitsOnly(value) {
    return value.replace(/\D/g, "");
}

export default function ContactForm() {
    const [formData, setFormData] = useState(EMPTY_FORM);
    const [formErrors, setFormErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { navHref } = useNavHref();

    const validate = (data) => {
        if (!data.name.trim()) return { name: "Name is required" };
        if (!data.businessEmail.trim()) return { businessEmail: "Business Email is required" };
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.businessEmail)) {
            return { businessEmail: "Invalid email address" };
        }
        if (!data.countryCode) return { mobileNumber: "Country code is required" };
        const phoneDigits = digitsOnly(data.mobileNumber);
        if (!phoneDigits) return { mobileNumber: "Mobile Number is required" };
        if (phoneDigits.length < 6 || phoneDigits.length > 15) {
            return { mobileNumber: "Enter a valid mobile number (6–15 digits)" };
        }
        if (!data.companyName.trim()) return { companyName: "Company name is required" };
        if (!data.message.trim()) return { message: "Message is required" };
        if (data.message.trim().length < 15) return { message: "Message must be at least 15 characters" };
        return {};
    };

    const handleFormValues = (e) => {
        const { name, value } = e.target;
        const nextValue = name === "mobileNumber" ? digitsOnly(value).slice(0, 15) : value;
        setFormData((item) => ({ ...item, [name]: nextValue }));
        setFormErrors({});
    };

    const handleBlur = (e) => {
        setTouched((prev) => ({ ...prev, [e.target.name]: true }));
        const nextData = {
            ...formData,
            [e.target.name]:
                e.target.name === "mobileNumber"
                    ? digitsOnly(e.target.value).slice(0, 15)
                    : e.target.value,
        };
        setFormErrors(validate(nextData));
    };

    const fullPhone = () => {
        const dial = getCountryByCode(formData.countryCode).dial;
        return `${dial}${digitsOnly(formData.mobileNumber)}`;
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const error = validate(formData);
        setFormErrors(error);
        setTouched({
            name: true,
            businessEmail: true,
            countryCode: true,
            mobileNumber: true,
            companyName: true,
            message: true,
        });
        if (Object.keys(error).length === 0) {
            setLoading(true);
            try {
                const mondayData = {
                    first_name: formData.name.trim(),
                    email: formData.businessEmail.trim(),
                    phone: fullPhone(),
                    company: formData.companyName.trim(),
                    years: "0",
                    services: "Contact Enquiry",
                    // Collapse newlines/extra spaces — Monday GraphQL JSON rejects raw \n in embedded strings
                    specialties: formData.message.replace(/\s+/g, " ").trim(),
                };

                const res = await fetch("/apiv2/monday", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(mondayData),
                });
                if (res.ok) {
                    toast.success("Message sent successfully!");
                    setFormData(EMPTY_FORM);
                    router.push(navHref("/thank-you"));
                } else {
                    toast.error("Failed to send message.");
                }
            } catch (err) {
                toast.error("An error occurred. Try again.");
            } finally {
                setLoading(false);
            }
        }
    };

    const handleFormKeyDown = (e) => {
        if (e.key !== "Enter") return;
        // Let country dropdown search handle its own Enter
        if (e.target.closest?.("[data-country-code-select]")) return;
        // Enter in any field (incl. message) submits; Shift+Enter keeps line break in textarea if needed
        if (e.target.tagName === "TEXTAREA" && e.shiftKey) return;
        if (e.target.tagName === "BUTTON") return;
        e.preventDefault();
        if (!loading) {
            e.currentTarget.requestSubmit();
        }
    };

    return (
        <div className="w-full bg-white rounded-2xl lg:p-10 p-6 drop-shadow-[0px_0px_35px_#0000001A]">
            <form
                className="flex flex-col gap-5"
                onSubmit={handleFormSubmit}
                onKeyDown={handleFormKeyDown}
                noValidate
            >
                <div>
                    <label className="block text-[#222] text-[15px] mb-1">Name</label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        name="name"
                        onChange={handleFormValues}
                        onBlur={handleBlur}
                        value={formData.name}
                        className="w-full rounded-[20px] text-black bg-[#F6F6F6] px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200 placeholder-[#B2B2B2]"
                    />
                    {formErrors.name && touched.name && (
                        <div style={{ color: "red", fontSize: 14, marginTop: 4 }}>{formErrors.name}</div>
                    )}
                </div>
                <div>
                    <label className="block text-[#222] text-[15px] mb-1">Business Email</label>
                    <input
                        type="email"
                        placeholder="Enter mail"
                        name="businessEmail"
                        onChange={handleFormValues}
                        onBlur={handleBlur}
                        value={formData.businessEmail}
                        className="w-full rounded-[20px] text-black bg-[#F6F6F6] px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200 placeholder-[#B2B2B2]"
                    />
                    {formErrors.businessEmail && touched.businessEmail && (
                        <div style={{ color: "red", fontSize: 14, marginTop: 4 }}>
                            {formErrors.businessEmail}
                        </div>
                    )}
                </div>
                <div>
                    <label className="block text-[#222] text-[15px] mb-1">Mobile Number</label>
                    <div className="flex gap-2 items-stretch">
                        <CountryCodeSelect
                            name="countryCode"
                            value={formData.countryCode}
                            onChange={handleFormValues}
                            onBlur={handleBlur}
                        />
                        <input
                            type="tel"
                            placeholder="Enter mobile number"
                            name="mobileNumber"
                            maxLength={15}
                            inputMode="numeric"
                            autoComplete="tel-national"
                            onChange={handleFormValues}
                            onBlur={handleBlur}
                            value={formData.mobileNumber}
                            className="min-w-0 flex-1 rounded-[20px] text-black bg-[#F6F6F6] px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200 placeholder-[#B2B2B2]"
                        />
                    </div>
                    {formErrors.mobileNumber && (touched.mobileNumber || touched.countryCode) && (
                        <div style={{ color: "red", fontSize: 14, marginTop: 4 }}>
                            {formErrors.mobileNumber}
                        </div>
                    )}
                </div>
                <div>
                    <label className="block text-[#222] text-[15px] mb-1">Company</label>
                    <input
                        type="text"
                        placeholder="Enter your company name"
                        name="companyName"
                        onChange={handleFormValues}
                        onBlur={handleBlur}
                        value={formData.companyName}
                        className="w-full rounded-[20px] text-black bg-[#F6F6F6] px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200 placeholder-[#B2B2B2]"
                    />
                    {formErrors.companyName && touched.companyName && (
                        <div style={{ color: "red", fontSize: 14, marginTop: 4 }}>
                            {formErrors.companyName}
                        </div>
                    )}
                </div>
                <div>
                    <label className="block text-[#222] text-[15px] mb-1">Message</label>
                    <textarea
                        placeholder="Type your message here"
                        rows={3}
                        name="message"
                        onChange={handleFormValues}
                        onBlur={(e) => {
                            const cleaned = e.target.value.replace(/\s+/g, " ").trim();
                            setFormData((prev) => ({ ...prev, message: cleaned }));
                            handleBlur({ target: { name: "message", value: cleaned } });
                        }}
                        value={formData.message}
                        className="w-full rounded-[20px] text-black bg-[#F6F6F6] px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200 placeholder-[#B2B2B2] resize-none"
                    />
                    {formErrors.message && touched.message && (
                        <div style={{ color: "red", fontSize: 14, marginTop: 4 }}>
                            {formErrors.message}
                        </div>
                    )}
                </div>
                <button
                    type="submit"
                    className="mt-2 w-full cursor-pointer py-3 rounded-[30px] bg-[#0133E9] text-white font-medium text-lg shadow-md hover:from-blue-700 hover:bg-[#001444] transition-all flex items-center justify-center"
                    disabled={loading}
                >
                    {loading ? (
                        <span>
                            <svg className="animate-spin h-5 w-5 mr-2 inline" viewBox="0 0 24 24">
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="white"
                                    strokeWidth="4"
                                    fill="none"
                                />
                                <path
                                    className="opacity-75"
                                    fill="white"
                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                />
                            </svg>
                            Sending...
                        </span>
                    ) : (
                        "Submit"
                    )}
                </button>
            </form>
        </div>
    );
}
