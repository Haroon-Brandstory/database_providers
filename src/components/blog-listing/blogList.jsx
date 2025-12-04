"use client";
import { useNavHref } from "@/hooks/useNavHref";
import { getAllBlogs, getBlogById } from "@/lib/services";
import { API_URL } from "@/utils/config";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function BlogList() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [returnedBlogLists, setReturnedBlogLists] = useState([]);
    const STRAPI_URL = API_URL;
    const { navHref } = useNavHref();


    useEffect(() => {
        fetchAllBlogsfromStrapi();

        // fetch("https://thedatabaseproviders.com/wp-json/wp/v2/posts?_embed")
        //     .then((res) => res.json())
        //     .then((data) => {
        //         setBlogs(data);
        //         setLoading(false);
        //     })
        //     .catch((error) => {
        //         console.error("Error fetching posts:", error);
        //         setLoading(false);
        //     });
        
    }, []);

    const fetchAllBlogsfromStrapi = async () => {
        try {
            const blogsReturned = await getAllBlogs();
            setReturnedBlogLists(blogsReturned.data || []);
        } catch (err) {
            console.error("Error fetching blogs:", err);
        } finally {
            setLoading(false);
        }
    };

    // console.log(returnedBlogLists)

    if (loading) {
        return (
            <section className="bg-white">
                <div className="flex justify-center items-center min-h-[300px]">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-[#F0F4FF] py-16 px-6 flex justify-center items-center">
            <div className="container max-w-7xl mx-auto">
                {returnedBlogLists.length === 0 ? (
                    <h1 className="text-center text-black text-[30px] font-medium">
                        No Blogs to show
                    </h1>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {returnedBlogLists.map((post) => {
                            const attrs = post;
                            return (
                                <div
                                    key={post.id}
                                    className="each-blog bg-[#F6F8FF] w-full flex flex-col rounded-2xl p-4 shadow-sm"
                                >
                                    {/* Blog Image */}

                                    <Image
                                        src={STRAPI_URL + attrs.BlogPreviewImage.url}
                                        width={320}
                                        height={180}
                                        alt={attrs.BlogName}
                                        className="rounded-xl w-full h-[180px] object-cover mb-6"
                                    />


                                    {/* Blog Title */}
                                    <p className="text-[#222] text-[18px] font-medium mb-6">
                                        {attrs.BlogName}
                                    </p>

                                    {/* Read More Link */}
                                    <a
                                        href={navHref(`/blogs/${attrs.BlogSlug}`)}
                                        className="text-[#2C6BFF] font-medium flex items-center mb-4 gap-1"
                                    >
                                        Read More <span aria-hidden="true">→</span>
                                    </a>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>

        // <section className="bg-[#F0F4FF] py-16 px-6 flex justify-center items-center">
        //     <div className="container max-w-7xl mx-auto">
        //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        //             {blogs.length === 0 ? (<h1 className="text-center text-black text-[30px] font-medium">No Blogs to show</h1>) : (blogs.map((post) => (
        //                 <div key={post.id} className="each-blog bg-[#F6F8FF] w-full flex flex-col rounded-2xl p-4 shadow-sm ">
        //                     {post._embedded && post._embedded["wp:featuredmedia"] ? (
        //                         <Image
        //                             src={post._embedded["wp:featuredmedia"][0].source_url}
        //                             width={320}
        //                             height={180}
        //                             alt={post.title.rendered}
        //                             className="rounded-xl w-full h-[180px] object-cover mb-6"
        //                         />
        //                     ) : (
        //                         <div className="rounded-xl w-full h-[180px] bg-gray-200 mb-6"></div>
        //                     )}
        //                     <p className="text-[#222] text-[18px] font-medium mb-6" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
        //                     <a
        //                         href={post.link}
        //                         target="_blank"
        //                         rel="noopener noreferrer"
        //                         className="text-[#2C6BFF] font-medium flex items-center mb-4 gap-1"
        //                     >
        //                         Read More <span aria-hidden="true">→</span>
        //                     </a>
        //                 </div>
        //             )))}
        //         </div>

        //         <div>

        //         </div>
        //     </div>
        // </section>
    );
}
