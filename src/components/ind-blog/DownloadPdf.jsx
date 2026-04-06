import { API_URL } from "@/utils/config";
import Image from "next/image";

export default function DownloadPdf({ section }) {
    const { title, pdf, pdfDescription } = section;
    const titleAss = title || "Download the Email Marketing Guide";
    const descriptionAss = pdfDescription || "Get a concise, practical PDF covering email strategy, best practices.";
    const url = API_URL + pdf?.url || "#";

    return (
        <div className="bg-[#001340] rounded-[24px] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 my-8">
            <div className="flex items-center gap-4 md:gap-6 text-left">
                <div className="flex-shrink-0">
                    <Image
                        src="/blog/email_marketing_guide_pdf.svg"
                        alt="PDF Icon"
                        width={62}
                        height={62}
                        className="w-[62px] h-[62px]"
                    />
                </div>
                <div>
                    <h3 className="text-white text-xl md:text-[24px] font-[600] mb-1 leading-tight">
                        {titleAss}
                    </h3>
                    <p className="text-[#B2B9C9] text-sm md:text-base opacity-90">
                        {descriptionAss}
                    </p>
                </div>
            </div>
            <a
                href={url}
                className="bg-white text-[#002B9A] px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-gray-100 transition-colors whitespace-nowrap shadow-sm"
                download
                target="_blank"
            >
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M12 15L12 3M12 15L8 11M12 15L16 11M2 17L2 19C2 20.1046 2.89543 21 4 21L20 21C21.1046 21 22 20.1046 22 19L22 17"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                Download
            </a>
        </div>
    );
}