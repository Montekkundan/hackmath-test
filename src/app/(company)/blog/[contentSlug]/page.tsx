"use client";
import { useState, useEffect, Suspense } from 'react';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import DateComponent from '@/components/date';
import { BlogPost } from '@/types/blog';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import CoverImage from '@/components/cover-image';
import MoreBlogs from '@/components/more-blogs';
export default function Post({ params }: { params: { contentSlug: string } }) {
  const contentSlug = params.contentSlug;
  const [page, setPost] = useState<{ post: BlogPost, markdown: any } | null>(null); // Adjust the state type
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    async function fetchPost() {
      if (typeof contentSlug === 'string') {
        try {
          const response = await fetch(`/api/blog/${contentSlug}`);
          if (response.ok) {
            const data = await response.json();
            setPost(data);
          } else {
            throw new Error('Failed to fetch page');
          }
        } catch (err: any) {
          setError(err.message);
          console.error('Fetch error:', err);
        }
        setLoading(false);
      }
    }

    fetchPost();
  }, [contentSlug]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/blog`);
      if (response.ok) {
        try {
          const data: BlogPost[] = await response.json();
          data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          setPosts(data.filter(post => post.contentSlug !== contentSlug));
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      } else {
        console.error('Failed to fetch:', response.status);
      }
      setLoading(false);
    };

    fetchPosts();
  }, [contentSlug]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const morePosts = posts;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!page) return <p>No page found.</p>;
  const { post, markdown } = page;

  return (
    <div className="container mx-auto px-5">
      <h2 className="mb-16 pt-10 text-2xl font-bold leading-tight tracking-tight md:text-4xl md:tracking-tighter">
        <Link href="/blog" className="hover:underline">
          Blog
        </Link>
      </h2>
      <article>
        <h1 className="text-balance mb-12 text-6xl font-bold leading-tight tracking-tighter md:text-7xl md:leading-none lg:text-8xl">
          {post.title}
        </h1>
        <div className="hidden md:gap-4  md:flex items-center md:mb-12 ">
          <Avatar>
            <AvatarImage src={post.authorImage} alt={post.author} />
            <AvatarFallback>{post.authorImage}</AvatarFallback>
          </Avatar>
          <div className="text-pretty text-xl font-bold">{post.author}</div>
        </div>
        <div className="mb-8 sm:mx-0 md:mb-16">
          <CoverImage title={post.title} src={post.cover} alt={post.coverImageAlt} priority />
        </div>
        <div className="mx-auto max-w-2xl">
          <div className="mb-6 gap-4 flex items-center md:hidden">
            <Avatar>
              <AvatarImage src={post.authorImage} alt={post.author} />
              <AvatarFallback>{post.author}</AvatarFallback>
            </Avatar>
            <div className="text-pretty text-xl font-bold">{post.author}</div>

          </div>
          <div className="mb-6 text-lg">
            <div className="mb-4 text-lg">
              <DateComponent dateString={post.date} />
            </div>
          </div>
          <ReactMarkdown
          components={{
            h1: ({ node, ...props }) => (
              <h1 className='text-4xl font-bold py-5'>
                {props.children}
              </h1>
            ),
            h2: ({ node, ...props }) => (
              <h2 className='text-2xl font-bold py-5'>
                {props.children}
              </h2>
            ),
            ul: ({ node, ...props }) => (
              <ul className='list-disc list-inside pb-5 pl-2'>
                {props.children}
              </ul>
            ),
            li: ({ node, ...props }) => (
              <li className='mb-2'>{props.children}</li>
            ),
            p: ({ node, ...props }) => (
              <p className='block'>{props.children}</p>
            ),
            a: ({ node, ...props }) => (
              <a
                className='text-sky-500 underline'
                href={props.href}
                target='_blank'
                rel='noreferrer'
              >
                {props.children}
              </a>
            ),
            // img: MarkdownImage,
          }}
        >
          {markdown}
        </ReactMarkdown>
        </div>
     
      </article>
      <aside>
        <hr className="border-accent-2 mb-24 mt-28" />
        <h2 className="mb-8 text-6xl font-bold leading-tight tracking-tighter md:text-7xl">
          Recent Blogs
        </h2>
        <Suspense fallback={<p>Loading more blogs...</p>}>
          <MoreBlogs posts={morePosts} />
        </Suspense>
      </aside>
    </div>
  );
}