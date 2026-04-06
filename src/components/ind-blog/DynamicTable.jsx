import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export default function DynamicTable({ section }) {
    const dummyTable = {
        tableHeading: [
            { heading: "Aspect" },
            { heading: "Description" }
        ],
        tableRows: [
            {
                cells: [
                    { content: "Audience Ownership" },
                    { content: "Email marketing allows businesses to communicate directly with subscribers without relying on third-party platforms." }
                ]
            },
            {
                cells: [
                    { content: "High ROI" },
                    { content: "It consistently delivers strong returns by targeting users who have already shown interest in the brand." }
                ]
            },
            {
                cells: [
                    { content: "Personalization" },
                    { content: "Emails can be customized based on user behavior, preferences, and lifecycle stage." }
                ]
            },
            {
                cells: [
                    { content: "Automation" },
                    { content: "Campaigns can run automatically using workflows, saving time while maintaining consistency." }
                ]
            },
            {
                cells: [
                    { content: "Measurable Results" },
                    { content: "Performance can be tracked through open rates, clicks, conversions, and engagement metrics." }
                ]
            }
        ]
    };

    const data = section;

    if (!data) return null;

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
                            {row.cells.map((cell, j) => (
                                <td
                                    key={j}
                                    className={`p-4 text-[#4B5563] text-[15px] leading-relaxed ${i !== data.tableRows.length - 1 ? 'border-b border-[#E6F0FF]' : ''} ${j !== row.cells.length - 1 ? 'border-r border-[#E6F0FF]' : ''} ${j === 0 ? 'text-start font-medium' : 'text-left'}`}
                                >
                                    <BlocksRenderer content={cell.content} />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}