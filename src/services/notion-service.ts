import { Client } from '@notionhq/client';
import { BlogPost, PostPage } from '../types/blog';
import { NotionToMarkdown } from 'notion-to-md';

export default class NotionService {
  client: Client;
  n2m: NotionToMarkdown;

  constructor() {
    this.client = new Client({ auth: process.env.NOTION_ACCESS_TOKEN });
    this.n2m = new NotionToMarkdown({ notionClient: this.client });
  }

  async getPublishedBlogPosts(locale: string): Promise<BlogPost[]> {
    const databaseId = process.env.NOTION_BLOG_DATABASE_ID!;
    const response = await this.client.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          {
        property: 'Published',
            checkbox: {
              equals: true,
            },
          },
          {
            property: 'locale',
            select: {
              equals: locale,
            },
          },
        ],
      },
      sorts: [
        {
          property: 'Updated',
          direction: 'descending',
        },
      ],
    });

    return response.results.map((res) => {
      // console.log('res', res);
      return NotionService.pageToPostTransformer(res);
    });
  }

  async getSingleBlogPost(contentSlug: string, locale: string): Promise<PostPage> {
    let post;

    const databaseId  = process.env.NOTION_BLOG_DATABASE_ID!;
    const response = await this.client.databases.query({
        database_id: databaseId ,
        filter: {
          and: [
            {
              property: 'Content slug',
              formula: {
                string: {
                  equals: contentSlug,
                },
              },
            },
            {
              property: 'locale',
              select: {
                equals: locale,
              },
            },
          ],
        },
      });

    if (!response.results[0]) {
        throw 'No results available';
    }

    const page = response.results[0];

    const mdBlocks = await this.n2m.pageToMarkdown(page.id);
    const markdownObject = this.n2m.toMarkdownString(mdBlocks);
    const markdown = markdownObject.parent;
    post = NotionService.pageToPostTransformer(page);
    return {
        post,
        markdown,
    };
  }

  async getLatestBlogPosts(
    locale: string,
    numberOfPosts: number = 1
  ): Promise<BlogPost[]> {
    const database = process.env.NOTION_BLOG_DATABASE_ID;

    if (!database) {
      console.error('Database ID is undefined');
      return [];
    }

    const response = await this.client.databases.query({
      database_id: database,
      filter: {
        and: [
          {
            property: 'Published',
            checkbox: {
              equals: true,
            },
          },
          {
            property: 'locale',
            select: {
              equals: locale,
            },
          },
        ],
      },
      sorts: [
        {
          property: 'Created',
          direction: 'descending',
        },
      ],
      page_size: numberOfPosts,
    });
    return response.results.map((res) =>
      NotionService.pageToPostTransformer(res)
    );
  }

  private static pageToPostTransformer(page: any): BlogPost {
    let cover = page.cover;
    if (cover) {
      switch (cover.type) {
        case 'file':
          cover = cover.file && cover.file.url ? cover.file.url : '';
          break;
        case 'external':
          cover =
            cover.external && cover.external.url ? cover.external.url : '';
          break;
        default:
          cover = '';
      }
    } else {
      cover = '';
    }
    // console.log('page', page);
    return {
      id: page.id,
      cover,
      title: page.properties.Name.title[0].plain_text,
      tags: page.properties.Tags.multi_select,
      description: page.properties.Description.rich_text[0].plain_text,
      date: page.properties.Updated.last_edited_time,
      slug: page.properties.Slug.formula.string,
      author: 'Hackmath', // Notion authors are not supported yet
      authorImage: '/fox.png', // default Image
      readtime: page.properties.readtime
        ? page.properties.readtime.number.toString()
        : 'N/A',
      coverImageAlt: page.properties['Cover Image alt']
        ? page.properties['Cover Image alt'].rich_text[0].plain_text
        : '',
      metaDescription: page.properties['Meta Description']
        ? page.properties['Meta Description'].rich_text[0].plain_text
        : '',
      seoTitle: page.properties['SEO title']
        ? page.properties['SEO title'].rich_text[0].plain_text
        : '',
      createdAt: page.properties.Created.date.start,
      updatedAt: page.properties.Updated.last_edited_time,
      contentSlug: page.properties['Content slug']?.rich_text?.[0]?.plain_text ?? '',
      locale: page.properties.locale.select.name,
    };
  }
}