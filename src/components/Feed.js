import React from 'react'
import { render } from '../components/Post'
import List from './List'
import Query from './services/FeedQuery'

export const Feed = ({ data, children }) =>
    <List items={data.feed} render={render}>{children}</List>

export default Query(Feed);
