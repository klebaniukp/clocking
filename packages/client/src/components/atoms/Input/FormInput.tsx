import React from 'react';

export const FormInput = (props: { inputType: string; name: string }) => {
    return (
        <input
            type={props.inputType}
            className='form-control'
            name={props.name}
            placeholder='name@example.com'
        />
    );
};
