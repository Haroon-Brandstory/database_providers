import BlogBlocksRenderer from "./BlogBlocksRenderer";

function renderCellContent(content) {
    if (content == null) return null;
    if (typeof content === "string") return content;
    if (Array.isArray(content)) {
        return <BlogBlocksRenderer content={content} />;
    }
    return null;
}

export default function DynamicTable({ section }) {
    const data = section;

    if (!data?.tableHeading?.length || !data?.tableRows?.length) return null;

    return (
        <div className="overflow-x-auto my-8">
            <table className="w-full border-separate border-spacing-0 rounded-xl overflow-hidden shadow-sm" style={{ border: "1px solid #BADCFF" }}>
                <thead>
                    <tr className="bg-[#E6F0FF]">
                        {data.tableHeading.map((h, i) => (
                            <th
                                key={i}
                                className={`p-4 text-[#111827] font-semibold text-[16px] border-b border-[#BADCFF] ${i !== data.tableHeading.length - 1 ? 'border-r' : ''} ${i === 0 ? 'text-center w-1/3' : 'text-left'}`}
                            >
                                {h.heading}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.tableRows.map((row, i) => (
                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                            {(row.cells ?? []).map((cell, j) => (
                                <td
                                    key={j}
                                    className={`p-4 text-[#4B5563] text-[15px] leading-relaxed ${i !== data.tableRows.length - 1 ? 'border-b border-[#E6F0FF]' : ''} ${j !== row.cells.length - 1 ? 'border-r border-[#E6F0FF]' : ''} ${j === 0 ? 'text-start font-medium' : 'text-left'}`}
                                >
                                    {renderCellContent(cell.content)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}