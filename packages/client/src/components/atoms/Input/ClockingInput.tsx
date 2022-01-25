import React from 'react';

export const ClockingInput = (props: {
    inputType: string;
    name: string;
    placeholder: string;
    isDisabled: boolean;
    setPlaceholder: React.Dispatch<React.SetStateAction<string>>;
}) => {
    return (
        <>
            {props.isDisabled ? (
                <input
                    type={props.inputType}
                    className='form-control'
                    name={props.name}
                    placeholder={props.placeholder}
                    disabled
                />
            ) : (
                <input
                    onChange={e => props.setPlaceholder(e.target.value)}
                    type={props.inputType}
                    className='form-control'
                    name={props.name}
                    placeholder={props.placeholder}
                />
            )}
        </>
    );
};
