import React from 'react';
import { Outlet } from 'react-router-dom';
import NavLink from '../Components/Shared/Main/NavLink';
import Footer from '../Components/Shared/Footer/Footer';
import ScrollToTop from '@/Components/Shared/ScrollToTop/ScrollToTop';
import { Toaster } from 'sonner';

const Main = () => {
    return (
        <>
            <Toaster />
            <ScrollToTop />
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