import React from 'react';

const Layout = ({ children }) => {
    return (
        <div className='h-screen w-screen'>
            { children }
        </div>
    );
}

export default Layout;