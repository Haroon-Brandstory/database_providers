export default function ClientForm() {
    return (
        <section className="py-20 px-4 md:px-20 bg-white relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 container mx-auto">
                {/* Left Side (col-lg-4 equivalent) */}
                <div className="lg:col-span-5">
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

                {/* Right Side (Form) - col-lg-8 equivalent */}
                <div className="lg:col-span-7">
                    <div className="w-full bg-white rounded-2xl p-10 drop-shadow-[0px_0px_35px_#0000001A]">
                        <form className="flex flex-col gap-5">
                            <div>
                                <label className="block text-[#222] text-[15px] mb-1">Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    className="w-full rounded-lg bg-[#F6F6F6] px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
                                />
                            </div>
                            <div>
                                <label className="block text-[#222] text-[15px] mb-1">Business Email</label>
                                <input
                                    type="email"
                                    placeholder="Enter mail"
                                    className="w-full rounded-lg bg-[#F6F6F6] px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
                                />
                            </div>
                            <div>
                                <label className="block text-[#222] text-[15px] mb-1">Mobile Number</label>
                                <input
                                    type="tel"
                                    placeholder="Enter your mobile number"
                                    className="w-full rounded-lg bg-[#F6F6F6] px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
                                />
                            </div>
                            <div>
                                <label className="block text-[#222] text-[15px] mb-1">Company</label>
                                <input
                                    type="text"
                                    placeholder="Enter your company name"
                                    className="w-full rounded-lg bg-[#F6F6F6] px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
                                />
                            </div>
                            <div>
                                <label className="block text-[#222] text-[15px] mb-1">Message</label>
                                <textarea
                                    placeholder="Type your message here"
                                    rows={3}
                                    className="w-full rounded-lg bg-[#F6F6F6] px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200 resize-none"
                                />
                            </div>
                            <button
                                type="submit"
                                className="mt-2 w-full py-3 rounded-full bg-[#0133E9] text-white font-medium text-lg shadow-md hover:from-blue-700 hover:bg-[#0133E9] transition-all"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
