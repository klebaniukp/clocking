import React from 'react';

export const Card = (props: { value: string }) => {
    return (
        <div className={'card-title'} style={{ fontSize: 'xxx-large' }}>
            {props.value}
        </div>
    );
};
