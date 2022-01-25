import React from 'react';

export const SuccessButton = (props: { value: string }) => {
    return (
        <button type='button' className='btn btn-outline-success'>
            {props.value}
        </button>
    );
};
