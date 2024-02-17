"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const typeDefs = (0, apollo_server_express_1.gql) `
  type BlogPost {
    id: ID!
    title: String!
    image: String!
    excerpt: String!
    author: String!
    date: String!
    slug: String
    content: String!
    minRead: Int!
    tags: String
  }

  
  type Query {
    blogs(pageSize: Int!, pageNumber: Int!, id: ID): [BlogPost]!
  }

  type Mutation {
    createBlog(
      title: String!,
      image: String!,
      excerpt: String!,
      author: String!,
      content: String!,
      tags: String
    ): ID!
  }
`;
exports.default = typeDefs;
