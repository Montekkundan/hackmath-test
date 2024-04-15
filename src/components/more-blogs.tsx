import Link from "next/link";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import CoverImage from "./cover-image";
import DateComponent from "./date";
import { BlogPost } from "@/types/blog";


export default async function MoreBlogs({ posts }: any) {
  if (!posts || posts.length === 0) {
    return <div className="mb-32">
      <p className="text-xl mt-5">Stay tuned for more blogs!</p>
    </div>
  }
  return (
    <>
      <div className="mb-32 grid grid-cols-1 gap-y-20 md:grid-cols-2 md:gap-x-16 md:gap-y-32 lg:gap-x-32">
        {posts?.map((post: BlogPost) => {
          return (
            <article key={post.id}>
              <Link href={`/blog/${post.contentSlug}`} className="group mb-5 block">
                <CoverImage
                  title={post.title}
                  src={post.cover}
                  alt={post.coverImageAlt}
                  priority={true}
                />
              </Link>
              <h3 className="text-pretty mb-4 text-3xl leading-tight ">
                <Link href={`/blog/${post.contentSlug}`} className="group">
                  <span className='relative block transition-all duration-300 ease-in-out overflow-hidden'>
                    <span className="relative inline-block transition-all duration-300 ease-in-out">
                      <span className="mb-1 absolute bottom-0 left-0 bg-purple-500 h-4 w-0 group-hover:w-full transition-all duration-300 ease-in-out"></span>
                      <span className="relative z-10 block mb-3 ">{post.title}</span>
                    </span>
                  </span>
                </Link>
              </h3>
              <div className="mb-4 text-lg">
                <DateComponent dateString={post.createdAt} />
              </div>
              <div className="hidden md:gap-4  md:flex items-center ">
                <Avatar>
                  <AvatarImage src={post.authorImage} alt={post.author} />
                  <AvatarFallback>{post.authorImage}</AvatarFallback>
                </Avatar>
                <div className="text-pretty text-xl font-bold">{post.author}</div>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}