import { highlightSchema } from "@/validators/productValidator";
import SectionCard from "./ui/SectionCard";
import AddForm from "./AddForm";
import { useAddHighlight } from "@/hooks/useAddHighlight";

export default function ProductHighlights({ product, reload }) {
    const mutation = useAddHighlight(product.id, reload);

    return (
        <SectionCard title="Highlights" description="Add concise selling points for customers.">
            <div className="space-y-2">
                {product.highlights?.map((item) => (
                    <div key={item.id} className="rounded-md bg-primary/5 px-3 py-2 text-sm text-gray-700">
                        <span className="mr-2 text-primary">•</span>
                        {item.text}
                    </div>
                ))}

                {!product.highlights?.length && (
                    <p className="text-sm text-gray-400">No highlights yet.</p>
                )}
            </div>

            <AddForm
                schema={highlightSchema}
                fields={[
                    { name: "text", label: "Highlight text", span: 2 },
                    { name: "sortOrder", label: "Order", type: "number" },
                ]}
                onSubmit={(data, reset) => mutation.mutate(data, { onSuccess: reset })}
            />
        </SectionCard>
    );
}