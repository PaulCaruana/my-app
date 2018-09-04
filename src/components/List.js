import React, { Fragment } from 'react';

export default (props) => {
    const items = props.items;
    const render = props.render;
    if (!items) {
        return null;
    }

    return (
        <Fragment>
            {items.map((item) => {return render(item, props)})}
            {props.children}
        </Fragment>
    )
}
