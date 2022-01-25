import React from 'react';

export const InfoButton = (props: { value: string }) => {
    return (
        <button type='button' className='btn btn-outline-info'>
            {props.value}
        </button>
    );
};
