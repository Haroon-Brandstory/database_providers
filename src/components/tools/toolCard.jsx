export default function ToolCard({ title, description, tag, href }) {
  return (
    <div className="backdrop-blur-[20px] bg-[#565AD026] rounded-xl p-6 shadow-sm hover:shadow-lg transition border border-gray-100 flex flex-col justify-between">
      <div>
        <span className="inline-block text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-4">
          {tag}
        </span>

        <h3 className="text-lg text-black font-semibold mb-2">
          {title}
        </h3>

        <p className="text-sm text-gray-700 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-6">
        <a
          href={href}
          className="text-sm font-medium text-blue-600 hover:text-blue-700 transition"
        >
          Try Tool →
        </a>
      </div>
    </div>
  );
}
