import { isAllowebByRole } from 'core/utils/auth';
import React from 'react';
import { NavLink } from 'react-router-dom';

import './styles.scss';

const NavbarAdmin = () => (
    <nav className="admin-nav-admin-container">
        <ul>
            <li>
                <NavLink to="/admin/moradores" className="admin-nav-admin-item">
                    Puleirianos
                </NavLink>
            </li>
            <li>
                <NavLink to="/admin/casas" className="admin-nav-admin-item">
                    Casas
                </NavLink>
            </li>
            {isAllowebByRole(['ROLE_ADMIN']) && (
                <li>
                <NavLink to="/admin/users" className="admin-nav-admin-item">
                    Usuários
                </NavLink>
            </li>
            )}              
        </ul>
    </nav>
);

export default NavbarAdmin;