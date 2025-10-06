import ContactForm from "../contactForm";

export default function ContactFormList() {
    return (
        <section className="bg-white py-16 px-6">
            <div className="container max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 container mx-auto">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-semibold leading-tight text-black mb-4">
                            Get In <span className="text-[#A3A3A3] font-normal">Touch</span>
                        </h2>
                        <p className="text-[#444] text-[16px] mb-6 leading-relaxed">
                            Got a question about our database solutions or need a custom database for your business? Fill out the contact form given, and we’ll get back to you as soon as possible.
                        </p>
                    </div>
                    <div className="flex items-end justify-end">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </section>
    )
}