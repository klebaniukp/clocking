import React from 'react';
import { DropdownButton } from '../atoms/Button/DropdownButton';
import { NavbarTitle as Title } from '../atoms/Navbar/NavbarTitle';
import { DropdownList } from '../molecules/Navbar/DropdownList';
import { UserInfo } from '../molecules/Navbar/UserInfo';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { IUserData } from '../../types';
import { Logout } from '../molecules/Navbar/Logout';
const logo = require('../../img/logo.png');

export const Navbar = () => {
    const userData: IUserData = useSelector(
        (state: RootState) => state.userData,
    );

    return (
        <nav
            className='navbar sticky-top navbar-expand-lg navbar-dark bg-dark mb-1'
            style={{ height: '10vh' }}>
            <div className='container-fluid'>
                <Title value={'Clocking'} logo={logo} />
                <DropdownButton />
                <DropdownList />
                {userData.isUserLoggedIn ? (
                    <>
                        <UserInfo email={userData.email} />
                        <Logout />
                    </>
                ) : (
                    <>
                        <UserInfo email={'john@doe.com'} />
                        <Logout />r
                    </>
                )}
            </div>
        </nav>
    );
};
