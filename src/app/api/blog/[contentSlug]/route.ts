import { NextApiRequest, NextApiResponse } from 'next';
import NotionService from "@/services/notion-service";
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    req: NextRequest,
    { params }: { params: { contentSlug: string } }
  ) {
    const { contentSlug } = params;
  
    if (!contentSlug) {
      return new NextResponse(JSON.stringify({ message: 'Invalid content slug' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  
    const notionService = new NotionService();
  
    try {
      const postPage = await notionService.getSingleBlogPost(contentSlug, 'en'); // Adjust 'en' to your locale as needed
      return new NextResponse(JSON.stringify(postPage), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error: any) {
      console.error('Failed to fetch blog post:', error);
      return new NextResponse(JSON.stringify({ message: 'Failed to fetch blog post', error: error.message }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  }