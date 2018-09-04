import { makeExecutableSchema } from 'graphql-tools';

export default makeExecutableSchema({
    typeDefs: `
        type Query {
            hello(name: String): String!
        }
    `,
    resolvers: {
        Query: {
            hello: (_, { name }) => `Hello ${name || 'World'}`
        }
    }
})
