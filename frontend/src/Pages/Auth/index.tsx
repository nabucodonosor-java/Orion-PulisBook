import React from 'react';
import { ReactComponent as AuthImage } from 'core/assests/images/auth.svg';
import { Route, Switch } from 'react-router-dom';

import './styles.scss';
import Login from './components/Login';


const Auth = () => ( 
    <div className="auth-container">
        <div className="auth-info">
            <h1 className="auth-info-title">
                - PulisBook -
            </h1>
            <p className="auth-info-subtile">
                Faça parte de uma rede verdadeiramente social!
            </p>
            <AuthImage />
        </div>
        <div className="auth-content">
            <Switch>
                <Route path="/auth/login">
                    <Login />
                </Route>
                <Route path="/auth/register">
                    <h1>CADASTRO</h1>
                </Route>
                <Route path="/auth/recover">
                    <h1>PÁGINA EM CONSTRUÇÃO SANGUE</h1>
                </Route>
            </Switch>
        </div>
    </div>
);

export default Auth;