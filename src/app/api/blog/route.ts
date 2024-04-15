import NotionService from "@/services/notion-service";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const notionService = new NotionService();

    try {
        const posts = await notionService.getPublishedBlogPosts('en');
        return new Response(JSON.stringify(posts), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Failed to fetch blog posts:', error);
        return new Response(JSON.stringify({ message: 'Failed to fetch blog posts' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}