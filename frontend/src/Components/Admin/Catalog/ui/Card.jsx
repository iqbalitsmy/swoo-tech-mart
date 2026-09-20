export default function Card({ title, description, children }) {
    return (
        <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            {(title || description) && (
                <div className="mb-4">
                    {title && <h3 className="font-semibold text-gray-800">{title}</h3>}
                    {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
                </div>
            )}
            {children}
        </section>
    );
}