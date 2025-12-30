import ToolCard from "@/components/tools/toolCard.jsx";

const TOOLS = [
  {
    title: "Email Duplicate Remover",
    description:
      "Remove duplicate and invalid email IDs instantly. Clean lists improve deliverability and campaign performance.",
    tag: "Email Hygiene",
    href: "/tools/remove-duplicate/",
  },
  {
    title: "Email Campaign ROI Calculator",
    description:
      "Calculate revenue, profit, and ROI for email, ABM, and outbound campaigns before you spend a dollar.",
    tag: "Planning",
    href: "/tools/roi/",
  },
  {
    title: "Email Permutator",
    description:
      "Understand your real CPL by factoring tools, databases, outreach, and manpower costs.",
    tag: "Budgeting",
    href: "/tools/email-permutator/",
  },
  {
    title: "Email Size Checker",
    description:
      "Calculates the estimated size of your email content, without Attachments, to help you stay within best-practice limits.",
    tag: "Deliverability",
    href: "/tools/size-checker/",
  },
//   {
//     title: "ABM Campaign Planner",
//     description:
//       "Plan account-based campaigns with deal value, conversion rate, and pipeline impact modeling.",
//     tag: "ABM",
//     href: "/tools/abm-planner",
//   },
//   {
//     title: "Cold Email Volume Calculator",
//     description:
//       "Safely calculate daily and monthly sending volumes across inboxes and domains.",
//     tag: "Outbound",
//     href: "/tools/cold-email-volume-calculator",
//   },
];

export default function ToolsGrid() {
  return (
    <section id="tools" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOOLS.map((tool) => (
            <ToolCard key={tool.title} {...tool} />
          ))}
        </div>

      </div>
    </section>
  );
}
