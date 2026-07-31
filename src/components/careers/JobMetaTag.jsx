import Image from "next/image";

const ICONS = {
    location: "/careers/icon-location.png",
    type: "/careers/icon-type.png",
    experience: "/careers/icon-experience.png",
};

export default function JobMetaTag({ label, icon = "location" }) {
    if (!label) return null;

    return (
        <span className="inline-flex items-center gap-1 rounded-full bg-[#f1f8ff] px-4 py-1 text-[#1798ff] text-sm font-medium">
            <span className="relative size-4 shrink-0 overflow-hidden">
                <Image
                    src={ICONS[icon] || ICONS.location}
                    alt=""
                    width={16}
                    height={16}
                    className="size-full object-contain"
                />
            </span>
            {label}
        </span>
    );
}
