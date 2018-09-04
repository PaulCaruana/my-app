import { makeExecutableSchema } from 'graphql-tools';

export default makeExecutableSchema({
    typeDefs: `
        type Query {
            customers: [Customer]
            state(id: Int): State
            states: [State]
        }

        type Customer {
            _id: ID!
            firstName: String!
            lastName: String!
            email: String!
            address: String!
            city: String!
            state: State
            zip: String!
            gender: String!
            orders: [Order]
        }

        type State {
            _id: ID!
            id: Int!
            name: String!
            abbreviation: String!
        }

        type Order {
            product: String!
            price: Float!
            quality: Int!
        }
    `,
    resolvers: {
        Query: {
            state: async (root, {id}, {data}, info) => {
                return await data.states.getById(id)
            },
            states: async (root, args, {data}, info) => {
                return await data.states.find()
            },
            customers: async (root, args, {data}, info) => {
                return await data.customers.find()
            },
        },
        Customer: {
            state: async ({stateId}, args, {data}) => {
                return await data.states.getById(stateId)
            }
        }
    }
})