import React, { Component, Fragment } from 'react'
import Post from '../components/Post'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import pubSub from 'pubsub-js'

export default class DraftsPage extends Component {
  mySubscriber = (msg, data) => {
    console.log( msg, data );
  };

  render() {
    pubSub.subscribe('drafts.create', this.mySubscriber);
    return (
      <Query query={DRAFTS_QUERY}>
        {({ data, loading, error, refetch }) => {
          if (loading) {
            return (
              <div className="flex w-100 h-100 items-center justify-center pt7">
                <div>Loading ...</div>
              </div>
            )
          }

          if (error) {
            return (
              <div className="flex w-100 h-100 items-center justify-center pt7">
                <div>An unexpected error occured.</div>
              </div>
            )
          }
          console.log("second")
          return (
            <Fragment>
              <div className="flex justify-between items-center">
                <h1>Drafts</h1>
              </div>
              {data.drafts &&
                data.drafts.map(draft => (
                  <Post
                    key={draft.id}
                    post={draft}
                    refresh={() => refetch()}
                    isDraft={!draft.isPublished}
                  />
                ))}
              {this.props.children}
            </Fragment>
          )
        }}
      </Query>
    )
  }
}

export const DRAFTS_QUERY = gql`
  query DraftsQuery {
    drafts {
      id
      text
      title
      isPublished
    }
  }
`
