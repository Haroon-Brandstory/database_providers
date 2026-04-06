export default function BlogNote({ section }) {
    const displayNote = section?.note || "Successful email marketing is not about volume it’s about value. Prioritize relevance, respect user consent, and refine campaigns using real performance insights for long-term results.";

    return (
        <div className="relative bg-[#F0F7FF] rounded-[24px] p-8 md:p-12 mb-8 overflow-hidden" style={{ borderLeft: "4px solid #007AFF" }}>
            <div className="ml-4">
                <blockquote className="space-y-4">
                    <h3 className="text-[24px] font-semibold text-black mb-6">{section.title}</h3>
                    <p className="text-[#00000099] text-[14px] md:text-[16px]">
                        {displayNote}
                    </p>
                </blockquote>
            </div>
        </div>
    )
}