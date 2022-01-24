import React from 'react';
import { Link } from 'react-router-dom';

export const NavbarTitle = (props: { value: string; logo: string }) => {
    return (
        <>
            <Link to='/Chat' className='navbar-brand'>
                <div className='d-flex flex-row mt-3'>
                    <div className='me-1'>
                        <img
                            src={props.logo}
                            alt='logo'
                            style={{ height: '4vh' }}
                        />
                    </div>
                    <p>{props.value}</p>
                </div>
            </Link>
        </>
    );
};
