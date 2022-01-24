import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Clocking } from './Clocking';

export const Root = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Clocking} />
            </Switch>
        </BrowserRouter>
    );
};
