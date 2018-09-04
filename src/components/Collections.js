import React from 'react';

export default (collection, item) => {
    if (!collection) {
        return null;
    }

    return (
        <div>
            {collection.map(item)}
        </div>
    )
}

export const List = (props) => {
    const collection = props.collection;
    const render = props.render;
    if (!collection) {
        return null;
    }

    return (
        <div>
            {collection.map(render)}
        </div>
    )

}

export const Repeat = (props) => {
    const collection = props.collection;
    const itemName = props.item;
    const Component = props.component;
    if (!collection) {
        return null;
    }

    return (
        <div>
            {collection.map(item =>
                {
                    const params = {
                        key : item.id,
                        [itemName] : item
                    }
                    return (<Component {...params} />)
                }
            )}
        </div>
    )

}
