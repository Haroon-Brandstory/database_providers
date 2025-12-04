import Image from "next/image";

export default function FooterReview() {
    return (
        <>
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-center md:items-center gap-10 border-b border-[#222] py-10">
                <div className="flex flex-wrap justify-evenly gap-8">
                    <div>
                        <Image src='/footer/trust-pilot-review.png' width={267} height={130} alt="Trustpilot Review" />
                    </div>
                    <div className="flex jsutify-center items-center">
                        <Image src='/footer/ica-review.png' width={300} height={67} alt="ICA Review" />
                    </div>
                </div>
            </div>
        </>
    )
}