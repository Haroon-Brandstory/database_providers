import PrimaryCTA from "@/components/tools/primaryCta";
import ToolsGrid from "@/components/tools/toolsGrid";

export default function ToolsPage() {
    return (
        <>
            <section className="bg-[url('/blog/blogListingBanner.png')] bg-center bg-cover bg-norepeat text-white  flex flex-col items-center justify-center px-4 md:px-20 pt-20 pb-10 overflow-hidden pt-30">
                <div className="container max-w-7xl mx-auto flex justify-start items-center ">
                    <div className="h-[450px] flex items-center flex-col justify-center">
                        <h1 className="text-white text-[48px]  font-medium text-[34px]">Tools</h1>
                    </div>
                </div>
            </section>
            <ToolsGrid />
            {/* <PrimaryCTA /> */}
        </>
    )
}