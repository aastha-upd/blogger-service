"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const utils_1 = require("./utils");
const resolvers = {
    Query: {
        blogs: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { pageNumber, pageSize, id } = args;
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
                    values: [offset, pageSize],
                };
                if (id) {
                    query.text += ` WHERE id = $3`;
                    query.values.push(id);
                }
                query.text += ` ORDER BY date OFFSET $1 LIMIT $2`;
                const { rows } = yield db_1.default.query(query);
                return rows;
            }
            catch (error) {
                throw new Error(`Error fetching blogs: ${error}`);
            }
        })
    },
    Mutation: {
        createBlog: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { title, image, excerpt, author, content, tags } = args;
            const now = new Date();
            const { rows } = yield db_1.default.query('INSERT INTO blog_posts (title, image, excerpt, author, date, slug, content, min_read, tags) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id', [title, image, excerpt, author, now, (0, utils_1.generateSlug)(title), content, (0, utils_1.calculateMinRead)(content), tags]);
            return rows[0].id;
        }),
    },
};
exports.default = resolvers;
