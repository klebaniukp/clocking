import React from 'react';
import { Link } from 'react-router-dom';

export const UserInfoBox = (props: { email: string; opacity: string }) => {
    return (
        <div
            className={`nav-item vh-6 vw-10 text-decoration-none`}
            style={{
                opacity: props.opacity,
                color: 'white',
                marginTop: '0.5vh',
            }}>
            <h5>{props.email}</h5>
        </div>
    );
};
