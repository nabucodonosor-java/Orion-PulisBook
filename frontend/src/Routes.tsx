import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './core/components/Navbar';
import Admin from 'Pages/Admin';
import Catalog from 'Pages/Catalog';
import MoradorDetails from 'Pages/Catalog/components/MoradorDetails';
import Home from 'Pages/Home';
import history from './core/utils/history';
import Auth from 'Pages/Auth';
import DevTeam from 'Pages/DevTeam';

const Routes = () => (
    <Router history={history}>
    <Navbar />
        <Switch>
            <Route path="/" exact>
                <Home />
            </Route>
            <Route path="/moradores"  exact>
                <Catalog />
            </Route>
            <Route path="/devs"  exact>
                <DevTeam />
            </Route>
            <Route path="/moradores/:moradorId">
                <MoradorDetails />
            </Route>
            <Redirect from="/auth" to="/auth/login" exact/>
            <Route path="/auth">
                <Auth />
            </Route>
            <Redirect from="/admin" to="/admin/moradores" exact/>
            <Route path="/admin">
                <Admin />
            </Route>
        </Switch>
    </Router>
);

export default Routes;