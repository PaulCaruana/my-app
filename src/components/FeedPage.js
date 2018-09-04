import React, { Component, Fragment } from 'react'
import Feed from './Feed'

export default class FeedPage extends Component {
  render() {
    return (
        <Fragment>
          <h1>Feed</h1>
          <Feed />
        </Fragment>
    )
  }
}
