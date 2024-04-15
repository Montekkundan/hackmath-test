export type Tag = {
    color: string
    id: string
    name: string
}

export type BlogPost = {
    id: string;
    slug: string;
    cover: string;
    title: string;
    tags: Tag[];
    description: string;
    date: string;
    author: string;
    authorImage: string;
    readtime: number;
    coverImageAlt: string;
    metaDescription: string;
    seoTitle: string;
    updatedAt: string;
    createdAt: string;
    contentSlug: string;
    locale: string;
}

export type PostPage = {
    post: BlogPost,
    markdown: string
}