import Image from "next/image";

export default function FooterCopyRight() {

    const currentYear = new Date().getFullYear();

    return (
        <>
            <div className="w-full">
                <div className="py-6 px-2 bg-[linear-gradient(180deg,#13307500,#235ADB)]">
                    <div className="max-w-7xl mx-auto flex flex-col justify-center items-center md:flex-row justify-between items-center pt-4 text-xs text-[#D0D0D0] gap-2">
                        <div className=" space-x-2 flex justify-center items-center flex-wrap">
                            <span>© {currentYear} Database Providers. All Rights Reserved</span> <span>|</span><span>Privacy policy</span><span>|</span><span>Data Security Policy</span><span>|</span><span>Privacy policy</span><span>|</span><span>CCPA Privacy Policy</span><span>|</span><span>Do Not Sell My Data</span><span>|</span><span>Do Not Call Compliance Policy</span>
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