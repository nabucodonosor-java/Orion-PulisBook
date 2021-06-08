import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { getAccessTokenDecoded, isAllowebByRole, logout } from 'core/utils/auth';
import './styles.scss';

const Navbar = () => {
    const [currentUser, setCurrentUser] = useState('');
    const location = useLocation();

    const handleLogout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        logout();
    }

    useEffect(() => {
        const currentUserData = getAccessTokenDecoded();
        setCurrentUser(currentUserData.user_name);
    }, [location]); 
    
    return (
        <nav className="row bg-primary navbar-main">
            <div className="col-3">
                <Link to="/" className="navbar-logo-text">
                    <h4>PulisBook</h4>
                </Link>
            </div>
            <div className="col-6">
                <ul className="navbar-main-menu">
                    <li>
                        <NavLink className="navbar-link" to="/" activeClassName="active" exact>HOME</NavLink>
                    </li>
                    <li>
                        <NavLink className="navbar-link" to="/moradores" activeClassName="active" exact>PULEIRIANOS</NavLink>
                    </li>
                    <li>
                        <NavLink className="navbar-link" to="/devs" activeClassName="active" exact>DevTeam</NavLink>
                    </li>
                    {isAllowebByRole(['ROLE_ADMIN']) && (
                        <li>
                        <NavLink className="navbar-link" to="/admin" activeClassName="active" exact>ADMIN</NavLink>
                    </li>
                    )}
                </ul>
            </div>
            <div className="col-3 text-right">
               { currentUser && (
                   <>
                    <a href="logout" className="navbar-link active d-inline ml-3" onClick={handleLogout}>
                        LOGOUT
                    </a>
                    <div>  
                        {currentUser}
                    </div>                   
                   </>
               )}
                { !currentUser && (
                    <Link className="navbar-link active ml-3" to="/auth/login">
                    LOGIN
                    </Link>
                )}
            </div>
        </nav>
    )
};

export default Navbar;