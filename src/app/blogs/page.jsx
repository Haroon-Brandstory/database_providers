import BlogListingBanner from "@/components/blog-listing/blogBanner";
import BlogList from "@/components/blog-listing/blogList";
import { generateSeoMetadata } from "@/lib/seo";

export async function generateMetadata({ params: paramsPromise }) {
    const params = await paramsPromise;
    
    return generateSeoMetadata({
        locale: "en",
        slug: "blogs",
        title: "Blogs | Database Providers",
        description: "Explore expert insights on B2B data and marketing in the blogs by Database Providers – your global source for growth strategies.",
        noIntl: true,
    });
}

export default function BlogListing() {
    return (
        <div>
            <BlogListingBanner />
            <BlogList />
        </div>
    )
}