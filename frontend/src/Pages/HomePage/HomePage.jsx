import React from 'react';
import CategoryHero from '../../components/HomePage/CategoryHero';
import ProductsTabs from '../../components/HomePage/ProductsTabs';
import CategoryShowcaseGrid from '../../components/HomePage/CategoryPanel/CategoryShowcaseGrid';
import CategoryPromoSections from '../../components/HomePage/CategoryPromo/CategoryPromoSections';
import RecentlyViewedSection from '@/components/Shared/RecentlyView/RecentlyViewedSection';

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