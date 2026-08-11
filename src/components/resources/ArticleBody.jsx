export default function ArticleBody({ blocks = [] }) {
    return (
        <div className="space-y-4">
            {blocks.map((block, index) => {
                if (block.type === "h3") {
                    return (
                        <h3
                            key={index}
                            className="text-xl md:text-2xl font-semibold text-[#111827] pt-4"
                        >
                            {block.text}
                        </h3>
                    );
                }
                if (block.type === "ul") {
                    return (
                        <ul
                            key={index}
                            className="list-disc pl-5 space-y-2 text-[#51525c] text-base leading-relaxed"
                        >
                            {block.items.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    );
                }
                return (
                    <p key={index} className="text-[#51525c] text-base leading-relaxed">
                        {block.text}
                    </p>
                );
            })}
        </div>
    );
}
