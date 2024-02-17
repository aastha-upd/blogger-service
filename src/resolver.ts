import { QueryResolvers, MutationResolvers, BlogPost, MutationCreateBlogArgs } from './generated/graphql';
import db from '../db';
import { calculateMinRead, generateSlug } from './utils';


const resolvers: {
  Query: QueryResolvers,
  Mutation: MutationResolvers
} = {
  Query: {

  blogs: async (_, args: { pageNumber: number, pageSize: number, id?: string | null}) => {
    try {
      const { pageNumber, pageSize, id} = args;
      const offset = (pageNumber - 1) * pageSize;

      const query = {
        text: `SELECT 
          id AS "id",
          title AS "title",
          image AS "image",
          excerpt AS "excerpt",
          author AS "author",
          date AS "date",
          slug AS "slug",
          content AS "content",
          min_read AS "minRead",
          tags AS "tags"
          FROM
          blog_posts
          `,
        values: [offset as unknown as string, pageSize as unknown as string],
      };

      if(id) {
        query.text += ` WHERE id = $3`;
        query.values.push(id);

      }

      query.text += ` ORDER BY date OFFSET $1 LIMIT $2`;

      const { rows } = await db.query(query);

      
      return rows as BlogPost[];
    } catch (error) {
      throw new Error(`Error fetching blogs: ${error}`);
    }
}

  },
  Mutation: {

    
    createBlog: async (_, args: MutationCreateBlogArgs) => {
      const { title, image, excerpt, author, content, tags } = args;

      const now = new Date();
      const { rows } = await db.query(
        'INSERT INTO blog_posts (title, image, excerpt, author, date, slug, content, min_read, tags) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id',
        [title, image, excerpt, author, now, generateSlug(title), content, calculateMinRead(content), tags]
      );
      return rows[0].id as string;
    },
  },
};

export default resolvers;
