"use client";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";

export default function YtVideoListingSection() {
    const [videos, setVideos] = useState([]);
    const [visibleCount, setVisibleCount] = useState(6);
    const [loading, setLoading] = useState(true);

    // const channelId = "UC8ag8pQbzFAkmsgB4a99QAA";
    // const rss2jsonUrl = `https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    const API_KEY = process.env.NEXT_PUBLIC_YT_API_KEY;
    const playlistId = "UU8ag8pQbzFAkmsgB4a99QAA"; // Note UC → UU

    const apiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${API_KEY}`;

    useEffect(() => {
        fetch(apiUrl)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setVideos(data.items || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching videos:", err);
                setLoading(false);
            });
    }, []);

    const showMore = () => {
        setVisibleCount((prev) => prev + 6);
    };

    const showLess = () => {
        setVisibleCount(6);
        // setVisibleCount((prev) => Math.max(prev - 6, 6));
        window.scrollTo({ top: 500, behavior: "smooth" });
    };

    if (loading) {
        return (
            <section className="bg-[#F0F4FF] py-16 px-6">
                <div className="flex justify-center items-center min-h-[300px]">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-[#F0F4FF] py-16 px-6">
            <div className="container max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* {videos.slice(0, visibleCount).map((video) => (
                        <div key={video.guid} className="bg-white rounded-xl shadow-sm overflow-hidden">
                            <a href={video.link} target="_blank" rel="noopener noreferrer">
                                <div className="w-full h-48 bg-gray-200 relative">
                                    <img
                                        src={video.thumbnail}
                                        alt={video.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-4">
                                    <div className="flex items-center justify-between gap-2 mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                                                D
                                            </div>
                                            <div className="text-xs text-gray-600">
                                                Data Base Provider
                                            </div>
                                        </div>
                                        <div className="text-xs text-gray-500 flex items-center gap-2">• {formatDistanceToNow(new Date(video.pubDate), { addSuffix: true })} <span><Image src="/videos/ytIcon.svg" width={20} height={12} alt='img' /></span></div>
                                    </div>
                                    <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">{video.title}</h3>
                                    <div className="mt-2 text-blue-600 flex items-center text-sm hover:underline">
                                        Watch on YouTube
                                        <svg className="w-4 h-4 ml-1 mt-[6px]" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19.615 3.184a2.75 2.75 0 0 0-1.938-1.938C16.378 1 12 1 12 1s-4.378 0-5.677.246a2.75 2.75 0 0 0-1.938 1.938C4 4.483 4 8.966 4 8.966s0 4.483.385 5.782a2.75 2.75 0 0 0 1.938 1.938C7.622 16 12 16 12 16s4.378 0 5.677-.246a2.75 2.75 0 0 0 1.938-1.938C20 13.449 20 8.966 20 8.966s0-4.483-.385-5.782zM9.75 12.545V5.387l6.25 3.579-6.25 3.579z" />
                                        </svg>
                                    </div>
                                </div>
                            </a>
                        </div>
                    ))} */}
                    {videos.slice(0, visibleCount).map((item) => {
                        const video = item.snippet;
                        const videoUrl = `https://www.youtube.com/watch?v=${video.resourceId.videoId}`;
                        return (
                            <div key={video.resourceId.videoId} className="bg-white rounded-xl shadow-sm overflow-hidden">
                                <a href={videoUrl} target="_blank" rel="noopener noreferrer">
                                    <div className="w-full h-48 bg-gray-200 relative">
                                        <img
                                            src={video.thumbnails.high.url}
                                            alt={video.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-center justify-between gap-2 mb-2">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                                                    D
                                                </div>
                                                <div className="text-xs text-gray-600">Database Provider</div>
                                            </div>
                                            <div className="text-xs text-gray-500 flex items-center gap-2">
                                                • {formatDistanceToNow(new Date(video.publishedAt), { addSuffix: true })}
                                                <span>
                                                    <Image src="/videos/ytIcon.svg" width={20} height={12} alt="YouTube Icon" />
                                                </span>
                                            </div>
                                        </div>
                                        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">{video.title}</h3>
                                        <div className="mt-2 text-blue-600 flex items-center text-sm hover:underline">
                                            Watch on YouTube
                                            <svg
                                                className="w-4 h-4 ml-1 mt-[6px]"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M19.615 3.184a2.75 2.75 0 0 0-1.938-1.938C16.378 1 12 1 12 1s-4.378 0-5.677.246a2.75 2.75 0 0 0-1.938 1.938C4 4.483 4 8.966 4 8.966s0 4.483.385 5.782a2.75 2.75 0 0 0 1.938 1.938C7.622 16 12 16 12 16s4.378 0 5.677-.246a2.75 2.75 0 0 0 1.938-1.938C20 13.449 20 8.966 20 8.966s0-4.483-.385-5.782zM9.75 12.545V5.387l6.25 3.579-6.25 3.579z" />
                                            </svg>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        );
                    })}

                </div>

                {visibleCount < videos.length && (
                    <div className="text-center mt-8">
                        <button onClick={showMore} className="relative text-white px-10 py-3 cursor-pointer rounded-full font-medium text-[15px] overflow-hidden z-10 hover:scale-105 transition duration-300 ease-in ">
                            <span className="relative z-10">Show More</span>
                            <span className="absolute inset-0 bg-gradient-to-r from-[#0055ff1a] via-[#0133E9] to-[#0055FF] bg-[length:200%_100%] bg-left transition-all duration-700 ease-in-out rounded-full blur-sm animate-gradient-loop">
                            </span>
                        </button>
                    </div>
                )}
                {visibleCount >= videos.length && videos.length > 6 && (
                    <div className="text-center mt-8">
                        <button onClick={showLess} className="relative text-white px-10 py-3 cursor-pointer rounded-full font-medium text-[15px] overflow-hidden z-10 hover:scale-105 transition duration-300 ease-in">
                            <span className="relative z-10">Show Less</span>
                            <span className="absolute inset-0 bg-gradient-to-r from-[#0055ff1a] via-[#0133E9] to-[#0055FF] bg-[length:200%_100%] bg-left transition-all duration-700 ease-in-out rounded-full blur-sm animate-gradient-loop"></span>
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
