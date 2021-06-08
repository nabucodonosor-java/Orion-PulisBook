import React from 'react';
import { Switch } from 'react-router';
import NavbarAdmin from './components/NavbarAdmin';
import Moradores from './components/Moradores';
import PrivateRoute from 'core/components/Routes/PrivateRoute';
import './styles.scss';

const Admin = () => (
    <div className="admin-container">
    <NavbarAdmin />
    <div className="admin-content">
        <Switch>
            <PrivateRoute path="/admin/moradores">
                <Moradores />
            </PrivateRoute>
            <PrivateRoute path="/admin/casas">
                <h1>Casas</h1>
            </PrivateRoute>
            <PrivateRoute path="/admin/users" allowedRoutes={['ROLE_ADMIN']}>
                <h1>Users</h1>
            </PrivateRoute>
        </Switch>
    </div>
</div>
);

export default Admin;