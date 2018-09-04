import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { DraftCreate } from './DraftForm'

class CreatePage extends Component {
    render() {
        const goBack = this.props.history.goBack;
        const navToDrafts = () => this.props.history.replace('/drafts');
        return (
            <Fragment>
                <h1>Create Draft</h1>
                <DraftCreate {...this.props} postSubmit={navToDrafts} cancel={goBack} />
            </Fragment>
        )
    }
}

export default withRouter(CreatePage)
