import React from 'react';

export const Submit = (props: { value: string }) => {
    return (
        <button type='submit' className='btn btn-primary m-3 btn-lg vh-5'>
            {props.value}
        </button>
    );
};
