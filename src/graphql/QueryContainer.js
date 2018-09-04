import React from 'react';

export default (component) => {
    return (props) => {
        const { loading, error, data, refetch, ...rest} = props;
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
        return component({data, refetch, ...rest})
    }
}
