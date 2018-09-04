import {MongoClient, ObjectId} from 'mongodb'
const MONGO_URL = 'mongodb://localhost:27017'

let client;

const db = {
    start: async () => {
        const prepare = (o) => {
            if (o === null || !o._id) {
                return o;
            }
            o.id = o._id.toString()
            return o
        };
        const dbBuilder = (connection) => {
            const self = {
                addDatabase: (dbName) => {
                    self.database = connection.db(dbName);
                    return self;
                },
                addCollection: (collectionName) => {
                    const collection = self.database.collection(collectionName);
                    self.collections = self.collections || {};
                    self.collections[collectionName] = collection;
                    self.data = self.data || {};
                    self.data[collectionName] = {
                        getById: async (id) => {
                            return await collection.findOne({id})
                        },
                        findById: async (id) => {
                            return prepare(await collection.findOne({_id: ObjectId(id)}))
                        },
                        find: async (query) => {
                            query = query || {}
                            return (await collection.find(query).toArray()).map(prepare)
                        },
                        create: async (data) => {
                            const res = await collection.insert(data)
                            return prepare(await collection.findOne({_id: res.insertedIds[0]}));
                        },
                        updateById: async (data, dataId) => {
                            const {id, ...content} = data;
                            const objId = ObjectId(dataId || id);
                            const results = await collection.findOneAndUpdate(
                                {_id: objId},
                                {
                                    $set: content
                                }
                            );

                            return prepare(results.value)
                        },
                        deleteById: async (id) => {
                            const objId = ObjectId(id);
                            const results = await collection.findOneAndDelete(
                                {_id: objId}
                            )
                            console.log(results)
                            return prepare(results.value)
                        }
                    }
                    return self;
                }
            }
            return self
        }
        try {
            client = await MongoClient.connect(MONGO_URL);
            const customerDatabase = dbBuilder(client)
                .addDatabase('customermanager')
                .addCollection('customers')
                .addCollection('states')
            const customerData = customerDatabase.data
            const postsDatabase = dbBuilder(client)
                .addDatabase('postsmanager')
                .addCollection('posts')
            const postsData = postsDatabase.data
            db.data = { ...customerData, ...postsData }
            return client;
        } catch (e) {
            console.log(e)
        }
    },
    data: {},
    shutDown: () => {
        client.close
    }
};

export default db;


