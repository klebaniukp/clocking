import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { routes } from '../routes';
import { Navbar } from '../components/organisms/Navbar/Navbar';
import { Clocking } from './Clocking';
import { AdminTaskProgression } from './AdminTaskProgression';
import { Auth } from './Auth';
import { getUserDataService } from '../services/user/getUserDataService';

export const Root = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        getUserDataService().then(userData => {
            if (userData) {
                dispatch({ type: 'SET_USER_DATA', payload: userData });
            }
        });
    }, []);

    return (
        <BrowserRouter>
            <div>
                <Navbar />

                <Switch>
                    <Route exact path={routes.clocking} component={Clocking} />
                    <Route exact path={routes.auth} component={Auth} />
                    <Route
                        path={routes.adminTaskProgression}
                        component={AdminTaskProgression}
                    />
                </Switch>
            </div>
        </BrowserRouter>
    );
};
