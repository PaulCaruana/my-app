import { GraphQLServer } from 'graphql-yoga'

let server;

export default {
    start: async (db, schema) => {
        await db.start();

        server = new GraphQLServer({
            schema,
            context: req => ({...req, db, data: db.data})
        });
        await server.start();
        console.log('Server is running on http://localhost:4000')
    },
    shutDown: () => {

    }
}
