import ExistingVariantsList from "./ExistingVariantsList";
import VariantBuilder from "./VariantBuilder";

export default function ProductVariants({ product, reload }) {
    return (
        <div className="space-y-5">
            <ExistingVariantsList product={product} reload={reload} />
            <VariantBuilder product={product} reload={reload} />
        </div>
    );
}