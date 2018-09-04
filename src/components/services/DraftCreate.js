import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import pubSub from 'pubsub-js'

export default (Component) => {

    return (props) => {

        const update = (cache, {data}) => {
            pubSub.publishSync('drafts.create', {cache, data});
        };

        return (
            <Mutation mutation={CREATE_DRAFT_MUTATION} update={update}>
                {(createDraft, result) => <Component createDraft={createDraft} {...result} {...props} />}
            </Mutation>
        )
    }
}

export const CREATE_DRAFT_MUTATION = gql`
  mutation CreateDraftMutation($title: String!, $text: String!) {
    createDraft(title: $title, text: $text) {
      id
      title
      text
    }
  }
`
