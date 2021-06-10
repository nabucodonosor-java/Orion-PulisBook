import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { getAccessTokenDecoded, isAllowebByRole, logout } from 'core/utils/auth';
import menu from 'core/assests/images/menu-icon.svg';
import './styles.scss';

const Navbar = () => {
    const [drawerActive, setDrawerActive] = useState(false);
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
        <nav className="bg-primary navbar-main">
           
                <Link to="/" className="navbar-logo-text">
                    <h4>PulisBook</h4>
                </Link>
                <button className="menu-mobile-btn" type="button" onClick={() => setDrawerActive(!drawerActive)}>
                    <img src={menu} alt="Mobile Menu" />
                </button>
           
            <div className={ drawerActive ? "menu-mobile-container" : "navbar-menu-container" }> 
                <ul className="navbar-main-menu">
                    <li> 
                        <NavLink onClick={() => setDrawerActive(false)} className="navbar-link" to="/" activeClassName="active" exact>HOME</NavLink>
                    </li>
                    <li>
                        <NavLink onClick={() => setDrawerActive(false)} className="navbar-link" to="/moradores" activeClassName="active" exact>PULIS</NavLink>
                    </li>
                    <li>
                        <NavLink onClick={() => setDrawerActive(false)} className="navbar-link" to="/devs" activeClassName="active" exact>Equipe</NavLink>
                    </li>
                    {isAllowebByRole(['ROLE_ADMIN']) && (
                        <li>
                        <NavLink onClick={() => setDrawerActive(false)} className="navbar-link" to="/admin" activeClassName="active" exact>ADMIN</NavLink>
                    </li>
                    )}
                    {drawerActive && (
                            <li>
                                {currentUser && (
                                    <a 
                                    href="#logout" 
                                    className="nav-link active d-inline" 
                                    onClick={(e) => {
                                        setDrawerActive(false);
                                        handleLogout(e);
                                    }} >
                                        {`LOGOUT - ${currentUser}`}
                                    </a>
                                )}
                            </li>
                    )}

                    {drawerActive && (
                            <>
                                {!currentUser && (
                                    <li>
                                        <Link onClick={() => setDrawerActive(false)} to="/auth/login" className="navbar-link active">LOGIN</Link>
                                    </li>        
                                )}
                            </>
                        )}
                </ul>
            </div> 
            <div className="user-info-dnone text-right">
               { currentUser && (
                   <>
                    <a href="logout" className="navbar-link active d-inline ml-3" onClick={(e) => {
                        setDrawerActive(false);
                        handleLogout(e);
                    }}>
                        LOGOUT
                    </a>
                    <div>  
                        <h6 className="nav-link-email">{currentUser}</h6>
                    </div>                   
                   </>
               )}
                { !currentUser && (
                    <Link onClick={() => setDrawerActive(false)} className="navbar-link active" to="/auth/login">
                    LOGIN
                    </Link>
                )}
            </div>
        </nav>
    )
};

export default Navbar;