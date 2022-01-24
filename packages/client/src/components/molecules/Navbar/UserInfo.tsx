import React, { useState } from 'react';
import { UserInfoBox } from '../../atoms/Navbar/UserInfoBox';
import { Link } from 'react-router-dom';

export const UserInfo = (props: { email: string }) => {
    const [isHover, setIsHover] = useState(false);

    return (
        <>
            {isHover ? (
                <div
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}>
                    <UserInfoBox email={props.email} opacity={'1.0'} />
                </div>
            ) : (
                <div
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}>
                    <UserInfoBox email={props.email} opacity={'0.6'} />
                </div>
            )}
        </>
    );
};
