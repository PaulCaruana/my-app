import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import QueryContainer from '../../graphql/QueryContainer';

export default (Component) => {
    const Container = QueryContainer(Component)
    return (props) => <Query query={FEED_QUERY}>{result => <Container {...result} {...props} />}</Query>
}

export const FEED_QUERY = gql`
  query FeedQuery {
    feed {
      id
      text
      title
      isPublished
    }
  }
`

