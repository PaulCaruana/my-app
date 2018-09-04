import { makeExecutableSchema } from 'graphql-tools';

export default makeExecutableSchema({
    typeDefs: `
        type Query {
            posts: [Post]
            feed: [Post]
            drafts: [Post]
            post(id: ID!): Post
        }

        type Post {
            id: ID! @unique
            isPublished: Boolean!
            title: String!
            text: String!
        }

        type Mutation {
            createDraft(title: String!, text: String!): Post
            deletePost(id: ID!): Post
            publish(id: ID!): Post
        }
    `,
    resolvers: {
        Query: {
            post: async (root, {id}, {data}, info) => {
                return await data.posts.findById(id);
            },
            posts: async (root, args, {data}, info) => {
                return await data.posts.find();
            },
            feed: async (root, args, {data}, info) => {
                return await data.posts.find({ isPublished: true });
            },
            drafts: async (root, args, {data}, info) => {
                return await data.posts.find({ isPublished: false });
            },
        },
        Mutation: {
            createDraft: async (root, { title, text }, {data}, info) => {
                return await data.posts.create({ title, text, isPublished: false });
            },
            publish: async (root, { id }, {data}, info) => {
                return await data.posts.updateById({ isPublished: true }, id);
            },
            deletePost: async (root, { id }, {data}, info) => {
                return await data.posts.deleteById(id);
            },
        },

    }
})