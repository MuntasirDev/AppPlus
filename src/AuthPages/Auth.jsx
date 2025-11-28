import React from 'react';
import Navbar from '../Components/NavBar';
import { Outlet } from 'react-router';

const Auth = () => {
    return (
        <div>
            <header className='sticky top-0'>
                <Navbar></Navbar>
            </header>
            <main>
<Outlet></Outlet>
            </main>
            
        </div>
    );
};

export default Auth;

