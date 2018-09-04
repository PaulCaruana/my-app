import server from './server';
import db from './database'
import schema from './schemas'

server.start(db, schema);