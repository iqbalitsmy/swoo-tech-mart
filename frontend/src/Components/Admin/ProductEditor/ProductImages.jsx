
import { productImageSchema } from "@/validators/productValidator";
import SectionCard from "./ui/SectionCard";
import AddForm from "./AddForm";
import { useAddProductImage } from "@/hooks/useAddProductImage";

export default function ProductImages({ product, reload }) {
    const mutation = useAddProductImage(product.id, reload);

    return (
        <SectionCard title="Product image gallery" description="Upload images to build the gallery.">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
                {product.images?.map((item) => (
                    <img
                        key={item.id}
                        src={item.url}
                        alt="Product"
                        className="aspect-square w-full rounded-md border border-gray-200 bg-gray-50 object-cover"
                    />
                ))}

                {!product.images?.length && (
                    <p className="col-span-full py-4 text-sm text-gray-400">No images uploaded yet.</p>
                )}
            </div>

            <AddForm
                schema={productImageSchema}
                fields={[
                    { name: "url", label: "Select product image", image: true },
                    { name: "sortOrder", label: "Order", type: "number" },
                ]}
                onSubmit={(data, reset) => mutation.mutate(data, { onSuccess: reset })}
            />
        </SectionCard>
    );
}