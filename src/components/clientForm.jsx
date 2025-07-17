"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function ClientForm() {
    const [formData, setFormData] = useState({
        name: "",
        businessEmail: "",
        mobileNumber: "",
        companyName: "",
        message: ""
    });
    const [formErrors, setFormErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [loading, setLoading] = useState(false);

    const validate = (data) => {
        if (!data.name.trim()) return { name: "Name is required" };
        if (!data.businessEmail.trim()) return { businessEmail: "Business Email is required" };
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.businessEmail)) return { businessEmail: "Invalid email address" };
        if (!data.mobileNumber.trim()) return { mobileNumber: "Mobile Number is required" };
        if (!/^[0-9]{10}$/.test(data.mobileNumber)) return { mobileNumber: "Enter a valid 10-digit mobile number" };
        if (!data.companyName.trim()) return { companyName: "Company name is required" };
        if (!data.message.trim()) return { message: "Message is required" };
        if (data.message.trim().length < 50) return { message: "Message must be at least 50 characters" };
        return {};
    };

    const handleFormValues = (e) => {
        setFormData((item) => ({ ...item, [e.target.name]: e.target.value }));
        setFormErrors({});
    };

    const handleBlur = (e) => {
        setTouched((prev) => ({ ...prev, [e.target.name]: true }));
        const error = validate({ ...formData, [e.target.name]: e.target.value });
        setFormErrors(error);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const error = validate(formData);
        setFormErrors(error);
        setTouched({
            name: true,
            businessEmail: true,
            mobileNumber: true,
            companyName: true,
            message: true
        });
        if (Object.keys(error).length === 0) {
            setLoading(true);
            try {
                const res = await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });
                console.log(res)
                if (res.ok) {
                    toast.success("Message sent successfully!");
                    setFormData({
                        name: "",
                        businessEmail: "",
                        mobileNumber: "",
                        companyName: "",
                        message: ""
                    });
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

    return (
        <section className="py-20 px-4 md:px-20 bg-white relative">
            <div className="container px-4 mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 container mx-auto">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-semibold leading-tight text-black mb-4">
                            Haven’t Requested Your <br />
                            <span className="text-[#A3A3A3] font-normal">Free Sample Yet?</span>
                        </h2>
                        <p className="text-[#444] text-[16px] mb-6 leading-relaxed">
                            Fill out the form to get a free sample of our exclusive C-level email list and experience the data accuracy, completeness and relevance that set us apart.
                        </p>
                        <p className="text-green-500 text-[15px] font-semibold">
                            No guesswork. Verified data. Real results.
                        </p>
                    </div>
                    <div className="flex items-end justify-end">
                        <div className="w-full bg-white rounded-2xl lg:p-10 p-6 drop-shadow-[0px_0px_35px_#0000001A]">
                            <form className="flex flex-col gap-5" onSubmit={handleFormSubmit} noValidate>
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
                                        className="w-full  rounded-[20px] text-black bg-[#F6F6F6] px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200 placeholder-[#B2B2B2]"
                                    />
                                    {formErrors.businessEmail && touched.businessEmail && (
                                        <div style={{ color: "red", fontSize: 14, marginTop: 4 }}>{formErrors.businessEmail}</div>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-[#222] text-[15px] mb-1">Mobile Number</label>
                                    <input
                                        type="tel"
                                        placeholder="Enter your mobile number"
                                        name="mobileNumber"
                                        onChange={handleFormValues}
                                        onBlur={handleBlur}
                                        value={formData.mobileNumber}
                                        className="w-full  rounded-[20px] text-black bg-[#F6F6F6] px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200 placeholder-[#B2B2B2]"
                                    />
                                    {formErrors.mobileNumber && touched.mobileNumber && (
                                        <div style={{ color: "red", fontSize: 14, marginTop: 4 }}>{formErrors.mobileNumber}</div>
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
                                        <div style={{ color: "red", fontSize: 14, marginTop: 4 }}>{formErrors.companyName}</div>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-[#222] text-[15px] mb-1">Message</label>
                                    <textarea
                                        placeholder="Type your message here"
                                        rows={3}
                                        name="message"
                                        onChange={handleFormValues}
                                        onBlur={handleBlur}
                                        value={formData.message}
                                        className="w-full  rounded-[20px] text-black bg-[#F6F6F6] px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200 placeholder-[#B2B2B2] resize-none"
                                    />
                                    {formErrors.message && touched.message && (
                                        <div style={{ color: "red", fontSize: 14, marginTop: 4 }}>{formErrors.message}</div>
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
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                                            </svg>
                                            Sending...
                                        </span>
                                    ) : (
                                        "Submit"
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
