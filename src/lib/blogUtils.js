import fs from "fs";
import path from "path";

/**
 * Fetches all blog JSON files from the content/blogs directory
 * @returns {Array} Array of blog objects
 */
export async function getAllBlogs() {
    try {
        const blogsDirectory = path.join(process.cwd(), "src", "content", "blogs");
        const fileNames = await fs.promises.readdir(blogsDirectory);
        
        const blogs = [];
        
        for (const fileName of fileNames) {
            if (fileName.endsWith('.json')) {
                const filePath = path.join(blogsDirectory, fileName);
                const fileContents = await fs.promises.readFile(filePath, "utf-8");
                const blog = JSON.parse(fileContents);
                blogs.push(blog);
            }
        }
        
        return blogs;
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return [];
    }
}

/**
 * Gets 3 random blogs from all available blogs
 * @param {Array} allBlogs - Array of all blog objects
 * @param {string} currentSlug - Current blog slug to exclude from random selection
 * @returns {Array} Array of 3 random blog objects
 */
export function getRandomThreeBlogs(allBlogs, currentSlug = null) {
    // Filter out the current blog if currentSlug is provided
    const availableBlogs = currentSlug 
        ? allBlogs.filter(blog => blog.slug !== currentSlug)
        : allBlogs;
    
    // If we have 3 or fewer blogs, return all available
    if (availableBlogs.length <= 3) {
        return availableBlogs;
    }
    
    // Shuffle the array and take first 3
    const shuffled = [...availableBlogs].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
}

/**
 * Formats blog data for the RecentThreeBlogs component
 * @param {Array} blogs - Array of blog objects
 * @returns {Array} Formatted blog data for the component
 */
export function formatBlogsForComponent(blogs) {
    return blogs.map(blog => ({
        img: blog.previewImage || "/latestBlogs/demo_blog.png", // fallback image
        blogDesc: blog.title || "Untitled Blog",
        blogRedirection: `/blogs/${blog.slug}`
    }));
}
