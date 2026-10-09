export default function SectionCard({ title, description, action, children }) {
    return (
        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <h4 className="font-semibold text-gray-800">{title}</h4>
                    {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
                </div>
                {action}
            </div>
            <div className="mt-4">{children}</div>
        </div>
    );
}