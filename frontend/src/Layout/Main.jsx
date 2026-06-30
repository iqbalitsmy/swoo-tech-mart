import React from 'react';
import { Outlet } from 'react-router-dom';
import NavLink from '../Components/Shared/Main/NavLink';
import Footer from '../Components/Shared/Footer/Footer';

const Main = () => {
    return (
        <>
            <header>
                <nav className=''>
                    <NavLink />
                </nav>
            </header>
            <main className='mb-6'>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default Main;