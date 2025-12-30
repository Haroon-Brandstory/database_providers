export default function PrimaryCTA() {
    return (
        <section className="py-20 bg-[#0B0F2B] text-white">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <h2 className="text-3xl font-semibold">
                    Need help choosing the right data or campaign strategy?
                </h2>

                <p className="text-gray-400 mt-4">
                    Our experts help you plan outreach, select the right data, and maximize ROI.
                </p>

                <div className="mt-8">
                    <a
                        href="/contact-us"
                        className="inline-block bg-blue-600 hover:bg-blue-700 transition px-8 py-4 rounded-lg font-medium"
                    >
                        Book a Free Consultation
                    </a>
                </div>
            </div>
        </section>
    );
}
