import { API_URL } from "@/utils/config";
import Image from "next/image";

export default function BlogContentImage({ section }) {
    const url = API_URL;
    return (
        <div className="pb-10 rounded-[20px] overflow-hidden">
            <Image
                src={url + section?.image?.url}
                alt={section?.image?.name}
                width={1200}
                height={600}
                className="w-full h-auto object-cover"
                unoptimized
            />
        </div>
    )
}