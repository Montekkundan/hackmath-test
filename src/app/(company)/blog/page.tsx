"use client"
import { Suspense, useEffect, useState } from 'react';
import NotionService from '@/services/notion-service';
import { BlogPost } from '@/types/blog';
import CoverImage from '@/components/cover-image';
import Link from 'next/link';
import DateComponent from '@/components/date';
import MoreBlogs from '@/components/more-blogs';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/blog`);
      if (response.ok) {
        try {
          const data: BlogPost[] = await response.json();
          // Sort posts by createdAt date in descending order
          data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          setPosts(data);
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      } else {
        console.error('Failed to fetch:', response.status);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const latestPost = posts[0]; // Assuming the first post is now the latest
  const morePosts = posts.slice(1); // The rest of the posts

  return (
    <div className="container mx-auto px-5">
      <section className="pt-16 mb-16 flex flex-col items-start md:items-center lg:mb-12 lg:flex-row lg:justify-between">
        <h1 className="text-balance text-6xl font-bold leading-tight tracking-tighter lg:pr-8 lg:text-8xl">
          The HackMath Blog.
        </h1>
        <h2 className="text-pretty mt-5 text-center text-lg lg:pl-8 lg:text-left">
          Learn about the latest in math and technology.
        </h2>
      </section>
      {latestPost && <HeroPost post={latestPost} />}
      <aside>
        <h2 className="mb-8 text-6xl font-bold leading-tight tracking-tighter md:text-7xl">
          More Blogs
        </h2>
        <Suspense fallback={<p>Loading more blogs...</p>}>
          <MoreBlogs posts={morePosts} />
        </Suspense>
      </aside>
    </div>
  );
}

interface HeroPostProps {
  post: BlogPost;
}

function HeroPost({ post }: HeroPostProps) {
  return (
    <article>
      <Link href={`/blog/${post.contentSlug}`} className="group mb-8 block md:mb-16">
        <CoverImage title={post.title} src={post.cover} alt={post.coverImageAlt} priority />
      </Link>
      <div className="mb-20 md:mb-28 md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8">
        <div>
          <h3 className="text-pretty mb-4 text-4xl leading-tight lg:text-6xl">
            <Link href={`/blog/${post.contentSlug}`} className="group">
              <span className='relative block transition-all duration-300 ease-in-out overflow-hidden'>
                <span className="relative inline-block transition-all duration-300 ease-in-out">
                  <span className="mb-1 absolute bottom-0 left-0 bg-purple-500 h-4 w-0 group-hover:w-full transition-all duration-300 ease-in-out"></span>
                  <span className="relative z-10 block mb-3 ">{post.title}</span>
                </span>
              </span>
            </Link>
          </h3>
          <div className="mb-4 text-lg md:mb-0">
            <DateComponent dateString={post.createdAt} />
          </div>
        </div>
        <div className="hidden md:gap-4  md:flex items-center ">
          <Avatar>
            <AvatarImage src={post.authorImage} alt={post.author} />
            <AvatarFallback>{post.authorImage}</AvatarFallback>
          </Avatar>
          <div className="text-pretty text-xl font-bold">{post.author}</div>
        </div>
      </div>
    </article>
  );
}