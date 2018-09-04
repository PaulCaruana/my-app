import React, { Component } from 'react'
import Create from './services/DraftCreate'

class DraftForm extends Component {
    state = {
        title: '',
        text: '',
    };

    onSubmit = async (e) => {
        e.preventDefault()
        const { title, text } = this.state;
        await this.props.createDraft({
            variables: {title, text},
        });
        this.props.postSubmit()
    };

    render() {
         return (
            <div className="pa4 flex justify-center bg-white">
                <form onSubmit={this.onSubmit}>
                    <input
                        autoFocus
                        className="w-100 pa2 mv2 br2 b--black-20 bw1"
                        onChange={e => this.setState({ title: e.target.value })}
                        placeholder="Title"
                        type="text"
                        value={this.state.title}
                        />
                <textarea
                    className="db w-100 ba bw1 b--black-20 pa2 br2 mb2"
                    cols={50}
                    onChange={e => this.setState({ text: e.target.value })}
                    placeholder="Content"
                    rows={8}
                    value={this.state.text}
                    />
                    <input
                        className={`pa3 bg-black-10 bn ${this.state.text &&
                    this.state.title &&
                    'dim pointer'}`}
                        disabled={!this.state.text || !this.state.title}
                        type="submit"
                        value="Create"
                        />
                    <a className="f6 pointer" onClick={this.props.cancel}>
                        or cancel
                    </a>
                </form>
            </div>
        )
    }
}

export default DraftForm
export const DraftCreate = Create(DraftForm);