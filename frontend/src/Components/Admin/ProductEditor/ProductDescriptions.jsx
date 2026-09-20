import { descriptionImageSchema, descriptionSectionSchema } from "@/validators/productValidator";
import SectionCard from "./ui/SectionCard";
import AddForm from "./AddForm";
import { useAddDescriptionSection } from "@/hooks/useAddDescriptionSection";
import { useAddDescriptionImage } from "@/hooks/useAddDescriptionImage";

export default function ProductDescriptions({ product, reload }) {
    const sectionMutation = useAddDescriptionSection(product.id, reload);
    const imageMutation = useAddDescriptionImage(product.id, reload);

    return (
        <SectionCard title="Description sections" description="Write clear, structured product details.">
            <div className="space-y-3">
                {product.descriptions?.map((item) => (
                    <div key={item.id} className="rounded-md border border-gray-200 bg-gray-50 p-3">
                        <p className="text-xs font-semibold text-gray-700">{item.title}</p>
                        <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-gray-600">{item.body}</p>

                        <div className="mt-2 flex gap-2 overflow-x-auto">
                            {item.images?.map((image) => (
                                <img
                                    key={image.id}
                                    src={image.url}
                                    alt={image.altText || item.title}
                                    className="h-16 w-16 shrink-0 rounded border border-gray-200 object-cover"
                                />
                            ))}
                        </div>

                        <div className="mt-3 border-t border-gray-100 pt-3">
                            <AddForm
                                schema={descriptionImageSchema}
                                fields={[
                                    { name: "url", label: "Inline image", image: true },
                                    { name: "altText", label: "Alt text" },
                                    { name: "sortOrder", label: "Order", type: "number" },
                                ]}
                                onSubmit={(data, reset) =>
                                    imageMutation.mutate({ ...data, sectionId: item.id }, { onSuccess: reset })
                                }
                            />
                        </div>
                    </div>
                ))}

                {!product.descriptions?.length && (
                    <p className="text-sm text-gray-400">No description sections yet.</p>
                )}
            </div>

            <div className="mt-5 border-t border-gray-100 pt-5">
                <h5 className="text-sm font-semibold text-gray-800">Add description section</h5>
                <p className="mt-1 text-sm text-gray-500">
                    Use the larger editor to write clear product details.
                </p>

                <AddForm
                    schema={descriptionSectionSchema}
                    fields={[
                        { name: "title", label: "Section title" },
                        { name: "sortOrder", label: "Order", type: "number" },
                        { name: "body", label: "Write a detailed product description…", textarea: true },
                    ]}
                    onSubmit={(data, reset) => sectionMutation.mutate(data, { onSuccess: reset })}
                />
            </div>
        </SectionCard>
    );
}