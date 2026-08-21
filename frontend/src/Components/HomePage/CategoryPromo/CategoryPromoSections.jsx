import React from "react";
import CategoryPromoSection from "./CategoryPromoSection";

import mobileBanner from "../../../assets/promo-section/mobile-banner.png"
import laptopBanner from "../../../assets/promo-section/laptop-banner.png"

import { useGetProducts } from "@/hooks/useProduct";
// CHANGED: reusing the useCategory/useCategories pair already built earlier
// (in @/hooks/useCategories.js) instead of a new useCategoryList - same job,
// and keeping one implementation means the slug->children logic can't drift
// out of sync between two copies of essentially the same hook.
import { useCategoryList, useCategory } from "@/hooks/useCategory";

// CHANGED: static `subcategories` arrays and their icon imports
// (cellPhoneSmallImg, mackBookSmallImg) removed entirely - subcategories are
// now fetched from GET /api/categories?parentId=<id>, resolved below.
const cellphonesSection = {
    categorySlug: "cell-phones-and-tablets",
    title: "Top Cellphones & Tablets",
    bannerImage: mobileBanner,
    bannerHeading: "Redmi Note 12 Pro+ 5G",
    bannerSubtext: "Rise to the challenge",
    bannerCta: "Shop now",
    bannerVariant: "light",
};

const laptopsSection = {
    categorySlug: "laptop-pc-and-computers",
    title: "Best Laptops & Computers",
    bannerImage: laptopBanner,
    bannerHeading: "Mobok 2 Superchard",
    bannerSubtext: "By M2 — Start from $1199",
    bannerCta: "Shop now",
    bannerVariant: "dark",
};

// Matches CategoryPromoSection's product row (sm:grid-cols-3 md:grid-cols-5)
// - 5 fits one clean row instead of wrapping.
const SHOWCASE_SIZE = 5;

// CHANGED: SubcategoryCard expects { image, name, itemCount } (that's what
// the old static arrays provided) but /api/categories returns
// { id, name, slug, parentCategoryId, categoryIcon, productCount } - mapped
// here in one place rather than inline in JSX, so both sections use the
// exact same mapping.
const toSubcategoryCardProps = (category) => ({
    image: category.categoryIcon,
    name: category.name,
    itemCount: category.productCount,
    slug: category.slug,
});

export default function CategoryPromoSections() {
    const {
        data: cellPhonesAndTablets,
        isLoading: isCellPhonesAndTabletsLoading,
        isError: isCellPhonesAndTabletsError,
    } = useGetProducts(
        cellphonesSection.categorySlug, // category
        undefined, undefined, undefined, undefined, undefined, undefined, undefined,
        0, SHOWCASE_SIZE, undefined,
    );

    const {
        data: laptopPcAndComputers,
        isLoading: isLaptopPcAndComputersLoading,
        isError: isLaptopPcAndComputersError,
    } = useGetProducts(
        laptopsSection.categorySlug, // category
        undefined, undefined, undefined, undefined, undefined, undefined, undefined,
        0, SHOWCASE_SIZE, undefined,
    );

    // CHANGED: step 1 of 2 for subcategories - resolve each section's own
    // numeric id from its slug. /api/categories?parentId= needs an id, and
    // the only thing we have here is a slug, so this lookup is what bridges
    // the two. (This is the same useCategory hook AllCategories.jsx uses to
    // get a selected category's own name.)
    const { data: cellphonesCategoryDetail } = useCategory(cellphonesSection.categorySlug);
    const { data: laptopsCategoryDetail } = useCategory(laptopsSection.categorySlug);

    // CHANGED: step 2 of 2 - now that we have each section's real id, fetch
    // ITS children. `enabled` keeps this idle until the id lookup above
    // resolves, instead of firing once with parentId=undefined.
    const {
        data: cellPhonesAndTabletsSubcategories,
        isLoading: isCellPhonesAndTabletsSubcategoriesLoading,
    } = useCategoryList(cellphonesCategoryDetail?.id);

    const {
        data: laptopPcAndComputersSubcategories,
        isLoading: isLaptopPcAndComputersSubcategoriesLoading,
    } = useCategoryList(laptopsCategoryDetail?.id);


    return (
        <div className="container mx-auto flex w-full max-w-7xl flex-col gap-4">
            <CategoryPromoSection
                {...cellphonesSection}
                href={`/products?category=${cellphonesSection.categorySlug}`}
                // CHANGED: was `cellPhonesAndTablets?.data?.content` - the
                // envelope is already unwrapped by axios.js's interceptor,
                // so `cellPhonesAndTablets` IS the PageResponse; `.data.content`
                // would always have been undefined.
                products={cellPhonesAndTablets?.content ?? []}
                isLoading={isCellPhonesAndTabletsLoading}
                isError={isCellPhonesAndTabletsError}
                // CHANGED: real subcategories instead of the static array,
                // mapped to the props SubcategoryCard already expects.
                subcategories={(cellPhonesAndTabletsSubcategories ?? []).map(toSubcategoryCardProps)}
                isSubcategoriesLoading={isCellPhonesAndTabletsSubcategoriesLoading}
            />
            <CategoryPromoSection
                {...laptopsSection}
                href={`/products?category=${laptopsSection.categorySlug}`}
                products={laptopPcAndComputers?.content ?? []}
                isLoading={isLaptopPcAndComputersLoading}
                isError={isLaptopPcAndComputersError}
                subcategories={(laptopPcAndComputersSubcategories ?? []).map(toSubcategoryCardProps)}
                isSubcategoriesLoading={isLaptopPcAndComputersSubcategoriesLoading}
            />
        </div>
    );
}