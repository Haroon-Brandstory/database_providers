import { API_URL, API_TOKEN } from "@/utils/config";
import { notFound } from "next/navigation";

export async function fetchAPI(endpoint, options = {}) {
    const defaultOptions = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_TOKEN}`,
        },
        ...options,
    };

    let res;
    try {
        res = await fetch(`${API_URL}/api${endpoint}`, defaultOptions);
        // console.log(res);
        if (!res.ok) {
            console.error("Error fetching:", endpoint, res.statusText);
            notFound();
            throw new Error(`API error: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error("Error fetching:", error);
        notFound();
        throw error;
    }
}