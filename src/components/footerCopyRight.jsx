import Image from "next/image";

export default function FooterCopyRight() {

    const currentYear = new Date().getFullYear();

    return (
        <>
            <div className="w-full">
                <div className="py-6 px-2 bg-[linear-gradient(180deg,#13307500,#235ADB)]">
                    <div className="max-w-7xl mx-auto flex flex-col justify-center items-center md:flex-row justify-between items-center pt-4 text-xs text-[#D0D0D0] gap-2">
                        <div className=" space-x-2 flex justify-center items-center flex-wrap">
                            <span>© {currentYear} Database Providers. All Rights Reserved</span> <span>|</span><span><a href="/privacy-policy" className="hover:underline">Privacy policy</a></span><span>|</span><span><a href="/data-security-policy" className="hover:underline">Data Security Policy</a></span><span>|</span><span><a href="/gdpr-ccpa-privacy-notice" className="hover:underline">GDPR & CCPA / CPRA</a></span><span>|</span><span><a href="/do-not-sell-share" className="hover:underline">Do Not Share My Data</a></span><span>|</span><span><a href="/do-not-call-compliance" className="hover:underline">Do Not Call</a></span><span>|</span><span><a href="/cookie-policy" className="hover:underline">Cookie Policy</a></span><span> | </span><span><a href="/disclaimer" className="hover:underline">Disclaimer</a></span>
                        </div>
                    </div>
                    <div className="flex justify-center items-center py-18">
                        <Image src='/footer/databaseProvider-footerImage.svg' width={1245} height={100} alt="Database Providres" />
                    </div>
                </div>
            </div>
        </>
    )
}