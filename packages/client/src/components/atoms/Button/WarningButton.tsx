import React from 'react';

export const WarningButton = (props: { value: string }) => {
    return (
        <button type='button' className='btn btn-outline-warning'>
            {props.value}
        </button>
    );
};
