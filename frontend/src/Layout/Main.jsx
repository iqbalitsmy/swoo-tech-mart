import React from 'react';
import { Outlet } from 'react-router-dom';
import TopNav from '../Components/Shared/Main/TopNav';
import MiddleNav from '../Components/Shared/Main/MiddleNav';
import NavLink from '../Components/Shared/Main/NavLink';
import Footer from '../Components/Shared/Footer/Footer';

const Main = () => {
    return (
        <>
            <header>
                <nav className=''>
                    {/* <TopNav />
                <MiddleNav /> */}
                    <NavLink />
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default Main;