import ProductHighlights from "./ProductHighlights";
import ProductImages from "./ProductImages";
import ProductDescriptions from "./ProductDescriptions";
import ProductVariants from "./Variants/ProductVariants";

export default function ProductContent({
    product,
    reload,
}) {
    return (
        <section className="mt-7 border-t pt-6">
            <h3 className="text-lg font-bold text-gray-800">
                Product content
            </h3>

            <p className="mt-1 text-sm text-gray-500">
                Add product images, highlights,
                descriptions, variants, and their
                images.
            </p>

            <div className="mt-5 space-y-5">
                {/* HIGHLIGHTS */}

                <ProductHighlights
                    product={product}
                    reload={reload}
                />

                {/* PRODUCT IMAGES */}

                <ProductImages
                    product={product}
                    reload={reload}
                />

                {/* DESCRIPTIONS */}

                <ProductDescriptions
                    product={product}
                    reload={reload}
                />

                {/* VARIANTS */}

                <ProductVariants
                    product={product}
                    reload={reload}
                />
            </div>
        </section>
    );
}