import ContactForm from "./contactForm";

export default function ClientForm() {
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
                        <ContactForm />
                    </div>
                </div>
            </div>
        </section>
    );
}
