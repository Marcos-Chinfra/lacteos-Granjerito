import React from 'react';
import { useLocation } from 'react-router-dom';
import Side from './Side';

const Layout = ({ children }) => {
    const location = useLocation();

    const hideMenu = location.pathname === '/' || location.pathname === '/login-staff'

    return (
        <div className='h-screen w-screen lg:flex'>
            {!hideMenu && <Side />}
            { children }
        </div>
    );
}

export default Layout;