import { mergeSchemas } from 'graphql-tools';
import customerManager from './customerManager'
import posts from './posts'
import helloWorld from './helloWorld'
import byeWorld from './byeWorld'

export default mergeSchemas({
    schemas: [customerManager, posts]
})