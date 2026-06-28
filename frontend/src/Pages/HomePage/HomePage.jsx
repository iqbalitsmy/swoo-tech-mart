import React from 'react';
import CategoryHero from '../../Components/HomePage/CategoryHero';
import ProductsTabs from '../../Components/HomePage/ProductsTabs';
import CategoryShowcaseGrid from '../../Components/HomePage/CategoryPanel/CategoryShowcaseGrid';
import CategoryPromoSections from '../../Components/HomePage/CategoryPromo/CategoryPromoSections';
import RecentlyViewedSection from '../../Components/HomePage/RecentlyView/RecentlyViewedSection';

const HomePage = () => {
    return (
        <>
            <CategoryHero />
            <ProductsTabs />
            <CategoryPromoSections />
            <CategoryShowcaseGrid />
            <RecentlyViewedSection />
        </>
    );
};

export default HomePage;