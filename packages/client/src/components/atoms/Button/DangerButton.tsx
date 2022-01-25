import React from 'react';

export const DangerButton = (props: { value: string }) => {
    return (
        <button type='button' className='btn btn-outline-danger'>
            {props.value}
        </button>
    );
};
