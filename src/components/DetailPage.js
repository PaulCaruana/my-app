import React, { Component, Fragment } from 'react'
import { Query, Mutation } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import { DRAFTS_QUERY } from './DraftsPage'

class DetailPage extends Component {
  render() {
    return (
      <Query query={POST_QUERY} variables={{ id: this.props.match.params.id }}>
        {({ data, loading, error }) => {
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

          const { post } = data
          const action = this._renderAction(post)
          return (
            <Fragment>
              <h1 className="f3 black-80 fw4 lh-solid">{data.post.title}</h1>
              <p className="black-80 fw3">{data.post.text}</p>
              {action}
            </Fragment>
          )
        }}
      </Query>
    )
  }

  _renderAction = ({ id, isPublished }) => {
    const publishMutation = (
      <Mutation
        mutation={PUBLISH_MUTATION}
        update={(cache, { data }) => {
          const { drafts } = cache.readQuery({ query: DRAFTS_QUERY })
          const { feed } = cache.readQuery({ query: FEED_QUERY })
          cache.writeQuery({
            query: FEED_QUERY,
            data: { feed: feed.concat([data.publish]) },
          })
          cache.writeQuery({
            query: DRAFTS_QUERY,
            data: {
              drafts: drafts.filter(draft => draft.id !== data.publish.id),
            },
          })
        }}
      >
        {(publish, { data, loading, error }) => {
          return (
            <a
              className="f6 dim br1 ba ph3 pv2 mb2 dib black pointer"
              onClick={async () => {
                await publish({
                  variables: { id },
                })
                this.props.history.replace('/')
              }}
            >
              Publish
            </a>
          )
        }}
      </Mutation>
    )
    const deleteMutation = (
      <Mutation
        mutation={DELETE_MUTATION}
        update={(cache, { data }) => {
          if (isPublished) {
            const { feed } = cache.readQuery({ query: FEED_QUERY })
            cache.writeQuery({
              query: FEED_QUERY,
              data: {
                feed: feed.filter(post => post.id !== data.deletePost.id),
              },
            })
          } else {
            const { drafts } = cache.readQuery({ query: DRAFTS_QUERY })
            cache.writeQuery({
              query: DRAFTS_QUERY,
              data: {
                drafts: drafts.filter(draft => draft.id !== data.deletePost.id),
              },
            })
          }
        }}
      >
        {(deletePost, { data, loading, error }) => {
          return (
            <a
              className="f6 dim br1 ba ph3 pv2 mb2 dib black pointer"
              onClick={async () => {
                await deletePost({
                  variables: { id },
                })
                this.props.history.replace('/')
              }}
            >
              Delete
            </a>
          )
        }}
      </Mutation>
    )
    if (!isPublished) {
      return (
        <Fragment>
          {publishMutation}
          {deleteMutation}
        </Fragment>
      )
    }
    return deleteMutation
  }

}
const FEED_QUERY = gql`
  query FeedQuery {
    feed {
      id
      text
      title
      isPublished
    }
  }
`

const POST_QUERY = gql`
  query PostQuery($id: ID!) {
    post(id: $id) {
      id
      title
      text
      isPublished
    }
  }
`

const PUBLISH_MUTATION = gql`
  mutation PublishMutation($id: ID!) {
    publish(id: $id) {
      id
      isPublished
    }
  }
`

const DELETE_MUTATION = gql`
  mutation DeleteMutatoin($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`

export default withRouter(DetailPage)
